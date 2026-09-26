import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Is It Weird to Go to Events Alone? | Stranger Mingle",
    description: "Wondering if it's weird to go to events alone? 80% of Stranger Mingle attendees come solo. You're in good company!",
    alternates: { canonical: "/faq/is-it-weird-to-go-to-events-alone" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-yellow-50">
            <section className="pt-32 pb-16 px-4 max-w-3xl mx-auto text-center">
                <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 leading-tight">Is It Weird to Go to Events Alone?</h1>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-yellow-100 text-left space-y-6">
                    <p className="text-xl text-gray-700">Let's address the elephant in the room: showing up to a social event where you don't know anyone feels daunting. On platforms like Blind and Reddit, a recurring theme is the fear of being the "odd one out" at meetups, hikes, or board game nights.</p>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mt-6">The 80% Rule</h2>
                    <p className="text-xl text-gray-700">Is it weird? <strong>Absolutely not.</strong> In fact, at Stranger Mingle, <strong>over 80% of our attendees arrive completely solo.</strong> Our entire model is built around solo attendees.</p>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mt-6">Designed for Strangers</h2>
                    <p className="text-xl text-gray-700">Unlike organic parties where cliques have already formed, our events are designed with ice-breakers and structured conversations. Everyone is in the exact same boat as you—looking to make new friends. So skip the anxiety, book your ticket, and know that walking in alone is the norm, not the exception.</p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Try it out this weekend</h2>
                    <p className="text-center text-gray-500 mb-12">Pick an event, show up alone, leave with friends.</p>
                    <div className="grid md:grid-cols-3 gap-8">
                        {cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
