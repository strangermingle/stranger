import { Metadata } from 'next';
import WeekendEvents from '@/components/event/WeekendEvents';
import { notFound } from 'next/navigation';
import { getPublicEventBySlug } from '@/lib/events';
import { toISTISOString } from '@/lib/date-utils';

import EventDetailsPage from '@/components/EventDetailsPage';
import UpcomingExperiences from '@/components/event/UpcomingExperiences';
import FacebookGroupCTA from '@/components/FacebookGroupCTA';

export const dynamic = 'force-static';
export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

/* =========================
   Metadata (SEO)
========================= */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEventBySlug(slug);

  if (!event) {
    return { title: 'Event Not Found | Stranger Mingle' };
  }

  const eventUrlSlug = event.slug || event.id;
  const canonicalUrl = `https://www.strangermingle.com/events/${eventUrlSlug}`;

  const description =
    event.meta_description ||
    event.short_description ||
    (event.description ? (event.description.length > 160 ? event.description.substring(0, 157) + '...' : event.description) : '') ||
    `Join us for ${event.title} at ${event.location?.venue_name || event.location?.city}. Build real connections offline.`;

  const metaTitle = event.meta_title || `${event.title} | Stranger Mingle Events`;

  return {
    title: metaTitle,
    description,
    keywords: `${event.title}, stranger meetup ${event.location?.city}, weekend events ${event.location?.city}, offline social networking India, make friends offline`,
    openGraph: {
      title: metaTitle,
      description,
      url: canonicalUrl,
      type: 'website',
      images: event.cover_image_url ? [event.cover_image_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description,
      images: event.cover_image_url ? [event.cover_image_url] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/* =========================
   Page
 ========================= */
export default async function EventDetails({ params }: Props) {
  const { slug } = await params;
  const event = await getPublicEventBySlug(slug);

  if (!event) notFound();

  const firstTier = event.ticket_tiers?.[0];
  const price = firstTier?.price ?? 0;

  const eventUrlSlug = event.slug || event.id;
  const availableSeats = (event.max_capacity || 0) - event.booking_count;

  /* =========================
     Structured Data
  ========================= */
  const eventUrl = `https://www.strangermingle.com/events/${eventUrlSlug}`;
  
  // Calculate average rating if reviews exist
  const reviews = event.event_reviews || [];
  const hasReviews = reviews.length > 0;
  const avgRating = hasReviews 
    ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length 
    : 0;

  const eventSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description":
      event.description ||
      `${event.title} - an authentic event for making new friends.`,
    "startDate": toISTISOString(event.start_datetime),
    "endDate": toISTISOString(event.end_datetime),
    "eventAttendanceMode":
      event.event_type === 'online'
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus":
      event.status === 'cancelled'
        ? "https://schema.org/EventCancelled"
        : "https://schema.org/EventScheduled",
    "url": eventUrl,
    "image": event.cover_image_url ? {
      "@type": "ImageObject",
      "url": event.cover_image_url,
      "width": 1200,
      "height": 630
    } : undefined,
    "location":
      event.event_type === 'online'
        ? {
            "@type": "VirtualLocation",
            "url": "https://www.strangermingle.com",
          }
        : {
            "@type": "Place",
            "name": event.location?.venue_name || event.location?.city || "India",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": `${event.location?.address_line1 || ''} ${event.location?.address_line2 || ''}`.trim(),
              "addressLocality": event.location?.city,
              "addressRegion": event.location?.state,
              "postalCode": event.location?.postal_code || undefined,
              "addressCountry": "IN",
            },
            "geo": (event.location?.latitude && event.location?.longitude) ? {
              "@type": "GeoCoordinates",
              "latitude": event.location.latitude,
              "longitude": event.location.longitude,
            } : undefined,
            "hasMap": event.location?.google_maps_url || undefined,
          },
    "organizer": {
      "@type": "Organization",
      "name": "Stranger Mingle",
      "url": "https://www.strangermingle.com",
      "logo": "https://www.strangermingle.com/logo.png"
    },
    "performer": {
      "@type": "Person",
      "name": "Stranger Mingle Host",
    },
    "offers": {
      "@type": "Offer",
      "url": eventUrl,
      "price": price.toString(),
      "priceCurrency": "INR",
      "availability":
        availableSeats > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      "validFrom": toISTISOString(event.created_at || event.start_datetime),
      "inventoryLevel": {
        "@type": "QuantitativeValue",
        "value": availableSeats,
      },
    },
    "keywords": "stranger meetup, local events, offline social networking, weekend events India"
  };

  // AggregateRating
  if (hasReviews) {
    eventSchema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "reviewCount": event.event_reviews?.length
    };
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.strangermingle.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Events",
        "item": "https://www.strangermingle.com/events",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": event.title,
        "item": eventUrl,
      },
    ],
  };

  // Dynamic FAQ Schema
  const hasFaqs = event.event_faqs && event.event_faqs.length > 0;
  const faqSchema = hasFaqs ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": event.event_faqs?.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      <EventDetailsPage event={event} />

      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Upcoming Experiences */}
      <UpcomingExperiences city={event.location?.city || 'India'} currentEventId={event.id} />
      
      {/* Weekend Events */}
      <WeekendEvents />

      {/* Facebook Group CTA */}
      <FacebookGroupCTA />
    </>
  );
}
