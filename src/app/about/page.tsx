import type { Metadata } from "next";
import { ArrowRight, Users, Heart, Shield, MapPin, Calendar, Star, CheckCircle2, UserPlus, Coffee, Mountain, Palette, HandHeart } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us | Stranger Mingle",
    description: "Learn more about Stranger Mingle mission to build safe communities across India through organized weekend events and meetups.",
    alternates: {
        canonical: "/about",
    },
};
import Link from 'next/link';

export default function About() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-linear-to-br from-blue-50 to-purple-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8">
                        Building Real <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">Friendships</span><br className="hidden md:block" /> Across India
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-gray-600 leading-relaxed">
                        No swipes. No algorithms. Just safe structured events where you can show up, be yourself, and make friends IRL.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link href="/" className="px-8 py-4 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                            Find an Event
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
                {/* Mission Statement */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-6">
                        Stranger Mingle is built to help people make real connections locally, not online. We create safe spaces where strangers meet and friendships begin through organized weekend events across Indian cities.
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed mb-8">
                        Whether you&apos;re new in town, an introvert, or simply don&apos;t know how to make new friends as an adult – we&apos;re here to help. Our mission goes beyond just making friends. We aim to improve your quality of life through meaningful events, a disciplined approach, and a safe environment.
                    </p>
                    <div className="inline-flex items-center justify-center p-4 bg-purple-50 rounded-2xl text-purple-700 font-medium">
                        <Heart className="w-5 h-5 mr-3 fill-current" />
                        Built for connection, not consumption.
                    </div>
                </div>

                {/* What We Do - Stats Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow">
                        <Calendar className="w-12 h-12 text-blue-500 mb-6" />
                        <div className="text-4xl font-bold text-gray-900 mb-2">Every Weekend</div>
                        <p className="text-gray-600 mb-4">Consistent events across major Indian cities so you always have a place to go.</p>
                        <p className="text-sm text-gray-500">We organize chai circles, treks, board game nights, heritage walks, and more. These aren&apos;t networking sessions – they are spaces for genuine friends.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow">
                        <Users className="w-12 h-12 text-purple-500 mb-6" />
                        <div className="text-4xl font-bold text-gray-900 mb-2">15-25 People</div>
                        <p className="text-gray-600 mb-4">Small, curated groups designed for meaningful conversation, not crowded chaos.</p>
                        <p className="text-sm text-gray-500">We structure the first 30 minutes so no one feels left out. We design every event for meaningful conversation.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow">
                        <Star className="w-12 h-12 text-pink-500 mb-6" />
                        <div className="text-4xl font-bold text-gray-900 mb-2">Real</div>
                        <p className="text-gray-600 mb-4">Genuine friendships formed through shared activities and open conversations.</p>
                        <p className="text-sm text-gray-500">Friendships shouldn&apos;t be about luck. They should be about showing up and being yourself.</p>
                    </div>
                </div>

                {/* Built for India */}
                <div className="bg-gray-900 rounded-3xl overflow-hidden text-white relative">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

                    <div className="relative p-8 md:p-16">
                        <div className="flex items-center gap-4 mb-8">
                            <MapPin className="w-8 h-8 text-blue-400" />
                            <h2 className="text-3xl font-bold">Built for India, Built for Everyone</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                    Stranger Mingle is dedicated to Indian communities. As Indians, we often carry unnecessary baggage – class, caste, skin color, college pedigree. These create invisible walls.
                                </p>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    We dismantle these walls. We judge people by how they treat others, their values, and their character – not by their last name or bank balance.
                                </p>
                            </div>
                            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-green-400" />
                                    Community Standards
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Strict guidelines against discrimination based on caste, gender, or religion.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Immediate removal for creating unsafe environments.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-300">
                                        <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                                        <span>Respect-first policy for all interactions.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Safety First */}
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Safety & Values</h2>
                        <p className="text-lg text-gray-600">Our highest priority is creating a safe, respectful environment.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-8 rounded-2xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors">
                            <Shield className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Tolerance</h3>
                            <p className="text-gray-600">
                                Absolute zero tolerance for harassment, especially against women. Offenders are banned permanently without warning.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50/50 transition-colors">
                            <Users className="w-10 h-10 text-purple-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">No Gender Bias</h3>
                            <p className="text-gray-600">
                                Every member receives equal respect and opportunities. We actively ensure our spaces are safe and welcoming for women.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl border border-gray-200 hover:border-pink-200 hover:bg-pink-50/50 transition-colors">
                            <CheckCircle2 className="w-10 h-10 text-pink-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Community</h3>
                            <p className="text-gray-600">
                                Basic verification is required for all attendees. This accountability helps maintain high quality and safety at events.
                            </p>
                        </div>
                        <div className="p-8 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors">
                            <UserPlus className="w-10 h-10 text-indigo-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Inclusive Spaces</h3>
                            <p className="text-gray-600">
                                Whether you&apos;re an introvert or new in town, our event structures ensure no one feels left out.
                            </p>
                        </div>
                    </div>
                </div>

                {/* How It Works (Restored) */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-xl font-bold text-blue-600">1</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Events</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Check our events page to see what&apos;s happening in your city. We organize everything from casual chai meetups to full-day adventure trips. First-timers usually start with something relaxed like a Sunday morning coffee gathering.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shrink-0 text-xl font-bold text-purple-600">2</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Login / Join</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Book your spot through our Member Portal. Complete basic verification to ensure community safety and quality.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center shrink-0 text-xl font-bold text-pink-600">3</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Show Up</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Come to the event – most people come alone, so you&apos;re in good company. We handle introductions and ice-breakers, making it easy to start conversations naturally.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center shrink-0 text-xl font-bold text-green-600">4</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Exchange contact details, stay in touch via WhatsApp, text, or email, and attend more events. Friendships take time, but they start with showing up once.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Types */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How We Mingle</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Coffee className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Social Meetups</h3>
                            <p className="text-sm text-gray-600">Chai circles & board games for casual conversations.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Mountain className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Adventures</h3>
                            <p className="text-sm text-gray-600">Treks & cycling trails to bond over shared experiences.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <Palette className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Culture</h3>
                            <p className="text-sm text-gray-600">Heritage walks & art visits to explore your city.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <HandHeart className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Volunteering</h3>
                            <p className="text-sm text-gray-600">Give back to the community while making friends.</p>
                        </div>
                    </div>
                </div>

                {/* Personal Responsibility (Restored) */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Member Interactions & Personal Responsibility</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Members are free to interact directly with each other outside of organized events. You can exchange contact details, meet for coffee, or develop any kind of relationship – platonic or otherwise. These interactions are your personal choice and responsibility.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Stranger Mingle facilitates initial connections in safe, structured environments during organized events. However, we do not take responsibility for interactions, relationships, or any incidents that occur outside our official group activities or event premises.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        What happens in your personal life and private interactions is between you and the other individuals involved. We encourage everyone to exercise good judgment and respect in all interactions.
                    </p>
                </div>

                {/* Vision (Restored) */}
                <div className="border border-gray-200 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision for India</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Stranger Mingle started in Pune, but we&apos;re building communities across India – Mumbai, Bangalore, Delhi, Hyderabad, and beyond. Anywhere people feel lonely despite being surrounded by millions.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We encourage individuals who want to take initiative and bring Stranger Mingle to their own cities. If you&apos;re passionate about building safe communities and want to organize events in your city, you can do so under our strict rules and regulations. This ensures consistent quality and safety standards across all locations.
                    </p>
                    <p className="text-gray-600 leading-relaxed font-semibold">
                        Our vision is simple: create communities in Indian cities where making friends after college isn&apos;t a struggle. Where showing up to an event alone isn&apos;t intimidating.
                    </p>
                </div>

                {/* Who Joins Section */}
                <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Joins Stranger Mingle?</h2>
                    <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        People new to the city. Introverts looking for a safe start. Professionals tired of the grind. Everyone who believes that life is better with friends. It doesn&apos;t matter who you are or where you come from – if you&apos;re kind and open to connection, you belong here.
                    </p>
                </div>

                {/* Sustainability Note (Restored) */}
                <div className="max-w-4xl mx-auto border-l-4 border-blue-500 pl-6 py-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Maintaining Quality and Sustainability</h3>
                    <p className="text-gray-600 mb-2">
                        Stranger Mingle is built to be sustainable and high-quality. While we love the idea of free communities, we also understand that quality comes at a cost.
                    </p>
                    <p className="text-gray-600 mb-2">
                        Event venues need to be booked. Safety measures require resources. Organizers need support. Quality control takes effort and investment. We charge reasonable fees purely to maintain the platform, ensure events run smoothly, and deliver the experience our members deserve.
                    </p>
                    <p className="text-gray-600 italic">
                        &quot;This is not about profit. This is about creating something valuable that lasts, something you can rely on weekend after weekend.&quot;
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center pt-12 pb-20">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Mingle?</h2>
                    <p className="text-xl text-gray-600 mb-8">Your new best friends are waiting at the next event.</p>
                    <Link href="/" className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                        Explore Events Near You <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
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
                                    "name": "About",
                                    "item": "https://www.strangermingle.com/about"
                                }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "AboutPage",
                            "name": "About Stranger Mingle",
                            "description": "Stranger Mingle builds safe communities across India where people make real friendships through organized weekend events and meetups.",
                            "mainEntity": {
                                "@type": "Organization",
                                "name": "Stranger Mingle",
                                "foundingLocation": {
                                    "@type": "Place",
                                    "name": "Pune, India"
                                }
                            }
                        }
                    ])
                }}
            />
        </div>
    );
}