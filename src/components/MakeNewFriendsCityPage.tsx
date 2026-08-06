import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";
import CityDirectoryLinks from "@/components/CityDirectoryLinks";
import { Users, MapPin, Coffee, ShieldCheck, ArrowRight, Info, CheckCircle2, Music, Home as HomeIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toISTISOString } from "@/lib/date-utils";

interface MakeNewFriendsCityPageProps {
    cityKey: string;
    cityName: string;
    dbCityName: string;
}

export default async function MakeNewFriendsCityPage({ cityKey, cityName, dbCityName }: MakeNewFriendsCityPageProps) {
    const events = await getEventsByCity(dbCityName);

    // Dynamic schema markup
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.strangermingle.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": cityName,
                "item": `https://www.strangermingle.com/${cityKey}`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `Make New Friends in ${cityName}`,
                "item": `https://www.strangermingle.com/${cityKey}/make-new-friends`
            }
        ]
    };

    const eventSchemas = events.map(event => ({
        "@context": "https://schema.org",
        "@type": "SocialEvent",
        "name": event.title,
        "description": event.short_description || event.title,
        "startDate": toISTISOString(event.start_datetime),
        "endDate": toISTISOString(event.end_datetime),
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": event.event_type === "online" ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
        "location": event.event_type === "online" ? {
            "@type": "VirtualLocation",
            "url": "https://www.strangermingle.com"
        } : {
            "@type": "Place",
            "name": event.location?.venue_name || "TBA",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": event.location?.city || cityName,
                "addressRegion": event.location?.state || "India",
                "addressCountry": "IN"
            }
        },
        "image": event.cover_image_url ? [event.cover_image_url] : [],
        "offers": {
            "@type": "Offer",
            "url": `https://www.strangermingle.com/events/${event.slug}`,
            "price": event.ticket_tiers?.[0]?.price || 0,
            "priceCurrency": "INR",
            "availability": event.booking_count >= (event.max_capacity || 0) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            "validFrom": toISTISOString(event.start_datetime)
        },
        "organizer": {
            "@type": "Organization",
            "name": "Stranger Mingle",
            "url": "https://www.strangermingle.com"
        }
    }));

    return (
        <div className="min-h-screen bg-slate-50 selection:bg-blue-500/20 antialiased">
            {/* Injection of dynamic JSON-LD schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {eventSchemas.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": eventSchemas
                    }) }}
                />
            )}

            {/* Header Hero Section */}
            <section className="relative w-full bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 pt-32 pb-20 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>
                
                <div className="relative max-w-5xl mx-auto text-center">
                    {/* Visual HTML Breadcrumbs for Crawlers & UX */}
                    <nav aria-label="Breadcrumb" className="inline-flex items-center gap-2 text-xs text-slate-300 mb-6 bg-slate-800/60 px-4 py-1.5 rounded-full border border-slate-700/50">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon size={12} /> Home
                        </Link>
                        <ChevronRight size={12} className="text-slate-500" />
                        <Link href={`/${cityKey}`} className="hover:text-white transition-colors font-medium">
                            {cityName}
                        </Link>
                        <ChevronRight size={12} className="text-slate-500" />
                        <span className="text-indigo-300 font-bold">Make New Friends</span>
                    </nav>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                        Make New Friends in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">{cityName}</span>
                    </h1>
                    
                    <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                        Tired of swiping on dating apps or staring at social media feeds? Join India's safest and most active offline community. Meet verified young professionals and make meaningful friendships through curated weekend meetup events.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="px-4 py-2 bg-slate-800/40 rounded-xl border border-slate-700/30 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Safe & Curated
                        </span>
                        <span className="px-4 py-2 bg-slate-800/40 rounded-xl border border-slate-700/30 flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-400" /> Small Groups
                        </span>
                        <span className="px-4 py-2 bg-slate-800/40 rounded-xl border border-slate-700/30 flex items-center gap-2">
                            <Coffee className="w-4 h-4 text-amber-400" /> Zero Pressure
                        </span>
                    </div>
                </div>
            </section>

            <main className="w-full max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Event Listings Column */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-wide mb-2">
                                Upcoming Meetups and Social Gatherings
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                Book your spot at our verified in-person experiences this weekend.
                            </p>
                        </div>

                        {events.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {events.map((event) => (
                                    <div key={event.id} className="h-full">
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-xs p-8">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100">
                                    <Info className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-2">
                                    New meetups coming soon in {cityName}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-md mx-auto">
                                    We're currently planning board game nights, chai mixers, and walks in {cityName}. Drop your details on our waitlist to be notified first!
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="/host-an-event"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg shadow-indigo-600/20"
                                    >
                                        Apply to Host Events <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Cross-Link Card to House Parties */}
                        <div className="p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-purple-500/20">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
                                    <Music className="w-4 h-4 text-purple-400" /> Platonic Mixers in {cityName}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">
                                    Looking for House Parties in {cityName}?
                                </h3>
                                <p className="text-xs text-slate-300 max-w-md">
                                    Join cozy rooftop mixers, board game sessions, and private home gatherings with verified strangers.
                                </p>
                            </div>
                            <Link
                                href={`/${cityKey}/house-parties`}
                                className="whitespace-nowrap px-6 py-3 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
                            >
                                View House Parties <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Rich Editorial SEO Content */}
                        <article className="prose prose-slate max-w-none bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b border-slate-50 pb-2">
                                How to Make New Friends in {cityName} easily?
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                Meeting like-minded people in a new city or keeping up with your social life as a busy professional in {cityName} can be challenging. Between long commutes, high-pressure work in major commercial hubs, and shifting schedules, traditional friend-making avenues can feel limiting.
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                <strong>Stranger Mingle</strong> changes this dynamic by bringing structured, offline social meetups directly to {cityName}. We organize verified, small-group offline events at popular neighborhood spots, creating a natural and comfortable space to make new friends:
                            </p>
                            <ul className="space-y-3 text-slate-600 text-sm mb-6 pl-0 list-none">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">✓</span>
                                    <span><strong>Verified Crowd:</strong> We run profile screenings for in-person events to maintain safety and build a respectful, positive social network.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">✓</span>
                                    <span><strong>Structured Socializing:</strong> Guided interactions, icebreaker games, and engaging formats mean you never have to worry about awkward silences.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold">✓</span>
                                    <span><strong>Community-First:</strong> Absolutely zero pressure. These are dedicated platonic spaces focused purely on community building, networking, and offline interactions.</span>
                                </li>
                            </ul>

                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">
                                Popular Social Hubs for Meetups in {cityName}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Whether you enjoy sharing conversations over filter coffee, walking through local heritage parks, playing board games in cozy cafes, or attending weekend art workshops, {cityName} is filled with vibrant settings. Our meetups are hosted at vetted local venue partners, ensuring you explore the best parts of the city while connecting with fresh faces.
                            </p>

                            {/* Trust Badge Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-slate-100 pt-6 mt-6">
                                <div>
                                    <div className="text-lg font-black text-slate-900">100% Safe</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Curated Gatherings</div>
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900">6-12 Pax</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Intimate Groups</div>
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900">Verified</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">KYC Screening</div>
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900">No Dating</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Purely Platonic</div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* SEO Sidebar Column */}
                    <div className="space-y-8">
                        {/* Premium Membership Ad */}
                        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl border border-indigo-500/10 p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                            <h3 className="text-lg font-black uppercase tracking-wider mb-2">Stranger Mingle Premium</h3>
                            <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                Unlock early booking, exclusive offline events, and special member pricing. Join India's fastest-growing social network.
                            </p>
                            <Link
                                href="/verify-membership"
                                className="block w-full text-center bg-white hover:bg-slate-50 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
                            >
                                Get Membership Access
                            </Link>
                        </div>

                        {/* Local Meetup FAQ */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 border-b border-slate-50 pb-2">
                                FAQ: Making Friends in {cityName}
                            </h3>
                            <div className="space-y-4 divide-y divide-slate-50">
                                <div className="pt-3 first:pt-0">
                                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                                        Are these events safe?
                                    </h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Yes. We perform pre-event screenings and verify each registration to maintain a safe, welcoming atmosphere.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                                        Can I join alone?
                                    </h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Absolutely! Over 90% of our attendees register individually. Our hosts ensure everyone is introduced and comfortable.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                                        Is this a dating club?
                                    </h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        No. Stranger Mingle is strictly platonic. We focus on helping people network and make genuine friends in the city.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-200/50 pt-12">
                    <CityDirectoryLinks citySlug={cityKey} cityName={cityName} />
                    <UpcomingExperiences city={cityName} currentEventId="" />
                </div>
            </main>
        </div>
    );
}

