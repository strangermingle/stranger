import type { Metadata } from "next";
import { getAllLiveEvents } from "@/lib/events";
import { toISTISOString } from "@/lib/date-utils";

import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";
import SponsoredAd from "@/components/ads/SponsoredAd";
import MembershipAd from "@/components/ads/MembershipAd";
import SidebarVideoAd from "@/components/ads/SidebarVideoAd";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Stranger Meetups & Weekend Events in India",
    description: "Curated weekend stranger meetups across India — offline and online. Safe, verified social networking events for making new friends and real conversations.",
    keywords: "Stranger Meetups, Social Events, weekend social networking, Pune, stranger meetup Hyderabad, community events Bengaluru, make friends offline Mumbai, real-life networking events, authentic social gatherings India, young professionals meetup, offline friendship events, verified social events India, community building meetups, weekend networking events, offline stranger meetup India, in-person social events, meaningful connections India",
    alternates: {
        canonical: '/events',
    },
    openGraph: {
        title: "Nearby weekend events and stranger meetups across the India for making new friends.",
        description: "Curated weekend stranger meetups across India — offline and online. Safe, verified social networking events for making new friends and real conversations.",
        url: '/events',
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: '/images/og-images/og-image-default.webp',
                width: 1200,
                height: 630,
                alt: 'Stranger Mingle - Weekend Social Meetups & Events',
            },
        ],
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

            {/* Events Content with Sidebar */}
            <main className="w-full max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Main Content Column */}
                    <div className="flex-1 order-1">
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">
                                Upcoming Weekend Events and Stranger Meetups
                            </h2>
                        </div>

                        {events.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
                                    {events.map((event) => (
                                        <div key={event.id} className="h-full">
                                            <EventCard event={event} />
                                        </div>
                                    ))}
                                </div>

                                {/* Stats Bar */}
                                <div className="mt-4 mb-12 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center uppercase tracking-tight">
                                        Why Join Our Offline Weekend Events?
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                            <div className="text-3xl font-bold text-blue-600 mb-2">{events.length}</div>
                                            <div className="text-gray-600 font-medium uppercase text-xs tracking-widest">Live Offline Meetup Events</div>
                                            <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase">Verified in-person gatherings</p>
                                        </div>
                                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                                {events.reduce((sum, e) => sum + ((e.max_capacity || 0) - e.booking_count), 0)}
                                            </div>
                                            <div className="text-gray-600 font-medium uppercase text-xs tracking-widest">Available Spots for Networking</div>
                                            <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase">Join authentic meetups this weekend</p>
                                        </div>
                                        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                            <div className="text-3xl font-bold text-green-600 mb-2">
                                                {new Set(events.map(e => e.location?.city)).size}
                                            </div>
                                            <div className="text-gray-600 font-medium uppercase text-xs tracking-widest">Cities with Offline Events</div>
                                            <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase">Expanding community across India</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Trust Signals Section */}
                                <section className="w-full mt-8 mb-8">
                                    <div className="bg-white rounded-3xl shadow-sm p-4 border border-gray-100">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                            <div className="p-4 border-r border-gray-50 last:border-r-0">
                                                <div className="text-xl font-black text-blue-600 mb-1 uppercase tracking-tight">Offline</div>
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">In-Person Meetups</div>
                                            </div>
                                            <div className="p-4 border-r border-gray-50 last:border-r-0">
                                                <div className="text-xl font-black text-purple-600 mb-1 uppercase tracking-tight">Verified</div>
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Safe & Curated</div>
                                            </div>
                                            <div className="p-4 border-r border-gray-50 last:border-r-0">
                                                <div className="text-xl font-black text-green-600 mb-1 uppercase tracking-tight">Community-Led</div>
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Real Connections</div>
                                            </div>
                                            <div className="p-4 border-r border-gray-50 last:border-r-0">
                                                <div className="text-xl font-black text-orange-600 mb-1 uppercase tracking-tight">Weekend</div>
                                                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">Regular Events</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Benefits Section */}
                                <div className="bg-linear-to-br from-blue-50/50 to-purple-50/50 rounded-[2rem] p-5 border border-blue-100/50">
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight text-center">
                                        Experience Authentic Offline Social Networking Events
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30">✓</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1 text-lg">Real In-Person Connections</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">Meet genuine people face-to-face at our curated offline weekend meetup events across the city.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-purple-500/30">✓</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1 text-lg">Safe & Verified Community</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">All attendees are verified for authentic social networking experiences with zero tolerance for misconduct.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-green-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-green-500/30">✓</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1 text-lg">Diverse Meetup Activities</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">From social mixers to adventure treks, find the perfect offline event that fits your vibe.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-orange-500/30">✓</div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 mb-1 text-lg">Weekend Convenience</h4>
                                                <p className="text-gray-500 text-sm leading-relaxed">Regular weekend events designed for busy professionals seeking meaningful connections without the rush.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-inner">
                                    <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-3 uppercase tracking-tight">New events and meetups coming soon</h3>
                                <p className="text-gray-500 mb-2 font-medium">We&apos;re planning exciting weekend social networking events in your city</p>
                                <p className="text-gray-400 text-sm">Check back soon for authentic events, meetups and community gatherings!</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Column */}
                    <aside className="w-full lg:w-[300px] shrink-0 order-2 flex flex-col gap-8 lg:self-start">
                        {/* Sponsored Ad */}
                        <div className="sticky top-24 space-y-8">
                            <SponsoredAd />
                            <MembershipAd />

                            {/* Why Trust Us Widget */}
                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-4 border-b border-gray-50 pb-2">Why Stranger Mingle?</h4>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">No Dating App Pressure</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-600 rounded-full" />
                                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">KYC Verified Hosts</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                                        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Small Safe Groups</span>
                                    </li>
                                </ul>
                            </div>

                            <SidebarVideoAd />
                        </div>
                    </aside>
                </div>
            </main>

            {/* Upcoming Experiences */}
            <UpcomingExperiences city="India" currentEventId="" />

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
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
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
                                "@type": "CollectionPage",
                                "name": "Offline Weekend Meetup Events and Social Networking in India",
                                "description": "Discover authentic offline weekend meetup events and social networking gatherings across Pune, Hyderabad, Bengaluru, and Mumbai. Community-driven in-person events for meaningful friendships.",
                                "url": "https://www.strangermingle.com/events",
                                "inLanguage": "en-IN",
                                "about": [
                                    { "@type": "City", "name": "Pune", "sameAs": "https://en.wikipedia.org/wiki/Pune" },
                                    { "@type": "City", "name": "Hyderabad", "sameAs": "https://en.wikipedia.org/wiki/Hyderabad" },
                                    { "@type": "City", "name": "Bengaluru", "sameAs": "https://en.wikipedia.org/wiki/Bangalore" },
                                    { "@type": "City", "name": "Mumbai", "sameAs": "https://en.wikipedia.org/wiki/Mumbai" }
                                ],
                                "mentions": [
                                    { "@type": "Thing", "name": "Social Networking" },
                                    { "@type": "Thing", "name": "Community Meetups" },
                                    { "@type": "Thing", "name": "Making Friends Offline" }
                                ],
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
                                    },
                                    "aggregateRating": {
                                        "@type": "AggregateRating",
                                        "ratingValue": "4.8",
                                        "reviewCount": "1250",
                                        "bestRating": "5",
                                        "worstRating": "1"
                                    }
                                }
                            },
                            {
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
                                "@type": "ItemList",
                                "numberOfItems": events.length,
                                "itemListElement": events.map((event, index) => ({
                                    "@type": "ListItem",
                                    "position": index + 1,
                                    "item": {
                                        "@type": "Event",
                                        "name": event.title,
                                        "description": event.description || `Join us for ${event.title} - an authentic offline weekend meetup event. Experience genuine social networking and build meaningful friendships.`,
                                        "startDate": toISTISOString(event.start_datetime),
                                        "endDate": toISTISOString(event.end_datetime),
                                        "eventStatus": "https://schema.org/EventScheduled",
                                        "eventAttendanceMode": event.event_type === 'online'
                                            ? "https://schema.org/OnlineEventAttendanceMode"
                                            : "https://schema.org/OfflineEventAttendanceMode",
                                        "image": event.cover_image_url || undefined,
                                        "location": {
                                            "@type": event.event_type === 'online' ? "VirtualLocation" : "Place",
                                            "name": event.location?.venue_name || event.location?.city || "India",
                                            "address": event.event_type === 'online' ? undefined : {
                                                "@type": "PostalAddress",
                                                "streetAddress": `${event.location?.address_line1 || ''} ${event.location?.address_line2 || ''}`.trim(),
                                                "addressLocality": event.location?.city,
                                                "postalCode": event.location?.postal_code || undefined,
                                                "addressCountry": "IN"
                                            },
                                            "geo": (event.location?.latitude && event.location?.longitude) ? {
                                                "@type": "GeoCoordinates",
                                                "latitude": event.location.latitude,
                                                "longitude": event.location.longitude,
                                            } : undefined,
                                        },
                                        "organizer": {
                                            "@type": "Organization",
                                            "name": "Stranger Mingle",
                                            "url": "https://www.strangermingle.com"
                                        },
                                        "offers": {
                                            "@type": "Offer",
                                            "url": `https://www.strangermingle.com/events/${event.slug || event.id}`,
                                            "price": event.ticket_tiers?.[0]?.price?.toString() || "0",
                                            "priceCurrency": "INR",
                                            "availability": ((event.max_capacity || 0) - event.booking_count) > 0
                                                ? "https://schema.org/InStock"
                                                : "https://schema.org/SoldOut",
                                            "validFrom": toISTISOString(event.created_at || event.start_datetime)
                                        },
                                        "url": `https://www.strangermingle.com/events/${event.slug || event.id}`,
                                        "keywords": "offline meetup events, social networking India, weekend events, community gatherings, make friends offline"
                                    }
                                }))
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}