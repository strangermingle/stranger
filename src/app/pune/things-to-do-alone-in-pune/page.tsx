import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Things to Do Alone in Pune | Stranger Mingle",
    description: "Looking for things to do alone in Pune? 80% of our attendees come alone. Join a safe, welcoming meetup today!",
    alternates: { canonical: "/pune/things-to-do-alone-in-pune" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Minimalist Hero */}
            <section className="pt-40 pb-20 px-4 text-center max-w-4xl mx-auto">
                <h1 className="text-5xl font-black text-gray-900 mb-8 tracking-tight">Things to Do Alone in Pune</h1>
                <p className="text-2xl text-gray-500 font-light leading-relaxed">
                    Exploring Pune solo doesn't have to mean feeling lonely. While solo-travel apps like Nomax are gaining traction for helping individuals find companions for hikes and food tours in areas like Koregaon Park and Baner, sometimes you want a curated, safe group setting.
                </p>
            </section>

            {/* The 80% Stat Section */}
            <section className="py-16 bg-white border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                    <div className="md:w-1/3">
                        <div className="text-7xl font-black text-blue-600 mb-2">80%</div>
                        <div className="text-xl font-bold text-gray-800 uppercase tracking-widest">Come Completely Alone</div>
                    </div>
                    <div className="md:w-2/3 text-lg text-gray-600 leading-relaxed border-l-0 md:border-l-4 border-blue-100 md:pl-12">
                        We see it all the time on local forums: people want to go trekking or explore cafes, but they cancel their plans because they don't want to show up alone. <strong>Here is the secret: at Stranger Mingle, 80% of our attendees come completely alone.</strong> You arrive as a solo explorer, but within the first 15 minutes of our guided ice-breakers, you're part of a warm, welcoming group.
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Curated Solo-Friendly Events</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {cityEvents.slice(0, 6).map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
            
            <UpcomingExperiences city="Pune" currentEventId="" />
        </div>
    );
}
