'use client';

import { useEffect, useState } from 'react';
import { Event, getUpcomingEventsForCity, formatEventDate, formatEventTime } from '@/lib/events';
import { LIVE_CITIES } from '@/lib/cities';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, ArrowRight, Star } from 'lucide-react';

interface UpcomingExperiencesProps {
    city: string;
    currentEventId: string;
}

export default function UpcomingExperiences({ city, currentEventId }: UpcomingExperiencesProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUpcomingEventsForCity(city, 12).then(data => {
            // Filter out current event
            const filtered = data.filter(e => e.id !== currentEventId);
            setEvents(filtered);
            setLoading(false);
        });
    }, [city, currentEventId]);

    const citySlug = city.toLowerCase();
    const isLiveCity = LIVE_CITIES.includes(citySlug);
    const formattedCityName = citySlug === 'bangalore' ? 'Bengaluru' : city.charAt(0).toUpperCase() + city.slice(1);

    const directoryLinks = [
        { title: `Meetups & Events in ${formattedCityName}`, href: `/${citySlug}`, desc: 'Weekend stranger meetups & social events' },
        { title: `House Parties in ${formattedCityName}`, href: `/${citySlug}/house-parties`, desc: 'Platonic house parties & social mixers' },
        { title: `Make New Friends in ${formattedCityName}`, href: `/${citySlug}/make-new-friends`, desc: 'Offline social groups & friend circles' },
        { title: `Best Hangout Places in ${formattedCityName}`, href: `/best-hangout-places/${citySlug}`, desc: 'Curated cafes, venues & community hubs' },
    ];

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

    if (events.length === 0) {
        if (!isLiveCity) return null;
        return (
            <section className="py-12 max-w-7xl mx-auto px-4">
                <div className="mt-4">
                    <h3 className="text-center text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                        Explore {formattedCityName} Directories
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {directoryLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="p-4 rounded-2xl bg-gray-50/80 hover:bg-blue-600 border border-gray-100 hover:border-blue-600 text-gray-900 hover:text-white transition-all duration-300 group shadow-xs hover:shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="font-bold text-xs uppercase tracking-wider mb-1 group-hover:text-white">
                                        {link.title}
                                    </div>
                                    <div className="text-[10px] text-gray-500 group-hover:text-blue-100 font-medium leading-relaxed">
                                        {link.desc}
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-600 group-hover:text-white">
                                    <span>Browse</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-blue-600 rounded-full" />
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 uppercase tracking-wider">
                        Upcoming Activities
                    </h2>
                </div>
                <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-[0.1em]">Explore curated experiences in {city}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {events.slice(0, 4).map((event) => {
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
                                
                                {/* Category Badge */}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest shadow-sm">
                                        {event.category?.name || 'Experience'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 md:p-4 flex flex-col flex-1">
                                <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight tracking-wide group-hover:text-blue-600 transition-colors">
                                    {event.title}
                                </h3>
                                
                                <div className="mt-auto space-y-1.5">
                                    <div className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <Calendar size={12} className="text-red-500" />
                                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-red-500">
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
                                        <MapPin size={12} className="text-blue-500 shadow-sm" />
                                        <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-wider truncate text-gray-500">
                                            {event.location?.city || city}
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

            {/* View All Button at bottom center */}
            <div className="mt-12 text-center">
                <Link 
                    href="/events" 
                    className="inline-flex items-center gap-3 bg-gray-50 hover:bg-white border border-gray-100 hover:border-blue-500 text-gray-900 px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-sm group"
                >
                    Explore More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* City Directory Navigation Block */}
            {isLiveCity && (
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <h3 className="text-center text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">
                        Explore {formattedCityName} Directories
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {directoryLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="p-4 rounded-2xl bg-gray-50/80 hover:bg-blue-600 border border-gray-100 hover:border-blue-600 text-gray-900 hover:text-white transition-all duration-300 group shadow-xs hover:shadow-md flex flex-col justify-between"
                            >
                                <div>
                                    <div className="font-bold text-xs uppercase tracking-wider mb-1 group-hover:text-white">
                                        {link.title}
                                    </div>
                                    <div className="text-[10px] text-gray-500 group-hover:text-blue-100 font-medium leading-relaxed">
                                        {link.desc}
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-blue-600 group-hover:text-white">
                                    <span>Browse</span>
                                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
