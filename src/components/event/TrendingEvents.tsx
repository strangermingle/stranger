'use client';

import { useEffect, useState } from 'react';
import { Event, getTrendingEvents, formatEventDate } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Star, TrendingUp } from 'lucide-react';

interface TrendingEventsProps {
    limit?: number;
}

export default function TrendingEvents({ limit = 2 }: TrendingEventsProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingEvents(limit).then(data => {
            setEvents(data);
            setLoading(false);
        });
    }, [limit]);

    if (loading) {
        return (
            <div className="py-12 max-w-7xl mx-auto px-4">
                <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {[1, 2].slice(0, limit).map(i => (
                        <div key={i} className="aspect-[2/1] bg-gray-50 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        );
    }

    if (events.length === 0) return null;

    return (
        <section className="py-12 max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-wider">
                            Trending Now
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Most popular meetups</p>
                    </div>
                </div>
                
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {events.map((event) => {
                    const dateDisplay = formatEventDate(event.start_datetime, event.end_datetime);

                    return (
                        <Link 
                            key={event.id} 
                            href={`/events/${event.slug || event.id}`}
                            className="group relative flex flex-col md:flex-row bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-500"
                        >
                            <div className="relative aspect-[2/1] md:w-1/2 overflow-hidden">
                                {event.cover_image_url ? (
                                    <Image
                                        src={event.cover_image_url}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                        <Star className="text-gray-200" size={24} />
                                    </div>
                                )}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-red-600 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm">
                                        Trending
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 md:p-6 flex flex-col flex-1 justify-center">
                                <h3 className="text-sm md:text-lg font-black text-gray-900 mb-3 line-clamp-2 leading-tight tracking-tight group-hover:text-red-600 transition-colors">
                                    {event.title}
                                </h3>
                                
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Calendar size={14} className="text-red-500" />
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-gray-900">
                                            {dateDisplay}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MapPin size={14} className="text-blue-500" />
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider truncate text-gray-500">
                                            {event.location?.city}
                                        </span>
                                    </div>
                                    <div className="mt-4 inline-flex items-center gap-2 text-[10px] font-black text-red-600 uppercase tracking-[0.1em]">
                                        <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
                                        {event.booking_count} Spots Filled
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
            <Link 
                    href="/events" 
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mt-6 text-center justify-center hover:text-blue-700 transition-colors flex items-center gap-2 group"
                >
                    All Events <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
        </section>
    );
}
