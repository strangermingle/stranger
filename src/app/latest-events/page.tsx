import type { Metadata } from "next";
import { getAllLiveEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Latest Stranger Meetups & Upcoming Weekend Events | Stranger Mingle",
    description: "Discover the most upcoming offline weekend stranger meetups. Join curated, safe, and authentic social events across Pune, Hyderabad, Bengaluru, Mumbai & Delhi. Build genuine friendships through in-person connections.",
    keywords: "latest events, upcoming meetups, weekend social gatherings, offline networking India, stranger meetups Pune, upcoming events Bengaluru, Mumbai meetups, Hyderabad social events, Delhi weekend activities",
};

export default async function LatestEventsPage() {
    const allEvents = await getAllLiveEvents();
    
    // Sort by date - although getAllLiveEvents already does this, we'll ensure it here
    const sortedEvents = [...allEvents].sort((a, b) => 
        new Date(a.start_datetime).getTime() - new Date(b.start_datetime).getTime()
    );

    // Limit to 9 for "Latest" focus if preferred, but user said "display most upcoming events order"
    // We'll show all live events.
    const latestEvents = sortedEvents;

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <section className="bg-gray-950 text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                        Most Upcoming
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                        Latest Events & Stranger Meetups
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        The most immediate opportunities to connect with genuine people through 
                        curated, safe, and platonic offline events. Every meetup is verified and 
                        led by a community host.
                    </p>
                </div>
            </section>

            {/* Events List */}
            <main className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {latestEvents.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {latestEvents.map((event) => (
                                <div key={event.id} className="h-full">
                                    <EventCard event={event} />
                                </div>
                            ))}
                        </div>
                        
                        {/* Trust Bar */}
                        <div className="mt-20 py-12 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900 mb-1">100%</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Offline</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900 mb-1">Verified</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Members</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900 mb-1">Safe</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Spaces</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900 mb-1">Platonic</p>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Only</p>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <Link 
                                href="/events"
                                className="inline-flex items-center justify-center px-8 py-4 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold rounded-md text-base transition-all duration-200"
                            >
                                View All Events →
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-24 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl text-gray-300">🗓️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Upcoming Events Found</h3>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            We&apos;re currently planning new weekend events in all our cities. 
                            Check back in a few days or follow us on Instagram.
                        </p>
                        <Link 
                            href="/"
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                )}
            </main>

            {/* Quick Policy Section */}
            <section className="py-20 px-4 bg-gray-50 border-t border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6 font-primary">Our Community Principles</h2>
                    <div className="grid sm:grid-cols-3 gap-8">
                        <div>
                            <p className="font-bold text-gray-900 mb-2 text-sm">Identity Verified</p>
                            <p className="text-gray-500 text-xs leading-relaxed">No anonymous users. Everyone is verified for safety.</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 mb-2 text-sm">Host-Led Events</p>
                            <p className="text-gray-500 text-xs leading-relaxed">Vetted community members facilitate every meetup.</p>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900 mb-2 text-sm">Zero Harassment</p>
                            <p className="text-gray-500 text-xs leading-relaxed">Strict policy to ensure a safe space for everyone.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Note */}
            <section className="py-12 px-4 text-center border-t border-gray-100 bg-white">
                <p className="text-gray-400 text-xs mb-4">
                    Waitlist: Some of our most popular events fill up within hours of posting.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/host-an-event" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Apply to Host</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/safety-guidelines" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Safety Guidelines</Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/faqs" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">FAQs</Link>
                </div>
            </section>
        </div>
    );
}
