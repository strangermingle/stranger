import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Outdoor Meetups | Stranger Mingle",
    description: "Step outside and meet people. Join our outdoor meetups, walks, and trekking adventures.",
    alternates: { canonical: "/outdoor-meetups" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-stone-100">
            <section className="relative pt-40 pb-32 px-4 bg-stone-800 text-stone-100 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dt3rse8bg/image/upload/v1769134847/pune-hero_sssw1x.jpg')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <h1 className="text-6xl sm:text-8xl font-black mb-6 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-stone-100 to-stone-500">Outdoor Meetups</h1>
                    <p className="text-2xl font-light max-w-3xl mx-auto leading-relaxed">
                        Step outside and meet people. Join our outdoor meetups, walks, and trekking adventures.
                    </p>
                </div>
            </section>

            <section className="py-20 px-4 max-w-6xl mx-auto">
                <div className="bg-white p-10 md:p-16 rounded-3xl shadow-sm border border-stone-200 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-stone-900 mb-4">Safety in Numbers, Joy in Community</h2>
                        <p className="text-stone-600 text-lg mb-8">There is a massive demand for outdoor group activities. We constantly see people asking on forums for companions for hikes, city walks, and outdoor explorations, hesitant to tackle the outdoors alone. Solo-explorer apps try to bridge this gap, but Stranger Mingle's outdoor meetups provide a reliable, curated group experience.</p>
                        
                        <h2 className="text-3xl font-bold text-stone-900 mb-4">Perfect for Solo Joiners</h2>
                        <p className="text-stone-600 text-lg">Don't let the lack of a trekking buddy keep you indoors. Join our next outdoor meetup solo—you'll be greeted by a host, introduced to the group, and walk away with a whole new crew of outdoor enthusiasts.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                        {cityEvents.slice(0, 2).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-stone-900 mb-10 text-center">More Upcoming Hikes & Walks</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {cityEvents.slice(2, 6).map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
            
            <div className="pb-20">
                <FacebookGroupCTA />
            </div>
        </div>
    );
}
