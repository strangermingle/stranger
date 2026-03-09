import { supabaseAdmin } from '@/lib/supabase/admin'
import crypto from 'crypto'

export async function handlePaymentCaptured(payload: any) {
  const { payment, order } = payload.payment.entity
  const razorpay_order_id = payload.order.entity.id
  const razorpay_payment_id = payload.payment.entity.id
  const razorpay_signature = 'webhook_captured' // Webhooks don't provide the same signature as client-side, we use a placeholder or verify via webhook secret
  
  // 1. Fetch booking
  const { data: booking, error: fetchError } = await supabaseAdmin
    .from('bookings')
    .select('id, status, booking_ref, user_id')
    .eq('razorpay_order_id', razorpay_order_id)
    .single()

  if (fetchError || !booking) {
    throw new Error(`Booking for order ${razorpay_order_id} not found`)
  }

  // 2. If already confirmed, nothing to do
  if (booking.status === 'confirmed') {
    return { success: true, message: 'Already confirmed' }
  }

  // 3. Atomically confirm via RPC v2
  const { data: tickets, error: rpcError } = await supabaseAdmin.rpc('confirm_booking_payment_v2', {
    p_booking_id: booking.id,
    p_razorpay_payment_id: razorpay_payment_id,
    p_razorpay_signature: razorpay_signature,
    p_razorpay_method: payload.payment.entity.method || 'online'
  } as any)

  if (rpcError || !tickets) {
    console.error('Webhook RPC Error:', rpcError)
    throw new Error('Failed to confirm booking via webhook')
  }

  // 4. Sign tickets with HMAC (reusing logic from server action)
  const secret = process.env.RAZORPAY_KEY_SECRET!
  for (const ticket of (tickets as any[])) {
    const payloadData = {
      ticketId: ticket.r_ticket_id,
      eventId: ticket.r_event_id,
      bookingRef: booking.booking_ref
    }
    
    const qrContent = JSON.stringify(payloadData)
    const signedQr = crypto
      .createHmac('sha256', secret)
      .update(qrContent)
      .digest('hex')
    
    const finalQrData = `${qrContent}|${signedQr}`

    await supabaseAdmin
      .from('tickets')
      .update({ qr_code_data: finalQrData } as any)
      .eq('id', ticket.r_ticket_id)
  }

  return { success: true, bookingId: booking.id }
}

export async function handlePaymentFailed(payload: any) {
  const razorpay_order_id = payload.order.entity.id
  
  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ 
      status: 'cancelled', // Or a dedicated 'failed' status if added to schema
      payment_status: 'failed',
      updated_at: new Date().toISOString()
    } as any)
    .eq('razorpay_order_id', razorpay_order_id)
    .eq('status', 'pending')

  if (error) throw error
  return { success: true }
}

export async function handleRefundCreated(payload: any) {
  const { payment_id, amount, status } = payload.refund.entity
  
  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ 
      status: 'refunded',
      payment_status: 'refunded',
      updated_at: new Date().toISOString()
      // Note: we could add refund_amount column here if it exists in schema
    } as any)
    .eq('razorpay_payment_id', payment_id)

  if (error) throw error
  return { success: true }
}

export async function handleRefundProcessed(payload: any) {
  const { payment_id } = payload.refund.entity
  
  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ 
      status: 'refunded',
      payment_status: 'refunded',
      updated_at: new Date().toISOString()
    } as any)
    .eq('razorpay_payment_id', payment_id)

  if (error) throw error
  return { success: true }
}
