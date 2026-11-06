import {
    Shield,
    Mail,
    Phone,
    Clock,
    Scale,
    AlertCircle,
    CheckCircle2,
    FileText,
    HelpCircle
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Grievance Redressal Policy | Stranger Mingle",
    description: "Official Grievance Redressal mechanism and Grievance Officer details for Stranger Mingle under the Information Technology Rules, 2021.",
    alternates: {
        canonical: "/grievance-redressal",
    },
    openGraph: {
        title: "Grievance Redressal Policy | Stranger Mingle",
        description: "Official Grievance Redressal mechanism and Grievance Officer details for Stranger Mingle under the Information Technology Rules, 2021.",
        url: "/grievance-redressal",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function GrievanceRedressalPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
                        IT (Intermediary Guidelines) Rules, 2021 Compliance
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pb-2">
                        Grievance Redressal Policy
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-base max-w-2xl mx-auto">
                        In accordance with the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the designated Grievance Officer details and redressal process are published below.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Grievance Officer Details Card */}
                    <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-8 rounded-3xl shadow-xl border border-indigo-700/30">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-4">Designated Grievance Officer</h2>
                                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                    Users, members, companions, and regulatory authorities can escalate complaints, report user misconduct, intellectual property infringements, or digital abuse directly to our Grievance Redressal Officer.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white/5 p-5 rounded-2xl border border-white/10">
                                    <div>
                                        <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Designation</span>
                                        <span className="font-semibold text-white">Grievance Redressal Officer</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Entity</span>
                                        <span className="font-semibold text-white">Stranger Mingle Community Platform</span>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Official Email</span>
                                        <a href="mailto:strangermingleteam@gmail.com" className="font-semibold text-blue-300 hover:text-white underline">
                                            strangermingleteam@gmail.com
                                        </a>
                                    </div>
                                    <div>
                                        <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Helpline / Phone</span>
                                        <a href="tel:+917385531551" className="font-semibold text-emerald-300 hover:text-white">
                                            +91 73855 31551
                                        </a>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <span className="text-slate-400 block text-xs uppercase tracking-wider mb-1">Operating Hours</span>
                                        <span className="font-semibold text-white">Monday – Saturday, 10:00 AM to 6:00 PM IST (Excluding Public Holidays)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Redressal Timelines */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Statutory Redressal Timelines</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100">
                                        <div className="flex items-center gap-2 text-purple-700 font-bold mb-2 text-base">
                                            <CheckCircle2 className="w-5 h-5 text-purple-600" />
                                            Acknowledgement: Within 24 Hours
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Every formal grievance ticket received via <code className="text-purple-800 bg-purple-100 px-1 py-0.5 rounded">strangermingleteam@gmail.com</code> will receive an official acknowledgment and unique complaint ticket number within twenty-four (24) hours.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                                        <div className="flex items-center gap-2 text-indigo-700 font-bold mb-2 text-base">
                                            <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                            Resolution: Within 15 Days
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            All grievances, including user profile reports, content take-downs, harassment complaints, or billing clarifications, shall be thoroughly investigated and disposed of within a maximum period of fifteen (15) days.
                                        </p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed flex items-start gap-2.5">
                                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                    <span>
                                        <strong>Priority Expedited Takedowns:</strong> Complaints regarding non-consensual sharing of intimate images, impersonation, or direct threats to personal physical safety are reviewed immediately and acted upon within 24 hours of notification.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How to Submit a Grievance */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Submit a Valid Grievance</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    To enable our safety and compliance team to investigate and resolve your concern efficiently, your written complaint must include:
                                </p>
                                <ul className="space-y-3 text-sm text-gray-600 mb-6">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                        <span><strong>Complainant Information:</strong> Your full legal name, registered email address, and phone number.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                        <span><strong>Specific Nature of Grievance:</strong> Detailed description of the incident (e.g. companion misconduct, offensive chat, payment failure, unauthorized content).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                        <span><strong>Evidence &amp; Identifiers:</strong> Relevant URLs, screenshots, companion profile links, booking IDs, transaction references, or chat timestamps.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                        <span><strong>Declaration of Good Faith:</strong> A statement certifying that the details submitted are truthful and accurate to the best of your knowledge.</span>
                                    </li>
                                </ul>
                                <div className="text-xs text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-200">
                                    Send your grievance email with the subject line format: <br />
                                    <code className="text-gray-800 font-mono font-semibold">"FORMAL GRIEVANCE: [Subject/Category] - [Your Registered Email]"</code> to <a href="mailto:strangermingleteam@gmail.com" className="text-blue-600 underline">strangermingleteam@gmail.com</a>.
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Law Enforcement Coordination */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Law Enforcement &amp; Regulatory Inquiries</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Stranger Mingle cooperates fully with Indian law enforcement agencies, cybercrime cells, and judicial authorities.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Official legal notices under Section 91 of the Code of Criminal Procedure (CrPC) / Section 94 of the Bharatiya Nagarik Suraksha Sanhita (BNSS), or requests from verified government cybercrime portals should be marked with high priority and directed to:
                                </p>
                                <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 text-sm text-rose-950 font-medium">
                                    Law Enforcement Cell: <a href="mailto:strangermingleteam@gmail.com" className="underline font-bold">strangermingleteam@gmail.com</a> | Urgent Helpline: <a href="tel:+917385531551" className="font-bold">+91 73855 31551</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Back to legal links */}
                <div className="mt-12 text-center text-sm text-gray-500">
                    Need immediate safety assistance? Visit our <Link href="/safety-guidelines" className="text-blue-600 underline font-semibold">Safety Guidelines</Link> or read our <Link href="/terms" className="text-blue-600 underline font-semibold">Terms of Service</Link>.
                </div>
            </div>
        </div>
    );
}

