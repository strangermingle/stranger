'use client';

import { sendGAEvent } from "@/lib/gtag";
import Link from 'next/link';
import { HeartHandshake, Users, Crown, Calendar } from 'lucide-react';

export default function HeroButtons() {
    const handleEventsClick = () => {
        sendGAEvent({
            action: 'view_upcoming_events',
            category: 'homepage_cta',
            label: 'Upcoming Events'
        });
    };

    const handleHireCompanionClick = () => {
        sendGAEvent({
            action: 'hire_companion_click',
            category: 'homepage_cta',
            label: 'Hire a Companion'
        });
    };

    const handleRegisterCompanionClick = () => {
        sendGAEvent({
            action: 'register_companion_click',
            category: 'homepage_cta',
            label: 'Become a Companion'
        });
    };

    const handleMembershipClick = () => {
        sendGAEvent({
            action: 'membership_click',
            category: 'homepage_cta',
            label: 'Get Membership'
        });
    };

    return (
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:w-auto justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 mb-8 max-w-4xl mx-auto">
            {/* Primary Action 1: Upcoming Meetups & Events */}
            <Link
                href="/events"
                onClick={handleEventsClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-yellow-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Weekend Events &amp; Meetups</span>
            </Link>

            {/* Primary Action 2: Hire a Companion */}
            <Link
                href="/members/login"
                onClick={handleHireCompanionClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-rose-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
                <HeartHandshake className="w-5 h-5" />
                <span>Hire a Companion</span>
            </Link>

            {/* Primary Action 3: Register as a Companion */}
            <Link
                href="/rent-a-friend-registration"
                onClick={handleRegisterCompanionClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 font-black text-sm uppercase tracking-wider rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
                <Users className="w-5 h-5 text-amber-300" />
                <span>Become a Companion</span>
            </Link>

            {/* Primary Action 4: Purchase Memberships (Anonymous Chat & Calls) */}
            <Link
                href="/members"
                onClick={handleMembershipClick}
                className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-indigo-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
                <Crown className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <span>Get Membership</span>
            </Link>
        </div>
    );
}

