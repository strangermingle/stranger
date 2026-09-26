import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "The Social Scene in Pune | Stranger Mingle",
    description: "Skip the loud clubs and expat forums. Discover the genuine social scene in Pune with curated, conversation-focused meetups.",
    alternates: { canonical: "/pune/social-scene-in-pune" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-zinc-900 text-zinc-100">
            {/* Dark Mode Hero for Nightlife Contrast */}
            <section className="pt-32 pb-20 px-4 max-w-5xl mx-auto text-center">
                <h1 className="text-5xl sm:text-7xl font-black mb-6 text-white tracking-tighter">The <span className="text-pink-500">Real</span> Social Scene in Pune</h1>
                <p className="text-xl text-zinc-400 mb-12 max-w-3xl mx-auto">
                    If you search for <em>"What is the social scene like in Pune?"</em>, you'll often find outdated expat forums or generic lists of nightclubs. But the true social heartbeat of Pune is shifting away from loud bars and toward meaningful, community-driven experiences.
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700">
                        <h3 className="text-xl font-bold mb-3 text-pink-400">Beyond the Nightclubs</h3>
                        <p className="text-zinc-400">While Koregaon Park and Balewadi High Street offer fantastic nightlife, many young professionals in IT hubs like Hinjewadi are seeking deeper connections. Communities like the Fishbowl "Pune Network" highlight a massive demand for authentic networking.</p>
                    </div>
                    <div className="bg-zinc-800 p-8 rounded-2xl border border-zinc-700">
                        <h3 className="text-xl font-bold mb-3 text-pink-400">Community First</h3>
                        <p className="text-zinc-400">The modern Pune social scene is characterized by niche communities: weekend board game groups, open-air chess hangouts in Camp and Kothrud, and intimate community circles. We curate these exact experiences.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-black">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-center">Tap into the Scene</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {cityEvents.slice(0, 4).map((event) => (
                            <div key={event.id} className="brightness-90 hover:brightness-110 transition-all">
                                <EventCard event={event} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="py-20 bg-zinc-900">
                <FacebookGroupCTA />
            </div>
        </div>
    );
}
