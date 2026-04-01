import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEventsByCity } from "@/lib/events";
import { getAllPosts, formatBlogDate } from "@/lib/blog";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";

import { MapPin, Users, ShieldCheck, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Chennai - Meetups, Events & Making Friends in Chennai",
    description: "Join curated stranger meetups and social events in Chennai. Meet new people in Anna Nagar, T. Nagar, Adyar, and OMR. Small groups. Safe. Real connections.",
    alternates: {
        canonical: "/chennai",
    }
};

export default async function ChennaiCityPage() {
    const cityEvents = await getEventsByCity("Chennai");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Chennai-related posts
    const chennaiPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('chennai') ||
        post.slug?.toLowerCase().includes('chennai') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'chennai')
    ).slice(0, 3);

    const popularAreas = [
        { name: "Anna Nagar & Kilpauk", description: "One of Chennai's most active residential pockets — full of young professionals, good filter coffee joints, and people who are always up for a chat." },
        { name: "T. Nagar & Nungambakkam", description: "The commercial and cultural pulse of the city, where everything from weekend shopping to late evening meetups feels just right." },
        { name: "Adyar & Besant Nagar", description: "South Chennai's favourite stretch — sea breeze, quiet lanes, and some of the best small cafes the city has to offer." },
        { name: "OMR & Sholinganallur", description: "Where Chennai's IT corridor lives and breathes. Thousands of young professionals here, all looking for a social life beyond the office." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774871250/chennai-stranger-mingle-event-place_ox7v2u.jpg"
                        alt="Friends at a Chennai cafe meetup"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Chennai&apos;s #1 Community for Strangers
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Stranger Meetups and Social Events <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            in Chennai
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Moved to Chennai for work? Or simply craving a social circle that goes beyond colleagues and cousins? We run safe, well-organised meetups across the city for people who want to build friendships that actually last.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/events" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25">
                            See Upcoming Events
                        </Link>
                        <Link href="/about" className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-lg transition-all">
                            How it Works
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats / Proof */}
            <section className="py-12 border-b border-gray-100 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">280+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Chennaites</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">14+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widests font-medium">Monthly Events</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">100%</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Safe & Curated</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Member Rating</div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section id="events" className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Meetups in Chennai This Weekend</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Walk in alone, leave with people you&apos;ll actually want to meet again. Most attendees come solo — and that&apos;s exactly the point.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events scheduled in Chennai yet.</p>
                            <p className="text-gray-400 mt-2">We are coming to Chennai soon — check back shortly!</p>
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <Link href="/events" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25 hover:scale-105">
                        View all events
                    </Link>
                </div>
            </section>

            {/* Popular Areas Section */}
            <section className="py-24 bg-gray-900 text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Find Your People Across Every Part of Chennai</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                From the old-world charm of Mylapore to the glass towers of OMR, Chennai is a city of many faces. We hold events across neighbourhoods so you never have to travel far to find your crowd.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {popularAreas.map((area) => (
                                    <div key={area.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <MapPin className="w-5 h-5 text-blue-400" />
                                            <h3 className="font-bold text-lg">{area.name}</h3>
                                        </div>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {area.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square">
                            <Image
                                src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1768620120/diverse-young-people-talking-coffee-shop_doxz0c.jpg"
                                alt="Chennai Stranger Meetup"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">11+ Cafes</p>
                                <p className="text-blue-100">Partnered in Chennai</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle? */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Chennai Professionals Need Stranger Mingle</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Chennai is a city that takes time to open up — but once it does, the friendships run deep. We just help you get there faster.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Friendships, Not Networking</h3>
                        <p className="text-gray-600 leading-relaxed">
                            No business cards, no elevator pitches. Just small groups of people meeting over good coffee — with every intention of actually getting to know each other.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Verified Attendees, Zero Compromise</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every participant goes through a verification process before joining. Safety is not an afterthought here — it is built into how every event is planned and run.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Chennai&apos;s Best Spots, Carefully Picked</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Filter coffee at a sunlit Mylapore cafe or an evening get-together near the Elliots Beach promenade — we choose venues where Chennai itself sets the mood.
                        </p>
                    </div>
                </div>
            </section>

            {/* Chennai Blog Posts */}
            {chennaiPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Chennai City Guides</h2>
                                <p className="text-lg text-gray-600">Honest reads on making friends, finding your crowd, and enjoying Chennai beyond work.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {chennaiPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={post.image || '/images/default-blog.jpg'}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-sm text-gray-400 mb-2">
                                            {formatBlogDate(post.date)}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-blue-600 font-bold text-sm inline-flex items-center gap-1">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 max-w-5xl mx-auto px-4">
                <div className="bg-linear-to-br from-blue-600 to-purple-700 rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Mingle in Chennai?</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Stop spending weekends scrolling when there is a whole city full of interesting people waiting to be met. Join the next Stranger Mingle Chennai event and make it happen.
                        </p>
                        <Link href="/events" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">
                            Find Your Next Event
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>
            </section>


            {/* Upcoming Activities for Chennai */}
            <UpcomingExperiences city="Chennai" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "Stranger Mingle Chennai",
                            "description": "City homepage for Stranger Mingle Chennai events and community.",
                            "url": "https://www.strangermingle.com/chennai"
                        },
                        {
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
                                    "name": "Chennai",
                                    "item": "https://www.strangermingle.com/chennai"
                                }
                            ]
                        }
                    ])
                }}
            />
        </div>
    );
}