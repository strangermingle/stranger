import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEventsByCity } from "@/lib/events";
import { getAllPosts, formatBlogDate } from "@/lib/blog";
import EventCard from "@/components/EventCard";
import UpcomingExperiences from "@/components/event/UpcomingExperiences";
import FacebookGroupCTA from "@/components/FacebookGroupCTA";

import { MapPin, Users, ShieldCheck, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Lucknow - Meetups, Events & Making Friends in Lucknow",
    description: "Join curated stranger meetups and events in Lucknow. Meet new people in Gomti Nagar, Hazratganj, Aliganj, and Indira Nagar. Small groups. Safe. Fun.",
    alternates: {
        canonical: "/lucknow",
    },
    openGraph: {
        title: "Lucknow - Meetups, Events & Making Friends in Lucknow",
        description: "Join curated stranger meetups and events in Lucknow. Meet new people in Gomti Nagar, Hazratganj, Aliganj, and Indira Nagar. Small groups. Safe. Fun.",
        url: "/lucknow",
        type: "website",
        images: ["/images/og-images/og-image-default.webp"],
    }

};

export default async function LucknowCityPage() {
    const cityEvents = await getEventsByCity("Lucknow");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Lucknow-related posts
    const lucknowPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('lucknow') ||
        post.slug?.toLowerCase().includes('lucknow') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'lucknow')
    ).slice(0, 3);

    const popularAreas = [
        { name: "Gomti Nagar", description: "Lucknow's most polished and rapidly growing locality — wide avenues, excellent cafes, and a crowd of professionals who are genuinely open to meeting new people." },
        { name: "Hazratganj", description: "The cultural heart of the city. Heritage buildings, bookshops, and the kind of unhurried pace that makes a first conversation with a stranger feel completely natural." },
        { name: "Aliganj", description: "Busy, familiar, and full of life. A neighbourhood that has been growing for decades and now hosts some of Lucknow's most welcoming hangout spots." },
        { name: "Indira Nagar", description: "One of the largest residential areas in UP — home to thousands of young working adults who moved here for opportunity and are still looking for their social circle." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/q_auto/f_auto/v1775676269/14590_piqsow.jpg"
                        alt="minaret-lucknow-stranger-mingle-event-place"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Lucknow&apos;s #1 Community for Strangers
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Meet Strangers, Make Friends <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            in Lucknow
                        </span>
                    </h1>
                    <p id="city-hero-description" className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Lucknow is famous for its tehzeeb — the art of making every person feel welcome. We carry that same spirit into our meetups. Safe, curated gatherings across the City of Nawabs for people who want friendships worth keeping.
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
                        <div className="text-3xl font-bold text-gray-900">220+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Lucknowites</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">10+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Monthly Events</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">100%</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Safe & Curated</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">User Rating</div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section id="events" className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Social Meetup Events in Lucknow</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Choose an event, turn up, and let Lucknow&apos;s famous hospitality do the rest. First-timers are always made to feel at home — and yes, coming alone is completely normal here.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events scheduled in Lucknow yet.</p>
                            <p className="text-gray-400 mt-2">Check back soon!</p>
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
                            <h2 className="text-4xl font-bold mb-6">Your Part of Lucknow Has a Stranger Mingle Waiting</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                From the heritage corridors of Hazratganj to the modern stretch of Gomti Nagar, Lucknow is a city of distinct neighbourhoods — each with its own personality. We are building Stranger Mingle into every one of them, so the right people always find each other close to home.
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
                                alt="Group of strangers connecting at a Lucknow cafe meetup"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">9+ Cafes</p>
                                <p className="text-blue-100">Partnered in Lucknow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle? */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">The City of Nawabs Deserves Better Than Shallow Socialising</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Lucknow has always valued depth — in conversation, in culture, in relationships. Stranger Mingle is built around the same idea. No surface-level small talk. Just real people, real settings, real connections.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Small Groups Where Everyone Matters</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We cap every Lucknow meetup at six to ten people. In a group that size, nobody gets lost — every voice is heard and every connection has a genuine chance to grow into something real.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Thorough Verification, Zero Compromise on Safety</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every participant is verified before attending any Lucknow event. A strict code of conduct is in place and enforced — so you can walk in as a stranger and feel safe from the very first minute.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Venues That Match Lucknow&apos;s Character</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We look beyond the obvious. Lucknow has brilliant cafes tucked away in Hazratganj lanes and rooftop spots above Gomti Nagar — we find the ones where the setting itself starts the conversation.
                        </p>
                    </div>
                </div>
            </section>

            {/* Lucknow Blog Posts */}
            {lucknowPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Lucknow City Guides</h2>
                                <p className="text-lg text-gray-600">First-hand guides and honest stories about finding your people in the City of Nawabs.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {lucknowPosts.map((post) => (
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Mingle in Lucknow?</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            A city that perfected the art of hospitality centuries ago surely has room for one more good friendship. Come to the next Stranger Mingle and find yours.
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


            {/* Upcoming Activities for Lucknow */}
            {/* Facebook Group CTA */}
            <FacebookGroupCTA />

            <UpcomingExperiences city="Lucknow" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Stranger Mingle Lucknow",
                                "description": "City homepage for Stranger Mingle Lucknow events and community.",
                                "url": "https://www.strangermingle.com/lucknow",
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["#city-hero-description"]
                                }
                            },
                        {
                                "@type": "Place",
                                "name": "Lucknow",
                                "description": "Lucknow city area where Stranger Mingle hosts weekend events.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Lucknow",
                                    "addressCountry": "IN"
                                }
                            },
                            {
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
                                    "name": "Lucknow",
                                    "item": "https://www.strangermingle.com/lucknow"
                                }
                            ]
                        }
                        ]
                    })
                }}
            />
        </div>
    );
}