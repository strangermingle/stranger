import Link from 'next/link';
import Image from 'next/image';
import SocialLinks from './SocialLinks';

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
            title: "Partnerships",
            links: [
                { name: "Sponsor an Event", href: "/sponsor-an-event" },
                { name: "Media Kit", href: "/media-kit" },
                { name: "Partner With Us", href: "/partner-with-us" },
                { name: "Venue Partnership", href: "/venue-partnership" },
                { name: "Brand Partnership", href: "/brand-partnership" },
                { name: "Advertise With Us", href: "/advertise" },
            ]
        },
        {
            title: "Main City Pages",
            links: [
                { name: "Bengaluru", href: "/bangalore" },
                { name: "Mumbai", href: "/mumbai" },
                { name: "Delhi", href: "/delhi" },
                { name: "Hyderabad", href: "/hyderabad" },
                { name: "Pune", href: "/pune" },
                { name: "Kolkata", href: "/kolkata" },
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Contact Us", href: "/contact" },
                { name: "Success Stories", href: "/success-stories" },
                { name: "Our Partners", href: "/our-partners" },
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
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px- lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-2 text-center">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="mt-3 text-sm font-semibold text-gray-900 tracking-wider uppercase mb-1 text-center">
                                {section.title}
                            </h3>
                            <ul className="space-y-0.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            href={link.href} 
                                            className={`text-sm transition-colors ${
                                                link.highlight 
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
                <div className="pt-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-2">
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
