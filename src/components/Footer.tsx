import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import { LIVE_CITIES } from '@/lib/cities';

const CITY_DISPLAY_NAMES: Record<string, string> = {
    bangalore: 'Bengaluru',
    ahmedabad: 'Ahmedabad',
    bhopal: 'Bhopal',
    chennai: 'Chennai',
    coimbatore: 'Coimbatore',
    delhi: 'Delhi',
    hyderabad: 'Hyderabad',
    indore: 'Indore',
    jaipur: 'Jaipur',
    kanpur: 'Kanpur',
    kolkata: 'Kolkata',
    lucknow: 'Lucknow',
    ludhiana: 'Ludhiana',
    mumbai: 'Mumbai',
    nagpur: 'Nagpur',
    patna: 'Patna',
    pune: 'Pune',
    surat: 'Surat',
    vadodara: 'Vadodara',
    visakhapatnam: 'Visakhapatnam',
};

interface FooterLink {
    name: string;
    href: string;
    highlight?: boolean;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections: FooterSection[] = [
        {
            title: "Companions & Chat",
            links: [
                { name: "Rent a Friend", href: "/members/friends-on-rent", highlight: true },
                { name: "Earn Hourly as Companion", href: "/rent-a-friend-registration" },
                { name: "Purchase Membership", href: "/members" },
                { name: "Anonymous Chat in India", href: "/annonymous-chat-in-india-with-real-people" },
                { name: "Anonymous Voice Calls", href: "/phone-a-friend" },
                { name: "Talk to Male Friend (For Girls)", href: "/talk-to-stranger-male-friend-online-only-for-girls" },
                { name: "Social Coaching", href: "/social-coaching" },
                { name: "Member Login & Portal", href: "/members?mode=login" },
            ]
        },
        {
            title: "Events & Hangouts",
            links: [
                { name: "Weekend Meetups & Events", href: "/events" },
                { name: "Latest City Events", href: "/latest-events" },
                { name: "Host an Event", href: "/host-an-event" },
                { name: "Board Game Nights", href: "/board-game-nights" },
                { name: "Outdoor Meetups & Treks", href: "/outdoor-meetups" },
                { name: "Community Circles", href: "/community-circles" },
                { name: "Best Hangout Places", href: "/best-hangout-places" },
                { name: "Live Online Games", href: "/live-online-games" },
            ]
        },
        {
            title: "About & Company",
            links: [
                { name: "About Us", href: "/about", highlight: true },
                { name: "Our Mission & Story", href: "/about#mission" },
                { name: "Rent a Friend Safety", href: "/about#rent-a-friend" },
                { name: "Success Stories", href: "/success-stories" },
                { name: "Member Testimonials", href: "/testimonials" },
                { name: "Team & Leadership", href: "/team" },
                { name: "Our Authors & Editorial", href: "/authors" },
                { name: "Our Partners", href: "/our-partners" },
                { name: "FAQs", href: "/faqs" },
                { name: "Blog & Community Guides", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
            ]
        },
        {
            title: "Partner With Us",
            links: [
                { name: "Venue Partners Directory", href: "/venue-partners" },
                { name: "Sponsor an Event", href: "/sponsor-an-event" },
                { name: "Media Kit & Press", href: "/media-kit" },
                { name: "Partner With Us", href: "/partner-with-us" },
                { name: "Venue Partnerships", href: "/venue-partnership" },
                { name: "Brand Partnerships", href: "/brand-partnership" },
                { name: "Advertise With Us", href: "/advertise" },
                { name: "Support Helpdesk", href: "/support" },
            ]
        },
        {
            title: "Legal & Policies",
            links: [
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Companion Terms", href: "/companion-terms" },
                { name: "Anti-Harassment Policy", href: "/anti-harassment-policy" },
                { name: "Community Guidelines", href: "/community-guidelines" },
                { name: "Safety Guidelines", href: "/safety-guidelines" },
                { name: "Grievance Redressal", href: "/grievance-redressal" },
                { name: "Shipping & Delivery", href: "/shipping-and-delivery" },
                { name: "Host & Venue Terms", href: "/host-terms" },
                { name: "Refund Policy", href: "/refund-policy" },
                { name: "Disclaimer", href: "/disclaimer" },
                { name: "Cookie Policy", href: "/cookie-policy" },
                { name: "Delete Account", href: "/delete-account" },
            ]
        }
    ];

    return (
        <footer className="w-full border-t border-gray-200 bg-gray-50/80 backdrop-blur-xl z-10 relative">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Top Promo & Platonic Service Notice Banner */}
                <div className="mb-10 p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-rose-950 text-white shadow-xl border border-rose-500/20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left max-w-2xl">
                            <span className="inline-block px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                                Combat Loneliness With Stranger Mingle
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                                Anonymous Chat &bull; Calls Without Mobile Number &bull; Rent a Friend
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                                The service is purely for platonic friendship to combat loneliness in Indian cities. <strong>Stranger Mingle is strictly not liable or responsible if people are meeting in private places like home, hotel room, etc.</strong> All companion outings must take place strictly in public places.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                            <Link
                                href="/members/login"
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-md shadow-rose-500/25"
                            >
                                Hire a Companion
                            </Link>
                            <Link
                                href="/rent-a-friend-registration"
                                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-transform hover:scale-105"
                            >
                                Become a Companion
                            </Link>
                            <Link
                                href="/members"
                                className="px-5 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-transform hover:scale-105 shadow-md shadow-yellow-500/20"
                            >
                                Get Membership
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8 text-center md:text-left">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="mt-3 text-sm font-semibold text-gray-900 tracking-wider uppercase mb-3 text-center md:text-left">
                                {section.title}
                            </h3>
                            <ul className="space-y-1.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={`text-sm transition-colors ${link.highlight
                                                ? "text-blue-600 font-semibold hover:text-blue-700"
                                                : "text-gray-500 hover:text-gray-900"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* City Directories SEO Linking Section */}
                <div className="py-8 border-t border-gray-200/80">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 mb-4 text-center md:text-left">
                        Explore City Friendships & House Parties
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-6 text-xs text-gray-500">
                        {LIVE_CITIES.map((cSlug) => {
                            const cName = CITY_DISPLAY_NAMES[cSlug] || cSlug.charAt(0).toUpperCase() + cSlug.slice(1);
                            return (
                                <div key={cSlug} className="space-y-1">
                                    <Link href={`/${cSlug}`} className="font-bold text-gray-800 hover:text-blue-600 block transition-colors">
                                        {cName} Meetups
                                    </Link>
                                    <Link href={`/${cSlug}/make-new-friends`} className="hover:text-gray-900 block text-[11px]">
                                        Make New Friends in {cName}
                                    </Link>
                                    <Link href={`/${cSlug}/house-parties`} className="hover:text-gray-900 block text-[11px]">
                                        House Parties in {cName}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Left: Branding */}
                    <div className="pt-2 flex-1 flex flex-col items-center md:items-start gap-4 max-w-sm">
                        <Link href="/">
                            <Image
                                src="/logo-2.svg"
                                alt="Stranger Mingle Logo"
                                width={180}
                                height={40}
                                className="h-7 w-auto"
                            />
                        </Link>
                        <p className="mb-2 text-sm text-gray-500 text-center md:text-left leading-relaxed">
                            Connecting curious souls through uniquely curated weekend events, anonymous chat &amp; calls without mobile numbers, and rent a friend services to combat loneliness.
                        </p>
                        <div className="text-xs text-gray-600 text-center md:text-left space-y-1 font-medium">
                            <p><strong>Support &amp; Reporting:</strong> <a href="mailto:strangermingleteam@gmail.com" className="text-blue-600 hover:underline">strangermingleteam@gmail.com</a></p>
                            <p><strong>Helpline / WhatsApp:</strong> <a href="tel:+917385531551" className="text-gray-800 hover:underline">+91 73855 31551</a></p>
                        </div>
                    </div>

                    {/* Middle: Social Icons */}
                    <div className="flex-1 flex justify-center order-first md:order-none">
                        <SocialLinks variant="footer" className="gap-2" />
                    </div>

                    {/* Right: Copyright */}
                    <div className="flex-1 text-center md:text-right">
                        <p className="text-sm text-gray-600 mb-2">
                            © {currentYear} Stranger Mingle | A Brand of
                            <a
                                href="https://saltymediaproduction.com"
                                target="_blank"
                                rel="opener referrer"
                                className="hover:text-blue-600 ml-1"
                            >
                                Salty Media Production (opc) Pvt Ltd
                            </a>.
                            All rights reserved.
                        </p>
                        <p className="text-xs text-gray-500 max-w-md ml-auto">
                            Images and videos used are from Stranger Mingle events, Pexels, and Freepik.
                            All copyrights belong to their respective owners.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

