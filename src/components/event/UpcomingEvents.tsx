'use client';

import { useEffect, useState } from 'react';
import { Event, getUpcomingEventsForCity } from '@/lib/events';
import EventCard from '../EventCard';

interface UpcomingEventsProps {
    city: string;
    currentEventId: string;
}

export default function UpcomingEvents({ city, currentEventId }: UpcomingEventsProps) {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUpcomingEventsForCity(city, 4).then(data => {
            setEvents(data.filter(e => e.id !== currentEventId));
            setLoading(false);
        });
    }, [city, currentEventId]);

    if (loading) {
        return (
            <div className="py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-80 bg-gray-100 rounded-3xl" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <section className="py-16 border-t border-gray-100">
            <div className="flex items-center justify-between mb-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase text-center">
                    Upcoming Events Nearby
                </h2>
            </div>

            {events.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50/10 rounded-3xl p-12 text-center border border-dashed border-gray-100">
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">No upcoming events found nearby at this moment.</p>
                </div>
            )}
        </section>
    );
}


