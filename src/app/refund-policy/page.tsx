import type { Metadata } from "next";
import {
    RefreshCcw,
    CalendarX,
    AlertCircle,
    CreditCard,
    Clock,
    CheckCircle2,
    XCircle,
    HelpCircle,
    ShieldAlert,
    Tent,
    GraduationCap,
    Gift,
    ArrowRightLeft
} from "lucide-react";

export const metadata: Metadata = {
    title: "Refund and Cancellation Policy | Stranger Mingle",
    description: "Understand the terms for refunds and cancellations of Stranger Mingle events and memberships.",
    alternates: {
        canonical: "/refund-policy",
    },
};

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                        Refund and Cancellation Policy
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
                                At Stranger Mingle, we understand that plans change. This policy outlines our refund and cancellation terms for event registrations. Please read carefully before registering for events.
                            </p>
                        </div>
                    </div>

                    {/* General Policy */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 rounded-2xl text-purple-600 shrink-0">
                                <RefreshCcw className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Fairness</h2>
                                <p className="leading-relaxed mb-4 text-gray-600">
                                    We charge fees purely to maintain the platform and run activities smoothly, not for profit. However, when you register for an event, we book venues, arrange resources, and plan for specific numbers. Last-minute cancellations affect our ability to deliver quality experiences.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    This policy balances your need for flexibility with our need to maintain event quality for all participants.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Standard Cancellation Policy */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 shrink-0">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Standard Cancellation Policy for Regular Events</h2>

                                <div className="space-y-6">
                                    <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                                        <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Cancellation 48+ Hours Before Event</h3>
                                        <p className="leading-relaxed mb-2 text-green-800">
                                            <strong>Full Refund or Event Credit:</strong> If you cancel at least 48 hours (2 days) before the event start time, you will receive either:
                                        </p>
                                        <ul className="space-y-1 text-green-800 text-sm ml-6 list-disc">
                                            <li>100% refund to your original payment method (processed within 5-7 business days), OR</li>
                                            <li>100% credit that can be used for any future Stranger Mingle event</li>
                                        </ul>
                                        <p className="mt-2 text-xs text-green-700 font-medium">Example: For a Sunday 10 AM event, cancel by Friday 10 AM</p>
                                    </div>

                                    <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                                        <h3 className="text-lg font-bold text-yellow-900 mb-2 flex items-center gap-2"><AlertCircle className="w-5 h-5" /> Cancellation 24-48 Hours Before Event</h3>
                                        <p className="leading-relaxed mb-2 text-yellow-800">
                                            <strong>50% Refund or Event Credit:</strong> If you cancel between 24-48 hours before the event, you will receive:
                                        </p>
                                        <ul className="space-y-1 text-yellow-800 text-sm ml-6 list-disc">
                                            <li>50% refund to your original payment method, OR</li>
                                            <li>75% credit for future events (we offer a bonus when you choose credit)</li>
                                        </ul>
                                        <p className="mt-2 text-xs text-yellow-700 font-medium">Example: For a Sunday 10 AM event, cancel between Saturday 10 AM - Friday 10 AM</p>
                                    </div>

                                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                                        <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2"><XCircle className="w-5 h-5" /> Cancellation Less Than 24 Hours Before Event</h3>
                                        <p className="leading-relaxed mb-2 text-red-800">
                                            <strong>No Refund:</strong> Cancellations made less than 24 hours before the event are not eligible for refunds. However:
                                        </p>
                                        <ul className="space-y-1 text-red-800 text-sm ml-6 list-disc">
                                            <li>You may transfer your spot to another person (contact us immediately)</li>
                                            <li>In exceptional circumstances (medical emergencies, family emergencies), contact us - we&apos;ll review case by case</li>
                                        </ul>
                                        <p className="mt-2 text-xs text-red-700 font-medium">Example: For a Sunday 10 AM event, cancellations after Saturday 10 AM are not refundable</p>
                                    </div>

                                    <div className="bg-gray-100 p-6 rounded-2xl border border-gray-200">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">No-Shows (Registered But Did Not Attend)</h3>
                                        <p className="leading-relaxed mb-2 text-gray-700">
                                            <strong>No Refund and Warning:</strong> If you register and don&apos;t show up without any notice:
                                        </p>
                                        <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                            <li>No refund will be issued</li>
                                            <li>First no-show: Warning issued</li>
                                            <li>Second no-show: Account may be restricted</li>
                                            <li>Third no-show: Account may be suspended or permanently banned</li>
                                        </ul>
                                        <p className="mt-2 text-xs text-gray-500 italic">
                                            Repeated no-shows affect other members&apos; experience and our planning. We take this seriously.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Special Event Categories */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 shrink-0">
                                <Tent className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Special Event Categories with Different Policies</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 md:flex items-center gap-2"><Tent className="w-4 h-4 inline md:block text-indigo-500" /> Adventure and Outdoor Events (Treks, Camping, Multi-Day Trips)</h3>
                                        <p className="mb-2 leading-relaxed text-gray-600">These events require significant advance planning, permits, and bookings. Stricter cancellation terms apply:</p>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc">
                                            <li><strong>7+ days before:</strong> Full refund or 100% credit</li>
                                            <li><strong>3-7 days before:</strong> 50% refund or 75% credit</li>
                                            <li><strong>Less than 3 days before:</strong> No refund (transfer to another person allowed)</li>
                                        </ul>
                                        <p className="mt-2 text-xs text-gray-500 italic">Specific terms will be clearly stated during registration</p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 md:flex items-center gap-2"><GraduationCap className="w-4 h-4 inline md:block text-indigo-500" /> Premium and Paid Workshop Events</h3>
                                        <p className="mb-2 leading-relaxed text-gray-600">Events with external instructors, special venues, or limited materials:</p>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc">
                                            <li><strong>5+ days before:</strong> Full refund or 100% credit</li>
                                            <li><strong>2-5 days before:</strong> 50% refund or 75% credit</li>
                                            <li><strong>Less than 2 days before:</strong> No refund</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 md:flex items-center gap-2"><Gift className="w-4 h-4 inline md:block text-indigo-500" /> Free or Heavily Discounted Trial Events</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            For free events or special promotional offers, standard refund policies may not apply. Cancellation terms will be specified during registration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Event Changes by Stranger Mingle */}
                    <section className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <CalendarX className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Event Cancellations or Changes by Stranger Mingle</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Event Cancellation</h3>
                                        <p className="mb-3 leading-relaxed text-gray-700">
                                            If we cancel an event for any reason (weather, venue issues, insufficient registrations, organizer unavailability, safety concerns), you will receive:
                                        </p>
                                        <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                            <li><strong>Full 100% refund</strong> to your original payment method within 5-7 business days</li>
                                            <li><strong>OR</strong> 110% credit for future events (bonus 10% as an apology for the inconvenience)</li>
                                            <li>Immediate notification via email and SMS</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Event Rescheduling</h3>
                                        <p className="mb-3 leading-relaxed text-gray-700">If we need to reschedule an event to a different date or time:</p>
                                        <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                            <li>Your ticket automatically becomes valid for the new date</li>
                                            <li>We&apos;ll notify you immediately with at least 48 hours notice (when possible)</li>
                                            <li>If you cannot attend the new date, you can request a <strong>full refund within 48 hours</strong> of the rescheduling announcement</li>
                                            <li>After 48 hours, standard cancellation policy applies</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Minor Event Changes (Venue, Time, Activity)</h3>
                                        <p className="mb-3 leading-relaxed text-gray-700">If we make minor changes to the event (slight venue change in same area, small time adjustment):</p>
                                        <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                            <li>You&apos;ll be notified as soon as possible</li>
                                            <li>Your ticket remains valid</li>
                                            <li>If the change significantly affects your ability to attend, contact us within 24 hours for a full refund</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Ticket Transfers */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-teal-50 rounded-2xl text-teal-600 shrink-0">
                                <ArrowRightLeft className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ticket Transfers to Another Person</h2>
                                <p className="leading-relaxed mb-4 text-gray-600">
                                    If you cannot attend but know someone who can take your spot, you may transfer your ticket to another person.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Transfer Requirements</h3>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc">
                                            <li>Contact us at least 24 hours before the event</li>
                                            <li>Provide the new attendee&apos;s full name, email, and phone number</li>
                                            <li>New attendee must meet age and verification requirements</li>
                                            <li>New attendee must agree to our Terms of Service and Community Guidelines</li>
                                            <li>Transfers are free - no additional charges</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">How to Request a Transfer</h3>
                                        <p className="leading-relaxed mb-2 text-gray-600">Contact us via:</p>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc">
                                            <li>Email: strangermingleteam@gmail.com</li>
                                            <li>WhatsApp: Y7411820025</li>
                                            <li>Website contact form</li>
                                        </ul>
                                        <p className="mt-2 text-xs text-gray-500 italic">
                                            Last-minute transfers (less than 6 hours before event) may not be processed in time
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Refund Processing */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600 shrink-0">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Refund Processing and Timeline</h2>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Processing Time</h3>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc">
                                            <li>Refunds are processed within <strong>5-7 business days</strong> after approval</li>
                                            <li>Depending on your bank or payment provider, it may take an additional 3-5 business days to reflect in your account</li>
                                            <li>Total timeline: 7-12 business days from cancellation to money in your account</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Refund Method</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            All refunds are processed to your original payment method:
                                        </p>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc mt-2">
                                            <li>Credit/Debit Card: Credited to the same card</li>
                                            <li>UPI: Refunded to the same UPI ID</li>
                                            <li>Net Banking: Credited to the account used</li>
                                            <li>Wallet: Credited to the same wallet</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Event Credits</h3>
                                        <p className="leading-relaxed text-gray-600">
                                            If you choose event credit instead of a refund:
                                        </p>
                                        <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc mt-2">
                                            <li>Credits are added to your account immediately</li>
                                            <li>Credits are valid for 12 months from the date of issue</li>
                                            <li>Credits can be used for any Stranger Mingle event in any city</li>
                                            <li>Credits are non-transferable and cannot be converted back to cash</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Special Circumstances */}
                    <section className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-amber-600 shrink-0 shadow-sm">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Exceptional Circumstances and Case-by-Case Review</h2>
                                <p className="leading-relaxed mb-6 text-amber-900 font-medium">
                                    We understand that genuine emergencies happen. While our policy is clear, we review exceptional cases individually.
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">We May Consider Refunds Outside Standard Policy For:</h3>
                                        <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                            <li><strong>Medical Emergencies:</strong> Your own or immediate family member&apos;s hospitalization (medical documentation required)</li>
                                            <li><strong>Family Emergencies:</strong> Serious situations requiring immediate attention</li>
                                            <li><strong>Natural Disasters:</strong> Events beyond your control affecting travel to the event</li>
                                            <li><strong>Sudden Work Obligations:</strong> Unavoidable professional emergencies (employer documentation may be requested)</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">How to Request Exception Review</h3>
                                        <p className="leading-relaxed mb-2 text-gray-700">Contact us immediately with:</p>
                                        <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                            <li>Detailed explanation of the situation</li>
                                            <li>Supporting documentation (if available)</li>
                                            <li>Your booking reference number</li>
                                        </ul>
                                        <p className="mt-3 leading-relaxed text-xs text-amber-800 italic">
                                            We review each case with empathy and fairness. However, approval is not guaranteed and decisions are final.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Non-Refundable Situations */}
                    <section className="bg-red-50 p-8 rounded-3xl border border-red-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-red-600 shrink-0 shadow-sm">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Non-Refundable Situations</h2>

                                <p className="leading-relaxed mb-4 text-red-900 font-medium">
                                    Refunds will <strong>NOT</strong> be issued in the following situations:
                                </p>

                                <ul className="space-y-2 text-gray-700 text-sm ml-6 list-disc">
                                    <li><strong>Change of Mind:</strong> &quot;I don&apos;t feel like going anymore&quot; is not eligible for refund after the cancellation window</li>
                                    <li><strong>Personal Schedule Changes:</strong> Non-emergency scheduling conflicts</li>
                                    <li><strong>Weather Preferences:</strong> &quot;It&apos;s too hot/cold/rainy&quot; - unless the event is officially cancelled</li>
                                    <li><strong>Not Meeting Expectations:</strong> After attending the event, if it wasn&apos;t what you expected</li>
                                    <li><strong>Account Violations:</strong> If your account is suspended or banned for policy violations</li>
                                    <li><strong>Late Arrival:</strong> If you arrive late and miss part of the event</li>
                                    <li><strong>Third-Party Issues:</strong> Transportation problems, traffic, or other personal logistics</li>
                                    <li><strong>Forgetting About the Event:</strong> Not remembering you registered is not grounds for refund</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* How to Request */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-cyan-50 rounded-2xl text-cyan-600 shrink-0">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <div className="w-full">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. How to Request a Cancellation or Refund</h2>

                                <div className="space-y-6">
                                    <div className="bg-cyan-50 p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Step-by-Step Process</h3>
                                        <ol className="list-decimal ml-6 space-y-4 text-cyan-900">
                                            <li>
                                                <strong>Contact us as soon as you know you cannot attend</strong>
                                                <p className="text-sm mt-1 text-cyan-800">The sooner you notify us, the better refund terms you&apos;ll receive</p>
                                            </li>
                                            <li>
                                                <strong>Provide your booking details</strong>
                                                <p className="text-sm mt-1 text-cyan-800">Include: Full name, event name, event date, and booking reference number</p>
                                            </li>
                                            <li>
                                                <strong>Choose refund or credit</strong>
                                                <p className="text-sm mt-1 text-cyan-800">Specify if you want money back or credit for future events</p>
                                            </li>
                                            <li>
                                                <strong>Receive confirmation</strong>
                                                <p className="text-sm mt-1 text-cyan-800">We&apos;ll send confirmation of your cancellation and refund processing</p>
                                            </li>
                                            <li>
                                                <strong>Wait for processing</strong>
                                                <p className="text-sm mt-1 text-cyan-800">Refunds: 5-7 business days. Credits: Immediate</p>
                                            </li>
                                        </ol>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Contact Channels</h3>
                                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                                            <p className="mb-2 text-gray-700"><strong>Email:</strong> strangermingleteam@gmail.com</p>
                                            <p className="mb-2 text-gray-700"><strong>WhatsApp:</strong> 7411820025</p>
                                            <p className="mb-2 text-gray-700"><strong>Website:</strong> Contact form on strangermingle.com</p>
                                            <p className="text-sm text-gray-500 mt-3">
                                                <strong>Response Time:</strong> We aim to respond within 24 hours during business days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Disputes */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 shrink-0">
                                <ShieldAlert className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Refund Disputes and Resolution</h2>
                                <p className="leading-relaxed mb-4 text-gray-600">
                                    If you believe a refund decision was made in error or you&apos;re unsatisfied with the resolution:
                                </p>
                                <ol className="list-decimal ml-6 space-y-2 text-gray-600 text-sm">
                                    <li><strong>Contact us directly first</strong> - Email strangermingleteam@gmail.com with &quot;Refund Dispute&quot; in the subject line</li>
                                    <li><strong>Provide all relevant information</strong> - Include booking details, original cancellation request, and reason for dispute</li>
                                    <li><strong>We&apos;ll review within 3-5 business days</strong> - A senior team member will review your case</li>
                                    <li><strong>Final decision will be communicated</strong> - All refund dispute decisions are final</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Payment Gateway */}
                    <section className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-blue-600 shrink-0 shadow-sm">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Payment Gateway Charges</h2>
                                <p className="leading-relaxed mb-4 text-gray-700">
                                    All payments are processed through secure third-party payment gateways. Please note:
                                </p>
                                <ul className="space-y-1 text-gray-700 text-sm ml-6 list-disc">
                                    <li>Payment gateway charges (typically 2-3%) are non-refundable even if you receive a full refund</li>
                                    <li>This means for a ₹500 ticket with full refund, you&apos;ll receive approximately ₹485-490</li>
                                    <li>These charges are imposed by payment providers, not by Stranger Mingle</li>
                                    <li>Event credits are 100% of your payment with no gateway deductions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Policy Changes */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-50 rounded-2xl text-gray-600 shrink-0">
                                <RefreshCcw className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
                                <p className="leading-relaxed mb-4 text-gray-600">
                                    We reserve the right to modify this refund policy at any time. Changes will be effective immediately upon posting on this page. However:
                                </p>
                                <ul className="space-y-1 text-gray-600 text-sm ml-6 list-disc">
                                    <li>Policy changes will not affect events you&apos;ve already registered for</li>
                                    <li>The policy in effect at the time of your registration applies to your booking</li>
                                    <li>We&apos;ll notify members of significant policy changes via email</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Final Note */}
                    <section className="bg-gray-50 p-8 rounded-3xl border border-gray-200">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-2xl text-gray-600 shrink-0 shadow-sm">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Our Philosophy</h3>
                                <p className="leading-relaxed mb-4 text-gray-700">
                                    We want everyone to feel confident registering for events. While we need clear policies to operate sustainably, we&apos;re not here to keep money that should be refunded.
                                </p>
                                <p className="leading-relaxed mb-4 text-gray-700">
                                    We built Stranger Mingle to help people make friends and improve their quality of life. These policies exist to protect the community experience while being fair to individuals who genuinely cannot attend.
                                </p>
                                <p className="leading-relaxed font-medium text-gray-900">
                                    When in doubt, reach out. We&apos;re humans running a community, not a corporation enforcing rigid rules. Let&apos;s figure it out together.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}