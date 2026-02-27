import {
    Shield,
    Info,
    Users,
    AlertTriangle,
    Activity,
    Car,
    Briefcase,
    CreditCard,
    Building2,
    Camera,
    FileText,
    ExternalLink,
    UserPlus,
    Scale,
    RefreshCw,
    Mail,
    Bell,
    HeartHandshake
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Disclaimer | Stranger Mingle",
    description: "Legal disclaimer and terms for participating in Stranger Mingle events and using our community platform.",
    alternates: {
        canonical: "/disclaimer",
    }
};

export default function Disclaimer() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                        Disclaimer
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                <div className="space-y-8">
                    {/* General Information */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                                <Info className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    The information provided by Stranger Mingle (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on strangermingle.com and through our events is for general informational and social connection purposes only. All information on the site and at our events is provided in good faith to facilitate meaningful friendships and community building.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    However, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site or shared during events.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Event Participation */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
                                <Activity className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Participation and Personal Safety</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Participation in Stranger Mingle events is entirely voluntary and at your own risk. While we organize events in safe, public locations and maintain strict community guidelines, we cannot guarantee the behavior of all participants or control circumstances beyond our organized activities.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    You are responsible for your own safety, well-being, and decisions during and after events. We strongly encourage all participants to:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Exercise common sense and good judgment at all times</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Meet in public places when connecting with other members outside of official events</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Inform trusted friends or family members of your whereabouts</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Trust your instincts and leave any situation that makes you uncomfortable</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Not share sensitive personal information (home address, financial details) with people you&apos;ve just met</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Interactions Outside Events */}
                    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
                        <div className="flex items-start gap-4 relative z-10">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactions Outside Official Events</h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Members may choose to interact, communicate, and meet with each other outside of Stranger Mingle&apos;s organized events. Any such interactions are strictly personal and occur at the members&apos; own discretion and responsibility.
                                </p>
                                <p className="mb-4 leading-relaxed font-semibold text-gray-900">
                                    Stranger Mingle does not take any responsibility for:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                                        <span>Relationships, romantic or otherwise, that develop between members</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                                        <span>Personal meetings arranged independently by members via WhatsApp, phone, text, email, or any other communication channel</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                                        <span>Any incidents, disputes, misunderstandings, or harm that occur outside our official event premises or scheduled activities</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                                        <span>Private arrangements, plans, or activities organized by members without Stranger Mingle&apos;s involvement</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Shield className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                                        <span>Exchange of money, goods, or services between members</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed text-gray-700">
                                    We facilitate initial connections in structured, safe environments. What happens beyond that is your personal choice and responsibility. We encourage respectful, safe, and consensual interactions at all times.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* No Liability for Member Conduct */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Liability for Member Conduct</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    While we maintain strict community guidelines and implement verification processes, Stranger Mingle cannot fully verify the background, intentions, or truthfulness of all members. We are not responsible for the conduct of any member, whether during or outside our events.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    We do not conduct comprehensive background checks, criminal record searches, or detailed identity verification beyond basic registration requirements. Membership in Stranger Mingle should not be interpreted as an endorsement or guarantee of any individual&apos;s character, safety, or trustworthiness.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    Members found violating our community guidelines, engaging in harassment, discrimination, or any form of misconduct will be removed immediately. However, Stranger Mingle is not liable for any harm caused by such individuals before their removal.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Health and Physical Activities */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-50 rounded-2xl text-green-600 shrink-0">
                                <HeartHandshake className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Health, Fitness, and Physical Activities</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Some of our events involve physical activities such as trekking, cycling, camping, or outdoor adventures. Participation in these activities requires adequate physical fitness and health.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    By participating in physical activities, you confirm that:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>You are physically fit and healthy enough to participate</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>You have no medical conditions that would make participation dangerous</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>You will disclose any relevant health concerns to organizers before the event</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>You will carry any necessary medications or medical equipment</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>You understand and accept the inherent risks of outdoor and adventure activities</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed text-gray-600">
                                    Stranger Mingle is not responsible for any injuries, health issues, accidents, or medical emergencies that occur during events. Participants are solely responsible for their own health and safety decisions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Travel and Transportation */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-50 rounded-2xl text-orange-600 shrink-0">
                                <Car className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel and Transportation</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Members are responsible for their own transportation to and from event venues. Stranger Mingle does not provide transportation services and is not responsible for:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Travel arrangements made by members</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Carpooling or ride-sharing arrangements between members</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Accidents, delays, or incidents during travel to or from events</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Loss or theft of personal belongings during travel</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed text-gray-600">
                                    If members choose to share transportation, they do so at their own risk and responsibility.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Personal Belongings */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 shrink-0">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Belongings and Valuables</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Stranger Mingle is not responsible for the loss, theft, or damage of personal belongings during events. This includes but is not limited to:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Mobile phones, wallets, bags, and other personal items</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Jewelry, watches, and valuable accessories</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Cameras, laptops, and electronic devices</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Vehicles, bicycles, or any mode of transportation</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed text-gray-600">
                                    Members are advised to keep their belongings secure and not bring unnecessary valuables to events. We recommend using common sense and remaining vigilant about personal items.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Financial Transactions */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600 shrink-0">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Transactions and Refunds</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Event registration fees are non-refundable except as explicitly stated in our refund policy. By registering for an event, you agree to the terms of payment and cancellation.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Stranger Mingle is not responsible for:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Any financial transactions between members outside of official event registrations</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Loans, gifts, or money exchanges between members</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Shared expenses or cost-splitting arrangements made independently by members</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Financial disputes arising from personal interactions between members</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Third-Party Venues and Services */}
                    <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-indigo-600 shrink-0 shadow-sm">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Venues and Services</h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Many of our events are held at third-party venues such as cafes, restaurants, trekking sites, or community spaces. Stranger Mingle is not responsible for:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-700">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>The quality, safety, or condition of third-party venues</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Food quality, hygiene, or allergic reactions at restaurants or cafes</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Services provided by third-party vendors or partners</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Accidents or incidents occurring on third-party premises</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed text-gray-700">
                                    Any complaints or issues related to third-party venues should be directed to those establishments.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Photography and Media */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-pink-50 rounded-2xl text-pink-600 shrink-0">
                                <Camera className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Photography, Videos, and Social Media</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Events may be photographed or recorded for promotional purposes. By attending events, you consent to being photographed or recorded and to the use of such media by Stranger Mingle on our website, social media, or marketing materials.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    If you do not wish to be photographed, please inform the event organizer at the beginning of the event.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    Stranger Mingle is not responsible for photographs or videos taken by members and shared independently on their personal social media accounts.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Content Accuracy */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600 shrink-0">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Content and Event Information</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    While we strive to provide accurate and up-to-date information about events, venues, timings, and activities, details may change due to unforeseen circumstances.
                                </p>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Stranger Mingle reserves the right to:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Modify event details, venues, or timings with reasonable notice</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Cancel or postpone events due to weather, low registration, or other factors</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Update website content, policies, or community guidelines</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Change pricing or membership terms with notice to existing members</span>
                                    </li>
                                </ul>
                                <p className="leading-relaxed text-gray-600">
                                    We are not liable for any inconvenience or costs incurred due to event changes or cancellations beyond our control.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* External Links */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-violet-50 rounded-2xl text-violet-600 shrink-0">
                                <ExternalLink className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">External Links and Third-Party Content</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    Our website may contain links to third-party websites or services that are not owned or controlled by Stranger Mingle. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    You acknowledge and agree that Stranger Mingle shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of any such third-party content, goods, or services.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Age Restrictions */}
                    <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Age Restrictions</h2>
                                <p className="mb-4 leading-relaxed text-gray-700">
                                    Stranger Mingle events are intended for adults aged 18 years and above. By registering for events, you confirm that you meet the minimum age requirement.
                                </p>
                                <p className="leading-relaxed text-gray-700">
                                    We reserve the right to verify age and deny participation to anyone who does not meet age requirements or provides false information during registration.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Legal Jurisdiction */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-slate-50 rounded-2xl text-slate-600 shrink-0">
                                <Scale className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    This disclaimer and any disputes arising from your use of Stranger Mingle services shall be governed by the laws of India. Any legal proceedings shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-2xl text-red-600 shrink-0">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    To the fullest extent permitted by applicable law, Stranger Mingle, its organizers, team members, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
                                </p>
                                <ul className="space-y-3 mb-4 text-gray-600">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Your participation in events or use of our services</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Any conduct or content of any member or third party</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Unauthorized access to or alteration of your data</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2.5 shrink-0"></div>
                                        <span>Any other matter relating to our services</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Changes to Disclaimer */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 shrink-0">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Disclaimer</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    We reserve the right to update or modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting on this page. Your continued use of Stranger Mingle services after any changes constitutes acceptance of the updated disclaimer.
                                </p>
                                <p className="leading-relaxed font-semibold text-gray-600">
                                    Last updated: January 2026
                                </p>
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
                                <h2 className="text-2xl font-bold mb-4">Questions About This Disclaimer</h2>
                                <p className="leading-relaxed text-blue-50">
                                    If you have any questions about this disclaimer or need clarification on any point, please contact us through our official communication channels. We are committed to transparency and will address your concerns to the best of our ability.
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
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Important Reminder</h3>
                                <p className="leading-relaxed text-gray-800">
                                    Stranger Mingle exists to help you build genuine friendships and improve your quality of life. While we create structured, safe environments for initial connections, your safety and well-being ultimately depend on your own judgment and decisions. Please participate responsibly, treat others with respect, and prioritize your safety at all times.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}