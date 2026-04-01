'use client';

import { sendGAEvent } from "@/lib/gtag";
import Link from 'next/link';

export default function HeroButtons() {
    const handleEventsClick = () => {
        sendGAEvent({
            action: 'view_upcoming_events',
            category: 'homepage_cta',
            label: 'Upcoming Events'
        });
    };

    const handleAboutClick = () => {
        sendGAEvent({
            action: 'members_login_click',
            category: 'homepage_cta',
            label: 'Members Login'
        });
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 sm:w-auto justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 mb-10">
            <Link
                href="/events"
                onClick={handleEventsClick}
                className="px-8 py-4 bg-yellow-200/95 backdrop-blur-sm hover:bg-white text-gray-900 border border-white/20 rounded-xl font-bold text-lg transition-all hover:scale-105 w-fit"
            >
                Upcoming Events
            </Link>
            <Link
                href="/members"
                onClick={handleAboutClick}
                className="px-8 py-4 bg-yellow-200/95 backdrop-blur-sm hover:bg-white text-gray-900 border border-white/20 rounded-xl font-bold text-lg transition-all hover:scale-105 w-fit"
            >
                Premium Members
            </Link>
        </div>
    );
}
