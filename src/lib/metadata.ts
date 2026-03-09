import { Metadata } from 'next'
import { EventWithDetails } from '@/types/api.types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com'

export function generateEventMetadata(event: EventWithDetails): Metadata {
  const title = `${event.title} | StrangerMingle`
  const description = event.short_description || `Join us for ${event.title}. Discover unique events and experiences on StrangerMingle.`
  const url = `${SITE_URL}/events/${event.slug}`
  const image = `${SITE_URL}/api/og/event/${event.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'StrangerMingle',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      locale: 'en_IN',
      type: 'article',
      publishedTime: event.created_at || undefined,
      modifiedTime: event.updated_at || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }
}
