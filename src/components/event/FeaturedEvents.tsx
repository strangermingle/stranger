'use client';

import { useEffect, useState, useCallback } from 'react';
import { Event, getFeaturedEvents } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedEventsProps {
    limit?: number;
}

export default function FeaturedEvents({ limit = 5 }: FeaturedEventsProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        getFeaturedEvents(limit).then(data => {
            setEvents(data);
            setLoading(false);
        });
    }, [limit]);

    const nextSlide = useCallback(() => {
        if (events.length <= 1) return;
        setCurrentIndex((prev) => (prev + 1) % events.length);
    }, [events.length]);

    useEffect(() => {
        if (events.length <= 1) return;
        const interval = setInterval(nextSlide, 5000); // Slide every 5 seconds
        return () => clearInterval(interval);
    }, [events.length, nextSlide]);

    if (loading) {
        return (
            <div className="w-full aspect-[2/1] bg-gray-100 animate-pulse flex items-center justify-center">
                <div className="w-24 h-2 shadow-sm rounded-full bg-gray-200" />
            </div>
        );
    }

    if (events.length === 0) return null;

    return (
        <section className="py-8 max-w-7xl mx-auto px-4">
            <div className="relative rounded-[1.1rem] p-[3px] overflow-hidden group shadow-2xl">
                {/* Animated Gradient Border */}
                <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#2563eb,#9333ea,#db2777,#2563eb)] animate-border-rotate opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Main Content Area */}
                <div 
                    className="relative z-10 rounded-[1rem] overflow-hidden bg-white isolate"
                    style={{ maskImage: 'webkit-radial-gradient(white, black)', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                >
                    <div className="relative aspect-[2/1] w-full overflow-hidden">
                        <div 
                            className="flex w-full h-full transition-transform duration-700 ease-out transform-gpu"
                            style={{ 
                                transform: `translateX(-${currentIndex * 100}%)`,
                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden'
                            }}
                        >
                            {events.map((event) => (
                                <div key={event.id} className="relative min-w-full h-full flex-shrink-0">
                                    <Link href={`/events/${event.slug || event.id}`} className="block relative w-full h-full">
                                        {event.cover_image_url ? (
                                            <Image
                                                src={event.cover_image_url}
                                                alt={event.title}
                                                fill
                                                sizes="(min-width: 1280px) 1280px, 100vw"
                                                priority
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                                <p className="text-gray-300 font-black uppercase text-4xl opacity-10">{event.title}</p>
                                            </div>
                                        )}
                                        
                                        {/* Overlay Shadow */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                        
                                        {/* Know More Compact Button */}
                                        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8">
                                            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-900 shadow-2xl transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                                                Know More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        {events.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {events.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`h-1.5 transition-all duration-300 rounded-full ${
                                            i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                                        }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
