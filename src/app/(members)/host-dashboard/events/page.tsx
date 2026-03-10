import { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'My Events — Host Dashboard',
    description: 'Manage your events as a host',
  }
}

export default async function HostEventsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: events } = await (supabase
    .from('events') as any)
    .select('id, title, status, start_datetime, booking_count, views_count')
    .eq('host_id', user.id)
    .order('start_datetime', { ascending: true })

  const hostEvents = (events ?? []) as any[]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Events</h1>
      <table className="min-w-full table-auto border border-gray-200 dark:border-zinc-800">
        <thead className="bg-gray-100 dark:bg-zinc-800">
          <tr>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Start</th>
            <th className="px-4 py-2 text-left">Bookings</th>
            <th className="px-4 py-2 text-left">Views</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {hostEvents.map(event => (
            <tr key={event.id} className="border-t border-gray-200 dark:border-zinc-800">
              <td className="px-4 py-2">{event.title}</td>
              <td className="px-4 py-2 capitalize">{event.status}</td>
              <td className="px-4 py-2">{new Date(event.start_datetime as string).toLocaleDateString()}</td>
              <td className="px-4 py-2">{event.booking_count ?? 0}</td>
              <td className="px-4 py-2">{event.views_count ?? 0}</td>
              <td className="px-4 py-2 space-x-2">
                <Link href={`/members/host-dashboard/events/${event.id}/edit`} className="text-indigo-600 hover:underline dark:text-indigo-400">
                  Edit
                </Link>
                {/* Additional actions like Publish/Cancel can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
