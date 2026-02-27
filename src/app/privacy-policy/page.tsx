import type { Metadata } from "next";
import {
    Shield,
    Lock,
    Eye,
    Users,
    Globe,
    Cookie,
    Camera,
    Scale,
    Mail,
    Bell,
    Database,
    RefreshCw,
    ExternalLink,
    AlertTriangle,
    Baby
} from "lucide-react";

export const metadata: Metadata = {
    title: "Privacy Policy | Stranger Mingle",
    description: "Our commitment to your privacy. Learn how Stranger Mingle collects, uses, and protects your personal information.",
    alternates: {
        canonical: "/privacy-policy",
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                        Privacy Policy
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
                                At Stranger Mingle, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform and attend our events.
                            </p>
                        </div>
                    </div>

                    {/* Our Commitment */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shrink-0">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Privacy</h2>
                                <p className="leading-relaxed mb-4 text-gray-600">
                                    We believe in transparency and respect for your personal information. We collect only the data necessary to provide you with safe, high-quality events and community experiences. We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    By using Stranger Mingle&apos;s services, you agree to the collection and use of information in accordance with this policy.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Information We Collect */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                                <Database className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>

                                <div className="space-y-8">
                                    <div className="bg-gray-50 p-6 rounded-2xl">
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Information During Registration</h3>
                                        <p className="mb-3 leading-relaxed text-gray-600">When you register for events or create an account, we collect:</p>
                                        <ul className="space-y-2 text-gray-600">
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0"></div>
                                                <span><strong>Basic Details:</strong> Full name, age, gender, email address, phone number</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0"></div>
                                                <span><strong>Profile Information:</strong> City of residence, interests, brief bio (optional)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0"></div>
                                                <span><strong>Verification Data:</strong> Government-issued ID details for verification purposes (stored securely and not shared publicly)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0"></div>
                                                <span><strong>Profile Photo:</strong> Optional photo for event organizers to identify participants</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2.5 shrink-0"></div>
                                                <span><strong>Emergency Contact:</strong> Name and phone number of emergency contact (for safety during outdoor events)</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Event Participation Information</h3>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                                            <li>Events you register for and attend</li>
                                            <li>Event preferences and interests</li>
                                            <li>Attendance records</li>
                                            <li>Feedback and ratings provided for events</li>
                                            <li>Photos taken during events (with your consent)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Information</h3>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                                            <li>Transaction details and payment history</li>
                                            <li>Payment method information (processed through secure third-party payment gateways)</li>
                                            <li>We do not store complete credit/debit card details on our servers</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Communication Data</h3>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                                            <li>Messages sent to our support team or event organizers</li>
                                            <li>Email correspondence related to events and services</li>
                                            <li>Responses to surveys or feedback forms</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical and Usage Information</h3>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                                            <li>IP address, browser type, and device information</li>
                                            <li>Pages visited on our website and time spent</li>
                                            <li>Referring website or source that directed you to us</li>
                                            <li>Technical logs for maintaining security and preventing abuse</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Location Information</h3>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                                            <li>City and general location for showing relevant events</li>
                                            <li>We do not track real-time GPS location</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How We Use Information */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-purple-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">To Provide Services</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li>• Process event registrations and manage attendance</li>
                                            <li>• Send event confirmations, reminders, and updates</li>
                                            <li>• Facilitate connections between members</li>
                                            <li>• Improve event quality based on feedback</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Safety & Verification</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li>• Verify member identity for safety</li>
                                            <li>• Prevent fraud, spam, and abuse</li>
                                            <li>• Enforce community guidelines</li>
                                            <li>• Contact emergency contacts if needed</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Communication</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li>• Send notifications about upcoming events</li>
                                            <li>• Respond to inquiries and support requests</li>
                                            <li>• Share important policy updates</li>
                                            <li>• Request feedback to improve services</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Marketing</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li>• Send newsletters (opt-out available)</li>
                                            <li>• Share promotional offers</li>
                                            <li>• Display event photos (with consent)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li>• Analyze usage to improve functionality</li>
                                            <li>• Understand popular events</li>
                                            <li>• Identify and fix technical issues</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 p-5 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Legal Compliance</h3>
                                        <ul className="space-y-2 text-gray-600 text-sm">
                                            <li>• Comply with legal obligations</li>
                                            <li>• Maintain records as required by law</li>
                                            <li>• Protect our rights and property</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How We Share Information */}
                    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="relative z-10 flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <Users className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
                                <p className="mb-6 leading-relaxed font-semibold text-blue-900 bg-blue-100/50 p-4 rounded-xl border border-blue-200">
                                    We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">With Other Event Participants</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            When you register for an event, basic information (first name, age range, city) may be visible to other registered participants to facilitate introductions. Your full contact details are never shared unless you choose to exchange them personally.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">With Service Providers</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            We may share information with trusted third-party service providers who help us operate our platform, such as payment processors, SMS providers, email services, and cloud hosting providers. These providers are bound by confidentiality agreements and can only use your information to provide services to us.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">For Legal Reasons</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            We may disclose your information if required by law, court order, or government authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">In Case of Business Transfer</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            If Stranger Mingle is acquired, merged, or sells assets, your information may be transferred to the new entity. We will notify you of any such change and give you options regarding your data.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">With Your Consent</h3>
                                        <p className="leading-relaxed text-gray-700">
                                            We may share your information with third parties when you explicitly give us permission to do so.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Data Storage and Security */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 shrink-0">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">How We Protect Your Data</h3>
                                        <p className="mb-3 leading-relaxed text-gray-600">
                                            We implement appropriate technical and organizational measures to protect your personal information:
                                        </p>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-teal-100">
                                            <li>Encryption of sensitive data in transit and at rest</li>
                                            <li>Secure servers with restricted access</li>
                                            <li>Regular security audits and updates</li>
                                            <li>Employee training on data protection and privacy</li>
                                            <li>Limited access to personal information on a need-to-know basis</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Retention</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Event participation data is typically retained for up to 3 years for record-keeping and service improvement purposes. You can request deletion of your data at any time (subject to legal requirements).
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Storage Location</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            Your data is stored on secure servers located in India and may be processed by service providers in other jurisdictions. We ensure all data transfers comply with applicable data protection laws.
                                        </p>
                                    </div>

                                    <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex gap-3">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                                        <p className="leading-relaxed font-semibold text-gray-800 text-sm">
                                            <strong>Important:</strong> While we take security seriously, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Your Rights */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Your Rights and Choices</h2>

                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <h3 className="font-bold text-gray-900 mb-2">Access & Update</h3>
                                        <p className="text-sm text-gray-600">View and update your info in account settings or contact us.</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <h3 className="font-bold text-gray-900 mb-2">Delete Account</h3>
                                        <p className="text-sm text-gray-600">Request deletion anytime (some legal data retention may apply).</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <h3 className="font-bold text-gray-900 mb-2">Opt Out</h3>
                                        <p className="text-sm text-gray-600">Unsubscribe from marketing emails. Service alerts will still be sent.</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <h3 className="font-bold text-gray-900 mb-2">Data Portability</h3>
                                        <p className="text-sm text-gray-600">Request a machine-readable copy of your personal data.</p>
                                    </div>
                                    <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                                        <h3 className="font-bold text-gray-900 mb-2">Object/Withdraw</h3>
                                        <p className="text-sm text-gray-600">Object to processing or withdraw consent where applicable.</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl text-blue-800 text-sm">
                                    <p className="leading-relaxed">
                                        <strong>To exercise any of these rights,</strong> please contact us through our official communication channels. We will respond to your request within 30 days.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cookies and Tracking */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shrink-0">
                                <Cookie className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>

                                <div className="space-y-4">
                                    <p className="leading-relaxed text-gray-600">
                                        We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small text files stored on your device that help us recognize you and remember your preferences.
                                    </p>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Types of Cookies We Use</h3>
                                        <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-orange-100">
                                            <li><strong>Essential Cookies:</strong> Necessary for the website to function properly (login sessions, security)</li>
                                            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (via Google Analytics or similar services)</li>
                                            <li><strong>Marketing Cookies:</strong> Track your activity to show relevant ads (if applicable)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Managing Cookies</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect website functionality. Most browsers allow you to refuse cookies or alert you when cookies are being sent.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Third-Party Services */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 shrink-0">
                                <ExternalLink className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Services and Links</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Our website may contain links to third-party websites or integrate with third-party services (payment gateways, map services, social media platforms). We are not responsible for the privacy practices of these external sites.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    We encourage you to review the privacy policies of any third-party services you access through our platform. This Privacy Policy applies only to information collected by Stranger Mingle.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Children's Privacy */}
                    <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <Baby className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
                                <p className="leading-relaxed text-gray-700">
                                    Stranger Mingle is intended for users aged 18 and above. We do not knowingly collect personal information from anyone under 18 years of age. If we discover that we have inadvertently collected information from someone under 18, we will delete it immediately. If you believe we have collected information from a minor, please contact us.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Photography and Media Consent */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-pink-50 rounded-2xl text-pink-600 shrink-0">
                                <Camera className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Photography and Media Consent</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Events may be photographed or recorded for promotional purposes. By attending events, you consent to being photographed and to the use of such images on our website, social media, and marketing materials.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    If you do not wish to be photographed, please inform the event organizer at the beginning of the event. We will make reasonable efforts to accommodate your request.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    You can request removal of specific photos by contacting us. We will remove them from our platforms, but please note we cannot control images already shared by other participants on their personal social media.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* International Users */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0">
                                <Globe className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. International Users</h2>
                                <p className="leading-relaxed text-gray-600">
                                    Stranger Mingle operates primarily in India. If you are accessing our services from outside India, please be aware that your information may be transferred to, stored, and processed in India. By using our services, you consent to the transfer of your information to India and agree that Indian law governs the collection and use of your information.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Changes to Privacy Policy */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 shrink-0">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by:
                                </p>
                                <ul className="space-y-2 text-gray-600 pl-4 border-l-2 border-gray-100">
                                    <li>Posting the updated policy on this page with a new &quot;Last Updated&quot; date</li>
                                    <li>Sending an email notification to registered members (for significant changes)</li>
                                    <li>Displaying a prominent notice on our website</li>
                                </ul>
                                <p className="leading-relaxed text-gray-600 mt-4">
                                    Your continued use of our services after any changes indicates your acceptance of the updated Privacy Policy. We encourage you to review this policy periodically.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Data Breach Notification */}
                    <section className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-yellow-600 shrink-0 shadow-sm">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Data Breach Notification</h2>
                                <p className="leading-relaxed text-gray-700">
                                    In the unlikely event of a data breach that affects your personal information, we will notify you promptly in accordance with applicable laws. We will inform you about the nature of the breach, the data affected, and the steps we&apos;re taking to address it.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Contact Us */}
                    <section className="bg-blue-600 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-white/10 rounded-2xl text-white shrink-0">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-4">13. Contact Us About Privacy</h2>
                                <p className="mb-4 leading-relaxed text-blue-50">
                                    If you have questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:
                                </p>
                                <div className="space-y-2 ml-4">
                                    <p className="text-blue-50"><strong>Email:</strong> strangermingleteam@gmail.com</p>
                                    <p className="text-blue-50"><strong>Support:</strong> Through our official website contact form</p>
                                    <p className="text-blue-50"><strong>Response Time:</strong> We aim to respond within 48-72 hours</p>
                                </div>
                                <p className="mt-4 leading-relaxed text-blue-50">
                                    We take privacy concerns seriously and are committed to resolving any issues promptly and transparently.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Final Note */}
                    <section className="bg-amber-50 p-8 rounded-3xl border border-amber-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 rounded-2xl text-amber-700 shrink-0">
                                <Bell className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">Your Privacy Matters</h3>
                                <p className="leading-relaxed text-gray-800">
                                    At Stranger Mingle, building trust is as important as building friendships. We are committed to protecting your privacy while providing you with safe, meaningful experiences. This policy reflects our dedication to transparency and your right to control your personal information.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}