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
    title: "Visakhapatnam - Meetups, Events & Making Friends in Vizag",
    description: "Join curated stranger meetups and social events in Visakhapatnam. Meet new people in MVP Colony, Rushikonda, Gajuwaka, and Beach Road. Small groups. Verified. Safe. Real fun.",
    alternates: {
        canonical: "/visakhapatnam",
    }
};

export default async function VisakhapatnamCityPage() {
    const cityEvents = await getEventsByCity("Visakhapatnam");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Visakhapatnam-related posts
    const visakhapatnamPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('visakhapatnam') ||
        post.title?.toLowerCase().includes('vizag') ||
        post.slug?.toLowerCase().includes('visakhapatnam') ||
        post.slug?.toLowerCase().includes('vizag') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'visakhapatnam' || tag.toLowerCase() === 'vizag')
    ).slice(0, 3);

    const popularAreas = [
        { name: "MVP Colony", description: "Vizag's well-planned residential pride — wide roads, familiar faces, and enough good cafes to host a different Stranger Mingle event every single week." },
        { name: "Beach Road", description: "With the Bay of Bengal on one side and the city's favourite hangout spots on the other, Beach Road is where Vizag truly comes alive on evenings and weekends." },
        { name: "Rushikonda", description: "The city's IT and education corridor — packed with young professionals and students who moved here for work or study and are now looking to build a real social life." },
        { name: "Gajuwaka", description: "A densely populated industrial and residential pocket that is home to a large working crowd — dependable, close-knit, and ready for a well-organised meetup." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774874341/house-boat-visakhapatanam-stranger-mingle-event-place_obfrhf.jpg"
                        alt="house-boat-visakhapatanam-stranger-mingle-event-place"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Vizag&apos;s #1 Community for Real Friendships
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Meet New People and Make Friends <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            in Visakhapatnam
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Relocated to Vizag for work, or simply outgrown your current circle? We run safe, curated stranger meetups across Visakhapatnam for people who want conversations that actually go somewhere — not just another evening scrolling alone.
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
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Vizagites</div>
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Social Meetups in Visakhapatnam</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Browse events happening across Vizag this week. Show up solo — that is how most people do it, and it works every single time.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events in Visakhapatnam just yet.</p>
                            <p className="text-gray-400 mt-2">Vizag is very much on our radar — check back soon!</p>
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
                            <h2 className="text-4xl font-bold mb-6">Events Across Every Corner of Vizag</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                Whether you live near the steel city belt of Gajuwaka or wake up to sea views on Beach Road, Stranger Mingle is building a community in your part of Visakhapatnam. The City of Destiny deserves a social scene to match.
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
                                alt="People making friends at a Vizag Stranger Mingle event"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">9+ Cafes</p>
                                <p className="text-blue-100">Partnered in Vizag</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle in Vizag */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Vizag Is Friendly — But Making Friends Here Takes More Than That</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Visakhapatnam has always had a distinct warmth to it — from the hills of Araku to the shores of RK Beach, people here are open and easy-going. But warmth alone does not build a social circle. Stranger Mingle gives that warmth a proper structure.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Small Groups, Real Connections</h3>
                        <p className="text-gray-600 leading-relaxed">
                            No giant networking halls. No awkward speed-friend formats. We keep every Vizag meetup small and structured so that genuine friendships have room to form — the kind you actually look forward to, not just tolerate.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Every Member Verified, Every Event Safe</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Safety is not a feature we added as an afterthought. Every Stranger Mingle member in Visakhapatnam is verified before attending any event. Our partner venues are carefully chosen, and our zero-tolerance policy means everyone can show up and be at ease.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Venues That Do the Heavy Lifting</h3>
                        <p className="text-gray-600 leading-relaxed">
                            The right venue makes a stranger meetup work. We pick spots in Vizag where the ambience is relaxed, the noise level lets you hear each other, and the setting feels good enough that you want to stay longer than planned.
                        </p>
                    </div>
                </div>
            </section>

            {/* Visakhapatnam Blog Posts */}
            {visakhapatnamPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Vizag Social Guides & Stories</h2>
                                <p className="text-lg text-gray-600">Honest local guides and real member stories from people building their social life in Visakhapatnam.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {visakhapatnamPosts.map((post) => (
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Your Next Friend in Vizag Is Already Signed Up</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Visakhapatnam is a city of good people — they just need the right room to meet each other. Join the next Stranger Mingle event and be in that room.
                        </p>
                        <Link href="/events" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">
                            Find Your Next Event in Visakhapatnam
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>
            </section>


            {/* Upcoming Activities for Visakhapatnam */}
            <UpcomingExperiences city="Visakhapatnam" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "Stranger Mingle Visakhapatnam",
                            "description": "City homepage for Stranger Mingle Visakhapatnam events and community.",
                            "url": "https://www.strangermingle.com/visakhapatnam"
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
                                    "name": "Visakhapatnam",
                                    "item": "https://www.strangermingle.com/visakhapatnam"
                                }
                            ]
                        }
                    ])
                }}
            />
        </div>
    );
}