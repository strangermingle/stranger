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
    title: "Vadodara Social Meetups & Community Events",
    description: "Connect with warm, interesting souls in Baroda. Join curated stranger meetups across Alkapuri, Sayajigunj, Fatehgunj & Manjalpur. Small groups, verified crowd, real friendships.",
    keywords: ["Vadodara meetups", "Alkapuri events", "Fatehgunj social group", "make friends Vadodara", "Sayajigunj meetups"],
    alternates: {
        canonical: "/vadodara",
    },
    openGraph: {
        title: "Vadodara Social Meetups & Community Events",
        description: "Connect with warm, interesting souls in Baroda. Join curated stranger meetups across Alkapuri, Sayajigunj, Fatehgunj & Manjalpur. Small groups, verified crowd, real friendships.",
        url: "/vadodara",
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

export default async function VadodaraCityPage() {
    const cityEvents = await getEventsByCity("Vadodara");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'author', 'image', 'excerpt', 'tags']);

    // Filter for Vadodara-related posts
    const vadodaraPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('vadodara') ||
        post.slug?.toLowerCase().includes('vadodara') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'vadodara')
    ).slice(0, 3);

    const popularAreas = [
        { name: "Alkapuri", description: "Vadodara's most polished address — wide roads, upmarket cafes, and a crowd that knows how to have a proper conversation over good food." },
        { name: "Sayajigunj", description: "The beating heart of Baroda, home to MSU students, bookshops, and the kind of street-level energy that makes every meetup feel alive." },
        { name: "Fatehgunj", description: "A lively student and professional pocket close to the university belt. Relaxed, unpretentious, and full of people who are genuinely interesting to talk to." },
        { name: "Manjalpur", description: "One of Vadodara's fastest-growing localities — young families, working professionals, and a rising café culture that is becoming a natural home for Stranger Mingle events." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image sizes="100vw"
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774874094/vadodara-historical-stranger-mingle-event-place_q4nwcy.jpg"
                        alt="vadodara-historical-stranger-mingle-event-place"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Vadodara&apos;s #1 Community for Making Real Friends
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Stranger Meetups and Social Events <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            in Vadodara
                        </span>
                    </h1>
                    <p id="city-hero-description" className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        New to Baroda, or tired of the same old social circle? We organise safe, well-curated meetups in Vadodara for people who want honest conversations and friendships that actually last.
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
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Barodians</div>
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Stranger Meetups in Vadodara This Weekend</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Pick an event, show up, and let the conversation do the rest. First-timers always welcome — most people walk in alone and leave with a solid group.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events in Vadodara just yet.</p>
                            <p className="text-gray-400 mt-2">Baroda is next on our map — check back very soon!</p>
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
                            <h2 className="text-4xl font-bold mb-6">Find Your People in Your Part of Vadodara</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                From the polished avenues of Alkapuri to the student buzz of Sayajigunj, Stranger Mingle is growing across every neighbourhood of Baroda. Wherever you live or work in Vadodara, there is an event close to you.
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
                                src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1781635420/pune-event_lflo6b_gs7vgu.jpg"
                                alt="Strangers becoming friends at a Vadodara meetup"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">8+ Cafes</p>
                                <p className="text-blue-100">Partnered in Baroda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle? */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Vadodara Needs Stranger Mingle</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Connecting warm, creative souls in Baroda.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Baroda Social Culture</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Connecting warm, interesting souls across Alkapuri, Sayajigunj & Fatehgunj.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Verified Member Screening</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Safe, friendly, and respectful environment for first-timers.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Relaxed Weekend Addas</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Cozy coffee meetups, board game nights & cultural conversations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vadodara Blog Posts */}
            {vadodaraPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Vadodara City Guides & Social Stories</h2>
                                <p className="text-lg text-gray-600">Honest guides, real stories, and local tips for people building a meaningful social life in Baroda.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {vadodaraPosts.map((post) => (
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Ready to Mingle in Vadodara?</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            Stop spending weekends wondering where all the interesting people in Baroda are hiding. They are already signed up. Your next Stranger Mingle event is waiting for you.
                        </p>
                        <Link href="/events" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">
                            Find Your Next Event in Vadodara
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl -ml-32 -mb-32"></div>
                </div>
            </section>


            {/* Upcoming Activities for Vadodara */}
            {/* Facebook Group CTA */}
            <FacebookGroupCTA />

            <UpcomingExperiences city="Vadodara" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Stranger Mingle Vadodara",
                                "description": "City homepage for Stranger Mingle Vadodara events and community.",
                                "url": "https://www.strangermingle.com/vadodara",
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["#city-hero-description"]
                                }
                            },
                            {
                                "@type": "Place",
                                "name": "Vadodara",
                                "description": "Vadodara city area where Stranger Mingle hosts weekend events.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Vadodara",
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
                                        "name": "Vadodara",
                                        "item": "https://www.strangermingle.com/vadodara"
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