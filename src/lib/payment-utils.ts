import { createServerClient } from './supabaseClient';
import { getEventById } from './events';

export type PaymentProcessingResult = {
    success: boolean;
    error?: string;
    isAlreadyProcessed?: boolean;
    bookingId?: string;
};

export async function processPaymentSuccess({
    paymentRequestId,
    paymentId,
    amount,
    userId,
}: {
    paymentRequestId: string;
    paymentId: string;
    amount: number;
    userId?: string | null;
}): Promise<PaymentProcessingResult> {
    const supabase = createServerClient();

    try {
        // Find the payment_details record by instamojo_payment_request_id
        const { data: paymentDetail, error: fetchError } = await supabase
            .from('payment_details')
            .select('*')
            .eq('instamojo_payment_request_id', paymentRequestId)
            .single();

        if (fetchError || !paymentDetail) {
            console.error('Payment detail not found for payment request:', paymentRequestId);
            return {
                success: false,
                error: 'Payment detail not found'
            };
        }

        // Check if already processed
        if (paymentDetail.payment_status === 'completed') {
            return {
                success: true,
                isAlreadyProcessed: true,
                bookingId: paymentDetail.id
            };
        }

        // Verify amount matches (allow small diff for float precision)
        if (!Number.isNaN(amount) && Math.abs(paymentDetail.amount_paid - amount) > 0.01) {
            console.error('Amount mismatch:', paymentDetail.amount_paid, amount);
            return {
                success: false,
                error: 'Amount mismatch'
            };
        }

        // Get event to check availability
        const event = await getEventById(paymentDetail.event_id);
        if (!event) {
            console.error('Event not found for payment:', paymentDetail.event_id);
            return {
                success: false,
                error: 'Event not found'
            };
        }

        // Check availability before incrementing
        if ((event.available_seats || 0) <= (event.booked_spots || 0)) {
            console.error('Event sold out, cannot complete payment:', paymentDetail.event_id);
            // Update payment status to failed
            await supabase
                .from('payment_details')
                .update({
                    payment_status: 'failed',
                    instamojo_payment_id: paymentId || null,
                })
                .eq('id', paymentDetail.id)
                .eq('payment_status', 'pending'); // Only fail if currently pending

            return {
                success: false,
                error: 'Event sold out'
            };
        }

        // OPTIMISTIC LOCKING: Try to set status to completed WHERE status is pending
        // This ensures only ONE process wins the race to claim this payment
        const { data: updatedPayment, error: claimError } = await supabase
            .from('payment_details')
            .update({
                payment_status: 'completed',
                instamojo_payment_id: paymentId || null,
                user_id: userId || paymentDetail.user_id, // Update user_id if provided
                updated_at: new Date().toISOString(),
            })
            .eq('id', paymentDetail.id)
            .eq('payment_status', 'pending')
            .select()
            .single();

        if (claimError) {
            // If error is PGRST116 (JSON object requested, multiple (or no) rows returned), check if it was just because no rows matched pending
            if (claimError.code === 'PGRST116' || !updatedPayment) {
                // Check if it was already completed by another race winner
                const { data: confirmData } = await supabase
                    .from('payment_details')
                    .select('payment_status')
                    .eq('id', paymentDetail.id)
                    .single();

                if (confirmData?.payment_status === 'completed') {
                    return {
                        success: true,
                        isAlreadyProcessed: true,
                        bookingId: paymentDetail.id
                    };
                }

                return {
                    success: false,
                    error: 'Payment processing race condition failed' // Should not happen often
                };
            }

            console.error('Error updating payment detail:', claimError);
            return {
                success: false,
                error: 'Failed to update payment record'
            };
        }

        // If we are here, WE updated the row to completed. We won the lock.
        // Now safely increment spots.
        const { data: incrementResult, error: rpcError } = await supabase.rpc(
            'increment_booked_spots_safe',
            {
                p_event_id: paymentDetail.event_id,
                p_spots: paymentDetail.spots_booked,
            }
        );

        if (rpcError || !incrementResult) {
            console.error('CRITICAL: Payment completed but failed to increment spots:', rpcError);
            // NOTE: We do NOT revert payment status here because money IS paid.
            // Admin must reconcile this manually if spots were totally full.
            return {
                success: true,
                bookingId: paymentDetail.id,
                error: 'Payment successful but spot increment warning'
            };
        }

        return {
            success: true,
            bookingId: paymentDetail.id
        };

    } catch (error: any) {
        console.error('Error processing payment success:', error);
        return {
            success: false,
            error: error?.message || 'Internal processing error'
        };
    }
}
