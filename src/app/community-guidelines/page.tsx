import {
    Users,
    Heart,
    MessageCircle,
    PartyPopper,
    ShieldCheck,
    AlertTriangle,
    Mail,
    PhoneCall,
    CheckCircle2
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Community Guidelines & Code of Conduct | Stranger Mingle",
    description: "The core principles, community standards, and code of conduct for Stranger Mingle events, companion hangouts, and anonymous chat.",
    alternates: {
        canonical: "/community-guidelines",
    },
    openGraph: {
        title: "Community Guidelines & Code of Conduct | Stranger Mingle",
        description: "The core principles, community standards, and code of conduct for Stranger Mingle events, companion hangouts, and anonymous chat.",
        url: "/community-guidelines",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function CommunityGuidelinesPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-200">
                        Our Community Standards
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 pb-2">
                        Community Guidelines
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-base max-w-2xl mx-auto">
                        Stranger Mingle is built to be a safe, uplifting sanctuary where strangers become friends. Whether you are chatting anonymously, hiring a companion, or attending a weekend mixer, our guidelines ensure mutual respect and safety.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Core Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Platonic Friendship</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Our services exist purely to combat loneliness. We celebrate wholesome, non-romantic social connections.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Safety &amp; Consent</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Consent is mandatory and ongoing. Personal boundaries and comfort levels must always be honored without pushiness.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-xs border border-gray-100 text-center">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Radical Inclusion</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                We welcome people from all walks of life, professions, and cultural backgrounds with zero discrimination.
                            </p>
                        </div>
                    </div>

                    {/* Anonymous Chat & Calls Rules */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rules for Anonymous Chat &amp; Phone Calls</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Our anonymous features allow real people in India to connect without disclosing phone numbers or real-world identities.
                                </p>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span><strong>Respect Anonymity:</strong> Do not repeatedly pressure other users for their WhatsApp number, social media handles, or residential location if they prefer to remain anonymous.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span><strong>No Commercial Spam or Financial Scams:</strong> Offering crypto schemes, MLM investments, loans, or product promotions is strictly forbidden.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span><strong>Zero Harassment:</strong> Any aggressive language, sexual innuendos, hate speech, or offensive stereotyping results in immediate shadow-banning.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Rent a Friend & Companion Guidelines */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rent a Friend / Companion Guidelines</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Whether hiring a companion to explore a new city, attend a cafe, or combat an overwhelming feeling of loneliness:
                                </p>
                                <ul className="space-y-3 text-sm text-gray-600 mb-4">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                        <span><strong>Strictly Platonic:</strong> Companion bookings are purely for companionship. Companions must never be asked for dates, sexual intimacy, or personal physical touch.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                                        <span><strong>Public Spaces Only:</strong> All companion sessions must occur in public spots (cafes, malls, restaurants, parks).</span>
                                    </li>
                                </ul>
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                                    <strong>Private Location Waiver:</strong> Stranger Mingle is strictly not liable or responsible if users or companions meet in private places like private homes, hotel rooms, or secluded venues. Such actions violate our terms and forfeit platform protections.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Events & Meetups Guidelines */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">In-Person Events &amp; House Parties</h2>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span><strong>Punctuality &amp; Respect:</strong> Arrive on time to respect event hosts and venue partners.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span><strong>Zero Substance / Drug Policy:</strong> Consumption, possession, or distribution of illegal substances or narcotics at any Stranger Mingle gathering is grounds for immediate eviction and police reporting.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                        <span><strong>Responsible Drinking:</strong> Alcohol, when permitted at private mixers or licensed partner venues, must be consumed responsibly. Intoxicated or disruptive attendees will be escorted out.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Violations & Reporting */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Enforcement &amp; Contact</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Violations of these guidelines may lead to formal warnings, immediate removal from events, revocation of membership passes without refund, and permanent blacklisting.
                                </p>
                                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-700 space-y-1">
                                    <p>Report safety issues to our dedicated desk:</p>
                                    <p><strong>Email:</strong> <a href="mailto:strangermingleteam@gmail.com" className="text-blue-600 underline">strangermingleteam@gmail.com</a></p>
                                    <p><strong>Helpline:</strong> <a href="tel:+917385531551" className="text-gray-900 font-bold">+91 73855 31551</a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

