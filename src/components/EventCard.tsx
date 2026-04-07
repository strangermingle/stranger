'use client';

import { Event, formatEventDate, formatEventTime, getSpotsLabel } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@/lib/gtag";

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    
    const date = formatEventDate(event.start_datetime, event.end_datetime);
    const time = formatEventTime(event.start_datetime, event.end_datetime);
    const spotsLabel = getSpotsLabel(event);
    const remainingSpots = (event.max_capacity || 0) - event.booking_count;
    const isFillingFast = remainingSpots <= (event.max_capacity || 0) * 0.2 && remainingSpots > 0;
    const isSoldOut = remainingSpots <= 0;
    const spotsPercentage = event.max_capacity ? (remainingSpots / event.max_capacity) * 100 : 100;

    const firstTier = event.ticket_tiers?.[0];
    const priceText = firstTier ? (firstTier.price === 0 ? 'Free' : `₹${firstTier.price}`) : 'Registration Open';

    const gradient = 'from-indigo-600 via-purple-600 to-pink-600';

    return (
        <>
        <div className="group relative p-[1px] rounded-[20px] md:rounded-[24px] overflow-hidden transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 shadow-lg h-full bg-white border border-gray-100">
            <div className="relative flex flex-col h-full uppercase">
                {/* Main Link Area - covers the whole card for clickability */}
                <Link 
                    href={`/events/${event.slug || event.id}`}
                    onClick={() => sendGAEvent({
                        action: 'view_event_details',
                        category: 'event_card',
                        label: `Card Click: ${event.title}`
                    })}
                    className="flex flex-col flex-1 after:absolute after:inset-0 after:z-10"
                >
                    {/* Image Section */}
                    <div className={`relative aspect-[2/1] bg-linear-to-br ${gradient} overflow-hidden`}>
                        {event.cover_image_url ? (
                            <>
                                <Image
                                    src={event.cover_image_url}
                                    alt={`Poster of ${event.title}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-br opacity-80" />
                        )}

                        {/* Badges */}
                        <div className="absolute top-2 left-2 right-2 flex flex-wrap gap-1 z-20 hidden md:block">
                            <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-1 py-1 rounded-full text-[7px] font-regular shadow-lg border border-white/50">
                                {event.category?.name || 'Social'}
                            </span>
                            {event.event_type === 'online' && (
                                <span className="bg-blue-500/95 backdrop-blur-sm text-white px-1 py-1 rounded-full text-[7px] font-regular shadow-lg border border-blue-400/50">
                                    🌐 Online
                                </span>
                            )}
                            {isSoldOut && (
                                <span className="bg-red-500/95 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[10px] font-black shadow-lg border border-red-400/50 hidden md:inline-block">
                                    Sold Out
                                </span>
                            )}
                            {isFillingFast && !isSoldOut && (
                                <span className="bg-orange-500/95 backdrop-blur-sm text-white px-2 py-1 rounded-full text-[10px] font-black shadow-lg border border-orange-400/50 animate-pulse hidden md:inline-block">
                                    ⚡ Filling Fast
                                </span>
                            )}
                        </div>

                        {/* Price Badge */}
                        <div className="absolute bottom-2 right-2 z-20 hidden md:block">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-xl border border-white/95">
                                <span className="text-sm md:text-lg font-black text-gray-900">{priceText}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 md:p-5 flex flex-col grow">
                        {/* Title */}
                        <div className="mb-1">
                            <h3 className="text-[14px] md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
                                {event.title}
                            </h3>
                            
                            {/* Date and Time - No icons on mobile */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] md:text-sm text-gray-500 font-bold tracking-wider">
                                <div className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-red-500">{date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-blue-500">{time}</span>
                                </div>
                            </div>
                        </div>

                        {/* Location and Progress Bar */}
                        <div className="mt-1 space-y-1">
                            {/* Location - with small icon */}
                            <div className="flex items-start gap-1 text-[11px] md:text-sm text-gray-600 font-regular">
                                <svg className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="line-clamp-1">{event.location?.venue_name || event.location?.city || 'India'}</span>
                            </div>

                            {/* Ticket Availability Progress Bar */}
                            <div className="space-y-1">
                                <div className="flex items-center justify-between text-[10px] md:text-xs">
                                    <div className="flex items-center gap-1.5 text-black font-regular">
                                        <span>{remainingSpots} / {event.max_capacity || 0} SPOTS LEFT</span>
                                    </div>
                                    <span className={`font-black px-2 py-0.5 rounded-full hidden md:inline-block ${isSoldOut ? 'bg-red-50 text-red-700' :
                                        isFillingFast ? 'bg-orange-50 text-orange-700' :
                                            'bg-green-50 text-green-700'
                                        }`}>
                                        {spotsLabel.toUpperCase()}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 md:h-2 overflow-hidden border border-gray-200/50">
                                    <div
                                        className={`h-full rounded-full transition-all duration-700 ${isSoldOut ? 'bg-red-500' :
                                            isFillingFast ? 'bg-orange-500' :
                                                'bg-green-500'
                                            }`}
                                        style={{ width: `${spotsPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                {/* More Details Button Area */}
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                    <Link
                        href={`/events/${event.slug || event.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            sendGAEvent({
                                action: 'view_event_details',
                                category: 'event_card',
                                label: `Details Button: ${event.title}`
                            });
                        }}
                        className="relative z-20 block w-full py-2.5 md:py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest text-center transition-all duration-300 bg-red-500 hover:bg-red-600 text-white shadow-lg active:scale-[0.98]"
                    >
                        More Details
                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
