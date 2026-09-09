import type { Metadata } from 'next'
import PhoneAFriendClient from '@/components/calls/PhoneAFriendClient'

export const metadata: Metadata = {
  title: 'Just Talk — Phone a Friend | 1-on-1 Online Audio Calling',
  description: 'Talk to warm, empathetic and verified strangers online over private 1-on-1 voice calls. 100% anonymous, safe, and judgment-free.',
  keywords: [
    'phone a friend online',
    'just talk voice call',
    'talk to strangers safe india',
    'anonymous online audio call',
    'talk to someone online free india',
    'vent to stranger online',
    'non judgmental conversation online',
    'stranger mingle calling'
  ],
  alternates: {
    canonical: '/phone-a-friend',
  },
  openGraph: {
    title: 'Just Talk — Phone a Friend | Stranger Mingle',
    description: 'Real voices. Zero judgement. Connect 1-on-1 with verified hosts over private online audio calls.',
    url: '/phone-a-friend',
    siteName: 'Stranger Mingle',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

import { createServerClient } from '@/lib/supabaseClient'

export default async function PhoneAFriendPage() {
  let hosts: any[] = []

  try {
    const supabase = createServerClient()
    if (supabase && typeof (supabase as any).from === 'function') {
      const { data, error } = await (supabase as any)
        .from('phone_a_friend_host_settings')
        .select(`
          id,
          host_id,
          is_enabled,
          is_online,
          last_seen_at,
          languages,
          topics,
          rate_per_session,
          session_duration_minutes,
          bio,
          tagline,
          total_calls_completed,
          rating_avg,
          rating_count,
          host:host_profiles!host_id (
            id,
            display_name,
            profile_image,
            city,
            state,
            description,
            is_approved
          )
        `)
        .eq('is_enabled', true)
        .order('is_online', { ascending: false })

      if (!error && data) {
        hosts = data
      }
    }
  } catch (err) {
    console.warn('[PhoneAFriendPage] Direct Supabase fetch note:', err)
  }

  // Fallback to backend API if needed
  if (!hosts || hosts.length === 0) {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      const res = await fetch(`${BACKEND_URL}/api/calls`, {
        cache: 'no-store',
      })
      if (res.ok) {
        hosts = await res.json()
      }
    } catch {
      // Handled cleanly by client hydration
    }
  }

  return <PhoneAFriendClient initialHosts={hosts || []} />
}
