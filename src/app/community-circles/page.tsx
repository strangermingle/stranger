import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Community Circles | Stranger Mingle",
    description: "Safe spaces for unfiltered human talks. Join a community circle and connect on a deeper level.",
    alternates: { canonical: "/community-circles" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-slate-50">
            <section className="pt-32 pb-24 px-4 bg-slate-900 text-white text-center">
                <h1 className="text-5xl sm:text-7xl font-light tracking-tight mb-8">Community <span className="font-bold">Circles</span></h1>
                <p className="text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                    In a world of superficial networking and endless swiping, people are craving real, unfiltered conversations. 
                </p>
            </section>

            <section className="max-w-4xl mx-auto px-4 py-16 -mt-10 relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">What is a Community Circle?</h2>
                        <p className="text-slate-600 text-lg">Stranger Mingle's Community Circles are designed to skip the small talk. These are intimate, guided gatherings where verified individuals can share thoughts, debate ideas, and connect on a fundamentally deeper level than a standard mixer allows. Professional anonymous networks like Blind and Fishbowl prove that people want to talk openly about their lives, struggles, and aspirations.</p>
                    </div>
                    <div className="border-t border-slate-100 pt-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Come Solo, Leave Inspired</h2>
                        <p className="text-slate-600 text-lg">If you're tired of the typical party scene and want to engage in meaningful dialogue, our circles are perfect. Over 80% of participants attend alone, ensuring an environment free of established cliques and full of open minds.</p>
                    </div>
                </div>
            </section>

            <section className="py-16 max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Upcoming Circles</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {cityEvents.slice(0, 4).map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>
        </div>
    );
}
