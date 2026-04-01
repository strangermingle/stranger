'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface MembershipFormProps {
    onSuccess?: () => void;
    source?: string;
}

export default function MembershipForm({ onSuccess, source = 'waitlist' }: MembershipFormProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([
                    { name, phone, email, city, source }
                ]);

            if (error) throw error;
            
            setSuccess(true);
            setName('');
            setPhone('');
            setEmail('');
            setCity('');
            
            if (onSuccess) {
                setTimeout(onSuccess, 2000);
            }
        } catch (err) {
            console.error('Error submitting waitlist:', err);
            const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">Waitlist Confirmed!</h3>
                <p className="text-gray-500 font-medium">Thank you for your interest. Our team will contact you shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {/* Name */}
                <div className="space-y-1.5 flex-1">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Stranger Name"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all outline-none font-regular text-sm text-gray-500"
                    />
                </div>

                {/* Number */}
                <div className="space-y-1.5 flex-1">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                        Contact No. <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+91 74118 20025"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all outline-none font-regular text-sm text-gray-500"
                    />
                </div>

                {/* Email */}
                <div className="space-y-1.5 flex-1">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="strangermingleteam@gmail.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all outline-none font-regular text-sm text-gray-500"
                    />
                </div>

                {/* City */}
                <div className="space-y-1.5 flex-1">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                        Current City
                    </label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 transition-all outline-none font-regular text-sm text-gray-500"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full md:w-auto px-12 py-4 bg-gray-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-xs hover:bg-indigo-600"
            >
                {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <Send className="w-4 h-4" />
                        <span>Join the Waitlist</span>
                    </>
                )}
            </button>
        </form>
    );
}
