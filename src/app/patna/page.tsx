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
    title: "Patna - Meetups, Events & Making New Friends in Patna",
    description: "Join curated stranger meetups and social events in Patna. Meet interesting people in Boring Road, Rajendra Nagar, Kankarbagh, and Fraser Road. Small groups. Verified members. Genuinely fun.",
    alternates: {
        canonical: "/patna",
    },
    openGraph: {
        title: "Patna - Meetups, Events & Making New Friends in Patna",
        description: "Join curated stranger meetups and social events in Patna. Meet interesting people in Boring Road, Rajendra Nagar, Kankarbagh, and Fraser Road. Small groups. Verified members. Genuinely fun.",
        url: "/patna",
        type: "website",
        images: ["/images/og-images/og-image-default.webp"],
    }

};

export default async function PatnaCityPage() {
    const cityEvents = await getEventsByCity("Patna");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Patna-related posts
    const patnaPostss = allPosts.filter(post =>
        post.title?.toLowerCase().includes('patna') ||
        post.slug?.toLowerCase().includes('patna') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'patna')
    ).slice(0, 3);

    const popularAreas = [
        { name: "Boring Road", description: "The name is anything but — Boring Road is Patna's most lively stretch, lined with cafes, restaurants, and the kind of crowd that is always up for a good evening out." },
        { name: "Rajendra Nagar", description: "One of Patna's most established residential areas, home to professionals, families, and a thriving local community that values genuine neighbourly connections." },
        { name: "Fraser Road", description: "Patna's commercial and social backbone — always busy, always buzzing, and filled with spaces where strangers naturally end up in conversation." },
        { name: "Kankarbagh", description: "A densely populated and deeply rooted neighbourhood with a strong sense of community. Young working professionals here are fast building Patna's new social scene." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774873375/patna-ganga-river-stranger-mingle-event-place_gm7rtd.jpg"
                        alt="patna-ganga-river-stranger-mingle-event-place"
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Patna&apos;s #1 Community for Meeting New People
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Social Meetups and Events <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            for People in Patna
                        </span>
                    </h1>
                    <p id="city-hero-description" className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Back in Patna after years away, or simply looking for a social life that goes beyond office colleagues and college groups? We run well-organised, safe stranger meetups across the city for people who want more than small talk.
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
                        <div className="text-3xl font-bold text-gray-900">180+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Patnaites</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900">8+</div>
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Stranger Meetups Happening in Patna Right Now</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Pick something this weekend, show up on your own, and let the format do the rest. That is how every great Stranger Mingle story in Patna starts.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events scheduled in Patna yet.</p>
                            <p className="text-gray-400 mt-2">We are bringing Stranger Mingle to Patna very soon — check back shortly!</p>
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
                            <h2 className="text-4xl font-bold mb-6">Meetups Across Every Neighbourhood in Patna</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                From the café-lined stretch of Boring Road to the residential warmth of Rajendra Nagar, Stranger Mingle is building a community throughout Patna. This city has always had incredible people — they just needed a better way to find each other.
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
                                src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1781635420/pune-event_lflo6b_gs7vgu.jpg"
                                alt="People building friendships at a Patna Stranger Mingle event"
                                fill
                                className="object-cover rounded-3xl"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">7+ Cafes</p>
                                <p className="text-blue-100">Partnered in Patna</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle in Patna */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Patna Is Changing Fast — Your Social Life Should Too</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Patna has always been a city of sharp minds and strong opinions — from the lanes of Pataliputra to the banks of the Ganga. But as the city grows and more people move back or move in for work, the old ways of meeting people are not keeping pace. Stranger Mingle is built for exactly this gap.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">No Networking. No Pretence. Just People.</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Patna has never been a city that respects hollow formalities, and neither do we. Every Stranger Mingle event is deliberately kept small so real conversations can happen between people who are genuinely interested in each other — not just handing out business cards.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Verified, Safe, and Well-Organised Events</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every person attending a Stranger Mingle in Patna is verified before they step in. Our partner venues are chosen with care, and our conduct policy is non-negotiable. You should never have to think twice about showing up — and with us, you will not.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">The Right Spots in the Right Parts of Patna</h3>
                        <p className="text-gray-600 leading-relaxed">
                            From a well-loved café on Boring Road to a quiet corner near Dak Bungalow Chowk, we spend time finding venues in Patna where the setting encourages people to open up, stay longer, and actually enjoy the evening.
                        </p>
                    </div>
                </div>
            </section>

            {/* Patna Blog Posts */}
            {patnaPostss.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Patna Social Guides & Local Stories</h2>
                                <p className="text-lg text-gray-600">Ground-level guides and honest member stories from people who found their social footing in Patna through Stranger Mingle.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {patnaPostss.map((post) => (
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
                                            sizes="(max-width: 768px) 100vw, 33vw"
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Patna Has Great People. It Is Time You Met Them.</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Stop waiting for a reason to step out. The next Stranger Mingle event in Patna is your reason — and the people in the room are worth showing up for.
                        </p>
                        <Link href="/events" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">
                            Find Your Next Event in Patna
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>
            </section>


            {/* Upcoming Activities for Patna */}
            {/* Facebook Group CTA */}
            <FacebookGroupCTA />

            <UpcomingExperiences city="Patna" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Stranger Mingle Patna",
                                "description": "City homepage for Stranger Mingle Patna events and community.",
                                "url": "https://www.strangermingle.com/patna",
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["#city-hero-description"]
                                }
                            },
                            {
                                "@type": "Place",
                                "name": "Patna",
                                "description": "Patna city area where Stranger Mingle hosts weekend events.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Patna",
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
                                        "name": "Patna",
                                        "item": "https://www.strangermingle.com/patna"
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