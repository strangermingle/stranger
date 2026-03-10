import { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'
import { EditEventForm } from '@/components/host/EditEventForm'

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
  const { id } = await params
  const supabase = await createClient()
  const { data: event } = await (supabase
    .from('events') as any)
    .select('title')
    .eq('id', id)
    .single()

  const title = event?.title ?? 'Edit Event'
  return {
    title: `${title} — Host Dashboard`,
    description: `Edit details for ${title}`,
  }
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: event, error } = await (supabase
    .from('events') as any)
    .select('*')
    .eq('id', id)
    .single()

  if (error || !event) {
    redirect('/members/host-dashboard/events')
  }

  // Verify ownership
  if ((event as any).host_id !== user.id) {
    redirect('/members/host-dashboard/events')
  }

  // Fetch categories for the form
  const { data: categories } = await (supabase
    .from('categories') as any)
    .select('id, name, slug')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return <EditEventForm 
    event={event as any} 
    categories={categories || []} 
  />
}
