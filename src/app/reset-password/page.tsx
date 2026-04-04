'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
    verifyPasswordResetCode, 
    confirmPasswordReset 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Shield, Lock, CheckCircle, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [oobCode, setOobCode] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(true); // Loading for code verification
    const [submitting, setSubmitting] = useState(false); // Loading for password update
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const code = searchParams.get('oobCode');
        if (!code) {
            setError('Invalid or missing reset code. Please request a new link.');
            setLoading(false);
            return;
        }

        setOobCode(code);

        // Verify the reset code and get the user's email
        verifyPasswordResetCode(auth, code)
            .then((verifiedEmail) => {
                setEmail(verifiedEmail);
                setLoading(false);
            })
            .catch((err) => {
                console.error('[Reset] Code Verification Error:', err);
                setError('The password reset link is invalid or has expired.');
                setLoading(false);
            });
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        if (!oobCode) return;

        setSubmitting(true);
        setError(null);

        try {
            await confirmPasswordReset(auth, oobCode, newPassword);
            setSuccess(true);
            // Optionally auto-login or redirect after a delay
            setTimeout(() => {
                router.push('/members');
            }, 3000);
        } catch (err: any) {
            console.error('[Reset] Password Confirmation Error:', err);
            setError(err.message || 'Failed to update password. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-center">
                <div className="space-y-4">
                    <Loader2 className="w-12 h-12 text-yellow-500 animate-spin mx-auto" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Verifying Reset Link...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            {/* Simple Navbar */}
            <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <NextImage src="/icon.ico" alt="Logo" width={32} height={32} className="rounded-full" />
                    <span className="font-black text-xl tracking-tighter text-gray-900">Stranger Mingle</span>
                </Link>
            </nav>

            <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-100/30 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

                <div className="w-full max-w-md relative z-10">
                    {success ? (
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 text-center space-y-6 border border-white animate-in zoom-in-95 fade-in">
                            <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-2">
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight mb-2">Password Updated!</h1>
                                <p className="text-gray-500 font-medium">Your new password is set. Redirecting you to the login page...</p>
                            </div>
                            <Link 
                                href="/members"
                                className="inline-flex items-center gap-2 text-yellow-600 font-bold hover:text-yellow-700 transition-colors pt-4"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Go to Login Now</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 border border-white/50 space-y-8">
                            <div className="text-center space-y-2">
                                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Shield className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">Create New Password</h2>
                                <p className="text-sm text-gray-500 font-medium">Resetting password for <span className="text-gray-900 font-bold">{email}</span></p>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-xs font-bold shadow-sm animate-in shake-in">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <span className="leading-tight">{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            required
                                            placeholder="New Password"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-bold text-sm text-gray-900 shadow-inner"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            required
                                            placeholder="Confirm Password"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-bold text-sm text-gray-900 shadow-inner"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full py-4 bg-gray-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-200 disabled:opacity-50"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Set New Password'}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-8 text-center">
                <p className="text-gray-400 text-sm font-medium tracking-tight">
                    &copy; {new Date().getFullYear()} Stranger Mingle. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
