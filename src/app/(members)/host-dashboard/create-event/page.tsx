import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { CreateEventForm } from '@/components/host/CreateEventForm'

export const metadata: Metadata = {
  title: 'Create Event — StrangerMingle',
  description: 'Host your next experience on StrangerMingle.',
}

export default async function CreateEventPage() {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (!session?.user) {
    redirect('/login?next=/members/host-dashboard/create-event')
  }

  // Double check host status from server
  const { data: hostProfile } = await (supabase
    .from('host_profiles') as any)
    .select('is_approved')
    .eq('user_id', session.user.id)
    .single()

  if (!hostProfile || !hostProfile.is_approved) {
    redirect('/members/become-host')
  }

  // Fetch reference data for the form
  const { data: categories } = await (supabase
    .from('categories') as any)
    .select('id, name, slug')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50 py-12 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 uppercase">
            Host Dashboard
          </p>
          <h2 className="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Let&apos;s build your event
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400">
            Follow the steps below to post your event and start selling tickets immediately.
          </p>
        </div>

        <CreateEventForm categories={categories || []} />
      </div>
    </div>
  )
}
