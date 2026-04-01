'use client';

import { VenuePartner } from '@/lib/events';
import VenuePartnerCard from './VenuePartnerCard';
// import VenueMap from './VenueMap';

interface VenuePartnersDirectoryProps {
    venues: VenuePartner[];
}

export default function VenuePartnersDirectory({ venues }: VenuePartnersDirectoryProps) {
    return (
        <div className="space-y-16">
            {/* Map Section - Always Visible */}
            <div id="venue-map-section" className="scroll-mt-32">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter shrink-0">
                        Venue <span className="text-blue-600">Locations</span>
                    </h2>
                    <div className="h-0.5 flex-1 bg-gray-50 ml-6" />
                </div>

                {/* <div className="h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden border-8 border-gray-50 shadow-inner relative group">
                    <VenueMap venues={venues} selectedVenue={selectedVenue} />
                </div> */}

                <p className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">
                    Map is under construction!
                </p>
            </div>

            {/* Directory Section */}
            <div>
                <div className="mb-10 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">
                        Venue <span className="text-blue-600">Directory</span> ({venues.length})
                    </h2>
                    <div className="h-0.5 flex-1 bg-gray-50 mx-6 hidden md:block" />
                </div>

                {venues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {venues.map((venue) => (
                            <VenuePartnerCard
                                key={`${venue.venue_name}-${venue.city}`}
                                venue={venue}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-[2.5rem] border border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold uppercase tracking-widest">No venue partners available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
