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

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: "Events & Hosting",
            links: [
                { name: "Events", href: "/events" },
                { name: "Latest Events", href: "/latest-events" },
                { name: "Workshops", href: "/workshops" },
                { name: "Social Coaching", href: "/social-coaching" },
                { name: "Know Your Host", href: "/know-your-host" },
                { name: "Host an Event", href: "/host-an-event", highlight: true },
                { name: "Host Application", href: "/host-application" },
                { name: "Private Events", href: "/private-events" },
            ]
        },
        {
            title: "Partner with us",
            links: [
                { name: "Venue Partners Directory", href: "/venue-partners" },
                { name: "Sponsor an Event", href: "/sponsor-an-event" },
                { name: "Media Kit", href: "/media-kit" },
                { name: "Partner With Us", href: "/partner-with-us" },
                { name: "Venue Partnership", href: "/venue-partnership" },
                { name: "Brand Partnership", href: "/brand-partnership" },
                { name: "Advertise With Us", href: "/advertise" },
            ]
        },
        {
            title: "Popular Cities",
            links: [
                { name: "Bengaluru Meetups", href: "/bangalore" },
                { name: "Mumbai Meetups", href: "/mumbai" },
                { name: "Delhi Meetups", href: "/delhi" },
                { name: "Hyderabad Meetups", href: "/hyderabad" },
                { name: "Pune Meetups", href: "/pune" },
                { name: "Kolkata Meetups", href: "/kolkata" },
                { name: "Ahmedabad Meetups", href: "/ahmedabad" },
                { name: "Chennai Meetups", href: "/chennai" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Contact Us", href: "/contact" },
                { name: "Success Stories", href: "/success-stories" },
                { name: "Testimonials", href: "/testimonials" },
                { name: "Our Partners", href: "/our-partners" },
                { name: "Our Authors", href: "/authors" },
                { name: "FAQs", href: "/faqs" },
                { name: "Blog", href: "/blog" },
                { name: "Team", href: "/team" },
                { name: "Support", href: "/support" },
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy", href: "/privacy-policy" },
                { name: "Cookie Policy", href: "/cookie-policy" },
                { name: "Refund Policy", href: "/refund-policy" },
                { name: "Safety Guidelines", href: "/safety-guidelines" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Disclaimer", href: "/disclaimer" },
            ]
        }
    ];

    return (
        <footer className="w-full border-t border-gray-200 bg-gray-50/80 backdrop-blur-xl z-10 relative">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
                            Connecting curious souls through uniquely curated weekend events and meetups. We believe in the magic of unexpected conversations and real-world connections.
                        </p>
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

