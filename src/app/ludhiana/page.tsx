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
    title: "Ludhiana Social Meetups & Friend Circles",
    description: "Connect with friendly locals in Ludhiana. Join curated weekend meetups in Sarabha Nagar, Model Town, Civil Lines & BRS Nagar. Safe, verified, small-group events.",
    keywords: ["Ludhiana meetups", "Sarabha Nagar events", "Model Town social group", "make friends Ludhiana", "BRS Nagar meetups"],
    alternates: {
        canonical: "/ludhiana",
    },
    openGraph: {
        title: "Ludhiana Social Meetups & Friend Circles",
        description: "Connect with friendly locals in Ludhiana. Join curated weekend meetups in Sarabha Nagar, Model Town, Civil Lines & BRS Nagar. Safe, verified, small-group events.",
        url: "/ludhiana",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: '/images/og-images/og-image-default.webp',
                width: 1200,
                height: 630,
                alt: 'Stranger Mingle - Weekend Social Meetups & Events',
            },
        ],
    },
};

export default async function LudhianaCityPage() {
    const cityEvents = await getEventsByCity("Ludhiana");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'author', 'image', 'excerpt', 'tags']);

    // Filter for Ludhiana-related posts
    const ludhianaPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('ludhiana') ||
        post.slug?.toLowerCase().includes('ludhiana') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'ludhiana')
    ).slice(0, 3);

    const popularAreas = [
        { name: "Sarabha Nagar", description: "Ludhiana's most upscale and sorted neighbourhood — wide lanes, good cafes, and a crowd that knows how to have a proper Sunday well spent." },
        { name: "Model Town", description: "The heart of social Ludhiana. Busy markets, beloved dhabas, and a mix of students and professionals who are always up for a solid adda session." },
        { name: "Civil Lines", description: "Old money, new energy. Civil Lines brings together Ludhiana's established families and its growing young crowd in one of the city's most comfortable parts." },
        { name: "BRS Nagar", description: "A thriving residential pocket close to everything that matters. Relaxed enough for a long evening out, connected enough to draw people from across the city." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image sizes="100vw"
                        src="https://res.cloudinary.com/strangermingle/image/upload/q_auto/f_auto/v1774872595/gurudwara-ludhiana-stranger-mingle-event-place_sf6bl9.jpg"
                        alt="gurudwara-ludhiana-stranger-mingle-event-place"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Ludhiana&apos;s #1 Community for Making Real Friends
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Stranger Meetups and Weekend Social Events <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-lg">
                            in Ludhiana
                        </span>
                    </h1>
                    <p id="city-hero-description" className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Punjab da dil, Ludhiana, is a city that runs on warmth and hustle both. But between work, family, and the same old gedi route, finding a fresh circle is harder than it looks. We fix that — with safe, well-planned meetups where real friendships actually start.
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
                        <div className="text-3xl font-bold text-gray-900">200+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Ludhiana Members</div>
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
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Member Rating</div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section id="events" className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Stranger Meetups in Ludhiana This Weekend</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Pick a spot, show up, and meet people you actually have things in common with. First-timers always welcome — most folk come alone and leave with plans already made.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events in Ludhiana just yet.</p>
                            <p className="text-gray-400 mt-2">Ludhiana is next on our list — check back very soon!</p>
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
                            <h2 className="text-4xl font-bold mb-6">Find Your People in Your Part of Ludhiana</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                From the well-heeled lanes of Sarabha Nagar to the lively buzz of Model Town, Stranger Mingle is growing across every pocket of the city. Wherever you stay in Ludhiana, there is a meetup happening near you.
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
                            <Image sizes="(max-width: 1024px) 100vw, 50vw"
                                src="https://res.cloudinary.com/strangermingle/image/upload/q_auto/f_auto/v1775676269/14590_piqsow.jpg"
                                alt="Strangers becoming friends at a Ludhiana meetup"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">8+ Cafes</p>
                                <p className="text-blue-100">Partnered in Ludhiana</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle? */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Ludhiana Needs Stranger Mingle</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Connecting friendly locals & young entrepreneurs.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Vibrant Offline Friendships</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Bringing youth & young entrepreneurs in Sarabha Nagar & Model Town together.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Verified Member Screening</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Safe, friendly, and respectful environment for first-timers & female attendees.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Cozy Cafe Socials</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Swapping virtual scrolling for real weekend conversations over coffee & games.
                        </p>
                    </div>
                </div>
            </section>

            {/* Ludhiana Blog Posts */}
            {ludhianaPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Ludhiana City Guides & Social Stories</h2>
                                <p className="text-lg text-gray-600">Honest tips, local spots, and real stories from people building a social life in Ludhiana.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {ludhianaPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100"
                                >
                                    <div className="relative h-48 w-full">
                                        <Image sizes="(max-width: 768px) 100vw, 33vw"
                                            src={post.image || '/images/default-blog.jpg'}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-medium">
                                            <span>By {post.author || 'Stranger Mingle Desk'}</span>
                                            <span>•</span>
                                            <span>{formatBlogDate(post.date)}</span>
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Mingle in Ludhiana?</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Stop spending every weekend with the same crowd. The next Stranger Mingle event in Ludhiana is right around the corner — and the friends you haven&apos;t met yet are already signed up.
                        </p>
                        <Link href="/events" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">
                            Find Your Next Event in Ludhiana
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>
            </section>


            {/* Upcoming Activities for Ludhiana */}
            {/* Facebook Group CTA */}
            <FacebookGroupCTA />

            <UpcomingExperiences city="Ludhiana" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Stranger Mingle Ludhiana",
                                "description": "City homepage for Stranger Mingle Ludhiana events and community.",
                                "url": "https://www.strangermingle.com/ludhiana",
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["#city-hero-description"]
                                }
                            },
                        {
                                "@type": "Place",
                                "name": "Ludhiana",
                                "description": "Ludhiana city area where Stranger Mingle hosts weekend events.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Ludhiana",
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
                                    "name": "Ludhiana",
                                    "item": "https://www.strangermingle.com/ludhiana"
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