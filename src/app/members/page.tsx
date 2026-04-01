'use client';

import { useState, useEffect, FormEvent } from 'react';
import { 
    signInWithPhoneNumber, 
    RecaptchaVerifier, 
    ConfirmationResult 
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/components/AuthProvider';
import { LogOut, Shield, Loader2, AlertCircle, Phone, Mail, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import NextImage from 'next/image';
import { useRecaptcha } from '@/hooks/useRecaptcha';


const PLAN_MONTHLY = 'plan_SRHYRiXvgQQAnC';
const PLAN_YEARLY = 'plan_SRHZEI4lcH5QUm';

export default function MembersPage() {
    const { user, loading } = useAuth();
    const { executeRecaptcha } = useRecaptcha();

    
    // Auth mode: standard login for existing members, or new application
    const [authMode, setAuthMode] = useState<'login' | 'apply'>('apply');

    // ==========================================
    // LOGIN STATE (Existing Members)
    // ==========================================
    const [loginPhone, setLoginPhone] = useState('');
    const [loginCountry, setLoginCountry] = useState('+91');
    const [loginOtp, setLoginOtp] = useState('');
    const [loginOtpSent, setLoginOtpSent] = useState(false);
    const [loginConfirmation, setLoginConfirmation] = useState<ConfirmationResult | null>(null);

    // ==========================================
    // APPLY STATE (New Members - Multi-Step)
    // ==========================================
    type JoinStep = 'form' | 'verify_email' | 'verify_phone';
    const [joinStep, setJoinStep] = useState<JoinStep>('form');
    
    // Form data
    const [applyName, setApplyName] = useState('');
    const [applyEmail, setApplyEmail] = useState('');
    const [applyPhone, setApplyPhone] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<string>(PLAN_YEARLY);

    // Email OTP Verification
    const [emailOtp, setEmailOtp] = useState('');
    const [emailExpirePayload, setEmailExpirePayload] = useState<{hash: string, expiresAt: number} | null>(null);
    
    // Phone OTP Verification
    const [applyPhoneOtp, setApplyPhoneOtp] = useState('');
    const [applyPhoneConfirmation, setApplyPhoneConfirmation] = useState<ConfirmationResult | null>(null);

    // ==========================================
    // GLOBAL UI STATE
    // ==========================================
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const countryCodes = [
        { code: '+91', name: 'India', flag: '🇮🇳' },
        { code: '+1', name: 'USA/Canada', flag: '🇺🇸' },
        { code: '+44', name: 'UK', flag: '🇬🇧' },
        { code: '+971', name: 'UAE', flag: '🇦🇪' },
    ];

    const getRecaptchaVerifier = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
            });
        }
        return window.recaptchaVerifier;
    };

    // ------------------------------------------
    // FLOW: LOGIN (Existing Member)
    // ------------------------------------------
    const handleLoginSendOtp = async (e: FormEvent) => {
        e.preventDefault();
        const fullPhoneNumber = `${loginCountry}${loginPhone.trim()}`;
        if(loginPhone.trim().length < 8) return setError("Please enter a valid mobile number.");
        
        setAuthLoading(true);
        setError(null);
        try {
            // reCAPTCHA Enterprise Layer
            const recaptchaToken = await executeRecaptcha('member_login');
            if (!recaptchaToken) {
              console.warn('[reCAPTCHA] Assessment token missing. Proceeding with caution...');
            }

            const appVerifier = getRecaptchaVerifier();

            const confirmation = await signInWithPhoneNumber(auth, fullPhoneNumber, appVerifier);
            setLoginConfirmation(confirmation);
            setLoginOtpSent(true);
        } catch (err: any) {
            setError(err.message.replace('Firebase:', '').trim());
            if(window.recaptchaVerifier) {
                window.recaptchaVerifier.render().then((widgetId: any) => grecaptcha?.reset(widgetId));
            }
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLoginVerifyOtp = async (e: FormEvent) => {
        e.preventDefault();
        if (!loginConfirmation) return;
        setAuthLoading(true);
        setError(null);
        try {
            await loginConfirmation.confirm(loginOtp);
            // On success, Firebase Auth state shifts and `user` triggers Dashboard
        } catch (err: any) {
            setError("Invalid OTP Code.");
        } finally {
            setAuthLoading(false);
        }
    };

    // ------------------------------------------
    // FLOW: APPLY (New Member) -> 1. Payment
    // ------------------------------------------
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
        if (applyPhone.length < 8 || !applyEmail.includes('@') || applyName.length < 2) {
            return setError("Please fill all details correctly.");
        }

        setAuthLoading(true);
        setError(null);

        try {
            // 0. reCAPTCHA Enterprise Layer
            const recaptchaToken = await executeRecaptcha('member_apply');
            if (!recaptchaToken) {
                console.warn('[reCAPTCHA] Assessment token missing. Flow may be at risk.');
            }

            const isScriptLoaded = await loadRazorpayScript();

            if (!isScriptLoaded) {
                throw new Error("Razorpay SDK failed to load. Are you online?");
            }

            // 1. Create Subscription on Backend
            const res = await fetch('/api/subscription', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    planId: selectedPlan, 
                    name: applyName, 
                    email: applyEmail, 
                    phone: applyPhone,
                    recaptchaToken // Send to backend for assessment
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
                    email: applyEmail,
                    contact: applyPhone
                },
                theme: { color: "#eab308" },
                handler: async function (response: any) {
                    // Payment Success!
                    // Move to Step 2: Email Verification
                    initiateEmailVerification();
                }
            };

            // Temporary fetch of public key if missing
            if (!options.key) {
                // We fallback to checking window or a specific global if needed, 
                // but environment variables are preferred.
                console.warn("Razorpay Public Key missing in environment.");
            }

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (resp: any) {
                setError(resp.error.description);
                setAuthLoading(false);
            });
            rzp.open();
            
            // Note: We don't setAuthLoading(false) here immediately because we are waiting for Razorpay popup.
            // But we will free the UI so the loader stops spinning endlessly underneath it.
            setAuthLoading(false);

        } catch (err: any) {
            setError(err.message || 'Payment initiation failed.');
            setAuthLoading(false);
        }
    };

    // ------------------------------------------
    // FLOW: APPLY -> 2. Email Verification
    // ------------------------------------------
    const initiateEmailVerification = async () => {
        setAuthLoading(true);
        try {
            const res = await fetch('/api/auth/send-email-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: applyEmail })
            });
            const data = await res.json();
            if (data.success) {
                setEmailExpirePayload({ hash: data.hash, expiresAt: data.expiresAt });
                setJoinStep('verify_email');
                setError(null);
            } else {
                throw new Error("Could not send email OTP");
            }
        } catch (err: any) {
            setError(err.message || "Email OTP Send Failed");
        } finally {
            setAuthLoading(false);
        }
    };

    const verifyEmailOtp = async (e: FormEvent) => {
        e.preventDefault();
        if (!emailExpirePayload) return;
        setAuthLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/verify-email-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: applyEmail, 
                    otp: emailOtp, 
                    hash: emailExpirePayload.hash, 
                    expiresAt: emailExpirePayload.expiresAt 
                })
            });
            const data = await res.json();
            
            if (data.success) {
                // Email Verified! Move to Phone Verification
                initiatePhoneVerification();
            } else {
                setError(data.error || "Invalid Email OTP");
            }
        } catch (err: any) {
            setError(err.message || "Verification Failed");
        } finally {
            setAuthLoading(false);
        }
    };

    // ------------------------------------------
    // FLOW: APPLY -> 3. Phone Verification
    // ------------------------------------------
    const initiatePhoneVerification = async () => {
        setAuthLoading(true);
        try {
            // Full mobile number assumes India standard testing if user didn't select country inline earlier, 
            // but for safety, we format cleanly.
            const fullPhone = applyPhone.startsWith('+') ? applyPhone : `+91${applyPhone}`;
            const appVerifier = getRecaptchaVerifier();
            const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
            setApplyPhoneConfirmation(confirmation);
            setJoinStep('verify_phone');
            setError(null);
        } catch (err: any) {
            setError(err.message.replace('Firebase:', '').trim());
            // It might fail if recaptcha is burned. Need a fallback.
        } finally {
            setAuthLoading(false);
        }
    };

    const verifyPhoneOtpAndLogin = async (e: FormEvent) => {
        e.preventDefault();
        if (!applyPhoneConfirmation) return;
        
        setAuthLoading(true);
        setError(null);
        try {
            await applyPhoneConfirmation.confirm(applyPhoneOtp);
            // Success! The user is now logged in via Firebase Auth, they've paid, and have done Basic Verification!
        } catch (err: any) {
            setError("Invalid Phone OTP");
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = async () => {
        await auth.signOut();
    };

    // ==========================================
    // RENDERING LOGIC
    // ==========================================
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-regular">Checking Identity...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
                <div id="recaptcha-container"></div>

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
                            
                            {/* Restrict toggles if mid-signup */}
                            {joinStep === 'form' && (
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
                            )}
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-xs font-bold shadow-sm">
                                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span className="leading-tight">{error}</span>
                            </div>
                        )}

                        {/* MODE: LOGIN (Existing Users) */}
                        {authMode === 'login' && (
                            <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 p-6 border border-white/50 animate-in fade-in">
                                <div className="text-center mb-6">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Existing Member</h3>
                                </div>
                                <form onSubmit={loginOtpSent ? handleLoginVerifyOtp : handleLoginSendOtp} className="space-y-4">
                                    {!loginOtpSent ? (
                                        <div className="space-y-1.5 flex gap-2">
                                            <div className="relative w-20 shrink-0">
                                                <select
                                                    value={loginCountry}
                                                    onChange={(e) => setLoginCountry(e.target.value)}
                                                    className="w-full appearance-none px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none font-bold text-xs h-full"
                                                >
                                                    {countryCodes.map(cc => <option key={cc.code} value={cc.code}>{cc.flag} {cc.code}</option>)}
                                                </select>
                                            </div>
                                            <input
                                                type="tel"
                                                value={loginPhone}
                                                onChange={(e) => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                                                required
                                                className="w-full flex-1 px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/10 outline-none transition-all font-bold text-gray-900 tracking-widest"
                                                placeholder="Mobile Number"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2">
                                            <label className="block text-xs font-bold text-yellow-600 uppercase tracking-[0.2em] mb-2 text-center">Enter Login OTP</label>
                                            <input
                                                type="text"
                                                value={loginOtp}
                                                onChange={(e) => setLoginOtp(e.target.value)}
                                                required
                                                maxLength={6}
                                                className="w-full px-5 py-4 rounded-2xl border border-yellow-200 bg-yellow-50 focus:bg-white focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/10 outline-none font-black text-center tracking-[0.5em] text-gray-900 text-lg"
                                                placeholder="------"
                                            />
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={authLoading}
                                        className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs flex justify-center items-center shadow-md shadow-gray-200"
                                    >
                                        {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (!loginOtpSent ? 'Send Secure OTP' : 'Login Securely')}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* MODE: APPLY (New Users / Reg Form -> Pay -> OTP) */}
                        {authMode === 'apply' && (
                            <div className="bg-white rounded-[2rem] shadow-2xl shadow-yellow-200/20 p-6 border border-white animate-in zoom-in-95 duration-300 relative overflow-hidden">
                                {/* Wizard Progress Indication */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gray-50">
                                    <div className={`h-full bg-yellow-400 transition-all duration-700 ${joinStep === 'form' ? 'w-1/3' : joinStep === 'verify_email' ? 'w-2/3' : 'w-full'}`} />
                                </div>

                                {joinStep === 'form' && (
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
                                            placeholder="Mobile Number (ex: 9876543210)"
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-yellow-400 outline-none transition-all font-medium text-sm text-gray-900 tracking-wider"
                                        />

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
                                            By proceeding, you agree to verified screening. Access granted only post-payment & OTP verification.
                                        </p>
                                    </form>
                                )}

                                {joinStep === 'verify_email' && (
                                    <form onSubmit={verifyEmailOtp} className="space-y-4 pt-4 animate-in slide-in-from-right">
                                        <div className="text-center mb-6">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Mail className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-lg font-black text-gray-900">Verify Email Address</h3>
                                            <p className="text-xs text-gray-500 mt-2">We sent a 6-digit pin to<br/><strong className="text-gray-900">{applyEmail}</strong></p>
                                        </div>
                                        
                                        <input
                                            type="text"
                                            value={emailOtp}
                                            onChange={e => setEmailOtp(e.target.value)}
                                            required
                                            maxLength={6}
                                            placeholder="------"
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none text-center font-black text-xl tracking-[0.5em]"
                                        />

                                        <button
                                            type="submit"
                                            disabled={authLoading}
                                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs flex justify-center items-center shadow-md shadow-blue-200"
                                        >
                                            {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Email'}
                                        </button>
                                        <button type="button" onClick={initiateEmailVerification} className="w-full text-[10px] text-gray-400 font-bold uppercase tracking-wider hover:text-gray-900 mt-2">
                                            Resend Email
                                        </button>
                                    </form>
                                )}

                                {joinStep === 'verify_phone' && (
                                    <form onSubmit={verifyPhoneOtpAndLogin} className="space-y-4 pt-4 animate-in slide-in-from-right">
                                        <div className="text-center mb-6">
                                            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <Phone className="w-6 h-6" />
                                            </div>
                                            <h3 className="text-lg font-black text-gray-900">Verify Mobile Number</h3>
                                            <p className="text-xs text-gray-500 mt-2">Sent SMS code to<br/><strong className="text-gray-900">{applyPhone}</strong></p>
                                        </div>
                                        
                                        <input
                                            type="text"
                                            value={applyPhoneOtp}
                                            onChange={e => setApplyPhoneOtp(e.target.value)}
                                            required
                                            maxLength={6}
                                            placeholder="------"
                                            className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-green-400 outline-none text-center font-black text-xl tracking-[0.5em]"
                                        />

                                        <button
                                            type="submit"
                                            disabled={authLoading}
                                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs flex justify-center items-center shadow-md shadow-green-200"
                                        >
                                            {authLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Phone & Login'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ==========================================
    // LOGGED IN DASHBOARD
    // ==========================================
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 selection:bg-yellow-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="animate-in fade-in slide-in-from-left duration-700">
                        <div className="flex items-center gap-3 text-yellow-600 font-black uppercase tracking-[0.3em] text-xs mb-3">
                            <Shield className="w-5 h-5" />
                            <span>Verified Member Dashboard</span>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none mb-2">
                            Welcome, <span className="text-green-500">{user.email?.split('@')[0] || user.phoneNumber}</span>
                        </h1>
                        <p className="text-gray-400 font-medium tracking-tight">Your internal access to Stranger Mingle.</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 text-gray-400 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all active:scale-95 shadow-sm"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Secure Logout</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                     {[
                        { 
                            title: 'Member Chat', desc: 'Anonymous matches & private messaging', 
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
                        <Link key={i} href={card.href} className="group relative overflow-hidden bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-all">
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-bl-[5rem]`} />
                            
                            <div className="relative z-10">
                                <div className="text-5xl filter grayscale group-hover:grayscale-0 transition-all duration-500 mb-6">{card.icon}</div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2 truncate">{card.title}</h3>
                                <p className="text-gray-400 font-medium leading-relaxed mb-6">{card.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Global declarations for Firebase Recaptcha and Google Recaptcha
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
  const grecaptcha: any;
}
