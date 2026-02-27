import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getEventsByCity } from "@/lib/events";
import { getAllPosts, formatBlogDate } from "@/lib/blog";
import EventCard from "@/components/EventCard";
import { MapPin, Users, ShieldCheck, ArrowRight, Calendar, Coffee, Heart } from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Stranger Mingle Mumbai - Make Real Friends at Curated Meetups & Events",
    description: "Break the loneliness in Mumbai. Join safe, curated stranger meetups across Bandra, Andheri, Powai & South Mumbai. Small groups of verified people. No awkwardness, just real connections.",
    keywords: "Mumbai meetups, make friends Mumbai, Mumbai events, stranger meetup Mumbai, social events Mumbai, Bandra meetups, Andheri events, Powai community",
    openGraph: {
        title: "Stranger Mingle Mumbai - Make Real Friends at Curated Meetups",
        description: "Join safe, curated stranger meetups across Mumbai. Small groups. Verified members. Real friendships.",
        url: "/mumbai",
        siteName: "Stranger Mingle",
        locale: "en_IN",
        type: "website",
    },
    alternates: {
        canonical: "/mumbai",
    }
};

export default async function MumbaiCityPage() {
    const cityEvents = await getEventsByCity("mumbai");
    const allPosts = getAllPosts(['slug', 'title', 'date', 'image', 'excerpt', 'tags']);

    // Filter for Mumbai-related posts
    const mumbaiPosts = allPosts.filter(post =>
        post.title?.toLowerCase().includes('mumbai') ||
        post.slug?.toLowerCase().includes('mumbai') ||
        post.tags?.some((tag: string) => tag.toLowerCase() === 'mumbai')
    ).slice(0, 3);

    const popularAreas = [
        {
            name: "Bandra & Khar",
            description: "Where the creatives, artists, and entrepreneurs meet. Cozy cafes, vibrant culture, weekend energy.",
            icon: Coffee
        },
        {
            name: "Andheri & Versova",
            description: "The corporate hub meets bohemian beach vibes. Perfect for young professionals seeking balance.",
            icon: Users
        },
        {
            name: "Powai & Hiranandani",
            description: "Tech professionals and students unite. Modern cafes, lake views, and a thriving community.",
            icon: MapPin
        },
        {
            name: "South Mumbai",
            description: "Heritage meets modernity. Fort, Colaba, Churchgate - where Mumbai's soul lives.",
            icon: Heart
        }
    ];

    const features = [
        {
            icon: Users,
            color: "blue",
            title: "Small Group Magic",
            description: "No crowds, no chaos. Just 6-12 carefully matched people having real conversations over filter coffee and vada pav."
        },
        {
            icon: ShieldCheck,
            color: "purple",
            title: "100% Verified Community",
            description: "LinkedIn verification, background checks, and community guidelines. Your safety isn't negotiable—it's guaranteed."
        },
        {
            icon: MapPin,
            color: "pink",
            title: "Mumbai's Best Spots",
            description: "Hand-picked cafes and venues from Marine Drive to Powai. No noisy bars—just spaces perfect for conversation."
        },
        {
            icon: Calendar,
            color: "green",
            title: "Weekly Meetups",
            description: "Fresh events every week across Mumbai. Weekend brunches, weekday coffee chats, monthly adventures—take your pick."
        }
    ];

    const testimonials = [
        {
            quote: "Moved to Mumbai for work and knew no one. Stranger Mingle introduced me to my closest friends here. We still meet every weekend!",
            name: "Priya M.",
            role: "Software Engineer, Powai"
        },
        {
            quote: "As someone who's introverted, I was nervous. But the small group setting made it so comfortable. Met 3 people I now consider genuine friends.",
            name: "Arjun K.",
            role: "Product Manager, Bandra"
        },
        {
            quote: "Been in Mumbai 5 years but always hung out with the same college crowd. This opened up a whole new world. Highly recommend!",
            name: "Sneha R.",
            role: "Marketing Lead, Andheri"
        }
    ];

    return (
        <div className="min-h-screen bg-white selection:bg-blue-500/30">
            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-32 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://res.cloudinary.com/dt3rse8bg/image/upload/v1768792656/12342_opa3gm.jpg"
                        alt="Young professionals making friends at Mumbai meetup"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
                    <span className="px-4 py-2 rounded-full bg-blue-600/90 backdrop-blur-md border border-blue-400/30 text-sm font-semibold text-white inline-block mb-6 shadow-lg">
                        🎯 Mumbai's Most Trusted Community • 2,000+ Members
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                        Make Real Friends in<br />
                        <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                            Maximum City
                        </span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/95 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Stop scrolling. Start connecting. Join curated meetups where strangers become friends—no awkwardness, no pretense, just real conversations in Mumbai's best cafes.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#events"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                        >
                            Browse This Week's Meetups
                        </a>
                        <Link
                            href="/about"
                            className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/30 rounded-xl font-bold text-lg transition-all"
                        >
                            How It Works
                        </Link>
                    </div>
                    <p className="text-white/80 text-sm mt-6">
                        ✨ First-timers welcome • 🎫 Most events under ₹999 • 👥 Group size: 15-25 people
                    </p>
                </div>
            </section>

            {/* Trust Signals */}
            <section className="py-16 border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text text-transparent">2,000+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider font-medium mt-2">Mumbaikars Connected</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-br from-purple-600 to-purple-400 bg-clip-text text-transparent">50+</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider font-medium mt-2">Events Every Month</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-br from-pink-600 to-pink-400 bg-clip-text text-transparent">100%</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider font-medium mt-2">Verified Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-br from-green-600 to-green-400 bg-clip-text text-transparent">4.8/5</div>
                            <div className="text-sm text-gray-600 uppercase tracking-wider font-medium mt-2">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section id="events" className="w-full max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-12">
                    <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold inline-block mb-4">
                        THIS WEEK IN MUMBAI
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Your Next Meetup Awaits</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Join a group this weekend. Most people come alone. Everyone leaves with new connections.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-10">
                    {cityEvents.slice(0, 6).map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>

                <div className="text-center">
                    <a
                        href="/events"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/25 hover:scale-105"
                    >
                        View All Mumbai Events <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Why Mumbai Needs This */}
            <section className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                            Mumbai Has 20 Million People.<br />
                            So Why Does It Feel So Lonely?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            We get it. You're surrounded by people on the local train, in office towers, at malls—yet genuine connection feels impossible. Stranger Mingle changes that.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const colorMap: Record<string, string> = {
                                blue: "from-blue-500 to-blue-600",
                                purple: "from-purple-500 to-purple-600",
                                pink: "from-pink-500 to-pink-600",
                                green: "from-green-500 to-green-600"
                            };
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                                >
                                    <div className={`w-14 h-14 bg-gradient-to-br ${colorMap[feature.color]} rounded-xl flex items-center justify-center mb-5`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Areas */}
            <section className="py-24 bg-gradient-to-br from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Meetups Across Mumbai
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            From the beaches of Versova to the cafes of Bandra—we're everywhere you are.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {popularAreas.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-8 rounded-3xl bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                                            <Icon className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{area.name}</h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {area.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 mb-6">Can't find your area? We're expanding fast.</p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                        >
                            Request a meetup in your neighborhood <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social Proof / Testimonials */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Real Stories from Real Mumbaikars
                        </h2>
                        <p className="text-xl text-gray-600">
                            Don't just take our word for it.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
                            >
                                <div className="mb-6">
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-xl">★</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </p>
                                </div>
                                <div className="border-t border-blue-200 pt-4">
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mumbai Blog Posts */}
            {mumbaiPosts.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-4">Mumbai Survival Guide</h2>
                                <p className="text-lg text-gray-600 max-w-xl">
                                    From where to meet people to how to make friends stick—your insider's guide to thriving in Mumbai.
                                </p>
                            </div>
                            <Link
                                href="/blog"
                                className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all group"
                            >
                                Read all articles
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {mumbaiPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-blue-200"
                                >
                                    <div className="relative h-56 w-full overflow-hidden">
                                        <Image
                                            src={post.image || '/images/default-blog.jpg'}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="text-sm text-gray-500 mb-2 font-medium">
                                            {formatBlogDate(post.date)}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                                            {post.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <span className="text-blue-600 font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Read More <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="py-24 max-w-5xl mx-auto px-4">
                <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-[3rem] p-12 sm:p-20 text-center overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -ml-48 -mb-48"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
                            Your People Are<br />Waiting in Mumbai
                        </h2>
                        <p className="text-blue-50 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            Life's too short for superficial connections. Join Mumbai's most genuine community and meet the friends you've been missing.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="#events"
                                className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
                            >
                                Join Your First Meetup
                            </a>
                            <Link
                                href="/events"
                                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
                            >
                                See All Events
                            </Link>
                        </div>
                        <p className="text-white/90 text-sm mt-8">
                            🎉 Join 2,000+ Mumbaikars who've already found their tribe
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Got Questions?</h2>
                    <p className="text-lg text-gray-600">We've got answers.</p>
                </div>

                <div className="space-y-6">
                    <details className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 transition-all">
                        <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                            Is it weird to come alone?
                            <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Not at all! Over 80% of our attendees come solo. That's literally the point—everyone's in the same boat, which makes it way easier to connect. No awkward "+1" dynamics.
                        </p>
                    </details>

                    <details className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 transition-all">
                        <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                            How do you keep events safe?
                            <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Every member is verified through LinkedIn and phone verification. We have a strict code of conduct, trained hosts at every event, and a zero-tolerance policy for any misconduct. Your safety is our top priority.
                        </p>
                    </details>

                    <details className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 transition-all">
                        <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                            What's the age group?
                            <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Most of our community is between 22-35 years old—young professionals, entrepreneurs, students, and creatives. But we welcome anyone who's genuine and looking to make real connections!
                        </p>
                    </details>

                    <details className="group p-6 rounded-2xl bg-white border-2 border-gray-100 hover:border-blue-200 transition-all">
                        <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex justify-between items-center">
                            Is this a dating app?
                            <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                        </summary>
                        <p className="mt-4 text-gray-600 leading-relaxed">
                            Nope! Stranger Mingle is focused on building genuine friendships and community. While people have met romantic partners through our events, that's not the primary goal. We're here for platonic connections first.
                        </p>
                    </details>
                </div>
            </section>

            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "Stranger Mingle Mumbai",
                            "description": "Mumbai's most trusted community for making real friends through curated meetups and events",
                            "url": "https://www.strangermingle.com/mumbai",
                            "logo": "https://www.strangermingle.com/logo.png",
                            "sameAs": [
                                "https://www.instagram.com/strangermingle",
                                "https://www.linkedin.com/company/strangermingle"
                            ],
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Mumbai",
                                "addressRegion": "Maharashtra",
                                "addressCountry": "IN"
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "WebPage",
                            "name": "Stranger Mingle Mumbai - Make Real Friends at Curated Meetups",
                            "description": "Join safe, curated stranger meetups across Mumbai. Small groups of verified people. No awkwardness, just real connections.",
                            "url": "https://www.strangermingle.com/mumbai"
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
                                    "name": "Mumbai",
                                    "item": "https://www.strangermingle.com/mumbai"
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": [
                                {
                                    "@type": "Question",
                                    "name": "Is it weird to come alone to Stranger Mingle events?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Not at all! Over 80% of our attendees come solo. Everyone's in the same boat, which makes it easier to connect."
                                    }
                                },
                                {
                                    "@type": "Question",
                                    "name": "How does Stranger Mingle keep events safe?",
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": "Every member is verified through LinkedIn and phone verification. We have a strict code of conduct, trained hosts at every event, and a zero-tolerance policy for misconduct."
                                    }
                                }
                            ]
                        }
                    ])
                }}
            />
        </div>
    );
}