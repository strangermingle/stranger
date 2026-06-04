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
    title: "Surat - Meetups, Events & Making New Friends in Surat",
    description: "Join curated stranger meetups and social events in Surat. Meet interesting people in Adajan, Vesu, Athwa, and Pal. Small groups. Verified. Actually fun.",
    alternates: {
        canonical: "/surat",
    },
    openGraph: {
        url: "/surat",
    }

};

export default async function SuratCityPage() {
    const cityEvents = await getEventsByCity("Surat");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Surat-related posts
    const suratPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('surat') ||
        post.slug?.toLowerCase().includes('surat') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'surat')
    ).slice(0, 3);

    const popularAreas = [
        { name: "Adajan", description: "Surat's most happening residential belt — packed with cafes, parks, and a crowd that loves a good evening out." },
        { name: "Vesu", description: "The go-to neighbourhood for young professionals and families who want good food and even better company." },
        { name: "Athwa", description: "The cultural and commercial spine of Surat — central, accessible, and always buzzing." },
        { name: "Pal", description: "A fast-growing locality with a relaxed vibe, greenery, and some of the city's most underrated hangout spots." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774873375/patna-ganga-river-stranger-mingle-event-place_gm7rtd.jpg"
                        alt="surat-historical-stranger-mingle-event-place"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Surat&apos;s #1 Community for Making New Friends
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Meet New People at Curated <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            Stranger Meetups in Surat
                        </span>
                    </h1>
                    <p id="city-hero-description" className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        New to the Diamond City? Or just tired of the same old WhatsApp groups? We run safe, well-organised meetups across Surat for people who want genuine friendships — no awkward intros, no forced networking.
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
                        <div className="text-3xl font-bold text-gray-900">250+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Suraties</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">12+</div>
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Social Meetups and Events in Surat</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Pick a weekend, show up by yourself — most people do. No pressure, just good conversations over good chai or coffee.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events scheduled in Surat yet.</p>
                            <p className="text-gray-400 mt-2">Check back soon — we are growing fast here!</p>
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
                            <h2 className="text-4xl font-bold mb-6">Find Friends in Your Own Part of Surat</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                From the lanes of Athwa to the wide roads of Vesu, Stranger Mingle is spreading across Surat. Wherever you live, there&apos;s a meetup nearby — and people just like you waiting to show up.
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
                                alt="Stranger Mingle meetup in Surat"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">10+ Cafes</p>
                                <p className="text-blue-100">Partnered in Surat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle? */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Surat Needs Something Like Stranger Mingle</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Surat moves fast — new people keep arriving, old friendships drift apart. We give you a simple, low-effort way to meet the right people.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Small Groups, Real Conversations</h3>
                        <p className="text-gray-600 leading-relaxed">
                            This is not a networking event or a dating app. We cap groups small so every person actually gets to talk — no getting lost in a crowd of 200 strangers.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Verified People, Safe Spaces</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every participant goes through verification before they can attend. We maintain zero tolerance for any behaviour that makes someone uncomfortable. Your safety is non-negotiable.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Handpicked Venues Across Surat</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We do not just pick any place. Our venues are scouted for ambience, accessibility, and the right energy — so the setting does half the work for you.
                        </p>
                    </div>
                </div>
            </section>

            {/* Surat Blog Posts */}
            {suratPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Surat City Guides &amp; Stories</h2>
                                <p className="text-lg text-gray-600">Real experiences and local guides for people building their social life in Surat.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {suratPosts.map((post) => (
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Surat Is Full of Great People — Go Meet Them</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Stop waiting for the right moment. The next Stranger Mingle event in Surat might just be the best Sunday you have had in a while.
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


            {/* Upcoming Activities for Surat */}
            {/* Facebook Group CTA */}
            <FacebookGroupCTA />

            <UpcomingExperiences city="Surat" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Stranger Mingle Surat",
                                "description": "City homepage for Stranger Mingle Surat events and community.",
                                "url": "https://www.strangermingle.com/surat",
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["#city-hero-description"]
                                }
                            },
                        {
                                "@type": "Place",
                                "name": "Surat",
                                "description": "Surat city area where Stranger Mingle hosts weekend events.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Surat",
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
                                    "name": "Surat",
                                    "item": "https://www.strangermingle.com/surat"
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