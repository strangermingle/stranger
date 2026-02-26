import type { Metadata } from "next";
import { getAllLiveEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Stranger Meetups & Weekend Events in Pune, Hyderabad & Bengaluru | Stranger Mingle",
    description: "Join authentic offline weekend stranger meetups for meaningful friendships and real conversations. Community-driven social networking events across India. Safe, verified, curated experiences every weekend. No dating. No selling. Build genuine connections through in-person meetups.",
    keywords: "Stranger Meetups & Social Networking Events, weekend social networking Pune, stranger meetup Hyderabad, community events Bengaluru, make friends offline Mumbai, real-life networking events, authentic social gatherings India, young professionals meetup, offline friendship events, verified social events India, community building meetups, weekend networking events, offline stranger meetup India, in-person social events, meaningful connections India",
    authors: [{ name: "Stranger Mingle Team" }],
    creator: "Stranger Mingle",
    publisher: "Stranger Mingle",
    category: "Weekend Events & Offline Meetups",
    classification: "Offline Community Events and Social Networking",

    openGraph: {
        title: "Authentic Offline Weekend Meetup Events & Social Networking in Pune, Hyderabad & Bengaluru | Stranger Mingle",
        description: "Join authentic offline weekend meetups for meaningful friendships and real conversations. Community-driven social networking events across India. Safe, verified, curated experiences every weekend.",
        type: 'website',
        url: 'https://www.strangermingle.com/events',
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        images: [
            {
                url: 'https://www.strangermingle.com/og-events-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Stranger Mingle - Offline Weekend Events & Meetups Across India',
            }
        ],
    },

    twitter: {
        card: 'summary_large_image',
        title: "Weekend Events: Authentic Social Meetups & Community Building | India",
        description: "Join authentic offline weekend meetups for meaningful friendships and real conversations. Community-driven social networking events across India. Safe, verified experiences every weekend.",
        images: ['https://www.strangermingle.com/twitter-events-card.jpg'],
        site: '@StrangerMingle',
        creator: '@StrangerMingle',
    },

    alternates: {
        canonical: 'https://www.strangermingle.com/events',
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

    other: {
        'geo.region': 'IN',
        'geo.placename': 'India',
        'geo.position': '20.5937;78.9629',
    },
};

export default async function EventsPage() {
    const events = await getAllLiveEvents();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
            {/* Page Header */}
            <section className="relative w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 pt-32 pb-16 px-4 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto text-center">
                    <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                        <span className="text-white/90 text-sm font-semibold">🎉 Weekend Events and Meetups</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        Weekend Events and Meetups Across India
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-4">
                        Join authentic in-person meetups this weekend. Build meaningful friendships through verified weekend events in your city.
                    </p>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto">
                        Community-driven gatherings for real conversations. No dating. No selling. Just genuine human connections.
                    </p>
                </div>
            </section>

            {/* Trust Signals Section */}
            <section className="w-full max-w-7xl mx-auto px-4 mt-12 mb-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="p-4">
                            <div className="text-2xl font-bold text-blue-600 mb-1">100% Offline</div>
                            <div className="text-sm text-gray-600">In-Person Meetups</div>
                        </div>
                        <div className="p-4">
                            <div className="text-2xl font-bold text-purple-600 mb-1">Verified</div>
                            <div className="text-sm text-gray-600">Safe & Curated</div>
                        </div>
                        <div className="p-4">
                            <div className="text-2xl font-bold text-green-600 mb-1">Community-Led</div>
                            <div className="text-sm text-gray-600">Real Connections</div>
                        </div>
                        <div className="p-4">
                            <div className="text-2xl font-bold text-orange-600 mb-1">Weekend</div>
                            <div className="text-sm text-gray-600">Regular Events</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <main className="w-full max-w-7xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                        Upcoming Weekend Events and Stranger Meetups
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center">
                        Discover authentic offline weekend stranger meetups in Pune, Hyderabad, Bengaluru, and Mumbai. Join verified weekend events designed for meaningful connections and genuine friendships.
                    </p>
                </div>

                {events.length > 0 ? (
                    <>
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {events.map((event) => (
                                <div key={event.id} className="h-full">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>

                        {/* Stats Bar */}
                        <div className="mt-16 mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                Why Join Our Offline Weekend Events?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">{events.length}</div>
                                    <div className="text-gray-600 font-medium">Live Offline Meetup Events</div>
                                    <p className="text-sm text-gray-500 mt-2">Verified in-person gatherings</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-bold text-purple-600 mb-2">
                                        {events.reduce((sum, e) => sum + (e.available_seats - e.booked_spots), 0)}
                                    </div>
                                    <div className="text-gray-600 font-medium">Available Spots for Networking</div>
                                    <p className="text-sm text-gray-500 mt-2">Join authentic meetups this weekend</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-bold text-green-600 mb-2">
                                        {new Set(events.map(e => e.city)).size}
                                    </div>
                                    <div className="text-gray-600 font-medium">Cities with Offline Events</div>
                                    <p className="text-sm text-gray-500 mt-2">Expanding community across India</p>
                                </div>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Experience Authentic Offline Social Networking Events
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-centre text-white font-bold">✓</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Real In-Person Connections</h4>
                                        <p className="text-gray-600 text-sm">Meet genuine people face-to-face at our curated offline weekend meetup events</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-centre text-white font-bold">✓</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Safe & Verified Community</h4>
                                        <p className="text-gray-600 text-sm">All attendees are verified for authentic social networking experiences</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-centre text-white font-bold">✓</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Diverse Meetup Activities</h4>
                                        <p className="text-gray-600 text-sm">From social mixers to adventure treks, find the perfect offline event for you</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-centre text-white font-bold">✓</div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">Weekend Convenience</h4>
                                        <p className="text-gray-600 text-sm">Regular weekend events designed for busy professionals seeking meaningful connections</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-centre mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">New Offline Meetup Events Coming Soon</h3>
                        <p className="text-gray-600 mb-4">We're planning exciting weekend social networking events in your city</p>
                        <p className="text-gray-500">Check back soon for authentic offline meetups and community gatherings!</p>
                    </div>
                )}
            </main>

            {/* FAQ Section for SEO */}
            <section className="w-full max-w-7xl mx-auto px-4 py-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Frequently Asked Questions About Our Offline Meetup Events
                </h3>
                <div className="bg-white rounded-2xl border border-gray-200 divide-y">
                    <details className="p-6 group">
                        <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-centre justify-between">
                            What are offline weekend meetup events?
                            <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-gray-600">
                            Offline weekend meetup events are in-person social gatherings where people come together to make genuine friendships and connections. Unlike online networking, our events focus on real face-to-face interactions in safe, curated environments across cities like Pune, Hyderabad, and Bengaluru.
                        </p>
                    </details>
                    <details className="p-6 group">
                        <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-centre justify-between">
                            How do I join social networking events in India?
                            <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-gray-600">
                            Simply browse our upcoming offline meetup events above, select an event that interests you, and register online. All our social networking events are verified and community-driven, ensuring safe and authentic experiences for all attendees.
                        </p>
                    </details>
                    <details className="p-6 group">
                        <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-centre justify-between">
                            Are these events suitable for making new friends?
                            <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-3 text-gray-600">
                            Absolutely! Our offline weekend meetups are specifically designed for people looking to build meaningful friendships and expand their social network. Every event creates opportunities for genuine conversations and lasting connections in a comfortable, no-pressure environment.
                        </p>
                    </details>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                {
                                    "@type": "ListItem",
                                    "position": 1,
                                    "name": "Home",
                                    "item": "https://www.strangermingle.com"
                                },
                                {
                                    "@type": "ListItem",
                                    "position": 2,
                                    "name": "Offline Meetup Events",
                                    "item": "https://www.strangermingle.com/events"
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": "Offline Weekend Meetup Events and Social Networking in India",
                            "description": "Discover authentic offline weekend meetup events and social networking gatherings across Pune, Hyderabad, Bengaluru, and Mumbai. Community-driven in-person events for meaningful friendships.",
                            "url": "https://www.strangermingle.com/events",
                            "inLanguage": "en-IN",
                            "publisher": {
                                "@type": "Organization",
                                "name": "Stranger Mingle",
                                "url": "https://www.strangermingle.com",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://www.strangermingle.com/logo.png"
                                },
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "contactType": "Customer Service",
                                    "availableLanguage": ["English", "Hindi"]
                                }
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "What are offline weekend meetup events?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Offline weekend meetup events are in-person social gatherings where people come together to make genuine friendships and connections. Unlike online networking, our events focus on real face-to-face interactions in safe, curated environments across cities like Pune, Hyderabad, and Bengaluru."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How do I join social networking events in India?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Simply browse our upcoming offline meetup events, select an event that interests you, and register online. All our social networking events are verified and community-driven, ensuring safe and authentic experiences for all attendees."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "Are these events suitable for making new friends?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Absolutely! Our offline weekend meetups are specifically designed for people looking to build meaningful friendships and expand their social network. Every event creates opportunities for genuine conversations and lasting connections in a comfortable, no-pressure environment."
                                    }
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "ItemList",
                            "numberOfItems": events.length,
                            "itemListElement": events.map((event, index) => ({
                                "@type": "ListItem",
                                "position": index + 1,
                                "item": {
                                    "@type": "Event",
                                    "name": event.event_name,
                                    "description": event.description || `Join us for ${event.event_name} - an authentic offline weekend meetup event on ${event.start_date} at ${event.short_address}. Experience genuine social networking and build meaningful friendships.`,
                                    "startDate": `${event.start_date}T${event.start_time}`,
                                    "endDate": `${event.end_date}T${event.end_time}`,
                                    "eventStatus": "https://schema.org/EventScheduled",
                                    "eventAttendanceMode": event.event_type === 'online'
                                        ? "https://schema.org/OnlineEventAttendanceMode"
                                        : "https://schema.org/OfflineEventAttendanceMode",
                                    "image": event.image_url || undefined,
                                    "location": {
                                        "@type": event.event_type === 'online' ? "VirtualLocation" : "Place",
                                        "name": event.short_address,
                                        "address": event.event_type === 'online' ? undefined : {
                                            "@type": "PostalAddress",
                                            "streetAddress": event.full_address,
                                            "addressLocality": event.city,
                                            "addressCountry": "IN"
                                        },
                                        "url": event.event_type === 'online' ? event.google_map_link : undefined
                                    },
                                    "organizer": {
                                        "@type": "Organization",
                                        "name": event.organizer_name || "Stranger Mingle",
                                        "email": event.organizer_email || undefined,
                                        "telephone": event.organizer_phone || undefined,
                                        "url": "https://www.strangermingle.com"
                                    },
                                    "offers": {
                                        "@type": "Offer",
                                        "url": `https://www.strangermingle.com/events/${event.slug || event.id}`,
                                        "price": event.regular_price === 0 ? "0" : (event.discounted_price || event.regular_price).toString(),
                                        "priceCurrency": "INR",
                                        "availability": (event.available_seats - event.booked_spots) > 0
                                            ? "https://schema.org/InStock"
                                            : "https://schema.org/SoldOut",
                                        "validFrom": event.created_at
                                    },
                                    "url": `https://www.strangermingle.com/events/${event.slug || event.id}`,
                                    "keywords": "offline meetup events, social networking India, weekend events, community gatherings, make friends offline"
                                }
                            }))
                        }
                    ])
                }}
            />
        </div>
    );
}