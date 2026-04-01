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
    title: "Jaipur - Social Meetups & Friend Events in the Pink City",
    description: "Meet new people at curated social events in Jaipur. From C-Scheme to Malviya Nagar, we bring interesting strangers together in small, safe, and well-organised groups.",
    alternates: {
        canonical: "/jaipur",
    }
};

export default async function JaipurCityPage() {
    const cityEvents = await getEventsByCity("Jaipur");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Jaipur-related posts
    const jaipurPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('jaipur') ||
        post.slug?.toLowerCase().includes('jaipur') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'jaipur')
    ).slice(0, 3);

    const popularAreas = [
        { name: "C-Scheme", description: "Jaipur's most polished neighbourhood — tree-lined streets, rooftop cafes, and a crowd that loves good conversation." },
        { name: "Malviya Nagar", description: "Where young Jaipur actually lives and hangs out — lively, unpretentious, and full of great spots for a meetup." },
        { name: "Vaishali Nagar", description: "A thriving west Jaipur hub with a relaxed community feel, popular cafes, and easy connectivity from across the city." },
        { name: "Mansarovar", description: "One of Jaipur's largest and fastest-growing areas — practical, well-connected, and home to a huge young working crowd." }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/strangermingle/image/upload/v1774870714/jaipur-stranger-mingle-mahal-event-place_vgmfz5.jpg"
                        alt="People at a Stranger Mingle meetup in Jaipur"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[4px]"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-sm font-medium text-blue-300 inline-block mb-6 uppercase tracking-wider">
                        The Pink City&apos;s #1 Strangers Community
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Social Events &amp; Stranger <br />
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-300 via-purple-300 to-pink-300">
                            Meetups in Jaipur
                        </span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Jaipur has always been a city of warm people and open doors. Now there is a proper way to meet them. We organise small, curated meetups across the Pink City — for newcomers, for people between friend groups, and for anyone who believes the best conversations happen with strangers.
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
                        <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">Jaipurites</div>
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
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Upcoming Stranger Meetup Events in Jaipur This Weekend</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">Walk in alone, walk out with people worth knowing. Every event is small, relaxed, and genuinely worth your Sunday.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {cityEvents.length > 0 ? (
                        cityEvents.slice(0, 3).map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <div className="col-span-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <p className="text-xl text-gray-500 font-medium">No upcoming events in Jaipur just yet.</p>
                            <p className="text-gray-400 mt-2">We are setting things up — check back soon!</p>
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
                        <div className="relative aspect-square order-last lg:order-first">
                            <Image
                                src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1768620120/diverse-young-people-talking-coffee-shop_doxz0c.jpg"
                                alt="Stranger Mingle social meetup in Jaipur cafe"
                                fill
                                className="object-cover rounded-3xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-blue-600 p-8 rounded-3xl shadow-2xl hidden md:block">
                                <p className="text-2xl font-bold">8+ Cafes</p>
                                <p className="text-blue-100">Partnered in Jaipur</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Meetups Happening Across the Pink City</h2>
                            <p className="text-gray-400 text-lg mb-10">
                                Whether you are off Tonk Road or tucked into a lane near Sindhi Camp, Stranger Mingle has a meetup close to you. We are building a city-wide community — one neighbourhood at a time.
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
                    </div>
                </div>
            </section>

            {/* Why Stranger Mingle? */}
            <section className="py-24 max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Making Friends in Jaipur Has Never Been This Easy</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Between the old city charm and the new Jaipur growing around it, there are thousands of people here looking for the same thing — a real social circle.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Not a Networking Event. Not a Dating App.</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We keep groups small and the agenda simple — meet people, have a good time, maybe plan the next outing together. No pitch decks, no swipe culture.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Every Attendee is Verified Before They Walk In</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We take safety as seriously as you do. Each participant is verified in advance and our zero-tolerance code of conduct is strictly enforced — so you can focus on the fun part.
                        </p>
                    </div>
                    <div className="text-center p-8">
                        <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Venues That Actually Set the Right Mood</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Jaipur has some spectacular cafes, heritage courtyards, and rooftop spaces. We use them. Every venue is picked to make your first hello feel natural.
                        </p>
                    </div>
                </div>
            </section>

            {/* Jaipur Blog Posts */}
            {jaipurPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex justify-between items-end mb-12">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Jaipur Social Guides &amp; Community Stories</h2>
                                <p className="text-lg text-gray-600">Honest reads for people building friendships and a life in the Pink City.</p>
                            </div>
                            <Link href="/blog" className="text-gray-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                                See all stories <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {jaipurPosts.map((post) => (
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
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Jaipur&apos;s Next Great Friendship Starts Here</h2>
                        <p className="text-blue-100 text-xl max-w-2xl mx-auto mb-10">
                            The Pink City is more fun when you have the right people to explore it with. Come to the next event — you will wonder why you waited this long.
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


            {/* Upcoming Activities for Jaipur */}
            <UpcomingExperiences city="Jaipur" currentEventId="" />

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "Stranger Mingle Jaipur",
                            "description": "City homepage for Stranger Mingle Jaipur events and community.",
                            "url": "https://www.strangermingle.com/jaipur"
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
                                    "name": "Jaipur",
                                    "item": "https://www.strangermingle.com/jaipur"
                                }
                            ]
                        }
                    ])
                }}
            />
        </div>
    );
}