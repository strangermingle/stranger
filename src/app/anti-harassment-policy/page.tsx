import {
    ShieldAlert,
    Ban,
    UserX,
    HeartHandshake,
    AlertOctagon,
    PhoneCall,
    Mail,
    Scale,
    CheckCircle2
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Anti-Harassment & Anti-Escort Policy | Stranger Mingle",
    description: "Strict zero-tolerance policy against commercial sexual exploitation, escort services, sexual harassment, and misconduct on Stranger Mingle.",
    alternates: {
        canonical: "/anti-harassment-policy",
    },
    openGraph: {
        title: "Anti-Harassment & Anti-Escort Policy | Stranger Mingle",
        description: "Strict zero-tolerance policy against commercial sexual exploitation, escort services, sexual harassment, and misconduct on Stranger Mingle.",
        url: "/anti-harassment-policy",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function AntiHarassmentPolicyPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
                        Zero Tolerance Safety Protocol
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 pb-2">
                        Anti-Harassment &amp; Anti-Escort Policy
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-indigo-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-base max-w-2xl mx-auto">
                        Stranger Mingle is strictly dedicated to authentic, platonic friendship and community events to combat loneliness. We maintain an uncompromising, zero-tolerance policy against any form of harassment, sexual misconduct, or illicit commercial solicitation.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Zero Tolerance for Escort & Sexual Services */}
                    <section className="bg-gradient-to-br from-red-950 via-slate-900 to-zinc-950 text-white p-8 rounded-3xl shadow-xl border border-red-500/30">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-3">1. Absolute Prohibition of Escort Services &amp; Prostitution</h2>
                                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                    Under the <em>Immoral Traffic (Prevention) Act, 1956 (ITPA)</em> and provisions of the Indian Penal Code / Bharatiya Nyaya Sanhita, commercial sex work, prostitution, and escort services are illegal in India.
                                </p>
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs leading-relaxed space-y-2 mb-4">
                                    <p className="text-red-300 font-bold uppercase tracking-wider">Unambiguous Clarification:</p>
                                    <p className="text-slate-200">
                                        Stranger Mingle is <strong>NOT</strong> an escort directory, call-girl provider, adult massage service, or dating agency. Companion ("Rent a Friend") services facilitate strictly non-sexual, platonic social accompaniment (such as sharing coffee, attending public events, city tours, or sincere conversation) designed exclusively to alleviate social loneliness.
                                    </p>
                                </div>
                                <p className="text-xs text-red-200/90 leading-relaxed">
                                    Any user or companion attempting to use the platform for prostitution, erotic exchange, soliciting nude media, or arranging private rendezvous will be permanently banned and their digital identifiers handed to cybercrime units.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Private Places Disclaimer */}
                    <section className="bg-amber-50/70 p-8 rounded-3xl border border-amber-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Public Places Mandate &amp; Private Spaces Liability Waiver</h2>
                                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                                    All companion meetups and social interactions must occur in <strong>well-lit, verified public venues</strong> (restaurants, shopping centers, cafes, parks, art centers, or official Stranger Mingle events).
                                </p>
                                <div className="p-4 rounded-2xl bg-white border border-amber-300 text-gray-900 text-sm font-semibold leading-relaxed mb-3">
                                    Stranger Mingle is strictly <u>not liable or responsible</u> if members or companions arrange meetings in private places such as personal homes, flats, hotel rooms, lodges, private farmhouses, or isolated locations.
                                </div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    Users are forbidden from demanding, pressuring, or inviting companions to private residences or hotels. Companions must immediately decline and report any such requests.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Online Harassment in Anonymous Chat & Calls */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Anti-Harassment in Anonymous Chat &amp; Phone Calls</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    Our anonymous chat and phone calling features protect user identity and phone number privacy. Anonymity is a protective shield for authentic connection—not a license for abuse.
                                </p>
                                <ul className="text-sm text-gray-600 space-y-2 pl-4 list-disc mb-4">
                                    <li><strong>No Cyber-Bullying or Stalking:</strong> Persistent uninvited messaging, intimidation, or tracking users across platforms is strictly banned.</li>
                                    <li><strong>No Vulgar or Obscene Remarks:</strong> Innuendos, sexually suggestive queries, lewd audio, or non-consensual graphic descriptions during calls will lead to instant termination of call privileges.</li>
                                    <li><strong>No Extortion or Doxxing:</strong> Threatening to expose someone's real identity, workplace, or private details will trigger immediate legal action under Section 66E of the IT Act.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How to Report Violations */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Rapid Incident Reporting &amp; Action</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    If you encounter any harassment, solicitations for sexual favors, or uncomfortable behavior either online or in person:
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-6">
                                    <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100">
                                        <p className="font-bold text-rose-900 mb-1 flex items-center gap-1.5">
                                            <Mail className="w-4 h-4 text-rose-600" />
                                            Safety &amp; Compliance Email
                                        </p>
                                        <p className="text-xs text-gray-600 mb-2">Monitored 24/7 with immediate triage.</p>
                                        <a href="mailto:strangermingleteam@gmail.com" className="font-semibold text-rose-700 underline text-sm">
                                            strangermingleteam@gmail.com
                                        </a>
                                    </div>
                                    <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100">
                                        <p className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                                            <PhoneCall className="w-4 h-4 text-blue-600" />
                                            Urgent Helpline / WhatsApp
                                        </p>
                                        <p className="text-xs text-gray-600 mb-2">Available for real-time safety escalations.</p>
                                        <a href="tel:+917385531551" className="font-semibold text-blue-700 text-sm">
                                            +91 73855 31551
                                        </a>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    In case of imminent physical danger or emergency, always contact local emergency services immediately by dialing <strong>112</strong> (National Emergency Helpline in India) or <strong>1091</strong> (Women Helpline).
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

