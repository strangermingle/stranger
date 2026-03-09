import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import EarningsChart from '@/components/host/EarningsChart'

export const metadata: Metadata = {
  title: 'Earnings — Host Dashboard',
  description: 'Detailed breakdown of your event earnings.',
}

export default async function EarningsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch host's events
  const { data: events } = await supabase
    .from('events')
    .select('id, title, start_datetime')
    .eq('host_id', user.id)
    .order('start_datetime', { ascending: false })

  if (!events || events.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Earnings By Event
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            You don't have any events yet.
          </p>
        </div>
      </div>
    )
  }

  const eventIds = events.map(e => e.id)

  // Fetch confirmed bookings for these events
  const { data: bookings } = await supabase
    .from('bookings')
    .select('event_id, total_amount, host_payout')
    .in('event_id', eventIds)
    .eq('status', 'confirmed')

  const safeBookings = bookings || []

  // Group by event
  const eventStats = events.map(evt => {
    const eventBookings = safeBookings.filter(b => b.event_id === evt.id)
    const totalAmount = eventBookings.reduce((sum, b) => sum + Number(b.total_amount), 0)
    const hostPayout = eventBookings.reduce((sum, b) => sum + Number(b.host_payout), 0)
    
    return {
      eventId: evt.id,
      title: evt.title,
      startDatetime: evt.start_datetime,
      totalAmount,
      hostPayout,
      bookingsCount: eventBookings.length
    }
  })

  // Filter out events with no bookings to declutter
  const activeEvents = eventStats.filter(e => e.bookingsCount > 0)

  const chartData = eventStats.map(e => ({
    title: e.title.length > 20 ? e.title.substring(0, 20) + '...' : e.title,
    revenue: e.totalAmount,
    payout: e.hostPayout
  }))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Earnings By Event
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Detailed breakdown of revenue and payouts per event.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 font-medium">Revenue Chart</h2>
        <EarningsChart data={chartData} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Event Breakdown</h2>
        </div>
        
        {activeEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Event Name</th>
                  <th scope="col" className="px-6 py-3 text-right">Date</th>
                  <th scope="col" className="px-6 py-3 text-right">Bookings</th>
                  <th scope="col" className="px-6 py-3 text-right">Gross Revenue</th>
                  <th scope="col" className="px-6 py-3 text-right">Host Payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {activeEvents.map((stat) => (
                  <tr key={stat.eventId} className="bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {stat.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {new Date(stat.startDatetime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {stat.bookingsCount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      ₹{stat.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-gray-100 text-right">
                      ₹{stat.hostPayout.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            No confirmed bookings yet across your events.
          </div>
        )}
      </div>
    </div>
  )
}
