'use client';

import { useEffect, useState } from 'react';
import { Event, getWeekendEvents, formatEventDate } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Star, Sun } from 'lucide-react';

interface WeekendEventsProps {
    limit?: number;
    currentEventId?: string;
}

export default function WeekendEvents({ limit = 4, currentEventId }: WeekendEventsProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getWeekendEvents(limit + 1).then(data => {
            setEvents(data.filter(e => e.id !== currentEventId).slice(0, limit));
            setLoading(false);
        });
    }, [limit, currentEventId]);

    if (loading) {
        return (
            <div className="py-12 max-w-7xl mx-auto px-4">
                <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {[1, 2, 3, 4].slice(0, limit).map(i => (
                        <div key={i} className="aspect-[4/5] bg-gray-50 rounded-2xl animate-pulse" />
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
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <Sun size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-wider">
                            Weekend Special
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Fri, Sat & Sun Meetups</p>
                    </div>
                </div>
                
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {events.map((event) => {
                    const dateDisplay = formatEventDate(event.start_datetime, event.end_datetime);

                    return (
                        <Link 
                            key={event.id} 
                            href={`/events/${event.slug || event.id}`}
                            className="group relative flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-green-500 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500"
                        >
                            <div className="relative aspect-[2/1] overflow-hidden">
                                {event.cover_image_url ? (
                                    <Image
                                        src={event.cover_image_url}
                                        alt={event.title}
                                        fill
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                        <Star className="text-gray-200" size={24} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="absolute top-2 left-2">
                                    <span className="bg-green-600 text-white px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm">
                                        Weekend
                                    </span>
                                </div>
                            </div>

                            <div className="p-3 md:p-4 flex flex-col flex-1">
                                <h3 className="text-xs md:text-sm font-black text-gray-900 mb-2 line-clamp-2 leading-tight tracking-tight group-hover:text-green-600 transition-colors">
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
                                    </div>
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <MapPin size={12} className="text-blue-500 shadow-sm" />
                                        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider truncate text-gray-500">
                                            {event.location?.city}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 group-hover:bg-green-600 group-hover:text-white transition-all duration-300 shadow-lg">
                                <ArrowRight size={12} />
                            </div>
                        </Link>
                        
                    );
                })}
            </div>
            <Link 
                    href="/events" 
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-2 group justify-center mt-4"
                >
                    View All <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </Link>
        </section>
        
    );
}
