import type { Metadata } from 'next'
import PhoneAFriendClient from '@/components/calls/PhoneAFriendClient'
import { createServerClient } from '@/lib/supabaseClient'

export const metadata: Metadata = {
  title: 'Call a Expert Online | 1-on-1 Anonymous Voice Calls with Verified Experts',
  description: 'Need to talk with an expert? Connect 1-on-1 with verified experts from various fields across India for private audio calls. 100% anonymous, safe for girls, no phone number required.',
  keywords: [
    'call an expert online',
    'call a expert india',
    'talk to experts online voice call',
    'anonymous audio call india',
    'vent out online',
    'expert advice call online',
    'safe anonymous call for girls',
    'platonic voice conversation india',
    'stranger mingle calling',
    'verified experts online',
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
    title: 'Call a Expert Online | 1-on-1 Anonymous Audio Calling | Stranger Mingle',
    description: 'Real voices. Zero judgment. Connect 1-on-1 with verified experts over private, anonymous online audio calls across India. Safe for girls, no phone number required.',
    url: 'https://strangermingle.com/phone-a-friend',
    siteName: 'Stranger Mingle',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: 'https://strangermingle.com/images/default-event.jpg',
        width: 1200,
        height: 630,
        alt: 'Call a Expert - 1-on-1 Voice Calling on Stranger Mingle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Call a Expert Online | 1-on-1 Audio Calls | Stranger Mingle',
    description: 'Private, anonymous 1-on-1 audio conversations with verified experts across India. Safe, no camera, no phone number required.',
    images: ['https://strangermingle.com/images/default-event.jpg'],
  },
}

export const dynamic = 'force-dynamic'

const FAQS_DATA = [
  {
    q: 'What is Call a Expert on Stranger Mingle?',
    a: 'Call a Expert is an audio-only, 1-on-1 private calling service connecting users across India with verified experts from various fields. It offers a safe space to speak your mind, vent out, or get professional advice completely anonymously. Girls can feel absolutely safe as no phone number is required to register.'
  },
  {
    q: 'How does Call a Expert work?',
    a: 'Simply choose any active online expert and click "Call Now" to connect instantly for a 1-on-1 private audio conversation. It is 100% anonymous and safe.'
  },
  {
    q: 'What are the charges and session duration?',
    a: 'Calls are typically ₹49 for a 15-minute focused session with an expert. You can top up talk time anytime.'
  },
  {
    q: 'Is Call a Expert completely anonymous and safe for girls?',
    a: 'Yes, completely. Your phone number, full name, email, and personal contact info are never shared with the expert. You do not need a phone number to register. All calls are audio-only.'
  },
  {
    q: 'What is the zero-tolerance harassment policy?',
    a: 'We strictly prohibit harassment, abusive language, or hate speech. Any violation results in immediate permanent account termination and IP blacklisting.'
  },
  {
    q: 'Can I meet the expert in person?',
    a: 'No. The platform strictly facilitates online audio calls. We do not endorse or take responsibility for any offline meetings.'
  },
  {
    q: 'What happens if an expert does not answer?',
    a: 'If an expert is busy, the ringing stops and your balance remains 100% intact. You can call another available expert.'
  },
  {
    q: 'How can I apply to become an Expert?',
    a: 'If you are an expert in your field with good communication skills, you can apply through our Host Partner portal. Approved experts set their own rates.'
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
    name: 'Call a Expert - 1-on-1 Audio Calling',
    serviceType: 'Expert Advice and Casual Audio Calling',
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
      audienceType: 'Individuals seeking professional advice or safe, anonymous conversations',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: '49',
      highPrice: '199',
      offerCount: '100',
    },
    description: 'Safe, private 1-on-1 audio calling with verified experts across India. 100% anonymous, safe for girls, no phone number required.',
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
        name: 'Call a Expert',
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
