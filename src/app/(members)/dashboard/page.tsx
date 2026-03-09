import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard — StrangerMingle',
  description: 'Your personal dashboard',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  // Fetch upcoming bookings
  // Note: Since joined tables might be complex, we can use standard relational fetching
  const { data: bookingsData } = await supabase
    .from('bookings')
    .select(`
      id,
      booking_ref,
      status,
      event_id,
      events (
        title,
        cover_image_url,
        start_datetime,
        slug
      )
    `)
    .eq('user_id', user.id)
    .eq('status', 'confirmed')
    .gte('events.start_datetime', new Date().toISOString())
    .order('events.start_datetime', { ascending: true })
    .limit(5)

  // Fetch saved events count
  const { count: savesCount } = await supabase
    .from('event_saves')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  // Fetch upcoming saved events
  const { data: savedEventsData } = await supabase
    .from('event_saves')
    .select(`
      event_id,
      events (
        title,
        slug,
        cover_image_url,
        start_datetime
      )
    `)
    .eq('user_id', user.id)
    .gte('events.start_datetime', new Date().toISOString())
    .limit(3)

  const upcomingBookings = bookingsData || []
  const upcomingSaved = savedEventsData || []

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Stat Card 1 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Upcoming Events
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            {upcomingBookings.length}
          </p>
        </div>
        
        {/* Stat Card 2 */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Saved Events
          </h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">
            {savesCount || 0}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Upcoming Bookings */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 dark:border-zinc-800">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Your Next Events</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((b) => {
                // Supabase typing inference handle
                const event = (b.events as any)
                if(!event) return null 
                const date = new Date(event.start_datetime).toLocaleDateString()
                
                return (
                  <div key={b.id} className="flex items-center gap-4 px-6 py-4">
                    {event.cover_image_url ? (
                       <img src={event.cover_image_url} alt="" className="h-12 w-12 rounded-md object-cover" />
                    ) : (
                       <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                       </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                        {event.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {date} • Ref: {b.booking_ref}
                      </p>
                    </div>
                    <div>
                      <Link
                        href={`/events/${event.slug}`}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                No upcoming events planned. Time to explore!
                <div className="mt-2">
                  <Link href="/events" className="text-indigo-600 hover:underline dark:text-indigo-400">
                    Find events
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Events */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between dark:border-zinc-800">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">Saved Events</h2>
            <Link href="/saved-events" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-zinc-800">
             {upcomingSaved.length > 0 ? (
                upcomingSaved.map((s: any) => {
                  const event = s.events
                  if(!event) return null 
                  const date = new Date(event.start_datetime).toLocaleDateString()
                  
                  return (
                    <div key={s.event_id} className="flex items-center gap-4 px-6 py-4">
                       {event.cover_image_url ? (
                         <img src={event.cover_image_url} alt="" className="h-12 w-12 rounded-md object-cover" />
                      ) : (
                         <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No img</span>
                         </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <Link href={`/events/${event.slug}`} className="truncate text-sm font-medium text-gray-900 hover:underline dark:text-gray-100">
                          {event.title}
                        </Link>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
                      </div>
                    </div>
                  )
                })
             ) : (
                <div className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  You haven't saved any events yet.
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}
