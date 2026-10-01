import type { Metadata } from 'next';
import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: "Contact Us | Official Office & Support - Stranger Mingle",
    description: "Get in touch with Stranger Mingle. Official Registered Office: Office No 610, Park Plaza Business Centre, Lohegaon, Porwal Road, Pune - 411047. Phone/WhatsApp: +91 73855 31551. Office Timing: Mon-Fri, 10AM to 5PM.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact Us | Official Office & Support - Stranger Mingle",
        description: "Get in touch with Stranger Mingle. Official Registered Office: Office No 610, Park Plaza Business Centre, Lohegaon, Porwal Road, Pune - 411047. Phone/WhatsApp: +91 73855 31551.",
        url: "/contact",
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

const WA_NUMBER = '917385531551';
const WA_MESSAGE = encodeURIComponent('Hi Stranger Mingle Team, I would like to get in touch.');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const WA_CHANNEL_LINK = 'https://whatsapp.com/channel/0029Vb9NMRWAjPXTlxMj0F1K';

export default function Contact() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        Official Contact & Support
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions, partnership queries, or need assistance? Reach out to the <strong>Stranger Mingle</strong> team (a brand of <strong>StrangerMingle</strong>). We&apos;re here to help you make meaningful friendships.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Contact Cards Column */}
                    <div className="space-y-6">
                        {/* Official Address Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">Official Registered Office</h3>
                                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                                            Headquarters
                                        </span>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Office No 610, Park Plaza Business Centre,<br />
                                        Lohegaon, Porwal Road,<br />
                                        Pune - 411047, Maharashtra, India
                                    </p>
                                    <div className="mt-3">
                                        <a
                                            href="https://www.google.com/maps/search/?api=1&query=Office+No+610+Park+Plaza+Business+Centre+Lohegaon+Porwal+Road+Pune+411047"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                                        >
                                            <span>View on Google Maps</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp & Phone Support Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">WhatsApp & Call Support</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        For immediate assistance, enquiries, and partner support:
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <a
                                            href={`tel:+917385531551`}
                                            className="text-lg font-bold text-gray-900 hover:text-green-700 transition-colors"
                                        >
                                            +91 73855 31551
                                        </a>
                                        <a
                                            href={WA_LINK}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-md shadow-green-200 transition-all transform hover:scale-105"
                                        >
                                            <span>Chat on WhatsApp</span>
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Office Timing Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Office Timing</h3>
                                    <p className="text-gray-800 font-semibold">
                                        Monday – Friday, 10:00 AM to 5:00 PM IST
                                    </p>
                                    <p className="text-gray-500 text-sm mt-1">
                                        Weekend hours are dedicated to managing on-ground community meetup events across cities.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Email Us Card */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Email Us</h3>
                                    <a rel="nofollow" href="mailto:strangermingleteam@gmail.com" className="text-blue-600 hover:text-blue-700 font-semibold text-base">
                                        strangermingleteam@gmail.com
                                    </a>
                                    <p className="text-gray-500 text-sm mt-1">
                                        We usually reply within 24 hours during business days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Channels, Social & Presence */}
                    <div className="space-y-6">
                        {/* WhatsApp Channel Promo Card */}
                        <div className="bg-linear-to-br from-green-600 to-emerald-700 p-6 sm:p-8 rounded-2xl text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10">
                                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
                                    Official WhatsApp Channel
                                </span>
                                <h3 className="text-2xl font-bold mb-2">Join Our Updates Channel</h3>
                                <p className="text-green-100 text-sm mb-6 leading-relaxed">
                                    Get instant alerts for weekend meetups, early-bird tickets, and special community announcements directly in WhatsApp.
                                </p>
                                <a
                                    href={WA_CHANNEL_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-700 hover:bg-green-50 rounded-xl font-bold text-sm shadow-md transition-all transform hover:scale-105 active:scale-95"
                                >
                                    <span>Follow WhatsApp Channel</span>
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 448 512">
                                        <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Nationwide Presence */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">Active Nationwide Presence</h3>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                Founded in Pune, Stranger Mingle actively hosts safe, verified weekend meetups across major cities in India:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {['Pune', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Delhi', 'Ahmedabad', 'Kolkata', 'Chennai', 'Jaipur', 'Indore'].map((city) => (
                                    <span key={city} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                                        {city}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-4">
                                <h3 className="font-bold text-gray-900 text-lg">Follow Our Community</h3>
                                <p className="text-gray-600 text-sm">
                                    Check event photos, attendee stories, and upcoming weekend meetups on our social platforms:
                                </p>
                                <SocialLinks />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="bg-white p-8 sm:p-10 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send Us a Direct Message</h2>
                        <p className="text-gray-600">
                            Fill out the form below and our team will get back to you within 24 hours.
                        </p>
                    </div>
                    <ContactForm />
                </div>
            </div>

            {/* High-Authority SEO Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "ContactPage",
                                "@id": "https://www.strangermingle.com/contact#webpage",
                                "url": "https://www.strangermingle.com/contact",
                                "name": "Contact Stranger Mingle",
                                "description": "Get in touch with the Stranger Mingle team. Official office address, customer support telephone, WhatsApp assistance, and email.",
                                "isPartOf": {
                                    "@type": "WebSite",
                                    "@id": "https://www.strangermingle.com/#website",
                                    "url": "https://www.strangermingle.com",
                                    "name": "Stranger Mingle"
                                }
                            },
                            {
                                "@type": "LocalBusiness",
                                "@id": "https://www.strangermingle.com/#organization",
                                "name": "Stranger Mingle",
                                "alternateName": "StrangerMingle",
                                "url": "https://www.strangermingle.com",
                                "logo": "https://www.strangermingle.com/logo.png",
                                "image": "https://www.strangermingle.com/images/og-images/og-image-default.webp",
                                "telephone": "+91-7385531551",
                                "email": "strangermingleteam@gmail.com",
                                "priceRange": "₹₹",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": "Office No 610, Park Plaza Business Centre, Lohegaon, Porwal Road",
                                    "addressLocality": "Pune",
                                    "addressRegion": "Maharashtra",
                                    "postalCode": "411047",
                                    "addressCountry": "IN"
                                },
                                "openingHoursSpecification": [
                                    {
                                        "@type": "OpeningHoursSpecification",
                                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                        "opens": "10:00",
                                        "closes": "17:00"
                                    }
                                ],
                                "contactPoint": [
                                    {
                                        "@type": "ContactPoint",
                                        "contactType": "Customer Support",
                                        "telephone": "+91-7385531551",
                                        "email": "strangermingleteam@gmail.com",
                                        "availableLanguage": ["English", "Hindi"],
                                        "hoursAvailable": {
                                            "@type": "OpeningHoursSpecification",
                                            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                                            "opens": "10:00",
                                            "closes": "17:00"
                                        }
                                    }
                                ],
                                "sameAs": [
                                    "https://www.instagram.com/strangermingle/",
                                    "https://www.youtube.com/@strangermingle",
                                    "https://x.com/strangermingle",
                                    "https://www.linkedin.com/company/strangermingle",
                                    "https://www.facebook.com/strangermingle",
                                    "https://whatsapp.com/channel/0029Vb9NMRWAjPXTlxMj0F1K"
                                ]
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}
