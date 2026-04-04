'use client';

import { useState, useEffect, FormEvent } from 'react';
import { 
    GoogleAuthProvider, 
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';
import { LogOut, Shield, Loader2, AlertCircle, CheckCircle, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';

const PLAN_MONTHLY = 'plan_SRHYRiXvgQQAnC';
const PLAN_YEARLY = 'plan_SRHZEI4lcH5QUm';

export default function MembersPage() {
    const { user, isMember, isMemberVerified, membershipExpiry, loading, checkMembershipStatus } = useAuth();
    
    // Auth mode: standard login for existing members, or new application
    const [authMode, setAuthMode] = useState<'login' | 'apply'>('apply');

    // Sync membership status on mount if user exists but status is pending
    useEffect(() => {
        if (user && !isMember) {
            checkMembershipStatus();
        }
    }, [user, isMember, checkMembershipStatus]);

    // ==========================================
    // LOGIN STATE (Existing Members)
    // ==========================================
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // ==========================================
    // APPLY STATE (New Members)
    // ==========================================
    const [applyName, setApplyName] = useState('');
    const [applyEmail, setApplyEmail] = useState('');
    const [applyPhone, setApplyPhone] = useState('');
    const [applyPassword, setApplyPassword] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<string>(PLAN_YEARLY);
    const [showSuccess, setShowSuccess] = useState(false);

    // ==========================================
    // GLOBAL UI STATE
    // ==========================================
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    
    // Forgot Password Modal
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotSuccess, setForgotSuccess] = useState(false);

    const handleGoogleLogin = async () => {
        setAuthLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            provider.addScope('email');
            provider.addScope('profile');
            await signInWithPopup(auth, provider);
            // AuthProvider will handle the redirect/status check
        } catch (err: any) {
            console.error('[Auth] Google Login Error:', err);
            setError(err.message || 'Failed to sign in with Google');
        } finally {
            setAuthLoading(false);
        }
    };

    const handlePasswordLogin = async (e: FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            // Normalize email for consistent login
            const cleanEmail = loginEmail.trim().toLowerCase();
            await signInWithEmailAndPassword(auth, cleanEmail, loginPassword);
            // AuthProvider will detect user and trigger status check
        } catch (err: any) {
            console.error('[Auth] Password Login Error:', err);
            // Handle specific Firebase error codes for better UX
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password. Please try again.');
            } else {
                setError(err.message || 'Failed to sign in. Please check your credentials.');
            }
        } finally {
            setAuthLoading(false);
        }
    };

    const handleForgotPassword = async (e: FormEvent) => {
        e.preventDefault();
        
        const emailToReset = forgotEmail.trim().toLowerCase();
        if (!emailToReset) {
            setError('Please enter your email address to reset your password.');
            return;
        }
        
        setAuthLoading(true);
        setError(null);
        
        try {
            // Call our new custom backend API instead of Firebase client SDK
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailToReset }),
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to send reset link');
            }

            setForgotSuccess(true);
        } catch (err: any) {
            console.error('[Auth] Forgot Password Error:', err);
            setError(err.message || 'Failed to send reset link. Please verify your email.');
        } finally {
            setAuthLoading(false);
        }
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleApplyAndPay = async (e: FormEvent) => {
        e.preventDefault();
        
        // Normalize registration email
        const cleanEmail = applyEmail.trim().toLowerCase();
        
        if (applyPhone.length < 8 || !cleanEmail.includes('@') || applyName.length < 2 || applyPassword.length < 6) {
            return setError("Please fill all details correctly. Password must be at least 6 characters.");
        }

        setAuthLoading(true);
        setError(null);

        try {
            const isScriptLoaded = await loadRazorpayScript();
            if (!isScriptLoaded) throw new Error("Razorpay SDK failed to load.");

            // 1. Create Subscription on Backend
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    planId: selectedPlan, 
                    name: applyName, 
                    email: cleanEmail, 
                    phone: applyPhone
                })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Failed to initiate subscription");

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                subscription_id: data.subscriptionId,
                name: "Stranger Mingle",
                description: "Premium Community Membership",
                prefill: {
                    name: applyName,
                    email: cleanEmail,
                    contact: applyPhone
                },
                theme: { color: "#eab308" },
                handler: async function (response: any) {
                    // 3. Verify Payment on Backend
                    try {
                        const verifyRes = await fetch('/api/membership/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_subscription_id: response.razorpay_subscription_id,
                                razorpay_signature: response.razorpay_signature,
                                email: cleanEmail // Explicitly pass normalized email for verification
                            })
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyData.success) {
                            // 4. Create Firebase Account with Password
                                try {
                                    const userCredential = await createUserWithEmailAndPassword(auth, applyEmail, applyPassword);
                                    if (userCredential.user) {
                                        await updateProfile(userCredential.user, { displayName: applyName });
                                    }
                                    setShowSuccess(true);
                                } catch (createErr: any) {
                                    // If account creation fails (e.g. already exists), we still show success view
                                    // but the user might need to log in normally.
                                    console.error('[Auth] Account creation error post-payment:', createErr);
                                    setShowSuccess(true);
                                }
                        } else {
                            throw new Error(verifyData.error || "Payment verification failed");
                        }
                    } catch (err: any) {
                        setError(err.message || "Verification failed. Please contact support.");
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (resp: any) {
                setError(resp.error.description);
                setAuthLoading(false);
            });
            rzp.open();
            setAuthLoading(false);

        } catch (err: any) {
            setError(err.message || 'Payment initiation failed.');
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-yellow-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-regular">Checking Identity...</p>
                </div>
            </div>
        );
    }

    // Success View after Payment
    if (showSuccess) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
                <div className="max-w-md w-full text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-12 h-12" />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase italic">Welcome to the Club!</h1>
                    <p className="text-gray-600 font-medium">
                        Your membership is now active! We've sent a <b>Verification Link</b> to your email. Please verify your official email to unlock all premium features.
                    </p>
                    <Link
                        href="/members"
                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all"
                    >
                        Success! Go to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    // Dashboard View if User + Member
    if (user && isMember) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 selection:bg-yellow-200">
                <div className="max-w-7xl mx-auto">
                    {/* Verification Banner */}
                    {!isMemberVerified && (
                        <div className="mb-8 p-4 bg-yellow-400 text-black rounded-2xl flex items-center justify-between shadow-lg shadow-yellow-200/50 animate-pulse">
                            <div className="flex items-center gap-3 font-black uppercase tracking-tighter text-sm">
                                <AlertCircle className="w-5 h-5" />
                                <span>Action Required: Please verify your official email to unlock full access</span>
                            </div>
                            <Link href="/verify-membership" className="px-4 py-1.5 bg-black text-white text-[10px] font-black uppercase rounded-lg hover:bg-gray-800 transition-all">
                                Resend Link
                            </Link>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-1">
                        <div className="animate-in fade-in slide-in-from-left duration-700">
                            <div className="flex items-center gap-3 text-indigo-500 font-black uppercase tracking-[0.3em] text-[10px] mb-3">
                                <Shield className="w-5 h-5" />
                                <span>{isMemberVerified ? `${user.displayName || 'Verified Member'}'s Dashboard` : `${user.displayName || 'Member'}'s Dashboard`}</span>
                                {isMemberVerified && <CheckCircle className="w-4 h-4 text-green-500 fill-green-50" />}
                            </div>
                            <div className="flex items-center gap-4">
                                <h1 className="text-xl md:text-lg font-medium text-gray-900 tracking-wide leading-none mb-2">
                                    Welcome, <br /><span className="text-3xl md:text-4xl font-bold text-red-500 tracking-wider leading-none mb-2 uppercase">{user.displayName || user.email?.split('@')[0]}</span>
                                </h1>
                                {isMemberVerified && (
                                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1 text-[10px] font-black uppercase tracking-widest border border-green-200">
                                        <CheckCircle className="w-3 h-3" />
                                        Verified
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-500 font-medium tracking-tight">Your premium access to Stranger Mingle.</p>
                        </div>

                        {/* Membership Info Badge */}
                        <div className="bg-white border border-gray-100 rounded-[2rem] p-4 px-6 shadow-sm flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Plan Status</span>
                                <span className="text-sm font-bold text-green-500 uppercase">Active</span>
                            </div>
                            <div className="w-px h-8 bg-gray-100" />
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">Renewal Date</span>
                                <span className="text-sm font-bold text-gray-900">
                                    {membershipExpiry 
                                        ? new Date(membershipExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) 
                                        : 'Active'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex mb-6 items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-red-400 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 shadow-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Secure Logout</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                         {[
                            { 
                                title: 'Anonymous Chat', desc: 'Anonymous matches & private messaging', 
                                icon: '💬', href: '/members/chat', color: 'from-blue-500 to-indigo-600'
                            },
                            { 
                                title: 'Local Groups', desc: 'Turf, Trek, Cycling & Activity circles', 
                                icon: '🤝', href: '/members/groups', color: 'from-emerald-500 to-teal-600'
                            },
                            { 
                                title: 'Identity Vault', desc: 'Manage your profile & preferences', 
                                icon: '🛡️', href: '/members/profile', color: 'from-gray-800 to-black'
                            }
                        ].map((card, i) => (
                            <Link key={i} href={card.href} className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-300 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-all">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-bl-[5rem]`} />
                                
                                <div className="relative z-10">
                                    <div className="text-5xl filter grayscale group-hover:grayscale-0 transition-all duration-500 mb-2">{card.icon}</div>
                                    <h3 className="text-2xl font-black text-gray-800 hover:text-blue-600 mb-2 truncate">{card.title}</h3>
                                    <p className="text-gray-600 font-medium leading-relaxed mb-2">{card.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Default Landing (Non-logged in or Non-member)
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
            
            {/* Left Side (Desktop) */}
            <div className="relative w-full md:w-1/2 lg:w-3/5 bg-gray-900 overflow-hidden min-h-screen flex flex-col justify-end">
                <NextImage
                    src="https://res.cloudinary.com/strangermingle/image/upload/v1774261273/full-shot-friends-with-fireworks_tijjpi.jpg"
                    alt="Stranger Mingle Premium"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover opacity-60 scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative z-10 w-full p-8 lg:p-24 flex flex-col h-full justify-end">
                    <div className="mb-6">
                        <span className="px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full inline-block">
                            Members Only
                        </span>
                    </div>
                    <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-8">
                        Zero fake <span className="text-yellow-400">profiles</span>
                    </h2>
                </div>
            </div>

            {/* Right Side (Desktop) */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col items-center justify-center p-4 lg:p-12 bg-gray-50/50 backdrop-blur-sm relative min-h-screen overflow-y-auto">
                <div className="w-full max-w-sm mt-8 space-y-6">
                    
                    {/* Auth Mode Toggle & Heading */}
                    <div className="flex flex-col items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-900 text-center leading-none mb-4">
                            Stranger Mingle
                        </h1>
                        
                        <div className="flex p-1 bg-gray-100 rounded-full w-full max-w-[280px]">
                            <button 
                                onClick={() => { setAuthMode('login'); setError(null); }}
                                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${authMode === 'login' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Log In
                            </button>
                            <button 
                                onClick={() => { setAuthMode('apply'); setError(null); }}
                                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest rounded-full transition-all ${authMode === 'apply' ? 'bg-yellow-400 text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Apply
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-xs font-bold shadow-sm">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span className="leading-tight">{error}</span>
                        </div>
                    )}

                    {successMessage && (
                        <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-3 text-green-600 text-xs font-bold shadow-sm">
                            <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span className="leading-tight">{successMessage}</span>
                        </div>
                    )}

                    {user && !isMember && (
                         <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-2xl flex items-start gap-3 text-yellow-700 text-xs font-bold shadow-sm">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span className="leading-tight">You are logged in as {user.email}, but don't have an active membership yet. Please apply below.</span>
                        </div>
                    )}

                    {/* MODE: LOGIN */}
                    {authMode === 'login' && (
                        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-8 border border-white/50 animate-in fade-in space-y-6">
                            <div className="text-center">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Welcome Back</h3>
                                <p className="text-xs text-gray-500">Sign in to your member account</p>
                            </div>

                            <form onSubmit={handlePasswordLogin} className="space-y-4">
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            value={loginEmail}
                                            onChange={e => setLoginEmail(e.target.value)}
                                            required
                                            placeholder="Email Address"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="password"
                                            value={loginPassword}
                                            onChange={e => setLoginPassword(e.target.value)}
                                            required
                                            placeholder="Password"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setForgotEmail(loginEmail);
                                            setForgotSuccess(false);
                                            setError(null);
                                            setShowForgotModal(true);
                                        }}
                                        className="text-xs font-bold text-yellow-500 hover:text-yellow-600 transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    disabled={authLoading}
                                    className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
                                </button>
                            </form>

                            <div className="relative py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-100"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-400 font-bold tracking-widest">Or continue with</span>
                                </div>
                            </div>

                            <button
                                onClick={handleGoogleLogin}
                                disabled={authLoading}
                                className="w-full py-4 bg-white border border-gray-100 text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1c-2.9 0-5.45 1.11-7.27 2.66l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                        </div>
                    )}

                    {/* MODE: APPLY */}
                    {authMode === 'apply' && (
                        <div className="bg-white rounded-[2rem] shadow-2xl shadow-yellow-200/20 p-6 border border-white animate-in zoom-in-95 duration-300 relative overflow-hidden">
                            <form onSubmit={handleApplyAndPay} className="space-y-4 pt-4">
                                <div className="text-center mb-6">
                                    <h3 className="text-[10px] font-black text-yellow-600 uppercase tracking-widest bg-yellow-50 inline-block px-3 py-1 rounded-full">Apply For Membership</h3>
                                </div>

                                <input
                                    type="text"
                                    value={applyName}
                                    onChange={e => setApplyName(e.target.value)}
                                    required
                                    placeholder="Full Name as per ID"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900"
                                />
                                
                                <input
                                    type="email"
                                    value={applyEmail}
                                    onChange={e => setApplyEmail(e.target.value)}
                                    required
                                    placeholder="Official Email"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900"
                                />

                                <input
                                    type="tel"
                                    value={applyPhone}
                                    onChange={e => setApplyPhone(e.target.value.replace(/\D/g, ''))}
                                    required
                                    placeholder="Mobile Number"
                                    className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900 tracking-wider"
                                />

                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={applyPassword}
                                        onChange={e => setApplyPassword(e.target.value)}
                                        required
                                        placeholder="Create Password"
                                        className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900"
                                    />
                                </div>

                                {/* Plan Selection */}
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    <div 
                                        onClick={() => setSelectedPlan(PLAN_MONTHLY)}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedPlan === PLAN_MONTHLY ? 'border-yellow-400 bg-yellow-50 shadow-md' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}
                                    >
                                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Monthly</div>
                                        <div className="text-xl font-black text-gray-900">₹49</div>
                                    </div>
                                    <div 
                                        onClick={() => setSelectedPlan(PLAN_YEARLY)}
                                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden ${selectedPlan === PLAN_YEARLY ? 'border-yellow-400 bg-yellow-400 shadow-lg shadow-yellow-200' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}
                                    >
                                        {selectedPlan === PLAN_YEARLY && <div className="absolute top-0 right-0 bg-black text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-bl-lg">Save 15%</div>}
                                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 transition-all ${selectedPlan === PLAN_YEARLY ? 'text-black/70' : 'text-gray-500'}`}>Yearly</div>
                                        <div className={`text-xl font-black transition-all ${selectedPlan === PLAN_YEARLY ? 'text-black' : 'text-gray-900'}`}>₹499</div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={authLoading}
                                    className="w-full mt-4 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs flex justify-center items-center shadow-lg shadow-yellow-200"
                                >
                                    {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Pay & Join Now'}
                                </button>
                                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                                    By proceeding, you agree to verified screening. Access granted post-payment.
                                </p>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            {/* FORGOT PASSWORD MODAL */}
            {showForgotModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in"
                        onClick={() => setShowForgotModal(false)}
                    />
                    <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in slide-in-from-bottom-10">
                        <div className="p-8 space-y-8">
                            <div className="text-center space-y-2">
                                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail className="w-8 h-8 text-yellow-600" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Reset Password</h3>
                                <p className="text-sm text-gray-500 font-medium px-4">
                                    {forgotSuccess 
                                        ? "Email Sent Successfully!" 
                                        : "Enter your email address and we'll send you a link to reset your password."
                                    }
                                </p>
                            </div>

                            {forgotSuccess ? (
                                <div className="space-y-6 text-center animate-in zoom-in-95 fade-in">
                                    <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
                                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                        <p className="text-green-800 font-bold text-lg mb-2 leading-tight">Check your inbox!</p>
                                        <p className="text-green-600 text-sm font-medium">A password reset link has been sent to your email.</p>
                                    </div>
                                    <button
                                        onClick={() => setShowForgotModal(false)}
                                        className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all"
                                    >
                                        Back to Login
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleForgotPassword} className="space-y-6 animate-in slide-in-from-bottom-4">
                                    {error && (
                                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-xs font-bold shadow-sm">
                                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                            <span className="leading-tight">{error}</span>
                                        </div>
                                    )}

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={forgotEmail}
                                            onChange={e => setForgotEmail(e.target.value)}
                                            required
                                            placeholder="Member Email"
                                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-bold text-sm text-gray-900 shadow-inner"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForgotModal(false)}
                                            className="flex-1 py-4 bg-gray-50 text-gray-400 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={authLoading}
                                            className="flex-[2] py-4 bg-yellow-400 text-black font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-yellow-500 shadow-lg shadow-yellow-200 transition-all active:scale-95 disabled:opacity-50"
                                        >
                                            {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
