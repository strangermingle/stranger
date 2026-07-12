import { Metadata } from 'next';
import { getUpcomingVenuePartners } from '@/lib/events';
import VenuePartnersDirectory from '@/components/VenuePartnersDirectory';
import UpcomingExperiences from '@/components/event/UpcomingExperiences';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Best Hangout Places - Curated Community Spaces',
    description: 'Explore our handpicked selection of the best hangout places across India where genuine human connection happens. Join Stranger Mingle events at our partner venues.',
    keywords: ['hangout places', 'social spaces india', 'community venues', 'stranger mingle locations', 'best cafes for meetups'],
    alternates: {
        canonical: "/best-hangout-places",
    },
    openGraph: {
        title: 'Best Hangout Places - Curated Community Spaces',
        description: 'Explore our handpicked selection of the best hangout places across India where genuine human connection happens. Join Stranger Mingle events at our partner venues.',
        url: "/best-hangout-places",
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

export const revalidate = 3600; // Revalidate every hour

const FEATURED_CITIES = [
    { name: 'Bangalore', slug: 'bangalore' },
    { name: 'Mumbai', slug: 'mumbai' },
    { name: 'Delhi', slug: 'delhi' },
    { name: 'Pune', slug: 'pune' },
    { name: 'Hyderabad', slug: 'hyderabad' }
];

export default async function BestHangoutPlacesPage() {
    const venues = await getUpcomingVenuePartners();

    return (
        <div className="min-h-screen bg-white">
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-4 text-center text-balance">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 mb-2 text-[10px] font-bold uppercase tracking-widest">
                        <Sparkles size={14} />
                        <span>Curated Experiences</span>
                    </div>
                    <h1 className="text-2xl sm:text-6xl font-bold text-gray-900 mb-2 tracking-tight uppercase leading-none">
                        Best <span className="text-blue-600">Hangout</span> Places <br className="hidden md:block" />
                        With Upcoming Events
                    </h1>
                    <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed uppercase font-medium tracking-wide">
                        Discover the most vibrant spaces in your city that foster authentic
                        human connection and community building.
                    </p>
                </div>

                {/* City Quick Filters */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {FEATURED_CITIES.map((city) => (
                            <Link
                                key={city.slug}
                                href={`/best-hangout-places/${city.slug}`}
                                className="inline-flex items-center gap-1 px-4 py-2 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-200 text-gray-900 text-[8px] font-bold uppercase tracking-widest transition-all hover:shadow-xl hover:shadow-gray-100 group"
                            >
                                <MapPin size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                                {city.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Directory Section */}
                <div className="mb-20">
                    <VenuePartnersDirectory venues={venues} />
                </div>

                {/* Call to Action */}
                <div className="mt-20 p-8 md:p-16 rounded-[2rem] bg-gray-900 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 transition-all group-hover:bg-blue-600/30" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 uppercase tracking-tight leading-tight">
                                Want your space to <span className="text-blue-400">host?</span>
                            </h2>
                            <p className="text-gray-200 text-[14px] mb-0 uppercase font-medium tracking-wide">
                                Join our network of premium venue partners and become the
                                social heart of your neighborhood.
                            </p>
                        </div>
                        <Link
                            href="/venue-partnership"
                            className="shrink-0 inline-flex items-center gap-1 bg-white text-black px-6 py-4 rounded-2xl font-bold uppercase hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl group/btn"
                        >
                            Become a Partner <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="mt-4">
                    <UpcomingExperiences city="India" currentEventId="" />
                </div>
            </main>
        </div>
    );
}
