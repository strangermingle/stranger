'use server';

import { createClient } from '@/lib/supabase/server';
import { createBookingSchema, CreateBookingInput } from '@/lib/validations/booking.schemas';
import { createRazorpayOrder } from '@/lib/razorpay/createOrder';
import { createRazorpayRefund } from '@/lib/razorpay/refundPayment';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { Database } from '@/types/database.types';
import crypto from 'crypto';
import { revalidatePath } from 'next/cache';

export type BookingResult = {
  success: boolean;
  data?: {
    bookingId: string;
    bookingRef: string;
    razorpayOrderId: string;
    totalAmount: number;
    keyId: string;
  };
  error?: string;
};

export async function initiateBookingAction(input: CreateBookingInput): Promise<BookingResult> {
  const supabase = await createClient();

  try {
    // a. Validate input
    const validated = createBookingSchema.parse(input);

    // b. Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'Authorization required' };
    }

    // c. Fetch event
    const { data: event, error: eventError } = await (supabase
      .from('events') as any)
      .select('id, ticketing_mode, status')
      .eq('id', validated.event_id)
      .single()

    if (eventError || !event) {
      return { success: false, error: 'Event not found' };
    }

    if (event.status !== 'published') {
      return { success: false, error: 'This event is not currently accepting bookings' };
    }

    if (event.ticketing_mode !== 'platform') {
      return { success: false, error: 'Booking is not available through this platform' };
    }

    // d. Fetch requested ticket_tiers
    const tierIds = validated.items.map(item => item.ticket_tier_id);
    const { data: tiers, error: tiersError } = await (supabase
      .from('ticket_tiers') as any)
      .select('id, event_id, price, currency, total_quantity, sold_count, reserved_count, max_per_booking, is_active, sale_end_at')
      .in('id', tierIds)

    if (tiersError || !tiers || tiers.length !== tierIds.length) {
      return { success: false, error: 'One or more ticket tiers are invalid' };
    }

    // Validation for each tier
    for (const tier of tiers) {
      if (tier.event_id !== validated.event_id) {
        return { success: false, error: `Invalid ticket tier for this event` };
      }
      if (!tier.is_active) {
        return { success: false, error: `Ticket tier "${tier.id}" is no longer active` };
      }
      
      const requestedItem = validated.items.find(i => i.ticket_tier_id === tier.id);
      const quantity = requestedItem?.quantity || 0;

      if (quantity > (tier.max_per_booking || 5)) {
        return { success: false, error: `Maximum ${tier.max_per_booking} tickets allowed for this tier` };
      }

      const currentCommitted = (tier.sold_count || 0) + (tier.reserved_count || 0);
      if (currentCommitted + quantity > tier.total_quantity) {
        return { success: false, error: `Sold out or insufficient tickets available for one of your selections` };
      }

      if (tier.sale_end_at && new Date(tier.sale_end_at) < new Date()) {
        return { success: false, error: `Sales have ended for one of your selected ticket tiers` };
      }
    }

    // e. Apply promo code if provided
    let promoCodeId: string | null = null;
    let discountAmount = 0;

    if (validated.promo_code) {
      const { data: promo, error: promoError } = await (supabase
        .from('promo_codes') as any)
        .select('*')
        .eq('code', validated.promo_code)
        .eq('is_active', true)
        .single()

      if (promoError || !promo) {
        return { success: false, error: 'Invalid or inactive promo code' };
      }

      // Check event association
      if (promo.event_id && promo.event_id !== validated.event_id) {
        return { success: false, error: 'Promo code is not applicable to this event' };
      }

      // Check validity
      if (promo.valid_until && new Date(promo.valid_until) < new Date()) {
        return { success: false, error: 'Promo code has expired' };
      }

      // Check max uses
      if (promo.max_uses && (promo.used_count || 0) >= promo.max_uses) {
        return { success: false, error: 'Promo code usage limit reached' };
      }

      // Calculate discount (we'll finish this after subtotal)
      promoCodeId = promo.id;
    }

    // f. Calculate amounts server-side
    let subtotal = 0;
    const bookingItems = validated.items.map(item => {
      const tier = (tiers as any[]).find(t => t.id === item.ticket_tier_id)!;
      const itemSubtotal = (Number(tier.price) || 0) * item.quantity;
      subtotal += itemSubtotal;
      return {
        ticket_tier_id: tier.id,
        quantity: item.quantity,
        unit_price: tier.price,
        subtotal: itemSubtotal
      };
    });

    // Re-calculate discount if promo code exists
    if (promoCodeId) {
      const { data: promo } = await (supabase.from('promo_codes') as any).select('*').eq('id', promoCodeId).single()
      if (promo.discount_type === 'percentage') {
        discountAmount = (subtotal * Number(promo.discount_value)) / 100;
      } else {
        discountAmount = Number(promo.discount_value);
      }
      
      // Ensure discount doesn't exceed subtotal
      discountAmount = Math.min(discountAmount, subtotal);
    }

    const taxable_amount = subtotal - discountAmount;
    const platform_fee = taxable_amount * 0.10;
    const gst_on_fee = platform_fee * 0.18;
    const total_amount = taxable_amount + gst_on_fee;
    const host_payout = taxable_amount * 0.90;

    // g. Create Razorpay order
    const bookingRef = `SM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    const razorpayOrder = await createRazorpayOrder({
      amount: Math.round(total_amount * 100), // convert to paise
      currency: 'INR',
      receipt: bookingRef
    });

    const bookingData: any = {
      booking_ref: bookingRef,
      user_id: user.id,
      event_id: validated.event_id,
      promo_code_id: promoCodeId || null,
      status: 'pending',
      payment_status: 'unpaid',
      subtotal,
      discount_amount: discountAmount,
      taxable_amount,
      platform_fee,
      gst_on_fee,
      total_amount,
      host_payout,
      currency: 'INR',
      razorpay_order_id: razorpayOrder.id,
      attendee_name: validated.attendee_name,
      attendee_email: validated.attendee_email,
      attendee_phone: validated.attendee_phone || null,
      expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 mins
    };

    const { data: booking, error: bookingError } = await (supabase
      .from('bookings') as any)
      .insert(bookingData as any)
      .select()
      .single()

    if (bookingError || !booking) {
      console.error('Booking Insert Error:', bookingError);
      throw new Error('Failed to create booking');
    }

    // h. Create booking items
    const itemsData: Database['public']['Tables']['booking_items']['Insert'][] = bookingItems.map(item => ({
      booking_id: (booking as any).id,
      ticket_tier_id: item.ticket_tier_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal,
    }));

    const { error: itemsError } = await (supabase
      .from('booking_items') as any)
      .insert(itemsData as any)

    if (itemsError) {
       console.error('Booking items insertion error:', itemsError);
    }

    // Update ticket_tiers: increment reserved_count
    for (const item of validated.items) {
      const { error: updateError } = await (supabase.rpc as any)('increment_reserved_count', {
        tier_id: item.ticket_tier_id,
        increment_by: item.quantity
      });

      if (updateError) {
        // Fallback if RPC doesn't exist
        const tier = (tiers as Database['public']['Tables']['ticket_tiers']['Row'][]).find(t => t.id === item.ticket_tier_id)!;
        await (supabase
          .from('ticket_tiers') as any)
          .update({ 
            reserved_count: (tier.reserved_count || 0) + item.quantity,
            updated_at: new Date().toISOString()
          })
          .eq('id', item.ticket_tier_id);
      }
    }

    return {
      success: true,
      data: {
        bookingId: booking.id,
        bookingRef: booking.booking_ref,
        razorpayOrderId: razorpayOrder.id,
        totalAmount: total_amount,
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''
      }
    };

  } catch (error: any) {
    console.error('initiateBookingAction Error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

export async function verifyPaymentAction(input: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingRef: string;
}): Promise<{ success: boolean; error?: string }> {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) return { success: false, error: 'Server configuration error' };

  // 1. Verify HMAC signature
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(input.razorpay_order_id + "|" + input.razorpay_payment_id)
    .digest('hex');

  if (generated_signature !== input.razorpay_signature) {
    return { success: false, error: 'Payment verification failed: Invalid signature' };
  }

  const supabase = await createClient();
  
  try {
    // 2. Fetch booking
    const { data: booking, error: fetchError } = await (supabase
      .from('bookings') as any)
      .select('id, user_id, razorpay_order_id')
      .eq('booking_ref', input.bookingRef)
      .single()

    if (fetchError || !booking) {
      return { success: false, error: 'Booking record not found' };
    }

    // 3. Verify order ID matches
    if (booking.razorpay_order_id !== input.razorpay_order_id) {
        return { success: false, error: 'Order ID mismatch' };
    }

    // 4. Verify ownership
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.id !== booking.user_id) {
      return { success: false, error: 'Unauthorized' };
    }

    // 5. Atomically confirm booking via RPC v2
    type ConfirmedTicket = {
      r_ticket_id: string;
      r_event_id: string;
    };
    const { data: tickets, error: rpcError } = await supabase.rpc('confirm_booking_payment_v2', {
      p_booking_id: booking.id,
      p_razorpay_payment_id: input.razorpay_payment_id,
      p_razorpay_signature: input.razorpay_signature,
      p_razorpay_method: 'online'
    } as any).returns<ConfirmedTicket[]>();

    if (rpcError || !tickets) {
      console.error('RPC confirm_booking_payment_v2 error:', rpcError);
      return { success: false, error: 'Failed to finalize booking' };
    }

    // 6. Update tickets with signed data
    for (const ticket of (tickets as any[])) {
      const ticketData = { ticketId: ticket.r_ticket_id, eventId: ticket.r_event_id, bookingRef: input.bookingRef };
      const qrContent = JSON.stringify(ticketData);
      const signedQr = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!).update(qrContent).digest('hex');
      
      const updateData: any = {
        qr_code_data: `${qrContent}|${signedQr}`
      };

      await ((supabase.from('tickets') as any)
        .update(updateData)
        .eq('id', ticket.r_ticket_id));
    }

    // 7. Audit Log
    await (supabase.from('audit_logs') as any).insert({
      actor_id: user.id,
      action: 'payment_verified',
      entity_type: 'booking',
      entity_id: booking.id,
      new_values: { payment_id: input.razorpay_payment_id, status: 'confirmed' }
    })

    return { success: true };
  } catch (error: any) {
    console.error('verifyPaymentAction error:', error);
    return { success: false, error: 'Internal server error during verification' };
  }
}

export async function cancelBookingAction(bookingRef: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  try {
    // 1. Verify Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'Authorization required' };
    }
    // 2. Fetch booking and associated event
    const { data: booking, error: fetchError } = await (supabase
      .from('bookings') as any)
      .select(`
        id, 
        user_id, 
        status, 
        payment_status, 
        total_amount, 
        razorpay_payment_id,
        events (
          id,
          start_datetime,
          refund_cutoff_hours
        )
      `)
      .eq('booking_ref', bookingRef)
      .single()

    type BookingWithEvent = {
      id: string;
      user_id: string;
      status: string;
      payment_status: string;
      total_amount: number;
      razorpay_payment_id: string | null;
      events: {
        id: string;
        start_datetime: string;
        refund_cutoff_hours: number | null;
      };
    };

    if (fetchError || !booking) {
      return { success: false, error: 'Booking not found' };
    }

    const typedBooking = (booking as unknown) as BookingWithEvent;

    // 3. Verify Ownership
    if (typedBooking.user_id !== user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // 4. Check status
    if (typedBooking.status !== 'confirmed') {
      return { success: false, error: 'Only confirmed bookings can be cancelled' };
    }

    // 5. Check if within refund window
    const eventStart = new Date(typedBooking.events.start_datetime);
    const cutoffTime = new Date(eventStart.getTime() - (typedBooking.events.refund_cutoff_hours || 0) * 60 * 60 * 1000);

    if (new Date() > cutoffTime) {
      return { success: false, error: 'Cancellation deadline exceeded' };
    }

    // 6. Initiate Razorpay refund if applicable
    let refundId = null;
    if (typedBooking.payment_status === 'paid' && typedBooking.razorpay_payment_id) {
       const refund = await createRazorpayRefund({
         paymentId: typedBooking.razorpay_payment_id,
         amount: Math.round(Number(typedBooking.total_amount) * 100),
         notes: { bookingRef: typedBooking.id }
       });
       refundId = refund.id;
    }

    // 7. Call atomic cancellation RPC
    const { error: rpcError } = await supabase.rpc('cancel_booking_atomic', {
      p_booking_id: typedBooking.id,
      p_user_id: user.id
    } as any);

    if (rpcError) {
      console.error('RPC cancel_booking_atomic error:', rpcError);
      return { success: false, error: 'Failed to update booking status' };
    }

    // 8. Update refund details if applicable
    if (refundId) {
      const updateData: any = {
        refund_amount: Number(typedBooking.total_amount),
        refunded_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      await ((supabase.from('bookings') as any)
        .update(updateData)
        .eq('id', typedBooking.id));
    }

    // 9. Trigger Waitlist Auto-Promotion processing
    try {
      const { data: items } = await supabaseAdmin
        .from('booking_items')
        .select('ticket_tier_id, quantity')
        .eq('booking_id', typedBooking.id)

      if (items && items.length > 0) {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
        
        for (const item of (items as any[])) {
          await fetch(`${baseUrl}/api/waitlist/process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventId: typedBooking.events.id,
              ticketTierId: item.ticket_tier_id,
              quantity: item.quantity
            })
          })
        }
      }
    } catch (waitlistErr) {
      console.error('Failed to trigger waitlist processing internally:', waitlistErr)
    }

    // 10. Audit Log
    await (supabase.from('audit_logs') as any).insert({
      actor_id: user.id,
      action: 'booking_cancelled',
      entity_type: 'booking',
      entity_id: typedBooking.id,
      old_values: { status: typedBooking.status, payment_status: typedBooking.payment_status },
      new_values: { status: 'cancelled', refund_id: refundId },
      metadata: { booking_ref: bookingRef }
    })

    revalidatePath('/bookings');
    return { success: true };
  } catch (error: any) {
    console.error('cancelBookingAction Error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}

export async function joinWaitlistAction(eventId: string, ticketTierId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Authentication required' };
    }

    // 1. Call atomic join RPC
    const { data, error } = await supabase.rpc('join_waitlist_atomic', {
      p_event_id: eventId,
      p_tier_id: ticketTierId,
      p_user_id: user.id
    } as any);

    if (error || !data) {
      console.error('join_waitlist_atomic error:', error);
      return { success: false, error: 'Failed to join waitlist' };
    }

    const result = (Array.isArray(data) ? data[0] : data) as {
      r_position: number;
      r_status: string;
      r_was_already_on_list: boolean;
    };

    return { 
      success: true, 
      position: result.r_position,
      status: result.r_status,
      alreadyJoined: result.r_was_already_on_list
    };
  } catch (error: any) {
    console.error('joinWaitlistAction error:', error);
    return { success: false, error: error.message || 'An unexpected error occurred' };
  }
}
