import type { Metadata } from "next";
import {
    Shield,
    ClipboardCheck,
    UserCheck,
    MapPin,
    AlertTriangle,
    Eye,
    Lock,
    Users,
    Heart,
    ThumbsDown,
    Handshake,
    Siren,
    Megaphone,
    Briefcase,
    ShieldCheck,
    Beer,
    Smartphone,
    IndianRupee,
    HeartHandshake
} from "lucide-react";

export const metadata: Metadata = {
    title: "Safety Guidelines | Stranger Mingle",
    description: "Your safety is our priority. Read our comprehensive safety guidelines for attending events and interacting with community members.",
    alternates: {
        canonical: "/safety-guidelines",
    },
};

export default function SafetyGuidelines() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                        Safety Guidelines
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8">
                    {/* Intro */}
                    <div className="bg-blue-600 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="p-3 bg-white/10 rounded-2xl shrink-0 backdrop-blur-sm">
                                <ShieldCheck className="w-8 h-8 text-blue-100" />
                            </div>
                            <div>
                                <p className="font-bold text-xl mb-3 text-blue-50">Your Safety is Our Priority</p>
                                <p className="leading-relaxed text-lg text-blue-100">
                                    Stranger Mingle is built on creating safe spaces for genuine friendships. These safety guidelines help protect you during events and in all interactions with our community. Please read them carefully and follow them at all times.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Before Events */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                                <ClipboardCheck className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Before Attending Events</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-5 rounded-2xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><UserCheck className="w-4 h-4 text-blue-500" /> Complete Registration Honestly</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Provide accurate personal information during registration</li>
                                                <li>Complete verification as required - this protects everyone</li>
                                                <li>Use your real name and real details - fake identities compromise safety</li>
                                            </ul>
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-2xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Users className="w-4 h-4 text-blue-500" /> Inform Someone You Trust</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Tell a friend or family member where you&apos;re going</li>
                                                <li>Share event details: location, time, expected return time</li>
                                                <li>Keep your phone charged and with you at all times</li>
                                                <li>Provide emergency contact details during registration</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-5 rounded-2xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-500" /> Review Event Details</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Read the full event description and requirements</li>
                                                <li>Check venue address and verify it&apos;s a public location</li>
                                                <li>Note organizer contact information</li>
                                                <li>Understand what to bring and what to expect</li>
                                            </ul>
                                        </div>

                                        <div className="bg-gray-50 p-5 rounded-2xl">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Heart className="w-4 h-4 text-blue-500" /> Physical Preparedness</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Ensure you&apos;re physically fit for activity-based events (treks, cycling, etc.)</li>
                                                <li>Disclose any health conditions to organizers beforehand</li>
                                                <li>Bring necessary medications or medical equipment</li>
                                                <li>Don&apos;t participate if you&apos;re feeling unwell</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* During Events */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-50 rounded-2xl text-green-600 shrink-0">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">During Events - Personal Safety</h2>

                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Stay in Public Spaces</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>All Stranger Mingle events are held in public venues</li>
                                                <li>Don&apos;t leave the event venue with someone you just met</li>
                                                <li>If you need to step out, inform the organizer</li>
                                                <li>Stay with the group during outdoor activities</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Eye className="w-4 h-4 text-green-500" /> Trust Your Instincts</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>If something or someone makes you uncomfortable, trust that feeling</li>
                                                <li>You have the right to decline conversations or move away from anyone</li>
                                                <li>Inform the event organizer immediately if you feel unsafe</li>
                                                <li>Leave the event if you&apos;re uncomfortable - your safety comes first</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="h-px bg-gray-100 w-full"></div>

                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Lock className="w-4 h-4 text-green-500" /> Protect Info</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>You&apos;re not obligated to share personal details beyond your first name</li>
                                                <li>Don&apos;t share your home address, workplace location, or daily routine</li>
                                                <li>Be cautious about sharing social media handles initially</li>
                                                <li>Don&apos;t feel pressured to exchange contact details if you&apos;re not comfortable</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4 text-green-500" /> Manage Belongings</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Keep valuables secure and don&apos;t bring unnecessary items</li>
                                                <li>Don&apos;t leave bags, phones, or wallets unattended</li>
                                                <li>Be mindful of pickpockets in crowded areas</li>
                                                <li>Keep your phone accessible for emergencies</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Beer className="w-4 h-4 text-green-500" /> Alcohol Safety</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Don&apos;t arrive at events intoxicated</li>
                                                <li>If the event includes alcohol, consume responsibly and know your limits</li>
                                                <li>Watch your drink at all times - don&apos;t accept drinks from strangers</li>
                                                <li>Never use illegal substances at events</li>
                                                <li>Arrange safe transportation if you plan to drink</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Women's Safety */}
                    <section className="bg-pink-50 p-8 rounded-3xl border border-pink-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-pink-600 shrink-0 shadow-sm">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Specific Safety Guidelines for Women</h2>
                                <p className="leading-relaxed mb-6 text-gray-700 font-medium">
                                    We are committed to creating safe spaces where women feel comfortable and respected. We have zero tolerance for harassment.
                                </p>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Your Rights</h3>
                                            <ul className="space-y-2 text-gray-700 text-sm list-disc ml-5">
                                                <li>You have the right to participate freely without fear of harassment</li>
                                                <li>You have the right to say &quot;no&quot; to any interaction or conversation</li>
                                                <li>You have the right to be treated with respect and dignity</li>
                                                <li>You have the right to report anyone making you uncomfortable</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Additional Precautions</h3>
                                            <ul className="space-y-2 text-gray-700 text-sm list-disc ml-5">
                                                <li>Attend your first few events during daytime when possible</li>
                                                <li>Consider bringing a trusted friend to your first event (if allowed)</li>
                                                <li>Arrange your own transportation - don&apos;t rely on strangers for rides</li>
                                                <li>Share your live location with a trusted person during events</li>
                                                <li>If meeting someone from an event one-on-one later, choose busy public places</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-pink-200 shadow-sm">
                                        <h4 className="font-bold text-pink-700 mb-4 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Immediate Action for Harassment</h4>
                                        <p className="leading-relaxed mb-4 text-gray-700 text-sm">If anyone makes unwanted advances, inappropriate comments, or touches you without consent:</p>
                                        <ol className="list-decimal space-y-2 text-gray-700 text-sm ml-5 font-medium">
                                            <li>Clearly tell them to stop</li>
                                            <li>Inform the event organizer immediately</li>
                                            <li>Move to a different area or closer to the organizer</li>
                                            <li>Leave if you feel unsafe - we&apos;ll provide full refund</li>
                                            <li>Report the incident after the event</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Prohibited Behavior */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-red-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
                                <ThumbsDown className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Strictly Prohibited Behavior</h2>
                                <p className="leading-relaxed font-semibold mb-6 text-red-600">
                                    The following behaviors will result in immediate removal from events and permanent ban from the platform:
                                </p>

                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Harassment and Inappropriate Conduct</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                            <li>Sexual harassment of any kind</li>
                                            <li>Unwanted physical contact or touching</li>
                                            <li>Inappropriate sexual comments or advances</li>
                                            <li>Following or stalking someone at or after events</li>
                                            <li>Taking photos or videos of others without consent</li>
                                            <li>Sending unsolicited explicit messages or images</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Discrimination</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                            <li>Discrimination based on caste, religion, gender, skin color</li>
                                            <li>Discrimination based on economic status, education, or profession</li>
                                            <li>Making derogatory comments about someone&apos;s background</li>
                                            <li>Exclusionary behavior or forming &quot;elite&quot; cliques</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Threatening Behavior</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                            <li>Physical violence or threats of violence</li>
                                            <li>Verbal abuse, bullying, or intimidation</li>
                                            <li>Aggressive or threatening body language</li>
                                            <li>Hate speech or inciting others against someone</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Misuse of Platform</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                            <li>Using events for dating, romantic matchmaking, or hookups</li>
                                            <li>Promoting or selling products/services to members</li>
                                            <li>Recruiting for business opportunities or MLM schemes</li>
                                            <li>Collecting member information for unauthorized purposes</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Illegal Activities</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                            <li>Drug use or distribution</li>
                                            <li>Theft or property damage</li>
                                            <li>Any activity that violates Indian law</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* After Events */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
                                <Handshake className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">After Events - Safe Interactions</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Meeting Members Outside Events</h3>
                                        <p className="leading-relaxed mb-3 text-gray-600">
                                            You may choose to meet people you&apos;ve connected with outside of official events. This is at your own risk and responsibility. Safety recommendations:
                                        </p>
                                        <div className="bg-purple-50 p-5 rounded-2xl">
                                            <ul className="space-y-2 text-purple-900 text-sm list-disc ml-5">
                                                <li>Meet in busy, public places during daytime initially</li>
                                                <li>Tell someone where you&apos;re going and when you&apos;ll return</li>
                                                <li>Arrange your own transportation - don&apos;t accept rides initially</li>
                                                <li>Meet in groups rather than one-on-one at first</li>
                                                <li>Trust your instincts - if something feels off, cancel or leave</li>
                                                <li>Don&apos;t feel obligated to meet anyone outside events</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Smartphone className="w-4 h-4 text-purple-500" /> Digital Communication Safety</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>You&apos;re not obligated to stay in touch with everyone you meet</li>
                                                <li>Block anyone who makes you uncomfortable - no explanation needed</li>
                                                <li>Don&apos;t share intimate photos or sensitive personal information</li>
                                                <li>Be cautious of people who immediately want to move to private channels</li>
                                                <li>Report anyone who sends inappropriate messages</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><IndianRupee className="w-4 h-4 text-purple-500" /> Financial Safety</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Never lend money to people you just met</li>
                                                <li>Be skeptical of sob stories or urgent financial requests</li>
                                                <li>Don&apos;t invest in business schemes promoted by members</li>
                                                <li>Don&apos;t share bank details, credit card information, or OTPs</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-200">
                                        <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Remember</h4>
                                        <p className="leading-relaxed text-yellow-800 text-sm">
                                            Stranger Mingle facilitates initial connections in safe, structured environments. What happens outside our events is your personal choice and responsibility. We cannot verify or control interactions beyond our organized activities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Emergency Situations */}
                    <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-red-600 shrink-0 shadow-sm">
                                <Siren className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Situations</h2>

                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">During Events</h3>
                                        <p className="leading-relaxed mb-3 text-gray-700">If you experience or witness an emergency:</p>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-xl border border-red-100">
                                                <strong className="text-red-700 block mb-1">Immediate Danger</strong>
                                                <span className="text-gray-600 text-sm">Call local police (100) or emergency services (112) first</span>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-red-100">
                                                <strong className="text-red-700 block mb-1">Medical Emergency</strong>
                                                <span className="text-gray-600 text-sm">Call ambulance (108) and inform event organizer</span>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-red-100">
                                                <strong className="text-red-700 block mb-1">Harassment/Safety Threat</strong>
                                                <span className="text-gray-600 text-sm">Alert event organizer immediately and move to safety</span>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-red-100">
                                                <strong className="text-red-700 block mb-1">Lost or Separated</strong>
                                                <span className="text-gray-600 text-sm">Contact event organizer or use emergency contact provided</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-red-200 w-full"></div>

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Important Emergency Numbers (India)</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-3 bg-white rounded-lg text-center border border-red-100">
                                                    <div className="text-xs text-gray-500 mb-1">Police</div>
                                                    <div className="text-xl font-bold text-red-600">100</div>
                                                </div>
                                                <div className="p-3 bg-white rounded-lg text-center border border-red-100">
                                                    <div className="text-xs text-gray-500 mb-1">Ambulance</div>
                                                    <div className="text-xl font-bold text-red-600">108</div>
                                                </div>
                                                <div className="p-3 bg-white rounded-lg text-center border border-red-100">
                                                    <div className="text-xs text-gray-500 mb-1">Women&apos;s Helpline</div>
                                                    <div className="text-xl font-bold text-red-600">1091</div>
                                                </div>
                                                <div className="p-3 bg-white rounded-lg text-center border border-red-100">
                                                    <div className="text-xs text-gray-500 mb-1">Emergency</div>
                                                    <div className="text-xl font-bold text-red-600">112</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">After-Event Emergencies</h3>
                                            <p className="leading-relaxed text-gray-700 text-sm bg-white p-4 rounded-xl border border-red-100">
                                                If something happens after an event involving another member, contact local authorities first. You may also report the incident to us, but we cannot intervene in matters outside our organized activities. We will, however, take appropriate action regarding the member&apos;s platform access.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Reporting */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shrink-0">
                                <Megaphone className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reporting Violations and Concerns</h2>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">What to Report</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Harassment or inappropriate behavior during events</li>
                                                <li>Violations of community guidelines</li>
                                                <li>Safety concerns about venues or activities</li>
                                                <li>Members using fake identities</li>
                                                <li>Suspicious or concerning behavior</li>
                                                <li>Any incident that made you or others feel unsafe</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">How to Report</h3>
                                            <p className="leading-relaxed mb-3 text-sm text-gray-600">You can report violations through:</p>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li><strong>During Events:</strong> Inform the event organizer immediately</li>
                                                <li><strong>After Events:</strong> Email strangermingleteam@gmail.com with details</li>
                                                <li><strong>Website:</strong> Use the &quot;Report Concern&quot; form</li>
                                                <li><strong>WhatsApp:</strong> Message our safety team</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">What to Include in Your Report</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>Event name and date</li>
                                                <li>Name or description of person(s) involved</li>
                                                <li>Detailed description of what happened</li>
                                                <li>When and where it occurred</li>
                                                <li>Any witnesses</li>
                                                <li>Photos or screenshots (if relevant and safe to collect)</li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">What Happens After You Report</h3>
                                            <ul className="space-y-2 text-gray-600 text-sm list-disc ml-5">
                                                <li>We&apos;ll acknowledge your report within 24 hours</li>
                                                <li>We&apos;ll investigate the matter thoroughly and confidentially</li>
                                                <li>Appropriate action will be taken (warning, suspension, or ban)</li>
                                                <li>You&apos;ll be informed of the outcome</li>
                                                <li>Your identity will be protected unless you choose to disclose it</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 bg-blue-50 p-5 rounded-2xl border border-blue-100 text-center">
                                    <p className="leading-relaxed font-semibold text-blue-900">
                                        Reporting is confidential and protected. We will never penalize anyone for reporting genuine safety concerns. When in doubt, report it.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Organizer Responsibilities */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 shrink-0">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Organizer Responsibilities</h2>
                                <p className="leading-relaxed text-gray-600 mb-4">Our event organizers are trained and committed to your safety. They will:</p>

                                <div className="bg-teal-50 p-6 rounded-2xl mb-6">
                                    <ul className="grid md:grid-cols-2 gap-x-4 gap-y-3 text-teal-900 text-sm list-disc ml-5">
                                        <li>Verify all participant registrations before events</li>
                                        <li>Brief participants on safety guidelines at event start</li>
                                        <li>Monitor interactions throughout the event</li>
                                        <li>Intervene immediately if they observe inappropriate behavior</li>
                                        <li>Be accessible throughout the event for concerns</li>
                                        <li>Maintain emergency contact information</li>
                                        <li>Know the location of nearby hospitals, police stations</li>
                                        <li>Have first-aid supplies for minor injuries</li>
                                        <li>Take all safety concerns seriously and act promptly</li>
                                    </ul>
                                </div>

                                <p className="leading-relaxed font-medium text-gray-800">
                                    Organizers have the authority to remove anyone from events who violates safety guidelines or makes others uncomfortable, without refund.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Final Note */}
                    <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Safety is a Shared Responsibility</h3>
                                <p className="leading-relaxed mb-4 text-gray-700">
                                    While we work hard to create safe spaces, your safety ultimately depends on your own awareness and decisions. We provide the structure, verification, and guidelines - but you need to stay alert, trust your instincts, and speak up when something doesn&apos;t feel right.
                                </p>
                                <p className="leading-relaxed mb-4 text-gray-700">
                                    We also rely on our community to look out for each other. If you see someone being harassed or in an uncomfortable situation, don&apos;t ignore it. Check if they&apos;re okay, inform the organizer, or help them get to safety.
                                </p>
                                <p className="leading-relaxed font-medium text-blue-900">
                                    Stranger Mingle exists to help you make genuine friends and improve your quality of life. These guidelines ensure everyone can do that in an environment that feels safe, respectful, and welcoming.
                                </p>
                            </div>
                        </div>
                    </section>

                    <p className="text-sm text-gray-500 pt-8 border-t border-gray-200 text-center">
                        By using Stranger Mingle and attending our events, you agree to follow these safety guidelines and help us maintain a safe, respectful community for everyone.
                    </p>
                </div>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Stranger Mingle Safety Guidelines",
                        "datePublished": new Date().toISOString(),
                        "author": {
                            "@type": "Organization",
                            "name": "Stranger Mingle"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Stranger Mingle",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://www.strangermingle.com/logo.png"
                            }
                        },
                        "description": "Comprehensive safety guidelines for Stranger Mingle events and community interactions, covering personal safety, women's safety, prohibited behavior, emergency procedures, and reporting mechanisms."
                    }),
                }}
            />
        </div>
    );
}