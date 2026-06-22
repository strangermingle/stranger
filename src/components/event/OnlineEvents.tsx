'use client';

import { useEffect, useState } from 'react';
import { Event, getOnlineEvents, formatEventDate, formatEventTime } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Globe, ArrowRight, Star } from 'lucide-react';

interface OnlineEventsProps {
    limit?: number;
    currentEventId?: string;
}

export default function OnlineEvents({ limit = 4, currentEventId }: OnlineEventsProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOnlineEvents(limit + 1).then(data => {
            // Filter out current event
            const filtered = data.filter(e => e.id !== currentEventId).slice(0, limit);
            setEvents(filtered);
            setLoading(false);
        });
    }, [limit, currentEventId]);

    if (loading) {
        return (
            <div className="py-12 max-w-7xl mx-auto px-4">
                <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8 mx-auto" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-[4/5] bg-gray-50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (events.length === 0) return null;

    return (
        <section className="py-12 max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                        <Globe size={24} />
                    </div>
                    <h2 className="text-xl md:text-3xl font-black text-gray-900 uppercase tracking-wider">
                        Online Events
                    </h2>
                </div>
                <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-[0.1em]">Connect from anywhere in the world</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {events.map((event) => {
                    const dateDisplay = formatEventDate(event.start_datetime, event.end_datetime);
                    const timeDisplay = formatEventTime(event.start_datetime, event.end_datetime);

                    return (
                        <Link 
                            key={event.id} 
                            href={`/events/${event.slug || event.id}`}
                            className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                        >
                            {/* Image Header */}
                            <div className="relative aspect-[2/1] overflow-hidden">
                                {event.cover_image_url ? (
                                    <Image sizes="(max-width: 1024px) 50vw, 320px"
                                        src={event.cover_image_url}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                        <Star className="text-gray-200" size={24} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                {/* Category Badge */}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm">
                                        Online
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 md:p-4 flex flex-col flex-1">
                                <h3 className="text-xs md:text-sm font-black text-gray-900 mb-2 line-clamp-2 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </h3>
                                
                                <div className="mt-auto space-y-1.5">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Calendar size={12} className="text-red-500" />
                                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider text-gray-900">
                                                {dateDisplay}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500 ml-[18px]">
                                            <span className="text-[9px] md:text-[10px] font-bold text-gray-500 uppercase">
                                                {timeDisplay}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <Globe size={12} className="text-blue-500 shadow-sm" />
                                        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider truncate text-gray-500">
                                            Virtual / Online
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Indicator */}
                            <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-lg">
                                <ArrowRight size={12} />
                            </div>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                <Link 
                    href="/events" 
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2 group justify-center"
                >
                    View All Online Events <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </section>
    );
}
