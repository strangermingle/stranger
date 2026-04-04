'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Loader2, CheckCircle, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { checkMembershipStatus } = useAuth();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token found. Please check your email link.');
            return;
        }

        const verifyEmail = async () => {
            try {
                const res = await fetch(`/api/membership/verify-email?token=${token}`);
                const data = await res.json();

                if (data.success) {
                    setStatus('success');
                    setMessage(data.message || 'Email verified successfully!');
                    // Force refresh membership status in the global AuthProvider
                    checkMembershipStatus();
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Failed to verify email.');
                }
            } catch (err) {
                console.error('Verification error:', err);
                setStatus('error');
                setMessage('An error occurred during verification. Please try again later.');
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 text-center animate-in zoom-in duration-500">
                <div className="mb-8 flex justify-center">
                    <div className="w-20 h-20 bg-yellow-400 rounded-3xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <Shield className="w-10 h-10 text-black" />
                    </div>
                </div>

                {status === 'loading' && (
                    <div className="space-y-4">
                        <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto" />
                        <h1 className="text-2xl font-black text-gray-900 tracking-tighter">SECURING YOUR IDENTITY...</h1>
                        <p className="text-gray-500 font-medium">Validating your premium membership credentials.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <CheckCircle className="w-16 h-16 text-green-500" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">YOU ARE VERIFIED!</h1>
                        <p className="text-gray-600 font-medium">{message}</p>
                        <div className="pt-4">
                            <Link 
                                href="/members"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-black rounded-2xl hover:bg-gray-800 transition-all active:scale-95 shadow-xl uppercase tracking-widest text-sm"
                            >
                                Enter Dashboard <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-6">
                        <div className="flex justify-center">
                            <AlertCircle className="w-16 h-16 text-red-500" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">VERIFICATION FAILED</h1>
                        <p className="text-red-600 font-semibold">{message}</p>
                        <div className="pt-4">
                            <Link 
                                href="/members"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95 uppercase tracking-widest text-sm"
                            >
                                Back to Members
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyMembershipPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                </div>
            }>
                <VerifyContent />
            </Suspense>
        </div>
    );
}
