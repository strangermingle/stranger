'use client';

import { useState } from 'react';
import {
    Trash2,
    ShieldAlert,
    CheckCircle2,
    Mail,
    PhoneCall,
    Lock,
    HelpCircle,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function DeleteAccountPage() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [reason, setReason] = useState('Personal reasons / Taking a break');
    const [confirmed, setConfirmed] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!confirmed) {
            alert('Please confirm that you understand this action is permanent.');
            return;
        }

        // Generate mailto link or show confirmation message
        const subject = encodeURIComponent(`Account Deletion & Data Erasure Request: ${email}`);
        const body = encodeURIComponent(
            `Hello Stranger Mingle Data Protection Team,\n\nI am requesting permanent deletion and erasure of my Stranger Mingle account and all associated personal data in accordance with the Digital Personal Data Protection Act, 2023.\n\nRegistered Email: ${email}\nRegistered Phone: ${phone}\nReason for Deletion: ${reason}\n\nI confirm that I understand this action is irreversible.\n\nThank you.`
        );

        // Open mail client as a backup fallback
        window.location.href = `mailto:strangermingleteam@gmail.com?subject=${subject}&body=${body}`;
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-3xl mx-auto px-4 py-28 sm:py-32 sm:px-6 lg:px-8">
                {/* Hero Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-200">
                        Digital Personal Data Protection (DPDP) Act, 2023
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-red-600 to-indigo-600 pb-2">
                        Account &amp; Data Deletion
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-rose-600 to-indigo-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 text-sm max-w-xl mx-auto">
                        You have the right to request the permanent erasure of your account, companion profile, and personal data from Stranger Mingle at any time.
                    </p>
                </div>

                {submitted ? (
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-emerald-100 text-center">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Initiated Successfully</h2>
                        <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
                            Your mail application was prompted with your pre-filled deletion request. If it didn't open automatically, please send an email directly to:
                        </p>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-sm mb-6 inline-block">
                            <a href="mailto:strangermingleteam@gmail.com" className="text-blue-600 font-bold underline">
                                strangermingleteam@gmail.com
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 mb-6">
                            Our privacy compliance team processes all deletion requests within <strong>48 to 72 hours</strong> and will send a confirmation receipt once all records are purged.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                        >
                            Return to Homepage
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* What happens on deletion */}
                        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
                            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Trash2 className="w-5 h-5 text-rose-500" />
                                What happens when your account is deleted?
                            </h2>
                            <ul className="space-y-3 text-xs sm:text-sm text-gray-600 mb-4">
                                <li className="flex items-start gap-2.5">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                                    <span><strong>Companion Profile:</strong> Your companion profile listing, photos, hourly rates, and bio will be immediately unpublished and permanently deleted.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                                    <span><strong>Anonymous Chats &amp; Call Logs:</strong> Your peer chat records and session histories will be severed and irreversibly purged from our active databases.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 shrink-0"></div>
                                    <span><strong>Memberships:</strong> Any remaining active days on your Stranger Mingle subscription will be forfeited without a pro-rated refund.</span>
                                </li>
                            </ul>
                            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-900 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                                <span>
                                    <strong>Statutory Exception:</strong> Basic transaction logs and tax invoices may be retained in encrypted archives for up to statutory periods required by Indian taxation and accounting laws.
                                </span>
                            </div>
                        </div>

                        {/* Interactive Form */}
                        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                            <h2 className="text-lg font-bold text-gray-900">Submit Erasure Request</h2>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                    Registered Email Address *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="youremail@example.com"
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                    Registered Phone Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                    Reason for Leaving
                                </label>
                                <select
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-white"
                                >
                                    <option>Personal reasons / Taking a break</option>
                                    <option>Found what I was looking for</option>
                                    <option>Privacy concerns</option>
                                    <option>Moving to another city</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                                <input
                                    type="checkbox"
                                    id="confirm"
                                    checked={confirmed}
                                    onChange={(e) => setConfirmed(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-rose-600 rounded border-gray-300 focus:ring-rose-500"
                                />
                                <label htmlFor="confirm" className="text-xs text-gray-700 leading-relaxed cursor-pointer">
                                    I confirm that I want to permanently delete my Stranger Mingle account. I understand this action is irreversible and my profile, bookings, and chat history cannot be restored.
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={!confirmed}
                                className={`w-full py-3.5 px-6 rounded-full font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 ${confirmed
                                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20 cursor-pointer'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                <Trash2 className="w-4 h-4" />
                                Permanently Delete My Account
                            </button>
                        </form>

                        {/* Direct contact option */}
                        <div className="text-center text-xs text-gray-500">
                            Alternatively, you can email our Data Protection Officer directly at{' '}
                            <a href="mailto:strangermingleteam@gmail.com" className="text-blue-600 underline font-semibold">
                                strangermingleteam@gmail.com
                            </a>{' '}
                            or call our helpline at{' '}
                            <a href="tel:+917385531551" className="text-gray-900 font-bold">
                                +91 73855 31551
                            </a>.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

