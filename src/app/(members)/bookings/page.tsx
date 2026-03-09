import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { Calendar, MapPin, Ticket as TicketIcon, ChevronRight, Search, Filter } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Bookings | StrangerMingle',
}

export default async function BookingsHistoryPage() {
  const supabase = await createClient()

  // 1. Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Fetch all bookings for user
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_ref,
      status,
      payment_status,
      total_amount,
      created_at,
      events (
        title,
        slug,
        cover_image_url,
        start_datetime,
        end_datetime,
        venue_name,
        city
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false }) as any

  if (error) {
    console.error('Fetch Bookings Error:', error)
  }

  const upcomingBookings = (bookings || []).filter((b: any) => 
    (b.status === 'confirmed' || b.status === 'pending') && 
    new Date(b.events.start_datetime) > new Date()
  )

  const pastBookings = (bookings || []).filter((b: any) => 
    b.status === 'confirmed' && new Date(b.events.start_datetime) <= new Date()
  )

  const cancelledBookings = (bookings || []).filter((b: any) => 
    b.status === 'cancelled' || b.status === 'refunded' || b.status === 'failed'
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
      case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100'
      case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-100'
      case 'refunded': return 'bg-indigo-50 text-indigo-700 border-indigo-100'
      case 'expired': return 'bg-zinc-100 text-zinc-600 border-zinc-200'
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-100'
    }
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Link 
      href={`/bookings/${booking.booking_ref}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 md:flex-row"
    >
      <div className="relative h-48 w-full md:h-auto md:w-64">
        <img 
          src={booking.events.cover_image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
          alt={booking.events.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-black uppercase tracking-wider ${getStatusColor(booking.status)}`}>
              {booking.status}
            </div>
            <h3 className="mt-3 text-2xl font-black leading-tight text-zinc-900 group-hover:text-indigo-600 dark:text-zinc-100">{booking.events.title}</h3>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-300 transition-transform group-hover:translate-x-1" />
        </div>

        <div className="mt-6 flex flex-wrap gap-y-4 gap-x-8 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-indigo-600" />
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {format(new Date(booking.events.start_datetime), 'PPP')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-orange-600" />
            <span>{booking.events.venue_name || 'Online'}, {booking.events.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <TicketIcon className="h-4 w-4 text-emerald-600" />
            <span className="font-bold">Total: ₹{booking.total_amount}</span>
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
          <span className="text-xs font-medium text-zinc-400">Ref: {booking.booking_ref}</span>
          <span className="text-xs font-medium text-zinc-400">Booked on {format(new Date(booking.created_at), 'MMM d, yyyy')}</span>
        </div>
      </div>
    </Link>
  )

  return (
    <div className="min-h-screen bg-zinc-50 pb-20 pt-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
             <h1 className="text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">My Bookings</h1>
             <p className="mt-3 text-lg text-zinc-500">Manage your event tickets and reservations.</p>
          </div>
          
          <div className="flex gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search bookings..." 
                  className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm focus:border-indigo-600 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 md:w-64"
                />
             </div>
             <button className="flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-bold shadow-sm transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                <Filter className="h-4 w-4" />
                Filter
             </button>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="space-y-12">
           {/* Upcoming Section */}
           <section>
              <div className="mb-6 flex items-center justify-between">
                 <h2 className="text-2xl font-black">Upcoming Events</h2>
                 {upcomingBookings.length > 0 && (
                   <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-black text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                      {upcomingBookings.length}
                   </span>
                 )}
              </div>
              
              {upcomingBookings.length > 0 ? (
                <div className="grid gap-6">
                  {upcomingBookings.map((b: any) => <BookingCard key={b.id} booking={b} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-zinc-200 py-16 dark:border-zinc-800">
                   <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-900">
                      <TicketIcon className="h-10 w-10 text-zinc-300" />
                   </div>
                   <p className="mt-4 font-bold text-zinc-500">No upcoming bookings found.</p>
                   <Link 
                     href="/search"
                     className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-indigo-700"
                   >
                     Find Events
                   </Link>
                </div>
              )}
           </section>

           {/* Past & Cancelled Grid */}
           <div className="grid gap-12 lg:grid-cols-2">
              <section>
                 <h2 className="mb-6 text-2xl font-black">Past Events</h2>
                 <div className="space-y-4">
                    {pastBookings.length > 0 ? (
                      pastBookings.map((b: any) => (
                        <Link 
                          key={b.id} 
                          href={`/bookings/${b.booking_ref}`}
                          className="flex items-center gap-4 rounded-3xl border border-zinc-100 bg-white p-4 transition hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900"
                        >
                           <img 
                             src={b.events.cover_image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80'} 
                             className="h-16 w-16 rounded-2xl object-cover"
                           />
                           <div className="flex-1 overflow-hidden">
                              <h4 className="truncate font-black">{b.events.title}</h4>
                              <p className="text-xs text-zinc-500">{format(new Date(b.events.start_datetime), 'MMM d, yyyy')}</p>
                           </div>
                           <ChevronRight className="h-4 w-4 text-zinc-300" />
                        </Link>
                      ))
                    ) : (
                      <p className="py-8 text-center text-sm font-medium text-zinc-400">No past events yet.</p>
                    )}
                 </div>
              </section>

              <section>
                 <h2 className="mb-6 text-2xl font-black">Cancelled</h2>
                 <div className="space-y-4 text-sm">
                    {cancelledBookings.length > 0 ? (
                      cancelledBookings.map((b: any) => (
                        <Link 
                          key={b.id} 
                          href={`/bookings/${b.booking_ref}`}
                          className="flex items-center gap-4 rounded-3xl border border-zinc-100 bg-white p-4 transition hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 grayscale"
                        >
                           <div className="flex-1">
                              <h4 className="font-black text-zinc-700 dark:text-zinc-300">{b.events.title}</h4>
                              <div className="mt-1 flex items-center gap-2">
                                 <span className="text-[10px] font-black uppercase text-rose-600">{b.status}</span>
                                 <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                 <span className="text-xs text-zinc-400">{b.booking_ref}</span>
                              </div>
                           </div>
                           <ChevronRight className="h-4 w-4 text-zinc-300" />
                        </Link>
                      ))
                    ) : (
                      <p className="py-8 text-center text-sm font-medium text-zinc-400">No cancelled bookings.</p>
                    )}
                 </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  )
}
