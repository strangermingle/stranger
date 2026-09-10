import type { Metadata } from 'next'
import PhoneAFriendClient from '@/components/calls/PhoneAFriendClient'
import { createServerClient } from '@/lib/supabaseClient'

export const metadata: Metadata = {
  title: 'Phone a Friend Online | 1-on-1 Anonymous Voice Calls with Empathetic Strangers',
  description: 'Need someone just to talk? Connect 1-on-1 with warm, verified, empathetic listeners across India for private audio calls. 100% anonymous, safe, confidential, and judgment-free emotional support.',
  keywords: [
    'phone a friend online',
    'phone a friend india',
    'talk to strangers online voice call',
    'anonymous audio call india',
    'vent to stranger online',
    'emotional support call online',
    'talk to someone when lonely',
    'platonic voice conversation india',
    'stranger mingle calling',
    'empathetic listeners online',
    'just talk voice call',
    'mental wellness talk online india',
    'anonymous calling app'
  ],
  alternates: {
    canonical: 'https://strangermingle.com/phone-a-friend',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Phone a Friend Online | 1-on-1 Anonymous Audio Calling | Stranger Mingle',
    description: 'Real voices. Zero judgment. Connect 1-on-1 with verified friendly hosts over private, anonymous online audio calls across India.',
    url: 'https://strangermingle.com/phone-a-friend',
    siteName: 'Stranger Mingle',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://strangermingle.com/images/default-event.jpg',
        width: 1200,
        height: 630,
        alt: 'Phone a Friend - 1-on-1 Voice Calling on Stranger Mingle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phone a Friend Online | 1-on-1 Audio Calls | Stranger Mingle',
    description: 'Private, anonymous 1-on-1 audio conversations with warm, verified listeners across India. No camera, no judgment.',
    images: ['https://strangermingle.com/images/default-event.jpg'],
  },
}

export const dynamic = 'force-dynamic'

const FAQS_DATA = [
  {
    q: 'What is Phone a Friend on Stranger Mingle?',
    a: 'Phone a Friend is an audio-only, 1-on-1 private calling service by Stranger Mingle connecting users across India with warm, verified, and empathetic listeners. Designed for platonic conversations, venting, stress relief, and combating loneliness, it offers a safe, judgment-free space to speak your mind without video or cameras.'
  },
  {
    q: 'How does Phone a Friend work?',
    a: 'Simply choose any active online host and click "Call Now" to connect instantly for a 1-on-1 private audio conversation using your call credits. If you need credits, you can recharge your credit wallet in seconds with transparent pricing.'
  },
  {
    q: 'What are the charges and session duration?',
    a: 'Calls are credit-based, typically 490 credits (equivalent to ₹49) for a 15-minute focused session. 1 INR equals 10 credits. You can recharge credit packs anytime and redeem them seamlessly whenever you wish to talk.'
  },
  {
    q: 'Is Phone a Friend 100% anonymous and private?',
    a: 'Yes, completely. Your phone number, full name, email, and personal contact info are never shared with the host. All calls are audio-only with no cameras or video streaming enabled. You are identified only by a private caller alias.'
  },
  {
    q: 'What is the zero-tolerance harassment policy and legal warning?',
    a: 'Stranger Mingle strictly prohibits harassment, abusive language, obscenity, hate speech, or sexual misconduct toward hosts. Any violation results in immediate permanent account termination, IP blacklisting, and referral to Indian cybercrime and law enforcement authorities for formal legal proceedings under applicable IT Act and criminal provisions.'
  },
  {
    q: 'Can I meet the host in person or contact them outside the platform?',
    a: 'No. Stranger Mingle strictly facilitates online audio calls. Stranger Mingle holds no responsibility or liability if a caller and host choose to arrange personal in-person meetings, offline deals, financial transactions, or third-party communications outside the platform. Offline meetings with phone-a-friend hosts are completely unendorsed and at your own personal risk.'
  },
  {
    q: 'What happens if a host does not answer or declines my call?',
    a: 'If a host is busy or declines your call, the ringing stops immediately, you are notified, and your credits remain intact in your wallet. You can immediately call another available online host.'
  },
  {
    q: 'How can I apply to become a Phone a Friend host?',
    a: 'If you are an empathetic, articulate communicator who enjoys active listening, you can apply through Stranger Mingle\'s Host Partner portal. Approved hosts set their own rates, go online whenever free, and earn per completed session.'
  }
]

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Phone a Friend - 1-on-1 Audio Calling',
    serviceType: 'Emotional Support and Casual Audio Calling',
    provider: {
      '@type': 'Organization',
      name: 'Stranger Mingle',
      url: 'https://strangermingle.com',
      logo: 'https://strangermingle.com/logo.png',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Individuals seeking safe, anonymous, platonic conversations and venting',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '49',
      highPrice: '199',
      offerCount: '100',
    },
    description: 'Safe, private 1-on-1 audio calling with verified empathetic hosts across India. 100% anonymous, confidential, and judgment-free.',
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://strangermingle.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Phone a Friend',
        item: 'https://strangermingle.com/phone-a-friend',
      },
    ],
  }

  return (
    <>
      {/* Schema Markup for SEO, AEO, and GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PhoneAFriendClient initialHosts={hosts || []} faqs={FAQS_DATA} />
    </>
  )
}
