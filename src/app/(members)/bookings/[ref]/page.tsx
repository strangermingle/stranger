import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { Calendar, MapPin, Receipt, ArrowLeft, Download, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import { QRCodeImage } from '@/components/booking/QRCodeImage'
import { CancelBookingButton } from '@/components/booking/CancelBookingButton'
import { RefundBookingButton } from '@/components/booking/RefundBookingButton'

export const metadata: Metadata = {
  title: 'Booking Details | StrangerMingle',
}

interface BookingDetailPageProps {
  params: { ref: string }
}

export default async function BookingDetailPage({ params }: BookingDetailPageProps) {
  const supabase = await createClient()

  // 1. Fetch current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Fetch booking with items and tickets
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      events (
        id,
        title,
        slug,
        cover_image_url,
        start_datetime,
        end_datetime,
        venue_name,
        address_line1,
        city,
        refund_policy,
        refund_policy_text,
        refund_cutoff_hours
      ),
      booking_items (
        id,
        quantity,
        unit_price,
        subtotal,
        ticket_tiers (
          name
        )
      ),
      tickets (
        id,
        ticket_number,
        holder_name,
        qr_code_data,
        is_void
      )
    `)
    .eq('booking_ref', params.ref)
    .single() as any

  if (error || !booking) {
    notFound()
  }

  // 3. Authorization check
  if (booking.user_id !== user.id) {
    redirect('/bookings')
  }

  const event = booking.events
  const items = booking.booking_items
  const tickets = booking.tickets

  const isCancellable = booking.status === 'confirmed' && 
    new Date() < new Date(new Date(event.start_datetime).getTime() - (event.refund_cutoff_hours || 0) * 60 * 60 * 1000)

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 pt-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link 
          href="/bookings" 
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Bookings
        </Link>

        {/* Header Section */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
           <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Booking {booking.booking_ref}</h1>
                 <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${
                    booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    booking.status === 'cancelled' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-zinc-100'
                 }`}>
                    {booking.status}
                 </span>
              </div>
              <p className="mt-3 text-zinc-500">Booked on {format(new Date(booking.created_at), 'PPP ')} at {format(new Date(booking.created_at), 'p')}</p>
           </div>
           
           <div className="flex gap-4">
              {booking.status === 'confirmed' && booking.payment_status === 'paid' && event.refund_policy !== 'no_refund' && new Date() < new Date(new Date(event.start_datetime).getTime() - (event.refund_cutoff_hours || 0) * 60 * 60 * 1000) ? (
                <RefundBookingButton 
                  bookingRef={booking.booking_ref} 
                  eventName={event.title}
                  refundPolicyText={event.refund_policy_text}
                />
              ) : isCancellable && (
                <CancelBookingButton 
                  bookingRef={booking.booking_ref} 
                  eventName={event.title}
                  refundAmount={booking.payment_status === 'paid' ? booking.total_amount : 0}
                />
              )}
              <button className="flex items-center gap-2 rounded-xl bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
                 <Download className="h-4 w-4" />
                 Download Tickets (PDF)
              </button>
           </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
           {/* Detailed Ticket Grid */}
           <div className="space-y-8 lg:col-span-2">
              <div className="space-y-6">
                 <h2 className="text-2xl font-black">Tickets</h2>
                 <div className="grid gap-6">
                    {tickets.map((ticket: any) => (
                      <div 
                        key={ticket.id}
                        className={`overflow-hidden rounded-[2.5rem] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${ticket.is_void ? 'opacity-50 grayscale' : ''}`}
                      >
                         <div className="flex flex-col md:flex-row">
                            <div className="flex flex-1 flex-col justify-between p-8">
                               <div>
                                  <div className="flex items-center justify-between">
                                     <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black text-indigo-600 dark:bg-indigo-900/40">
                                        {ticket.holder_name || booking.attendee_name}
                                     </span>
                                     <span className="text-xs font-mono text-zinc-400">{ticket.ticket_number}</span>
                                  </div>
                                  <h3 className="mt-4 text-3xl font-black leading-tight text-zinc-900 dark:text-zinc-100">{event.title}</h3>
                               </div>
                               
                               <div className="mt-8 grid grid-cols-2 gap-6 text-sm">
                                  <div>
                                     <p className="font-bold uppercase tracking-widest text-zinc-400 text-[10px]">Date & Time</p>
                                     <p className="mt-1 font-black">{format(new Date(event.start_datetime), 'MMM d, yyyy')}</p>
                                     <p className="text-zinc-500">{format(new Date(event.start_datetime), 'p')}</p>
                                  </div>
                                  <div>
                                     <p className="font-bold uppercase tracking-widest text-zinc-400 text-[10px]">Venue</p>
                                     <p className="mt-1 font-black truncate">{event.venue_name || 'Online'}</p>
                                     <p className="text-zinc-500 truncate">{event.city}</p>
                                  </div>
                               </div>
                            </div>
                            
                            <div className="relative flex items-center justify-center bg-zinc-50 p-8 dark:bg-zinc-900/50 md:w-56 md:border-l md:border-dashed md:border-zinc-200 dark:md:border-zinc-800">
                               <div className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-zinc-50 dark:bg-zinc-950 md:block" />
                               {ticket.is_void ? (
                                 <div className="flex h-32 w-32 items-center justify-center rounded-2xl bg-rose-50 border-2 border-dashed border-rose-200">
                                    <span className="rotate-[-12deg] font-black text-rose-500">VOIDED</span>
                                 </div>
                               ) : (
                                 <QRCodeImage data={ticket.qr_code_data} size={140} />
                               )}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Sidebar Info */}
           <div className="space-y-8 lg:col-span-1">
              {/* Order Summary */}
              <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                 <div className="mb-6 flex items-center gap-2 text-indigo-600">
                    <Receipt className="h-5 w-5" />
                    <h3 className="text-lg font-black">Order Summary</h3>
                 </div>
                 
                 <div className="space-y-4">
                    {items.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-zinc-500">
                          {item.ticket_tiers.name} × {item.quantity}
                        </span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100">₹{item.subtotal}</span>
                      </div>
                    ))}
                    
                    <div className="border-t border-zinc-100 pt-4 dark:border-zinc-800">
                       <div className="flex justify-between text-sm">
                          <span className="text-zinc-500">Platform Fee & GST</span>
                          <span className="font-bold text-zinc-900 dark:text-zinc-100">₹{Number(booking.platform_fee) + Number(booking.gst_on_fee)}</span>
                       </div>
                       {Number(booking.discount_amount) > 0 && (
                         <div className="mt-2 flex justify-between text-sm text-emerald-600">
                            <span>Discount</span>
                            <span>-₹{booking.discount_amount}</span>
                         </div>
                       )}
                       <div className="mt-4 flex justify-between text-xl font-black">
                         <span>Total Paid</span>
                         <span>₹{booking.total_amount}</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 space-y-3">
                   <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                      <ShieldCheck className="h-4 w-4" />
                      Payment {booking.payment_status}
                   </div>
                   {booking.razorpay_payment_id && (
                     <p className="px-1 text-[10px] font-medium text-zinc-400">Transaction: {booking.razorpay_payment_id}</p>
                   )}
                 </div>
              </div>

              {/* Quick Links */}
              <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                 <h3 className="text-lg font-black">Event Help</h3>
                 <div className="mt-6 space-y-4">
                    <Link 
                      href={`/events/${event.slug}`}
                      className="flex items-center justify-between text-sm font-bold text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400"
                    >
                       View Event Page
                       <ExternalLink className="h-4 w-4" />
                    </Link>
                    <button className="flex w-full items-center justify-between text-sm font-bold text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400">
                       Contact Host
                       <ChevronRight className="h-4 w-4" />
                    </button>
                    <button className="flex w-full items-center justify-between text-sm font-bold text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400">
                       Report an issue
                       <ChevronRight className="h-4 w-4" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
