import { NextRequest, NextResponse } from 'next/server';
import { verifyInstamojoSignature } from '@/lib/instamojo';
import { createServerClient } from '@/lib/supabaseClient';
import { processPaymentSuccess } from '@/lib/payment-utils';

export async function POST(request: NextRequest) {
    try {
        // Get webhook secret from environment
        const salt = process.env.INSTAMOJO_SALT;
        if (!salt) {
            console.error('INSTAMOJO_SALT is not configured');
            return NextResponse.json(
                { error: 'Webhook secret not configured' },
                { status: 500 }
            );
        }

        // Get the raw body for signature verification
        const rawBody = await request.text();
        const signature =
            request.headers.get('x-instamojo-signature') ||
            request.headers.get('X-Instamojo-Signature');

        let parsedBody: Record<string, any> | null = null;
        try {
            parsedBody = rawBody ? JSON.parse(rawBody) : {};
        } catch {
            try {
                const searchParams = new URLSearchParams(rawBody);
                parsedBody = Object.fromEntries(searchParams.entries());
            } catch {
                parsedBody = null;
            }
        }

        const mac = parsedBody?.mac || parsedBody?.payload?.mac;

        // Verify webhook signature
        const isValid = verifyInstamojoSignature({
            rawBody,
            signatureHeader: signature,
            salt,
            mac,
            parsedBody: parsedBody || undefined,
        });
        if (!isValid) {
            console.error('Invalid webhook signature');
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        if (!parsedBody) {
            return NextResponse.json(
                { error: 'Invalid webhook payload' },
                { status: 400 }
            );
        }

        const status =
            parsedBody.status ||
            parsedBody.payment_status ||
            parsedBody?.payload?.payment?.status ||
            parsedBody?.payload?.payment?.entity?.status;
        const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : '';

        const paymentRequestId =
            parsedBody.payment_request_id ||
            parsedBody?.payload?.payment_request?.id ||
            parsedBody?.payload?.payment?.payment_request_id ||
            parsedBody?.payment_request?.id;

        const paymentId =
            parsedBody.payment_id ||
            parsedBody?.payload?.payment?.id ||
            parsedBody?.payload?.payment?.entity?.id;

        const amountValue =
            parsedBody.amount ||
            parsedBody?.payload?.payment?.amount ||
            parsedBody?.payload?.payment?.entity?.amount;

        const amount = typeof amountValue === 'string' ? parseFloat(amountValue) : Number(amountValue);

        if (!paymentRequestId) {
            return NextResponse.json(
                { error: 'Missing payment request id' },
                { status: 400 }
            );
        }

        const supabase = createServerClient();

        // Handle successful payment
        if (normalizedStatus === 'credit' || normalizedStatus === 'successful' || normalizedStatus === 'completed') {
            const result = await processPaymentSuccess({
                paymentRequestId,
                paymentId,
                amount
            });

            if (!result.success) {
                console.error('Payment processing failed in webhook:', result.error);
                return NextResponse.json(
                    { error: result.error || 'Failed to process payment' },
                    { status: 500 }
                );
            }

            return NextResponse.json({ status: 'ok' });
        }

        // Handle payment failure/refund
        if (normalizedStatus === 'failed' || normalizedStatus === 'failure' || normalizedStatus === 'refunded') {
            // Update payment_details status to failed
            const { error: updateError } = await (supabase
                .from('payment_details') as any)
                .update({
                    payment_status: normalizedStatus === 'refunded' ? 'refunded' : 'failed',
                    instamojo_payment_id: paymentId || null,
                    updated_at: new Date().toISOString(),
                })
                .eq('instamojo_payment_request_id', paymentRequestId);

            if (updateError) {
                console.error('Error updating failed payment:', updateError);
                return NextResponse.json(
                    { error: 'Failed to update payment status' },
                    { status: 500 }
                );
            }

            return NextResponse.json({ status: 'ok' });
        }

        // For other events, just acknowledge
        return NextResponse.json({ status: 'ok' });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: error.message || 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
