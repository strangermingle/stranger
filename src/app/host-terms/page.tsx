import {
    Home,
    Shield,
    AlertTriangle,
    Building2,
    Wine,
    Scale,
    FileCheck,
    PhoneCall,
    Mail,
    CheckCircle2
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Event Host & Venue Liability Terms | Stranger Mingle",
    description: "Terms of service, safety responsibilities, and liability waivers for event hosts, house party organizers, and venue partners on Stranger Mingle.",
    alternates: {
        canonical: "/host-terms",
    },
    openGraph: {
        title: "Event Host & Venue Liability Terms | Stranger Mingle",
        description: "Terms of service, safety responsibilities, and liability waivers for event hosts, house party organizers, and venue partners on Stranger Mingle.",
        url: "/host-terms",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function HostTermsPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-200">
                        Host &amp; Venue Agreement
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 pb-2">
                        Event Host &amp; Venue Terms
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-rose-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-base max-w-2xl mx-auto">
                        These terms govern all individuals and businesses hosting social events, house parties, workshops, or providing venue facilities through Stranger Mingle.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Platform Role Overview */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Stranger Mingle Platform Role</h2>
                                <p className="mb-4 leading-relaxed text-gray-600 text-sm">
                                    <strong>Stranger Mingle</strong> acts solely as a discovery, ticketing facilitation, and community networking intermediary connecting event organizers with prospective attendees.
                                </p>
                                <p className="leading-relaxed text-gray-600 text-sm">
                                    Stranger Mingle is not the owner, occupier, operator, or tenant of the private residences, rental villas, cafes, or clubs where independent events take place. The primary legal responsibility for the physical safety, crowd management, and legality of the venue rests with the host.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Host Responsibilities & Local Law Compliance */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Host Warranties &amp; Venue Obligations</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    By listing or hosting an event through <code className="text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">/host-an-event</code>, the Host warrants and represents that:
                                </p>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span><strong>Lawful Premises:</strong> You possess legal authority (ownership, valid lease, or explicit permission from the property owner/society) to host gatherings at the designated address.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span><strong>Safety Measures:</strong> The venue has basic safety infrastructure (unobstructed emergency exits, first aid kits, adequate ventilation, and working sanitation facilities).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                        <span><strong>Noise &amp; Municipal Curfews:</strong> You will strictly observe local municipality noise regulations, society bylaws, and police curfews for residential neighborhoods.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Alcohol, Substances & Age Verification */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Prohibited Substances &amp; Liquor Laws</h2>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <span><strong>Zero Drug Tolerance:</strong> The possession, consumption, or supply of narcotics, psychotropic substances, or prohibited drugs under the NDPS Act is absolutely banned at all times.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <span><strong>State Excise Compliance:</strong> If alcohol is consumed at a private event, the Host is solely responsible for obtaining any necessary one-day temporary excise permits (e.g. Occasional Liquor Permit / FL-4 license) as required by the relevant state government.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <span><strong>Underage Drinking Ban:</strong> Serving or permitting alcohol consumption to any person under the statutory drinking age of the respective Indian state is strictly prohibited.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Comprehensive Liability Waiver */}
                    <section className="bg-amber-50/60 p-8 rounded-3xl border border-amber-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Property Damage &amp; Indemnification Waiver</h2>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    Stranger Mingle is <strong>NOT an insurer, underwriter, or guarantor</strong> of guest conduct or venue conditions.
                                </p>
                                <div className="p-5 rounded-2xl bg-white border border-amber-300 text-gray-900 text-sm font-medium leading-relaxed mb-4">
                                    To the maximum extent permitted by applicable Indian law, Stranger Mingle and its founders, employees, and affiliates shall not be liable to the Host or any third party for any personal injury, death, theft, loss of personal belongings, property damage, structural repairs, or neighborhood disputes arising out of an event.
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Hosts agree to defend, indemnify, and hold harmless Stranger Mingle against any claims, fines, police investigations, or legal proceedings resulting from host negligence or violations of municipal regulations.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Host Payouts & Dispute Resolution */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Host Support &amp; Payout Inquiries</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Ticket payouts are settled to the Host's verified Indian bank account within 2 to 3 business days following the successful conclusion of the verified event.
                                </p>
                                <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-sm text-purple-950 font-medium space-y-1">
                                    <p>Host Operations Desk: <a href="mailto:strangermingleteam@gmail.com" className="font-bold underline text-purple-700">strangermingleteam@gmail.com</a></p>
                                    <p>Phone / WhatsApp: <a href="tel:+917385531551" className="font-bold underline text-purple-700">+91 73855 31551</a></p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center text-sm text-gray-500">
                    Want to list your house party or meetup? Explore <Link href="/host-an-event" className="text-amber-600 underline font-bold">Host an Event</Link> or join as a <Link href="/venue-partnership" className="text-blue-600 underline font-semibold">Venue Partner</Link>.
                </div>
            </div>
        </div>
    );
}

