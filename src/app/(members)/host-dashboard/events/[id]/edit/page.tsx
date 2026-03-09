import { Metadata, redirect } from 'next'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'
import EditEventForm from '@/components/host/EditEventForm'

export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
  const supabase = await createClient()
  const { data: event } = await supabase
    .from('events')
    .select('title')
    .eq('id', params.id)
    .single()

  const title = event?.title ?? 'Edit Event'
  return {
    title: `${title} — Host Dashboard`,
    description: `Edit details for ${title}`,
  }
}

export default async function EditEventPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: event, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !event) {
    redirect('/members/host-dashboard/events')
  }

  // Verify ownership
  if (event.host_id !== user.id) {
    redirect('/members/host-dashboard/events')
  }

  return <EditEventForm event={event as Database['public']['Tables']['events']['Row']} />
}
