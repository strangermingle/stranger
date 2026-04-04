'use client';

import { VenuePartner } from '@/lib/events';
import { MapPin, ExternalLink, Star, Info } from 'lucide-react';
import { sendGAEvent } from '@/lib/gtag';
import Image from 'next/image';

interface VenuePartnerCardProps {
    venue: VenuePartner;
    onViewOnMap?: (venue: VenuePartner) => void;
}

export default function VenuePartnerCard({ venue, onViewOnMap }: VenuePartnerCardProps) {
    return (
        <div 
            onClick={() => {
                sendGAEvent({
                    action: 'view_venue_details',
                    category: 'venue_card',
                    label: `Card Click: ${venue.venue_name}`
                });
                onViewOnMap?.(venue);
            }}
            className="group block bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 cursor-pointer h-full relative"
        >
            <div className="flex flex-col h-full uppercase">
                {/* Visual Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-50">
                    {venue.cover_image_url ? (
                        <Image
                            src={venue.cover_image_url}
                            alt={venue.venue_name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-blue-100 bg-linear-to-br from-blue-50 to-indigo-50">
                            <MapPin size={48} strokeWidth={1} />
                        </div>
                    )}
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">
                            {venue.event_count > 0 ? `${venue.event_count} Upcoming Events` : 'Venue Partner'}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="mb-4">
                        <h3 className="text-xl font-black text-gray-900 mb-2 truncate group-hover:text-blue-600 transition-colors tracking-tight">
                            {venue.venue_name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                            <MapPin size={12} className="text-blue-500" />
                            <span>{venue.city}</span>
                        </div>
                    </div>

                    {venue.description && (
                        <p className="text-gray-400 text-xs font-medium mb-6 line-clamp-2 leading-relaxed tracking-wide normal-case">
                            {venue.description}
                        </p>
                    )}

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-gray-100 font-bold mt-auto">
                        <div className="flex flex-col gap-1">
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Experience</div>
                            <div className="text-sm text-gray-900 flex items-center gap-1">
                                {venue.rating_avg || 4.8}
                                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-[10px] text-gray-400 font-medium">({venue.rating_count || 12}+)</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 pl-4 border-l border-gray-100">
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Activity</div>
                            <div className="text-sm text-gray-900">
                                {venue.event_count || 0} Events
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-auto">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onViewOnMap?.(venue);
                            }}
                            className="flex-1 bg-gray-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-[0.98]"
                        >
                            Explore Details
                        </button>
                        {venue.google_maps_url && (
                            <a
                                href={venue.google_maps_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-4 bg-gray-50 text-gray-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all group/icon"
                            >
                                <ExternalLink size={18} className="group-hover/icon:scale-110" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
