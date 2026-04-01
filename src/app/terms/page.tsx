import type { Metadata } from "next";
import {
    ScrollText,
    CheckCircle,
    UserCheck,
    ShieldAlert,
    Users,
    Ticket,
    AlertTriangle,
    MessageSquare,
    CreditCard,
    UserX,
    Scale,
    Gavel,
    FileText,
    Mail
} from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service | Stranger Mingle",
    description: "The rules and guidelines for using Stranger Mingle. Understand your rights and responsibilities as a community member.",
    alternates: {
        canonical: "/terms",
    },
};

export default function Terms() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                        Terms of Service
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8">
                    {/* Last Updated & Intro */}
                    <div className="bg-blue-600 p-8 rounded-3xl shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="relative z-10">
                            <p className="font-semibold text-lg mb-2 text-blue-100">Last updated: {new Date().toLocaleDateString()}</p>
                            <p className="leading-relaxed text-lg text-blue-50">
                                <strong>Stranger Mingle</strong> is a brand owned and operated by <strong>Salty Media Production (opc) Pvt Ltd</strong>.
                                These Terms of Service govern your use of our platform, website, and events. By accessing or using our services, you agree to be bound by these terms. Please read them carefully.
                            </p>
                        </div>
                    </div>

                    {/* Acceptance of Terms */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shrink-0">
                                <ScrollText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    By accessing and using the Stranger Mingle website (strangermingle.com), mobile applications, or attending our events, you accept and agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you must not use our services.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    These terms constitute a legally binding agreement between you and <strong>Salty Media Production (opc) Pvt Ltd</strong> (doing business as &quot;Stranger Mingle&quot;). Your continued use of our services signifies your ongoing agreement to these terms.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    We reserve the right to modify these terms at any time. Material changes will be communicated via email or prominent notice on our website. Your continued use after such modifications constitutes acceptance of the updated terms.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Eligibility */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Eligibility and Account Registration</h2>

                                <div className="space-y-6">
                                    <div className="bg-emerald-50 p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Age Requirement</h3>
                                        <p className="leading-relaxed text-emerald-900">
                                            You must be at least 18 years old to use Stranger Mingle services and attend events. By registering, you confirm that you meet this age requirement. We reserve the right to verify age and deny service to anyone who does not meet this requirement or provides false information.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Account Registration</h3>
                                        <p className="mb-3 leading-relaxed text-gray-600">
                                            To participate in events, you must create an account and provide accurate, complete information. You agree to:
                                        </p>
                                        <ul className="grid md:grid-cols-2 gap-3 text-gray-600">
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Provide truthful personal information</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Complete basic verification</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Keep account info up to date</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Maintain credential confidentiality</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Not share your account</li>
                                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>Notify us of unauthorized access</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">One Account Per Person</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Each person may maintain only one active account. Creating multiple accounts or using fake identities is prohibited and may result in permanent ban from the platform.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Use License */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Use License and Restrictions</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Permitted Use</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Permission is granted to access and use Stranger Mingle for personal, non-commercial purposes only. This includes browsing events, registering for events, attending events, and connecting with other members within the bounds of these terms.
                                        </p>
                                    </div>

                                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                        <h3 className="text-lg font-bold text-red-900 mb-3">Prohibited Uses - You may not:</h3>
                                        <ul className="space-y-2 text-red-800 text-sm">
                                            <li className="flex items-start gap-2">• Use the platform for commercial purposes or business networking without authorization</li>
                                            <li className="flex items-start gap-2">• Scrape, copy, or reproduce content from our website for external use</li>
                                            <li className="flex items-start gap-2">• Reverse engineer, decompile, or attempt to extract source code</li>
                                            <li className="flex items-start gap-2">• Use automated systems (bots, scripts) to access the service</li>
                                            <li className="flex items-start gap-2">• Impersonate others or misrepresent your identity</li>
                                            <li className="flex items-start gap-2">• Collect or harvest user information without consent</li>
                                            <li className="flex items-start gap-2">• Use the platform for dating, romantic matchmaking, or escort services</li>
                                            <li className="flex items-start gap-2">• Promote or sell products, services, or business opportunities</li>
                                            <li className="flex items-start gap-2">• Distribute spam, advertisements, or promotional content</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Intellectual Property</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            All content on Stranger Mingle, including text, graphics, logos, images, and software, is the property of Stranger Mingle or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit written permission.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Community Guidelines */}
                    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Community Guidelines and User Conduct</h2>
                                <p className="leading-relaxed mb-6 text-gray-700 font-medium">
                                    Stranger Mingle is built on respect, safety, and genuine connection. All members must adhere to our community guidelines during events and in all platform interactions.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-white/60 p-5 rounded-2xl backdrop-blur-sm border border-blue-100">
                                        <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center gap-2"><CheckCircle className="w-5 h-5" /> You Agree To:</h3>
                                        <ul className="space-y-2 text-gray-700 text-sm">
                                            <li>• Treat all members with respect & dignity</li>
                                            <li>• Attend registered events or cancel in advance</li>
                                            <li>• Arrive on time for events</li>
                                            <li>• Participate genuinely & engage meaningfully</li>
                                            <li>• Follow event-specific rules</li>
                                            <li>• Respect personal boundaries & consent</li>
                                            <li>• Report safety concerns to organizers</li>
                                            <li>• Look beyond class, caste, color & status</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white/60 p-5 rounded-2xl backdrop-blur-sm border border-red-100">
                                        <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2"><UserX className="w-5 h-5" /> You Agree NOT To:</h3>
                                        <ul className="space-y-2 text-gray-700 text-sm">
                                            <li>• Harass, threaten, intimidate, or abuse</li>
                                            <li>• Engage in any form of discrimination</li>
                                            <li>• Make unwelcome sexual advances</li>
                                            <li>• Use offensive, abusive, or hateful language</li>
                                            <li>• Engage in bullying or trolling</li>
                                            <li>• Share inappropriate or explicit content</li>
                                            <li>• Stalk or make anyone uncomfortable</li>
                                            <li>• Arrive intoxicated or use drugs</li>
                                            <li>• Damage property or create disturbances</li>
                                            <li>• Register with no intention of attending</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-red-100/50 p-4 rounded-xl border border-red-200">
                                    <h4 className="font-bold text-red-900 mb-1">Zero Tolerance Policy</h4>
                                    <p className="leading-relaxed text-red-800 text-sm">
                                        We maintain a zero tolerance policy for harassment, discrimination, and inappropriate conduct, particularly against women. Violation of these standards will result in immediate removal from the platform without refund, and we reserve the right to take legal action if necessary.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Event Participation */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600 shrink-0">
                                <Ticket className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Event Participation and Registration</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Registration and Payment</h3>
                                        <p className="mb-3 leading-relaxed text-gray-600">
                                            Event registration is confirmed only upon successful payment. By registering for an event, you agree to:
                                        </p>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-amber-100">
                                            <li>Pay the specified event fee</li>
                                            <li>Attend the event or cancel within the specified timeframe</li>
                                            <li>Follow the cancellation and refund policy</li>
                                            <li>Accept that spots are limited and registrations are first-come, first-served</li>
                                        </ul>
                                    </div>

                                    <div className="bg-amber-50 p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Cancellation and Refund Policy</h3>
                                        <p className="mb-2 text-gray-700 text-sm">Cancellation terms vary by event type. Generally:</p>
                                        <ul className="space-y-2 text-gray-700 text-sm">
                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div><strong>48+ hours before:</strong> Full refund or credit</li>
                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div><strong>24-48 hours before:</strong> 50% refund or credit</li>
                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div><strong>&lt; 24 hours before:</strong> No refund</li>
                                            <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div><strong>No-shows:</strong> No refund & potential restriction</li>
                                        </ul>
                                        <p className="mt-3 text-xs text-amber-800">
                                            Specific events may have different policies, which will be clearly stated during registration.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Event Changes and Cancellations</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            We reserve the right to modify, postpone, or cancel events due to weather, insufficient registrations, venue issues, or other unforeseen circumstances. In such cases, we will provide maximum possible notice and offer full refunds or credits for future events.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Attendance Limits</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Events have minimum and maximum participant limits. If minimum numbers are not met, the event may be cancelled with full refunds. If you repeatedly register and fail to attend (no-shows), we reserve the right to restrict your future registrations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Safety and Liability */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Safety, Risk, and Liability</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Assumption of Risk</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            You acknowledge that participation in events, particularly physical activities like trekking, cycling, or outdoor adventures, involves inherent risks. You voluntarily assume all risks associated with event participation, including but not limited to personal injury, property damage, or other losses.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Personal Responsibility</h3>
                                        <p className="mb-2 leading-relaxed text-gray-600">You are responsible for:</p>
                                        <ul className="grid md:grid-cols-2 gap-2 text-gray-600 text-sm pl-4 border-l-2 border-gray-100">
                                            <li>• Your own safety and well-being</li>
                                            <li>• Ensuring physical fitness for activities</li>
                                            <li>• Disclosing health conditions</li>
                                            <li>• Bringing necessary medications</li>
                                            <li>• Following safety instructions</li>
                                            <li>• Interactions with other members</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Limitation of Liability</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            To the maximum extent permitted by law, Stranger Mingle, its founders, organizers, employees, and affiliates shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of our services or participation in events. This includes but is not limited to injuries, accidents, property damage, emotional distress, or losses resulting from interactions with other members.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Insurance</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Stranger Mingle does not provide insurance coverage for participants. You are strongly encouraged to maintain your own health, accident, and travel insurance. For adventure activities, you may be required to show proof of insurance.
                                        </p>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                                        <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-600" /> Outside Interactions</h4>
                                        <p className="leading-relaxed text-gray-700 text-sm">
                                            Stranger Mingle is not responsible for any interactions, relationships, or incidents that occur between members outside of organized events. Members interact at their own risk and discretion.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Content and Communication */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-pink-50 rounded-2xl text-pink-600 shrink-0">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. User Content and Communications</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">User-Generated Content</h3>
                                        <p className="mb-3 leading-relaxed text-gray-600">
                                            You may submit feedback, reviews, or other content through our platform. By doing so, you grant Stranger Mingle a non-exclusive, royalty-free, perpetual, worldwide license to use, reproduce, modify, and display such content for operational and promotional purposes.
                                        </p>
                                        <p className="leading-relaxed text-gray-600">
                                            You represent that any content you submit is original, does not infringe on others&apos; rights, and complies with these terms.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Communication Standards</h3>
                                        <p className="mb-2 leading-relaxed text-gray-600">All communications through our platform must be:</p>
                                        <ul className="grid md:grid-cols-2 gap-2 text-gray-600 text-sm pl-4 border-l-2 border-pink-100">
                                            <li>• Respectful and appropriate</li>
                                            <li>• Free from harassment or hate speech</li>
                                            <li>• Non-commercial (no spam)</li>
                                            <li>• Truthful and not misleading</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Photography and Media</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Events may be photographed or recorded. By attending, you consent to being photographed and to Stranger Mingle using such media for promotional purposes. If you do not wish to be photographed, inform the organizer at the event start.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Payment Terms */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 shrink-0">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Payment Terms and Pricing</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Fees and Payment</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Event fees are clearly stated during registration and must be paid in full to confirm your spot. All payments are processed through secure third-party payment gateways. We accept credit/debit cards, UPI, net banking, and other payment methods as available.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Pricing Changes</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            We reserve the right to modify event pricing at any time. However, pricing changes will not affect events you&apos;ve already registered and paid for.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Payment Disputes</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            If you have concerns about charges, contact us within 7 days of the transaction. We will investigate and resolve disputes fairly and promptly.
                                        </p>
                                    </div>

                                    <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                                        <h3 className="text-lg font-bold text-teal-900 mb-2">No Monetary Transactions Between Members</h3>
                                        <p className="leading-relaxed text-teal-800 text-sm">
                                            Stranger Mingle is not responsible for any monetary transactions, loans, or financial exchanges between members. All such transactions are at your own risk.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Account Termination */}
                    <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-red-600 shrink-0 shadow-sm">
                                <UserX className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Account Suspension and Termination</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Grounds for Termination</h3>
                                        <p className="mb-3 leading-relaxed text-gray-700">
                                            We reserve the right to suspend or terminate your account immediately, without prior notice, if you:
                                        </p>
                                        <ul className="space-y-2 text-gray-700 ml-4 list-disc text-sm">
                                            <li>Violate these Terms of Service or Community Guidelines</li>
                                            <li>Engage in harassment, discrimination, or abusive behavior</li>
                                            <li>Provide false information or misrepresent your identity</li>
                                            <li>Repeatedly fail to attend registered events without notice</li>
                                            <li>Use the platform for commercial purposes without authorization</li>
                                            <li>Compromise the safety or experience of other members</li>
                                            <li>Engage in illegal activities</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Effects of Termination</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            Upon termination, your access to the platform and future events will be revoked. You will not be entitled to refunds for upcoming events. We may also ban you from creating new accounts.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Voluntary Account Closure</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            You may close your account at any time by contacting us. Account closure is subject to completion of any pending events or transactions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Indemnification */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shrink-0">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
                                <p className="leading-relaxed text-gray-600">
                                    You agree to indemnify, defend, and hold harmless Stranger Mingle, its founders, organizers, employees, and affiliates from any claims, damages, losses, liabilities, costs, or expenses (including legal fees) arising from:
                                </p>
                                <ul className="space-y-2 text-gray-600 mt-4 pl-4 border-l-2 border-orange-100 text-sm">
                                    <li>• Your violation of these Terms of Service</li>
                                    <li>• Your violation of any law or rights of a third party</li>
                                    <li>• Your use of our services or participation in events</li>
                                    <li>• Your content or conduct on the platform</li>
                                    <li>• Your interactions with other members</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Dispute Resolution */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-600 shrink-0">
                                <Gavel className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Dispute Resolution and Governing Law</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Informal Resolution</h3>
                                        <p className="text-sm text-gray-600">
                                            If you have a dispute with Stranger Mingle, please contact us first to attempt informal resolution. We&apos;re committed to addressing concerns fairly and promptly.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Governing Law</h3>
                                        <p className="text-sm text-gray-600">
                                            These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Jurisdiction</h3>
                                        <p className="text-sm text-gray-600">
                                            Any legal action or proceeding arising from these terms shall be brought exclusively in the courts of Pune, Maharashtra, India. You consent to the personal jurisdiction of these courts.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Arbitration</h3>
                                        <p className="text-sm text-gray-600">
                                            For disputes that cannot be resolved informally, both parties agree to binding arbitration in Pune, Maharashtra, in accordance with the Indian Arbitration and Conciliation Act, 1996.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Miscellaneous */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">12. General Provisions</h2>
                                <div className="space-y-4 text-gray-600">
                                    <p><strong>Entire Agreement:</strong> These Terms of Service, together with our Privacy Policy and Disclaimer, constitute the entire agreement between you and Stranger Mingle regarding use of our services.</p>
                                    <p><strong>Severability:</strong> If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.</p>
                                    <p><strong>Waiver:</strong> Our failure to enforce any right or provision of these terms shall not constitute a waiver of such right or provision.</p>
                                    <p><strong>Assignment:</strong> You may not assign or transfer these terms or your account without our prior written consent. We may assign our rights and obligations under these terms without restriction.</p>
                                    <p><strong>Force Majeure:</strong> Stranger Mingle shall not be liable for any failure to perform due to circumstances beyond our reasonable control, including natural disasters, pandemics, wars, or government actions.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact */}
                    <section className="bg-blue-600 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-white/10 rounded-2xl text-white shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4">13. Contact Us</h2>
                                <p className="mb-4 leading-relaxed text-blue-50">
                                    If you have questions about these Terms of Service, please contact us:
                                </p>
                                <div className="space-y-2 ml-4 text-blue-50">
                                    <p><strong>Email:</strong> strangermingleteam@gmail.com</p>
                                    <p><strong>Website:</strong> Through our official contact form</p>
                                    <p><strong>Response Time:</strong> We aim to respond within 48-72 hours</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Acknowledgment */}
                    <section className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-gray-600 shrink-0 shadow-sm">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Acknowledgment and Acceptance</h3>
                                <p className="leading-relaxed mb-4 text-gray-700">
                                    By using Stranger Mingle, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. You also acknowledge that you have read our Privacy Policy and Disclaimer.
                                </p>
                                <p className="leading-relaxed text-gray-700">
                                    These terms are designed to protect both you and our community. They ensure everyone can enjoy safe, meaningful experiences while building genuine friendships. Thank you for being part of Stranger Mingle.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}