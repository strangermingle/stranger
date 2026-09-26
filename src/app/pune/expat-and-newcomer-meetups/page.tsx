import type { Metadata } from "next";
import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Expat and Newcomer Meetups in Pune | Stranger Mingle",
    description: "Just moved to Pune? Skip the thin forums and join our welcoming expat and newcomer meetups.",
    alternates: { canonical: "/pune/expat-and-newcomer-meetups" }
};

export default async function Page() {
    const cityEvents = await getEventsByCity("Pune");

    return (
        <div className="min-h-screen bg-white">
            <section className="flex flex-col md:flex-row min-h-[70vh]">
                <div className="flex-1 bg-blue-900 flex flex-col justify-center px-8 md:px-16 py-20 text-white">
                    <h1 className="text-5xl font-black mb-6">Just Moved to Pune?</h1>
                    <p className="text-xl text-blue-100 mb-6"><em>"How do I meet people in Pune?"</em> This is the most frequently asked question on expat forums and relocation boards. Pune is a melting pot of students, IT professionals, and expats, yet newcomers often find it hard to break into established local circles.</p>
                    <p className="text-lg text-blue-200 border-l-4 border-blue-400 pl-4">Stranger Mingle events are practically built for newcomers. With a high volume of participants who have just moved to Pune for work or studies, you'll instantly find common ground.</p>
                </div>
                <div className="flex-1 bg-gray-50 flex flex-col justify-center px-8 md:px-16 py-20">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Skip the Forums, Meet Real People</h2>
                    <div className="space-y-6">
                        {cityEvents.slice(0, 2).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">Beyond the Expat Groups</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                    While online groups on Fishbowl or Facebook can answer logistical questions about moving to Viman Nagar or Kalyani Nagar, they don't solve the core issue of human connection. Our curated, safe environment takes the guesswork out of making your very first friends in a new city.
                </p>
            </section>
            
            <UpcomingExperiences city="Pune" currentEventId="" />
        </div>
    );
}
