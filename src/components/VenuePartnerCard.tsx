'use client';

import { VenuePartner } from '@/lib/events';
import { MapPin, ExternalLink, Star } from 'lucide-react';
import { sendGAEvent } from '@/lib/gtag';

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
            className="group block bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 cursor-pointer h-full relative"
        >
            <div className="flex flex-col h-full uppercase">
                {/* Header with Icon/Image placeholder */}
                <div className="flex items-start gap-4 mb-6">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-gray-50 shrink-0 shadow-sm transition-transform duration-500 group-hover:scale-105 bg-linear-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-blue-200">
                        <MapPin size={40} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-green-500 mb-1 truncate group-hover:text-red-600 transition-colors uppercase tracking-wide">
                            {venue.venue_name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-2 font-regular tracking-wider">
                            <MapPin size={14} className="text-blue-400" />
                            <span>{venue.city}</span>
                        </div>
                        <p className="text-xs text-blue-400 font-regular line-clamp-2 leading-relaxed tracking-tight">
                            {venue.address}
                        </p>
                    </div>
                </div>

                {/* Stats Row (Matching HostCard) */}
                <div className="grid grid-cols-3 gap-2 mb-2 py-4 border-y border-gray-50 font-bold">
                    <div className="text-center">
                        <div className="text-lg text-gray-900">{venue.event_count}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">Events</div>
                    </div>
                    <div className="text-center border-x border-gray-50">
                        <div className="text-sm text-gray-400">Verified</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">Status</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg text-gray-900 flex items-center justify-center gap-1">
                            4.8
                            <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest">Rating</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto relative z-20">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onViewOnMap?.(venue);
                        }}
                        className="flex-1 bg-red-600 text-white py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-sm active:scale-[0.98]"
                    >
                        View on Map
                    </button>
                    {venue.google_maps_url && (
                        <a
                            href={venue.google_maps_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
                        >
                            <ExternalLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
