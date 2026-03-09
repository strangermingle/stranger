import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Host Dashboard — StrangerMingle',
  description: 'Manage your events and host settings.',
}

export default async function HostDashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Verify host profile and approval
  const { data: hostProfile } = await supabase
    .from('host_profiles')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!hostProfile) {
    redirect('/members/become-host')
  }

  if (!hostProfile.is_approved) {
    return (
      <div className="mx-auto max-w-2xl text-center space-y-6 mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Application Pending
        </h1>
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900/50 dark:bg-orange-900/20">
          <p className="text-sm text-orange-800 dark:text-orange-200">
            Your host profile ({hostProfile.display_name}) is currently under review by our team. You'll be able to create events once approved.
          </p>
        </div>
      </div>
    )
  }

  // Fetch host's events
  const { data: events } = await supabase
    .from('events')
    .select('id, title, slug, status, start_datetime, booking_count, views_count')
    .eq('host_id', user.id)
    .order('start_datetime', { ascending: false })

  const hostEvents = events || []

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Host Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Welcome back, {hostProfile.display_name}
          </p>
        </div>
        <Link
          href="/members/host-dashboard/create-event"
          className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Create New Event
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Events</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">{hostEvents.length}</p>
         </div>
         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Bookings</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">
               {hostEvents.reduce((acc, curr) => acc + (curr.booking_count || 0), 0)}
            </p>
         </div>
         <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Profile Views</h3>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">
               {hostProfile.total_views || 0}
            </p>
         </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-zinc-800">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Your Events</h2>
        </div>
        
        {hostEvents.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Event Name</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Bookings</th>
                  <th scope="col" className="px-6 py-3">Views</th>
                  <th scope="col" className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {hostEvents.map((evt) => (
                  <tr key={evt.id} className="bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {evt.title}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(evt.start_datetime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                        ${evt.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                          evt.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' : 
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'}
                      `}>
                        {evt.status.charAt(0).toUpperCase() + evt.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">{evt.booking_count || 0}</td>
                    <td className="px-6 py-4">{evt.views_count || 0}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/events/${evt.slug}`} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                        View
                      </Link>
                      <Link href={`/members/host-dashboard/events/${evt.id}/edit`} className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            You haven't created any events yet.
            <div className="mt-4">
              <Link
                href="/members/host-dashboard/create-event"
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
              >
                Create your first event
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
