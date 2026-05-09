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
    title: "Ahmedabad - Make New friends at weekend Meetups and Events",
    description: "Curated weekend meetups and social events in Ahmedabad. From Satellite to Navrangpura. Make New friends at weekend Meetups and Events",
    alternates: {
        canonical: "/ahmedabad",
    },
    openGraph: {
        url: "/ahmedabad",
    }

};

export default async function AhmedabadCityPage() {
    const cityEvents = await getEventsByCity("Ahmedabad");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Ahmedabad-related posts
    const ahmedabadPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('ahmedabad') ||
        post.slug?.toLowerCase().includes('ahmedabad') ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes('ahmedabad'))
    ).slice(0, 3);

    const popularAreas = [
        { name: "Satellite", description: "Ahmedabad's most cosmopolitan stretch — upscale cafes, young professionals, and a social scene that actually stays awake past 9 PM." },
        { name: "Navrangpura", description: "The city's academic and commercial heartbeat. Walkable, central, and full of the kind of cafes where good conversations start easily." },
        { name: "Bopal", description: "West Ahmedabad's fastest-growing hub — a tight-knit community of young families and working professionals who are always up for a good evening out." },
        { name: "Prahlad Nagar", description: "Corporate Ahmedabad's favourite neighbourhood. Polished, connected, and home to some of the city's best specialty coffee spots." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774870096/Ahmedabad-stranger-mingle-weekend-events-friends-place_igmmm4.jpg"
                        alt="People at a social meetup in Ahmedabad"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        Amdavad&apos;s #1 Community for Strangers
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Make Real Friends at <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 drop-shadow-sm" style={{ WebkitTextStroke: '0.6px white' }}>
                            Stranger Meetups in Ahmedabad
                        </span>
                    </h1>
                    <p id="city-hero-description" className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Ahmedabad is a city that runs on community — pols, mohallas, addas. We are just building the modern version of that. Curated meetups across Amdavad for people who want to skip the small talk and actually connect.
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
                        <div className="text-3xl font-bold text-gray-900">275+</div>
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Amdavadis</div>
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

            {/* Why Stranger Mingle — placed above events for structural variety */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Ahmedabad Needs a Space Like This</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Amdavad is one of India&apos;s most liveable cities — and yet, meeting people outside your existing circle here is harder than it should be. We fix that.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Small Groups Where You Actually Talk</h3>
                        <p className="text-gray-600 leading-relaxed">
                            No stage, no mic, no awkward speed friending. Just a handful of people at a good cafe — the kind of setup where conversations happen on their own.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Verified Attendees, Zero Nonsense Policy</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Every person who attends is verified beforehand. We hold our community to a strict code of conduct — because a space where everyone feels safe is the only kind worth building.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Venues Picked for Vibe, Not Just Convenience</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Ahmedabad has hidden gems — quiet rooftops, heritage havelis turned cafes, cosy spots in Satellite and beyond. We find them and bring you there.
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section id="events" className="w-full max-w-7xl mx-auto px-4 py-20 text-center">
                <div className="mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Meetups and Social Events in Ahmedabad</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Most people walk in alone. All of them leave with plans for the next one. Come see what the fuss is about.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events in Ahmedabad just yet.</p>
                            <p className="text-gray-400 mt-2">We are growing fast here — check back soon!</p>
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
                            <h2 className="text-4xl font-bold mb-6">From Satellite to Navrangpura — We Are All Over Ahmedabad</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                Ahmedabad spreads wide and its neighbourhoods each have their own personality. Stranger Mingle works across all of them — so there is always a meetup within reach, wherever you are in the city.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {popularAreas.map((area) => (
                                    <div key={area.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <MapPin className="w-5 h-5 text-blue-400" />
                                            <h3 className="font-medium text-lg text-green-300">{area.name}</h3>
                                        </div>
                                        <p className="text-sm text-yellow-100 leading-relaxed">
                                            {area.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square">
                            <Image
                                src="https://res.cloudinary.com/strangermingle/image/upload/q_auto/f_auto/v1775676269/14590_piqsow.jpg"
                                alt="Friends at a Stranger Mingle event in Ahmedabad"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">10+ Cafes</p>
                                <p className="text-blue-100">Partnered in Ahmedabad</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ahmedabad Blog Posts */}
            {ahmedabadPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Ahmedabad Guides &amp; Meetup Stories</h2>
                                <p className="text-lg text-gray-600">Local reads on building a social life, finding your people, and exploring Amdavad differently.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {ahmedabadPosts.map((post) => (
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Amdavad Is Better With the Right Company</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            From chaas to chai, Ahmedabad has always been a city best enjoyed with good people. Come find yours at the next Stranger Mingle event.
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


            {/* Upcoming Activities for Ahmedabad */}
            <UpcomingExperiences city="Ahmedabad" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "name": "Stranger Mingle Ahmedabad",
                                "description": "City homepage for Stranger Mingle Ahmedabad events and community.",
                                "url": "https://www.strangermingle.com/ahmedabad",
                                "speakable": {
                                    "@type": "SpeakableSpecification",
                                    "cssSelector": ["#city-hero-description"]
                                }
                            },
                        {
                                "@type": "Place",
                                "name": "Ahmedabad",
                                "description": "Ahmedabad city area where Stranger Mingle hosts weekend events.",
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": "Ahmedabad",
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
                                    "name": "Ahmedabad",
                                    "item": "https://www.strangermingle.com/ahmedabad"
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