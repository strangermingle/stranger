import {
    HeartHandshake,
    Shield,
    AlertTriangle,
    Scale,
    FileCheck,
    DollarSign,
    MapPin,
    UserCheck,
    Ban,
    PhoneCall,
    Mail
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Companion (Freelancer) Terms & Conditions | Stranger Mingle",
    description: "Terms and conditions for registering and operating as a freelance platonic social companion on Stranger Mingle.",
    alternates: {
        canonical: "/companion-terms",
    },
    openGraph: {
        title: "Companion (Freelancer) Terms & Conditions | Stranger Mingle",
        description: "Terms and conditions for registering and operating as a freelance platonic social companion on Stranger Mingle.",
        url: "/companion-terms",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function CompanionTermsPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-200">
                        Freelance Companion Agreement
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 pb-2">
                        Companion Terms &amp; Conditions
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-purple-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-base max-w-2xl mx-auto">
                        These terms govern all individuals registering or offering their time as a freelance companion ("Friend on Rent") on Stranger Mingle. By registering at <code className="bg-rose-50 text-rose-700 px-1 py-0.5 rounded">/rent-a-friend-registration</code>, you legally agree to these binding terms.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Core Purpose: Platonic Only */}
                    <section className="bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950 text-white p-8 rounded-3xl shadow-xl border border-rose-500/20">
                        <div className="flex items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-3">1. Platonic Social Companionship to Combat Loneliness</h2>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                    The Stranger Mingle companion platform is engineered with a single benevolent mission: <strong>to combat urban loneliness, depression, and social isolation across Indian cities through strictly platonic friendship</strong>.
                                </p>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs leading-relaxed space-y-2">
                                    <p className="text-rose-200 font-semibold uppercase tracking-wider">Permitted Activities:</p>
                                    <p className="text-slate-200">
                                        Having coffee or tea, sharing meals at restaurants, visiting art galleries, sightseeing, attending movies, exploring city markets, attending Stranger Mingle weekend events together, walking in public parks, and engaging in supportive, uplifting conversations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Strict Prohibition of Sexual / Escort Services */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Zero Tolerance for Adult, Escort, or Dating Solicitations</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Stranger Mingle is <strong>NOT an escort agency, NOT a dating platform, and NOT an adult entertainment service</strong>. We operate with zero tolerance under the <em>Immoral Traffic (Prevention) Act, 1956 (ITPA)</em> and the Indian Penal Code / Bharatiya Nyaya Sanhita.
                                </p>
                                <ul className="text-sm text-gray-600 space-y-2 pl-4 list-disc mb-4">
                                    <li>Any solicitation, offering, demand, or discussion of commercial sexual services, physical intimacy, erotic massages, or nudity is strictly forbidden.</li>
                                    <li>Companions found accepting or offering illicit services will face immediate account termination, blacklisting, forfeiture of earnings, and prompt reporting to Indian cybercrime authorities.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Strict Public Place Mandate & Absolute Private Location Waiver */}
                    <section className="bg-amber-50/60 p-8 rounded-3xl border border-amber-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Public Places Mandate &amp; Private Places Disclaimer</h2>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    <strong>All companion meetups must strictly take place in open, verified, well-lit public spaces</strong> (e.g., shopping malls, cafes, public restaurants, museums, metro stations, or organized event venues).
                                </p>
                                <div className="p-5 rounded-2xl bg-white border border-amber-300 text-gray-900 text-sm font-medium leading-relaxed mb-4 shadow-xs">
                                    <strong>LEGAL LIABILITY DISCLAIMER:</strong> Stranger Mingle is strictly <u>NOT liable or responsible</u> if companions or users choose to meet in private places such as private homes, flats, apartments, hotel rooms, resort suites, guest houses, isolated vehicles, or remote secluded spots. Meeting in private premises constitutes a direct breach of our Safety Guidelines and is undertaken solely and entirely at the participant's own personal risk.
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Companions hold an absolute, non-negotiable right to refuse any booking or immediately leave any location if a user requests to relocate to a private room, vehicle, or secluded venue.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Independent Freelancer Status */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Independent Contractor / Freelancer Status</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    By creating a companion profile, you acknowledge and agree that your legal relationship with Stranger Mingle is solely that of an <strong>independent freelance service provider</strong>.
                                </p>
                                <ul className="text-sm text-gray-600 space-y-2 pl-4 list-disc">
                                    <li>Nothing in this agreement constitutes an employer-employee relationship, agency, joint venture, or partnership.</li>
                                    <li>Companions have complete autonomy to decide their hourly pricing, availability, booking acceptances, and companion preferences.</li>
                                    <li>Companions are not entitled to employment benefits, provident fund, insurance, gratuity, or minimum wage guarantees from Stranger Mingle.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Age & Identity Verification */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Age Verification &amp; KYC Identification</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    All companions must be at least <strong>18 years of age</strong>. Minors are strictly barred from registering or offering companionship.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Stranger Mingle reserves the right to require government-recognized photo identification (such as Aadhaar card, PAN card, Voter ID, or Passport) to verify age, legal capacity, and identity before disbursing booking payouts. Providing forged, fake, or stolen credentials is an offense punishable under the IT Act and criminal statutes.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Earnings, Payouts & Taxation */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Earnings, Platform Commission &amp; Tax Compliance</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Companions earn compensation based on the hourly rates listed on their approved profile minus the agreed Stranger Mingle technology platform convenience fee.
                                </p>
                                <ul className="text-sm text-gray-600 space-y-2 pl-4 list-disc">
                                    <li><strong>Taxation:</strong> Companions are solely responsible for calculating, reporting, and remitting all applicable Indian direct taxes (Income Tax) and indirect taxes (GST where turnover exceeds statutory thresholds) on their earnings.</li>
                                    <li><strong>TDS &amp; Compliance:</strong> Where applicable under the Income Tax Act, 1961 (such as Section 194-O for e-commerce operator facilitation), Stranger Mingle may deduct Tax Deducted at Source (TDS) and furnish relevant credit certificates.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Support & Reporting */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Companion Support &amp; Incident Reporting</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    If you experience rude, inappropriate, harassing, or suspicious behavior from any user, immediately disengage, reach a safe public location, and notify our safety team:
                                </p>
                                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-sm text-purple-950 font-medium">
                                    Safety Desk: <a href="mailto:strangermingleteam@gmail.com" className="font-bold underline text-purple-700">strangermingleteam@gmail.com</a> | Helpline: <a href="tel:+917385531551" className="font-bold underline text-purple-700">+91 73855 31551</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    Ready to sign up as a companion? Proceed to <Link href="/rent-a-friend-registration" className="text-rose-600 underline font-bold">Companion Registration</Link> or review our <Link href="/safety-guidelines" className="text-blue-600 underline font-semibold">Safety Guidelines</Link>.
                </div>
            </div>
        </div>
    );
}

