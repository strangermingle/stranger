import type { Metadata } from "next";
import { 
    ArrowRight, Users, Heart, Shield, MapPin, Calendar, Star, CheckCircle2, 
    UserPlus, Coffee, Mountain, Palette, HandHeart, Monitor, PhoneCall, 
    MessageSquare, HeartHandshake, Crown, UserCheck, DollarSign, Clock, 
    ShieldAlert, Sparkles, AlertTriangle, Check, ShieldCheck 
} from "lucide-react";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about Stranger Mingle mission to build safe communities across India through organized weekend events and meetups.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About Us",
        description: "Learn more about Stranger Mingle mission to build safe communities across India through organized weekend events and meetups.",
        url: "/about",
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
                        No swipes. No algorithms. Just safe, structured connections — Anonymous Chat, Calling without mobile numbers, Rent a Friend, and weekend meetups across India.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
                        <Link href="/members/login" className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-2xl bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 flex items-center gap-2">
                            <HeartHandshake className="w-4 h-4" />
                            <span>Hire a Companion</span>
                        </Link>
                        <Link href="/rent-a-friend-registration" className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider rounded-2xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-2">
                            <Users className="w-4 h-4 text-rose-500" />
                            <span>Become a Companion</span>
                        </Link>
                        <Link href="/members" className="px-6 py-3.5 text-sm font-black uppercase tracking-wider rounded-2xl bg-yellow-400 text-slate-950 hover:bg-yellow-500 transition-colors shadow-md shadow-yellow-200 flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            <span>Join Membership</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
                {/* 3 Core Ways to Combat Loneliness */}
                <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-rose-500/20">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-rose-300 block mb-2">
                            Combat Loneliness with Safe Social Innovation
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                            Anonymous Chat, Secure Calling &amp; Rent a Friend
                        </h2>
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                            Millions feel lonely in busy cities. Stranger Mingle provides three distinct, verified ways to connect safely, whether online or offline.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 text-left mb-8">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                            <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center mb-4">
                                <MessageSquare className="w-6 h-6 text-purple-300" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Anonymous Chat</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Connect 1-on-1 with verified users across India. Your mobile number, full identity, and personal handles are completely protected and never revealed.
                            </p>
                            <Link href="/members" className="text-xs font-bold text-purple-300 hover:text-purple-200 inline-flex items-center gap-1">
                                Get Membership &amp; Chat <ArrowRight size={12} />
                            </Link>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-4">
                                <PhoneCall className="w-6 h-6 text-indigo-300" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Calls Without Mobile Number</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Peer-to-peer audio calls that keep your phone number 100% private. Have comforting, friendly conversations with empathetic listeners.
                            </p>
                            <Link href="/members" className="text-xs font-bold text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1">
                                Unlock Calling Access <ArrowRight size={12} />
                            </Link>
                        </div>

                        <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 backdrop-blur-xs">
                            <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-4">
                                <HeartHandshake className="w-6 h-6 text-rose-300" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Rent a Friend (Companions)</h3>
                            <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                Hire verified companions for cafe outings, movies, and events. Or register as a companion to earn ₹500–₹1,500/hr offering platonic company.
                            </p>
                            <div className="flex gap-2">
                                <Link href="/members/login" className="text-xs font-bold text-rose-300 hover:text-rose-200">
                                    Hire Friend &rarr;
                                </Link>
                                <span className="text-slate-500">&bull;</span>
                                <Link href="/rent-a-friend-registration" className="text-xs font-bold text-amber-300 hover:text-amber-200">
                                    Become Companion &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-center text-xs text-slate-300">
                        <strong>Important Safety Notice:</strong> The Rent a Friend service is purely for platonic friendship to combat loneliness. <strong>Stranger Mingle is strictly not liable or responsible if people are meeting in private places like home, hotel room, etc.</strong> All companion meetups must happen strictly in open, public places.
                    </div>
                </div>

                {/* DEDICATED RENT A FRIEND PLATFORM DEEP DIVE */}
                <div id="rent-a-friend" className="space-y-12 bg-linear-to-b from-rose-50/40 via-white to-indigo-50/30 rounded-3xl p-6 sm:p-12 border border-rose-100 shadow-sm">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
                            <HeartHandshake className="w-3.5 h-3.5" />
                            <span>Platonic Social Companionship</span>
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
                            How Rent a Friend Combats Urban Loneliness
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            Moving to a bustling metropolis like Bengaluru, Mumbai, Pune, Delhi NCR, or Hyderabad can feel exhilarating — until you realize you are having dinner alone, watching weekend movies alone, or wishing you had someone to explore a new cafe with. 
                        </p>
                    </div>

                    {/* Why Rent a Friend in India */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
                                <Users className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Urban Migration &amp; PG Isolation</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Over 68% of young professionals in Indian tech hubs live away from hometowns. Finding friends organically amidst demanding corporate hours is challenging. Rent a Friend bridges this gap instantly.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                                <Coffee className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Zero Pretense &amp; Zero Swiping</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Unlike dating apps built on superficial swipe algorithms and endless ghosting, Rent a Friend is transparent, structured, and strictly platonic. You book time, meet for a planned activity, and share great conversations.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-200/80 shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">100% ID Verified &amp; Escrow Safe</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                All registered companions undergo government ID verification. Payments are held in secure escrow through Razorpay until your meetup is completed satisfactorily.
                            </p>
                        </div>
                    </div>

                    {/* Two Paths: Hire a Companion vs Become a Companion */}
                    <div className="grid md:grid-cols-2 gap-8 pt-4">
                        {/* Path 1: Hiring */}
                        <div className="bg-white p-8 rounded-3xl border border-rose-200 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider mb-4">
                                    For Members
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Hiring a Platonic Companion</h3>
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    Need a friendly plus-one for an art gallery, someone to check out the newest Korean cafe in Koramangala, or a thoughtful listener over tea?
                                </p>
                                <ul className="space-y-3 mb-8 text-xs text-gray-600">
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span><strong>Browse by City:</strong> Find companions in your neighborhood who share your interests (movies, fitness, anime, tech).</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span><strong>Transparent Hourly Rates:</strong> Clearly displayed hourly rates (typically ₹500–₹1,500/hr) with zero hidden fees.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span><strong>Public Meetups Only:</strong> Guaranteed public locations like cafes, shopping malls, cultural events, or restaurants.</span>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/members/friends-on-rent"
                                className="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider text-center shadow-md shadow-rose-200 transition-all flex items-center justify-center gap-2"
                            >
                                <HeartHandshake className="w-4 h-4" />
                                <span>Browse Companions on Rent</span>
                            </Link>
                        </div>

                        {/* Path 2: Becoming a Companion */}
                        <div className="bg-white p-8 rounded-3xl border border-indigo-200 shadow-md flex flex-col justify-between">
                            <div>
                                <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
                                    Earn in Free Time
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Earn Hourly as a Companion</h3>
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    Are you a good listener, warm, empathetic, and enjoy meeting new people? Monetize your social skills while helping combat loneliness in your city.
                                </p>
                                <ul className="space-y-3 mb-8 text-xs text-gray-600">
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span><strong>Earn ₹500 – ₹1,500/Hour:</strong> You choose your own hourly rate based on your background and language skills.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span><strong>100% Flexible Schedule:</strong> Set your active hours, preferred days, and city neighborhoods.</span>
                                    </li>
                                    <li className="flex items-start gap-2.5">
                                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span><strong>Strict Safety Controls:</strong> All meetups happen strictly in daylight/public venues with verified member accounts.</span>
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/rent-a-friend-registration"
                                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider text-center shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
                            >
                                <Users className="w-4 h-4" />
                                <span>Register as a Companion</span>
                            </Link>
                        </div>
                    </div>

                    {/* Strict Platonic Policy Box */}
                    <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div className="text-xs leading-relaxed">
                                <h4 className="font-bold text-sm text-amber-900 mb-1">
                                    Strict Public &amp; Platonic Mandate
                                </h4>
                                <p className="text-amber-800/90 mb-2">
                                    Stranger Mingle companion services are <strong>100% platonic social companionship</strong>. Any form of romantic solicitation, sexual behavior, physical contact beyond a handshake, or meeting in private venues (such as private homes, residences, hotel rooms, or secluded spots) is strictly prohibited.
                                </p>
                                <p className="text-amber-800/90">
                                    <strong>Legal Disclaimer:</strong> Stranger Mingle is strictly not liable or responsible if individuals arrange or conduct meetings in private accommodations or outside platform guidelines. Violators will face immediate profile termination and permanent blacklist.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Statement */}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                    <p className="text-xl text-gray-600 leading-relaxed mb-6">
                        <strong>Stranger Mingle</strong> is a brand of Salty Media Production (opc) Pvt Ltd.
                        We are built to help people make real connections — primarily through in-person events, with online meetups and sessions as well. We create safe spaces where strangers meet and friendships begin through organised weekend events and virtual gatherings across Indian cities.
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
                        <p className="text-gray-600 mb-4">Consistent offline and online events across major Indian cities so you always have a place to go — in person or from your screen.</p>
                        <p className="text-sm text-gray-500">We organise chai circles, treks, board game nights, heritage walks, online sessions, and virtual meetups. These aren&apos;t networking sessions – they are spaces for genuine friends.</p>
                    </div>
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-shadow">
                        <Users className="w-12 h-12 text-purple-500 mb-6" />
                        <div className="text-4xl font-bold text-gray-900 mb-2">15-25 People</div>
                        <p className="text-gray-600 mb-4">Small, curated groups designed for meaningful conversation, not crowded chaos.</p>
                        <p className="text-sm text-gray-500">We structure the first 30 minutes so no one feels left out. We design every event — offline or online — for meaningful conversation.</p>
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

                {/* How It Works */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <div className="flex gap-6 items-start">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0 text-xl font-bold text-blue-600">1</div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Events</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Check our events page to see what&apos;s happening in your city — or online. We organise everything from casual chai meetups and full-day adventure trips to virtual sessions and online games. First-timers usually start with something relaxed like a Sunday morning coffee gathering or an online meet.
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
                                    Come to the event — in person or online — most people come alone, so you&apos;re in good company. We handle introductions and ice-breakers, making it easy to start conversations naturally.
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Coffee className="w-8 h-8 text-orange-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Social Meetups</h3>
                            <p className="text-sm text-gray-600">Chai circles &amp; board games for casual conversations.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <Mountain className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Adventures</h3>
                            <p className="text-sm text-gray-600">Treks &amp; cycling trails to bond over shared experiences.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                <Palette className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Culture</h3>
                            <p className="text-sm text-gray-600">Heritage walks &amp; art visits to explore your city.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <HandHeart className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Volunteering</h3>
                            <p className="text-sm text-gray-600">Give back to the community while making friends.</p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-all hover:-translate-y-1">
                            <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                                <Monitor className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Online Events</h3>
                            <p className="text-sm text-gray-600">Virtual meetups, online games, and sessions — mingle from anywhere.</p>
                        </div>
                    </div>
                </div>

                {/* Personal Responsibility */}
                <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Member Interactions & Personal Responsibility</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Members are free to interact directly with each other outside of organised events. You can exchange contact details, meet for coffee, or develop any kind of relationship – platonic or otherwise. These interactions are your personal choice and responsibility.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Stranger Mingle facilitates initial connections in safe, structured environments during organised events — whether held in person or online. However, we do not take responsibility for interactions, relationships, or any incidents that occur outside our official group activities or event premises.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        What happens in your personal life and private interactions is between you and the other individuals involved. We encourage everyone to exercise good judgement and respect in all interactions.
                    </p>
                </div>

                {/* Vision */}
                <div className="border border-gray-200 rounded-3xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Vision for India</h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Stranger Mingle started in Pune, but we&apos;re building communities across India – Mumbai, Bangalore, Delhi, Hyderabad, and beyond. Anywhere people feel lonely despite being surrounded by millions.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        While our core focus is on in-person, offline community building, we also organise online events and virtual meetups — because geography should never be the only reason someone misses out on connection. Online and offline, the standard of safety and quality remains the same.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        We encourage individuals who want to take initiative and bring Stranger Mingle to their own cities. If you&apos;re passionate about building safe communities and want to organise events in your city, you can do so under our strict rules and regulations. This ensures consistent quality and safety standards across all locations.
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

                {/* Sustainability Note */}
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
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
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
                                        "name": "About",
                                        "item": "https://www.strangermingle.com/about"
                                    }
                                ]
                            },
                            {
                                "@type": "AboutPage",
                                "name": "About Stranger Mingle",
                                "description": "Stranger Mingle builds safe communities across India where people make real friendships through organized weekend events and meetups.",
                                "mainEntity": {
                                    "@type": "Organization",
                                    "name": "Stranger Mingle",
                                    "url": "https://www.strangermingle.com",
                                    "telephone": "+91-7385531551",
                                    "email": "strangermingleteam@gmail.com",
                                    "address": {
                                        "@type": "PostalAddress",
                                        "streetAddress": "Office No 610, Park Plaza Business Centre, Lohegaon, Porwal Road",
                                        "addressLocality": "Pune",
                                        "addressRegion": "Maharashtra",
                                        "postalCode": "411047",
                                        "addressCountry": "IN"
                                    },
                                    "foundingLocation": {
                                        "@type": "Place",
                                        "name": "Pune, India",
                                        "address": {
                                            "@type": "PostalAddress",
                                            "streetAddress": "Office No 610, Park Plaza Business Centre, Lohegaon, Porwal Road",
                                            "addressLocality": "Pune",
                                            "addressRegion": "Maharashtra",
                                            "postalCode": "411047",
                                            "addressCountry": "IN"
                                        }
                                    }
                                }
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}