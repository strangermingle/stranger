import { Metadata } from 'next';
import { getVenuePartnersByCity } from '@/lib/events';
import VenuePartnersDirectory from '@/components/VenuePartnersDirectory';
import UpcomingExperiences from '@/components/event/UpcomingExperiences';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';

interface CityPageProps {
    params: Promise<{
        city: string;
    }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
    const { city } = await params;
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    return {
        title: `Best Hangout Places in ${cityName} | Stranger Mingle`,
        description: `Explore the best cafes, social spaces, and community hubs in ${cityName}. Discover curated hangout places for authentic human connection.`,
        alternates: {
            canonical: `/best-hangout-places/${city}`,
        },
        openGraph: {
            title: `Best Hangout Places in ${cityName} | Stranger Mingle`,
            description: `Connect with locals and travelers at the best social venues in ${cityName}.`,
        }
    };
}

export const revalidate = 3600;

export default async function CityHangoutPlacesPage({ params }: CityPageProps) {
    const { city } = await params;
    const venues = await getVenuePartnersByCity(city);

    if (!venues || venues.length === 0) {
        // We might want to show an empty state instead of 404 if the city is just currently empty
        // but for now, let's keep it simple.
    }

    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    return (
        <div className="min-h-screen bg-white">
            <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Navigation Back */}
                <div className="mb-8">
                    <Link 
                        href="/best-hangout-places"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-colors"
                    >
                        <ArrowLeft size={14} />
                        <span>Back to All Places</span>
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-500 rounded-lg mb-4 text-[9px] font-black uppercase tracking-widest">
                                <MapPin size={12} />
                                <span>City Directory</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                                <span className="text-blue-600">{cityName}'s</span> Best Hangout Places
                            </h1>
                            <p className="text-lg text-gray-500 max-w-2xl leading-relaxed uppercase font-medium tracking-wide">
                                A curated list of {venues.length} spaces in {cityName} that 
                                prioritize community and connection.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Directory Section */}
                <VenuePartnersDirectory venues={venues} />

                {/* City Specific Upcoming Experiences */}
                <div className="mt-24">
                    <div className="mb-12 border-t border-gray-100 pt-24">
                        <UpcomingExperiences city={cityName} currentEventId="" />
                    </div>
                </div>
            </main>
        </div>
    );
}
