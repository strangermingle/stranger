import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Board Game Nights | Stranger Mingle",
    description: "Join our board game nights. A perfect way to break the ice and meet new friends.",
    alternates: { canonical: "/board-game-nights" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <section className="pt-32 pb-20 px-4 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-5xl font-black text-amber-900 mb-6">Board Game Nights Across Cities</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Across peer-to-peer recommendation sites, when someone asks how to make friends without the pressure of a bar or club, the top answer is invariably: <strong>Board Games</strong>.
                    </p>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-16 mb-20">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">The Ultimate Icebreaker</h2>
                        <p className="text-gray-600 text-lg">Board game nights offer a structured, engaging way to interact with strangers. The game provides the conversation, so you never have to worry about awkward silences. It's a proven model for community building—just look at the massive success of free community hangouts spanning multiple neighborhoods in cities like Pune.</p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Curated for Connection</h2>
                        <p className="text-gray-600 text-lg">At Stranger Mingle, our Board Game Nights elevate this experience. We curate the groups, provide the games, and our hosts ensure everyone understands the rules and feels included. Whether you're a Catan veteran or a casual Uno player, coming alone to our board game nights is the smartest social move you can make.</p>
                    </div>
                </div>

                <h2 className="text-3xl font-bold text-center mb-12">Upcoming Game Nights</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {cityEvents.slice(0, 6).map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
            
            <FacebookGroupCTA />
        </div>
    );
}
