import {
    Truck,
    Zap,
    Mail,
    Phone,
    CreditCard,
    CheckCircle2,
    Calendar,
    Users,
    ShieldAlert,
    HelpCircle
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Shipping and Delivery Policy | Stranger Mingle",
    description: "Service fulfillment and digital delivery policy for Stranger Mingle memberships, event tickets, and companion booking confirmations.",
    alternates: {
        canonical: "/shipping-and-delivery",
    },
    openGraph: {
        title: "Shipping and Delivery Policy | Stranger Mingle",
        description: "Service fulfillment and digital delivery policy for Stranger Mingle memberships, event tickets, and companion booking confirmations.",
        url: "/shipping-and-delivery",
        siteName: 'Stranger Mingle',
        locale: 'en_IN',
        type: 'website',
    },
};

export default function ShippingAndDeliveryPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200">
                        Payment Gateway &amp; Fulfillment Compliance
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 pb-2">
                        Shipping &amp; Delivery Policy
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-indigo-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-base max-w-2xl mx-auto">
                        This policy outlines how purchases, memberships, event bookings, and companion reservation confirmations are processed, fulfilled, and delivered to you on Stranger Mingle.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Digital Service Delivery Overview */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nature of Deliverables: 100% Digital Fulfillment</h2>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                    <strong>Stranger Mingle</strong> is a technology and community platform providing digital memberships, social event admissions, anonymous peer-to-peer communication tools, and social companion directory facilitation.
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                    We do not manufacture, store, package, or physically ship physical items via postal or courier couriers. Consequently, <strong>physical shipping fees and postal delivery timelines do not apply</strong> to any transactions made on <code className="text-gray-800 bg-gray-100 px-1 py-0.5 rounded">strangermingle.com</code>. All orders are delivered electronically.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Delivery Timelines & Modes */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Delivery Modes &amp; Timelines</h2>

                                <div className="space-y-6">
                                    <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-100">
                                        <h3 className="text-lg font-bold text-blue-950 mb-2 flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                                            1. Stranger Mingle Memberships &amp; Subscriptions
                                        </h3>
                                        <ul className="text-sm text-gray-600 space-y-1.5 pl-6 list-disc">
                                            <li><strong>Delivery Mode:</strong> Instant electronic account upgrade to your member dashboard.</li>
                                            <li><strong>Delivery Timeline:</strong> Immediate (Real-time upon payment authorization). A confirmation email and tax invoice are automatically dispatched to your registered email address within 5 minutes.</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-purple-50/40 border border-purple-100">
                                        <h3 className="text-lg font-bold text-purple-950 mb-2 flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-purple-600" />
                                            2. Weekend Social Meetup &amp; House Party Passes
                                        </h3>
                                        <ul className="text-sm text-gray-600 space-y-1.5 pl-6 list-disc">
                                            <li><strong>Delivery Mode:</strong> Digital Pass / E-Ticket with unique Booking Reference and QR code sent via email and SMS/WhatsApp.</li>
                                            <li><strong>Delivery Timeline:</strong> Instantaneous upon checkout. Exact venue address, host contact, and entrance guidelines are unlocked in your account and emailed immediately.</li>
                                        </ul>
                                    </div>

                                    <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
                                        <h3 className="text-lg font-bold text-rose-950 mb-2 flex items-center gap-2">
                                            <Users className="w-5 h-5 text-rose-600" />
                                            3. Hire a Companion / Rent a Friend Reservations
                                        </h3>
                                        <ul className="text-sm text-gray-600 space-y-1.5 pl-6 list-disc">
                                            <li><strong>Delivery Mode:</strong> Digital booking confirmation token, in-app messaging channel, and companion calendar lock.</li>
                                            <li><strong>Delivery Timeline:</strong> Real-time confirmation upon checkout. The selected companion receives immediate notification to coordinate public meetup details.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Handling Delivery Delays or Technical Issues */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Deducted But Service Not Activated?</h2>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    In rare cases of internet dropouts, bank server delays, or webhook sync latencies, your payment may be debited while service activation takes up to 10 to 30 minutes to synchronize.
                                </p>
                                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                    If your membership, event ticket, or booking confirmation does not reflect in your account within 30 minutes of payment:
                                </p>
                                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 text-sm text-amber-950 space-y-2">
                                    <p><strong>Step 1:</strong> Check your email spam or promotions folder for the booking receipt.</p>
                                    <p><strong>Step 2:</strong> Email our fulfillment desk at <a href="mailto:strangermingleteam@gmail.com" className="font-bold underline text-blue-700">strangermingleteam@gmail.com</a> with your Payment ID / Bank UTR number.</p>
                                    <p><strong>Step 3:</strong> Call or WhatsApp our helpline at <a href="tel:+917385531551" className="font-bold underline text-blue-700">+91 73855 31551</a>. Our team will verify and manually activate your access within 2 to 4 hours.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Cancellations and Refunds Link */}
                    <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Cancellations &amp; Refund Terms</h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    For detailed information regarding ticket cancellations, companion reschedule guidelines, and membership refund timelines, please review our comprehensive <Link href="/refund-policy" className="text-indigo-600 font-semibold underline">Refund &amp; Cancellation Policy</Link>.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
