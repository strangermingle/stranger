import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { CheckCircle2, Clock, MapPin, Calendar, CreditCard, ShieldCheck } from 'lucide-react'
import { RazorpayCheckout } from '@/components/booking/RazorpayCheckout'

export const metadata: Metadata = {
  title: 'Checkout — StrangerMingle',
  robots: { index: false, follow: false }
}

interface CheckoutPageProps {
  searchParams: { bookingId?: string }
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const bookingId = searchParams.bookingId
  if (!bookingId) {
    redirect('/')
  }

  const supabase = await createClient()

  // Fetch booking with joins
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      id, 
      booking_ref, 
      status, 
      total_amount, 
      razorpay_order_id, 
      expires_at, 
      attendee_name, 
      attendee_email,
      events (
        title,
        start_datetime,
        cover_image_url,
        slug
      ),
      booking_items (
        quantity,
        unit_price,
        ticket_tiers (
          name
        )
      )
    `)
    .eq('id', bookingId)
    .single() as any

  if (error || !booking) {
    notFound()
  }

  // 1. Verify status and expiry
  if (booking.status !== 'pending') {
    if (booking.status === 'confirmed') {
        // Redirect to success page if we had one, for now back to event or profile
        redirect(`/events/${booking.events.slug}?booking=success`)
    }
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
             <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/30">
               <Clock className="h-10 w-10 text-red-600" />
             </div>
             <h1 className="mt-4 text-2xl font-bold">Booking Unavailable</h1>
             <p className="mt-2 text-zinc-500">This booking is no longer pending or has been cancelled.</p>
        </div>
    )
  }

  const expiresAt = new Date(booking.expires_at)
  if (expiresAt < new Date()) {
     return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
             <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
               <Clock className="h-10 w-10 text-orange-600" />
             </div>
             <h1 className="mt-4 text-2xl font-bold">Booking Expired</h1>
             <p className="mt-2 text-zinc-500">The 15-minute window for this booking has expired. Please try again.</p>
        </div>
     )
  }

  const event = booking.events
  const items = booking.booking_items

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-12 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start">
          <div>
            <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-100">Checkout</h1>
            <p className="mt-1 text-zinc-500 dark:text-zinc-400">Complete your booking for {event.title}</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-orange-50 p-4 text-orange-700 dark:bg-orange-900/10 dark:text-orange-400">
            <Clock className="h-5 w-5 animate-pulse" />
            <div className="text-sm font-bold">
               Expires at {format(expiresAt, 'hh:mm a')}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Order Details */}
          <div className="lg:col-span-7">
             <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="relative h-48 w-full overflow-hidden">
                   <img 
                     src={event.cover_image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
                     alt="" 
                     className="h-full w-full object-cover"
                   />
                </div>
                
                <div className="p-6">
                   <div className="mb-6">
                      <h2 className="text-xl font-bold">{event.title}</h2>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                         <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(event.start_datetime), 'PPP p')}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Order Summary</h3>
                      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                         {items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between py-3">
                               <div>
                                  <p className="font-semibold">{item.ticket_tiers.name}</p>
                                  <p className="text-sm text-zinc-500">Qty: {item.quantity} × ₹{Number(item.unit_price).toLocaleString()}</p>
                               </div>
                               <p className="font-bold">₹{(item.quantity * Number(item.unit_price)).toLocaleString()}</p>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                   <ShieldCheck className="h-5 w-5 text-green-500" />
                   Attendee Details
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                   <div>
                      <p className="text-xs font-bold uppercase text-zinc-400">Name</p>
                      <p className="mt-1 font-medium">{booking.attendee_name}</p>
                   </div>
                   <div>
                      <p className="text-xs font-bold uppercase text-zinc-400">Email</p>
                      <p className="mt-1 font-medium">{booking.attendee_email}</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Payment Summary & CTA */}
          <div className="lg:col-span-5">
             <div className="sticky top-24 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="mb-6 text-xl font-bold">Payment Details</h3>
                
                <div className="space-y-3 border-b border-zinc-100 pb-6 dark:divide-zinc-800 dark:border-zinc-800">
                   <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Subtotal</span>
                      <span>₹{Number(booking.total_amount).toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                      <span>Taxes & Fees</span>
                      <span className="text-emerald-600 dark:text-emerald-400">Included</span>
                   </div>
                </div>

                <div className="mt-6 flex items-center justify-between text-2xl font-black">
                   <span>Total</span>
                   <span>₹{Number(booking.total_amount).toLocaleString()}</span>
                </div>

                <div className="mt-8">
                   <RazorpayCheckout 
                     razorpayOrderId={booking.razorpay_order_id} 
                     totalAmount={booking.total_amount} 
                     bookingRef={booking.booking_ref} 
                     keyId={process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || ''}
                     attendeeName={booking.attendee_name}
                     attendeeEmail={booking.attendee_email}
                     eventTitle={event.title}
                     expiresAt={booking.expires_at}
                   />
                </div>

                <div className="mt-6 flex flex-col items-center gap-2 text-center text-xs text-zinc-500">
                   <div className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Secure Payment via Razorpay
                   </div>
                   <p>By clicking Pay Now, you agree to the Terms of Service.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
