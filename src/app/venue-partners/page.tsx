import { Metadata } from 'next';
import { getAllVenuePartners } from '@/lib/events';
import VenuePartnersDirectory from '@/components/VenuePartnersDirectory';
import UpcomingExperiences from '@/components/event/UpcomingExperiences';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Venue Partners | Stranger Mingle - Premium Social Experience Venues',
    description: 'Explore the curated list of venue partners that host Stranger Mingle events. Cafés, co-working spaces, and cultural venues that build community and facilitate genuine connections.',
    keywords: ['venue partners', 'event venues india', 'social spaces', 'stranger mingle venues', 'pune cafés', 'bangalore venues', 'hyderabad social spaces'],
    alternates: {
        canonical: "/venue-partners",
    },
    openGraph: {
        title: 'Venue Partners | Stranger Mingle - Experience the Best Social Spaces',
        description: 'Discover the locations where real human connection happens. Join us at our partner venues across India.',
        url: 'https://www.strangermingle.com/venue-partners',
        siteName: 'Stranger Mingle',
        images: [
            {
                url: '/images/og-images/og-image-default.webp',
                width: 1200,
                height: 630,
                alt: 'Stranger Mingle Venue Partners',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
};

export const revalidate = 3600; // Revalidate every hour

export default async function VenuePartnersPage() {
    const venues = await getAllVenuePartners();

    // JSON-LD Schema for the venues
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Stranger Mingle Venue Partners",
        "description": "A directory of cafés, cultural hubs, and social spaces that partner with Stranger Mingle to host community events.",
        "itemListElement": venues.map((venue, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Place",
                "name": venue.venue_name,
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": venue.city,
                    "addressCountry": "IN",
                    "streetAddress": venue.address
                },
                "geo": venue.latitude ? {
                    "@type": "GeoCoordinates",
                    "latitude": venue.latitude,
                    "longitude": venue.longitude
                } : undefined,
                "url": venue.google_maps_url || undefined
            }
        }))
    };

    // Breadcrumb Schema
    const breadcrumbLd = {
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
                "name": "Venue Partners",
                "item": "https://www.strangermingle.com/venue-partners"
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header (Matching Know Your Host) */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                        Venue <span className="text-blue-600">Across</span> Cities
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed uppercase font-medium tracking-wide">
                        Explore the curated list of cafés, spaces, and cultural hubs that 
                        host authentic community experiences.
                    </p>
                </div>

                {/* Directory Section (Client Component for interactivity) */}
                <VenuePartnersDirectory venues={venues} />

                {/* Partner CTA Section (Matching Host CTA) */}
                <div className="mt-20 p-8 md:p-12 rounded-[2rem] bg-linear-to-br from-red-500 to-rose-700 text-white text-center shadow-xl shadow-red-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl" />
                    
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 text-sm font-bold uppercase tracking-widest">
                            <Sparkles size={16} />
                            <span>List Your Venue</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">
                            Own a space that fosters connection?
                        </h2>
                        <p className="text-rose-100 text-lg mb-10 max-w-2xl mx-auto uppercase font-medium tracking-wide">
                            Join India&apos;s most active community network and make your venue 
                            the hub for real human connection in your city.
                        </p>
                        <Link 
                            href="/venue-partnership"
                            className="inline-flex items-center gap-3 bg-white text-red-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all transform hover:scale-105 shadow-xl group/btn"
                        >
                            Become a Partner <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Upcoming Experiences Section */}
                <div className="mt-20">
                    <UpcomingExperiences city="India" currentEventId="" />
                </div>
            </main>
        </div>
    );
}
