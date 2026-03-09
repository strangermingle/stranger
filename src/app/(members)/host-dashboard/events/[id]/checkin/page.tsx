import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import CheckInScanner from '@/components/host/CheckInScanner'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Check-in - ${id}`,
    description: 'Event check-in console for hosts'
  }
}

export default async function CheckInPage({ params }: PageProps) {
  const { id: eventId } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch event and verify ownership
  const { data: eventResult, error } = await supabase
    .from('events')
    .select('id, title, start_datetime, host_id')
    .eq('id', eventId)
    .single()

  if (error || !eventResult) {
    notFound()
  }

  const event = eventResult as unknown as {
    id: string
    title: string
    start_datetime: string
    host_id: string
  }

  // Verify ownership (host or co-host)
  // Check co-hosts table as well
  const isOwner = event.host_id === user.id
  
  if (!isOwner) {
    const { data: cohost } = await supabase
      .from('event_cohosts')
      .select('id')
      .eq('event_id', eventId)
      .eq('host_user_id', user.id)
      .eq('is_confirmed', true)
      .single()
    
    if (!cohost) {
      redirect('/dashboard') // Or some error page
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
      <CheckInScanner 
        eventId={event.id} 
        eventTitle={event.title} 
      />
    </div>
  )
}
