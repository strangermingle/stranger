'use client';

import { useState } from 'react';
import { ShieldAlert, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SupportPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('Safety & Harassment Report');
    const [message, setMessage] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                    submission_type: 'contact',
                    source: 'support_report',
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to submit report');
            }
            
            setSuccess(true);
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        } catch (err: unknown) {
            console.error('Error submitting support report:', err);
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            
            <main className="pt-32 pb-24 px-4">
                <div className="max-w-4xl mx-auto">

                    {/* ── Header ── */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-3xl mb-6">
                            <ShieldAlert className="w-10 h-10 text-red-600" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 uppercase">
                            Safety & Support
                        </h1>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto text-lg leading-relaxed">
                            Your comfort and safety inside the Stranger Mingle community is non-negotiable. If something happened at an event — or even outside one — tell us. Every report reaches our safety team directly and is treated with complete seriousness.
                        </p>
                        <p className="text-gray-400 font-medium max-w-lg mx-auto text-base mt-4 leading-relaxed">
                            We have zero tolerance for harassment, misconduct, or fake profiles. No report is too small. If it felt wrong, it matters.
                        </p>
                    </div>

                    {/* ── Report Form Card ── */}
                    <div className="bg-gray-50 rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-2xl shadow-gray-200/50">

                        {/* ── Success State ── */}
                        {success ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-6">
                                    <CheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 mb-3">Report Received</h2>
                                <p className="text-gray-500 font-medium max-w-sm mx-auto">
                                    Your report has reached our safety team. We review every submission within 24 hours and take action without waiting. Thank you for speaking up — it keeps this community safe for everyone.
                                </p>
                                <button 
                                    onClick={() => setSuccess(false)}
                                    className="mt-8 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all"
                                >
                                    Submit Another Report
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* ── Form Header ── */}
                                <div className="mb-2">
                                    <h2 className="text-2xl font-black text-gray-900 mb-1">File a Report</h2>
                                    <p className="text-gray-400 font-medium text-sm">
                                        All fields are required. The more detail you share, the faster we can act.
                                    </p>
                                </div>

                                {/* ── Error Banner ── */}
                                {error && (
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-400/10 transition-all outline-none font-regular"
                                            placeholder="Full Name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-400/10 transition-all outline-none font-regular"
                                            placeholder="strangermingleteam@gmail.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-400/10 transition-all outline-none font-regular"
                                            placeholder="7411820025"
                                        />
                                    </div>

                                    {/* Issue Type */}
                                    <div className="space-y-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                            Nature of Report
                                        </label>
                                        <select
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-400/10 transition-all outline-none font-bold appearance-none"
                                        >
                                            <option>Safety & Harassment Report</option>
                                            <option>Event Misconduct</option>
                                            <option>Fake Profile Report</option>
                                            <option>General Support / Help</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">
                                        Occurrence Details
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                        rows={6}
                                        className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:border-red-400 focus:ring-4 focus:ring-red-400/10 transition-all outline-none font-regular resize-none"
                                        placeholder="Describe what happened — when, where, who was involved, and anything else that will help us understand the situation fully. The more specific you are, the faster we can act."
                                    />
                                </div>

                                {/* Submission note */}
                                <p className="text-xs text-gray-400 font-medium -mt-4 ml-2">
                                    Your report is confidential. We will never share your identity without your permission.
                                </p>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] transition-all flex items-center justify-center gap-3 shadow-2xl shadow-red-600/20 active:scale-95 uppercase tracking-[0.3em] text-sm"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            <span>Send Priority Report</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* ── Trust Section ── */}
                    <div className="mt-20 grid md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white border border-gray-100 rounded-3xl">
                            <h3 className="text-xl font-black text-gray-900 mb-3">Strictly Confidential</h3>
                            <p className="text-gray-500 font-medium">
                                Every report is handled with full confidentiality. Your name, contact, and the details you share are only seen by our internal safety team — never disclosed publicly or to other members unless it is required for a formal investigation and you have been informed.
                            </p>
                        </div>
                        <div className="p-8 bg-white border border-gray-100 rounded-3xl">
                            <h3 className="text-xl font-black text-gray-900 mb-3">We Act, Not Just Acknowledge</h3>
                            <p className="text-gray-500 font-medium">
                                Reports do not disappear into an inbox here. Anyone found guilty of harassment, misconduct, or misrepresentation is permanently removed from Stranger Mingle — no second chances, no exceptions. This community runs on trust, and we protect it.
                            </p>
                        </div>
                    </div>

                    {/* ── What Happens Next Section ── */}
                    <div className="mt-10 p-8 md:p-10 bg-gray-900 text-white rounded-3xl">
                        <h3 className="text-2xl font-black text-white mb-6">What Happens After You Submit</h3>
                        <div className="grid sm:grid-cols-3 gap-8">
                            <div>
                                <div className="text-red-400 font-black text-4xl mb-3">01</div>
                                <h4 className="font-black text-white mb-2">Immediate Review</h4>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                    Your report lands directly with our safety team. We aim to review every submission within 24 hours — sooner for urgent cases.
                                </p>
                            </div>
                            <div>
                                <div className="text-red-400 font-black text-4xl mb-3">02</div>
                                <h4 className="font-black text-white mb-2">Investigation</h4>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                    We look at the full picture — event logs, communication records, and member history — to verify the situation before taking any action.
                                </p>
                            </div>
                            <div>
                                <div className="text-red-400 font-black text-4xl mb-3">03</div>
                                <h4 className="font-black text-white mb-2">Action & Update</h4>
                                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                                    We take the necessary steps — from warnings to permanent bans — and follow up with you so you are never left wondering what happened.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            
            <Footer />
        </div>
    );
}