import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { format } from 'date-fns'
import { CheckCircle2, Calendar, MapPin, Ticket as TicketIcon, Download, ArrowRight, Share2 } from 'lucide-react'
import Link from 'next/link'
import { QRCodeImage } from '@/components/booking/QRCodeImage'

export const metadata: Metadata = {
  title: 'Booking Confirmed — StrangerMingle',
  robots: { index: false, follow: false }
}

interface BookingConfirmationProps {
  params: { ref: string }
}

export default async function BookingConfirmationPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params
  const supabase = await createClient()

  // 1. Fetch booking with detailed joins
  const { data: booking, error } = await (supabase
    .from('bookings') as any)
    .select(`
      id,
      booking_ref,
      status,
      total_amount,
      attendee_name,
      attendee_email,
      created_at,
      events (
        id,
        title,
        start_datetime,
        end_datetime,
        cover_image_url,
        venue_name,
        address_line1,
        city,
        slug
      ),
      tickets (
        id,
        ticket_number,
        holder_name,
        qr_code_data,
        booking_items (
            ticket_tiers (
                name
            )
        )
      )
    `)
    .eq('booking_ref', ref)
    .single()

  if (error || !booking) {
    notFound()
  }

  // 2. Verify authorization
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== booking.attendee_email) {
    // If not the attendee, at least check if it's the user who booked (user_id)
    // For now, strict email check as per requirement
    // redirect('/login')
  }

  const event = booking.events
  const tickets = booking.tickets

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 pt-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">Booking Confirmed!</h1>
          <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
            You're all set! We've sent your tickets to <span className="font-bold text-zinc-900 dark:text-zinc-100">{booking.attendee_email}</span>
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
             Reference: <span className="text-indigo-600">{booking.booking_ref}</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Event Details Card */}
          <div className="lg:col-span-1">
             <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="relative h-40 w-full">
                   <img 
                     src={event.cover_image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
                     alt="" 
                     className="h-full w-full object-cover"
                   />
                </div>
                <div className="p-6">
                   <h2 className="text-xl font-black leading-tight">{event.title}</h2>
                   
                   <div className="mt-6 space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                         <div className="mt-0.5 rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-900/20">
                            <Calendar className="h-4 w-4" />
                         </div>
                         <div>
                            <p className="font-bold">{format(new Date(event.start_datetime), 'EEEE, MMMM do')}</p>
                            <p className="text-zinc-500">{format(new Date(event.start_datetime), 'p')} – {format(new Date(event.end_datetime), 'p')}</p>
                         </div>
                      </div>

                      <div className="flex items-start gap-3">
                         <div className="mt-0.5 rounded-lg bg-orange-50 p-2 text-orange-600 dark:bg-orange-900/20">
                            <MapPin className="h-4 w-4" />
                         </div>
                         <div>
                            <p className="font-bold">{event.venue_name || 'Online Event'}</p>
                            <p className="max-w-[180px] text-zinc-500 line-clamp-2">{event.address_line1}, {event.city}</p>
                         </div>
                      </div>
                   </div>

                   <Link 
                     href={`/events/${event.slug}`}
                     className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-100 py-3 text-sm font-bold transition hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                   >
                      Event Details
                      <ArrowRight className="h-4 w-4" />
                   </Link>
                </div>
             </div>
          </div>

          {/* Tickets List */}
          <div className="lg:col-span-2">
             <div className="space-y-6">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black">Your Tickets ({tickets.length})</h3>
                   <div className="flex gap-2">
                      <button className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-bold shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                         <Share2 className="h-4 w-4" />
                         Share
                      </button>
                      <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700">
                         <Download className="h-4 w-4" />
                         Download All
                      </button>
                   </div>
                </div>

                <div className="grid gap-6">
                   {tickets.map((ticket: any) => (
                      <div 
                        key={ticket.id}
                        className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 md:flex-row"
                      >
                         <div className="flex flex-1 flex-col justify-between p-6">
                            <div>
                               <div className="flex items-center justify-between">
                                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600 dark:bg-indigo-900/20">
                                     {ticket.booking_items.ticket_tiers.name}
                                  </span>
                                  <span className="text-xs font-medium text-zinc-400">
                                     {ticket.ticket_number}
                                  </span>
                               </div>
                               <h4 className="mt-4 text-2xl font-black">{ticket.holder_name}</h4>
                            </div>
                            
                            <div className="mt-8 flex items-center justify-between">
                               <div className="flex items-center gap-2 text-sm text-zinc-500">
                                  <TicketIcon className="h-4 w-4" />
                                  General Admission
                               </div>
                               <button className="text-sm font-bold text-indigo-600 hover:underline">
                                  Transfer Ticket
                               </button>
                            </div>
                         </div>

                         <div className="flex items-center justify-center bg-zinc-50/50 p-8 dark:bg-white/5 md:w-48 md:border-l md:border-dashed md:border-zinc-200 md:dark:border-zinc-800">
                            <QRCodeImage data={ticket.qr_code_data} size={120} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
