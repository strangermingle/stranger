import type { Metadata } from "next";
import Link from "next/link";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "How to Make Friends in Pune | Stranger Mingle",
    description: "New to the city or just looking to expand your circle? Join our safe, curated meetups to make genuine friends in Pune.",
    alternates: { canonical: "/pune/how-to-make-friends-in-pune" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Unique Split Hero */}
            <section className="pt-32 pb-16 px-4 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-left">
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-4 block">New in Town?</span>
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 leading-tight">How to Make Friends in Pune</h1>
                    <p className="text-xl text-gray-600 mb-8">If you're wondering, <em>"Where do people find new friends in Pune? I don't have many friends here and get bored,"</em> you are definitely not alone. It's a common sentiment shared on professional networks like Blind and Fishbowl (where the Pune Network has over 40,000 members!). Moving to a new city, or even just outgrowing your college friend group, can leave you looking for meaningful connections.</p>
                    <a href="#events" className="px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-bold text-lg transition-all inline-block">
                        Join Our Next Meetup
                    </a>
                </div>
                <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">The "Going Alone" Objection</h2>
                    <p className="text-gray-600 mb-4">A major hesitation we hear is: <strong>"I don't want to go alone for activities like trekking or hiking."</strong> It's intimidating to show up solo to a group where everyone seems to already know each other.</p>
                    <p className="text-gray-600 font-bold text-blue-600">At our events, over 80% of attendees come alone. Nobody is left standing awkwardly in the corner.</p>
                </div>
            </section>

            <FacebookGroupCTA />

            <section id="events" className="w-full max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Where to Start: Upcoming Pune Events</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {cityEvents.slice(0, 3).map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
            
            <UpcomingExperiences city="Pune" currentEventId="" />
        </div>
    );
}
