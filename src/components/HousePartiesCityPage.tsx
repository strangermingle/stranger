import { getEventsByCity } from "@/lib/events";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";
import CityDirectoryLinks from "@/components/CityDirectoryLinks";
import { Users, MapPin, Coffee, ShieldCheck, ArrowRight, Info, Music, Home as HomeIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { toISTISOString } from "@/lib/date-utils";

interface HousePartiesCityPageProps {
    cityKey: string;
    cityName: string;
    dbCityName: string;
}

export default async function HousePartiesCityPage({ cityKey, cityName, dbCityName }: HousePartiesCityPageProps) {
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
                "name": `House Parties in ${cityName}`,
                "item": `https://www.strangermingle.com/${cityKey}/house-parties`
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
        <div className="min-h-screen bg-slate-50 selection:bg-purple-500/20 antialiased">
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
            <section className="relative w-full bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-950 pt-32 pb-20 px-4 overflow-hidden">
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
                        <span className="text-purple-300 font-bold">House Parties</span>
                    </nav>

                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                        House Parties in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">{cityName}</span>
                    </h1>
                    
                    <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                        Looking for a relaxed way to socialize? Experience vetted, safe, and curated platonic house parties and social mixers in {cityName}. Meet interesting people in cozy, home-style setups and build meaningful connections.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="px-4 py-2 bg-slate-800/40 rounded-xl border border-slate-700/30 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Vetted Guests
                        </span>
                        <span className="px-4 py-2 bg-slate-800/40 rounded-xl border border-slate-700/30 flex items-center gap-2">
                            <Users className="w-4 h-4 text-purple-400" /> Cosy Gatherings
                        </span>
                        <span className="px-4 py-2 bg-slate-800/40 rounded-xl border border-slate-700/30 flex items-center gap-2">
                            <Music className="w-4 h-4 text-pink-400" /> Fun Icebreakers
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
                                Upcoming House Parties and Mixers
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                Book your spot to join our upcoming offline experiences in {cityName}.
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
                                    New house parties coming soon in {cityName}
                                </h3>
                                <p className="text-slate-500 text-sm max-w-md mx-auto">
                                    We're curating safe and warm house parties, board game mixers, and rooftop sessions in {cityName}. Join the waitlist to get invited!
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href="/host-an-event"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg shadow-purple-600/20"
                                    >
                                        Apply to Host <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Cross-Link Card to Make New Friends */}
                        <div className="p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-950 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-indigo-500/20">
                            <div>
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">
                                    <Users className="w-4 h-4 text-indigo-400" /> Friendships in {cityName}
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-1">
                                    Want to Make New Friends in {cityName}?
                                </h3>
                                <p className="text-xs text-slate-300 max-w-md">
                                    Join weekend coffee meetups, board game nights, and social circles with verified young professionals.
                                </p>
                            </div>
                            <Link
                                href={`/${cityKey}/make-new-friends`}
                                className="whitespace-nowrap px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                            >
                                View Friend Meetups <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Rich Editorial SEO Content */}
                        <article className="prose prose-slate max-w-none bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4 border-b border-slate-50 pb-2">
                                Why Attend Platonic House Parties in {cityName}?
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                Traditional clubbing, noisy bars, or dating apps are not for everyone. If you prefer warm conversations, shared laughter, and getting to know people at a deeper level, a social house party is the ideal format. It brings together the comfort of a home environment with the excitement of meeting new friends in {cityName}.
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                At <strong>Stranger Mingle</strong>, we curate platonic, small-group house parties and social mixers to ensure a friendly, respectful, and safe experience:
                            </p>
                            <ul className="space-y-3 text-slate-600 text-sm mb-6 pl-0 list-none">
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">✓</span>
                                    <span><strong>Vetted Communities:</strong> Every attendee goes through a profile screening to make sure the crowd is safe, respectful, and welcoming.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">✓</span>
                                    <span><strong>Casual Formats:</strong> Interactive group games, board games, karaoke, and icebreaker sessions keep the energy high and conversations natural.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">✓</span>
                                    <span><strong>No Romance/Sales Pitch:</strong> A strictly platonic space meant exclusively for networking, social interactions, and building long-lasting friendships.</span>
                                </li>
                            </ul>

                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-4">
                                What to Expect at a Stranger Mingle House Party?
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Hosted by verified community hosts at vetted private homes, villas, or cozy partner cafes in {cityName}, our mixers are focused on engagement. You can look forward to interactive board games, tea/coffee sessions, pizza parties, acoustic jams, and easy-going discussions. It's the absolute best way to spend a weekend.
                            </p>

                            {/* Trust Badge Bar */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border-t border-slate-100 pt-6 mt-6">
                                <div>
                                    <div className="text-lg font-black text-slate-900">Secure Homes</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Vetted Venues</div>
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900">Platonic</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">No Dating Push</div>
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900">KYC Verified</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Safe Registry</div>
                                </div>
                                <div>
                                    <div className="text-lg font-black text-slate-900">Host Assisted</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Guided Mixers</div>
                                </div>
                            </div>
                        </article>
                    </div>

                    {/* SEO Sidebar Column */}
                    <div className="space-y-8">
                        {/* Premium Membership Ad */}
                        <div className="bg-gradient-to-br from-purple-900 via-purple-950 to-slate-900 rounded-3xl border border-purple-500/10 p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                            <h3 className="text-lg font-black uppercase tracking-wider mb-2">Exclusive Access</h3>
                            <p className="text-slate-300 text-xs leading-relaxed mb-6">
                                Join as a premium member to get priority bookings for house parties, exclusive guest list access, and special community invites.
                            </p>
                            <Link
                                href="/verify-membership"
                                className="block w-full text-center bg-white hover:bg-slate-50 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md"
                            >
                                Apply for Access
                            </Link>
                        </div>

                        {/* Local Meetup FAQ */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-xs">
                            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 border-b border-slate-50 pb-2">
                                FAQ: House Parties in {cityName}
                            </h3>
                            <div className="space-y-4 divide-y divide-slate-50">
                                <div className="pt-3 first:pt-0">
                                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                                        Are the venues safe and verified?
                                    </h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Yes. All house parties are held at verified private spaces hosted by KYC-screened community members.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                                        Can girls join safely?
                                    </h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Absolutely. We enforce a strict code of conduct, profile check all attendees, and maintain gender balance to ensure a comfortable and secure space.
                                    </p>
                                </div>
                                <div className="pt-3">
                                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide mb-1">
                                        What is the agenda?
                                    </h4>
                                    <p className="text-slate-500 text-xs leading-relaxed">
                                        Every party begins with host introductions, followed by facilitated group games, music, food, and plenty of time for general socializing.
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

