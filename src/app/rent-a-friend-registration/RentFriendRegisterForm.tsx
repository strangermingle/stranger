'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { auth } from '@/lib/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  ArrowLeft,
  HeartHandshake,
  Check,
  ShieldCheck,
  Sparkles,
  Camera,
  Trash2,
  KeyRound,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { sendGAEvent, trackBeginCheckout, trackPurchase, trackCartAbandonment } from '@/lib/gtag';
import { trackInitiateCheckout, trackPurchase as trackMetaPurchase } from '@/lib/metaPixel';

export default function RentFriendRegisterForm() {
  const { user } = useAuth();

  // Step wizard: 1: Details, 2: KYC Uploads, 3: Platonic Contract, 4: Payment
  const [step, setStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [legalGender, setLegalGender] = useState<'male' | 'female' | 'lgbtq'>('female');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [city, setCity] = useState('Pune');
  const [displayTitle, setDisplayTitle] = useState('');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState(500);

  // Service Preferences
  const [servesMale, setServesMale] = useState(true);
  const [servesFemale, setServesFemale] = useState(true);
  const [servesLgbtq, setServesLgbtq] = useState(true);

  // 3 Mandatory Profile Photos
  const [profilePhotos, setProfilePhotos] = useState<string[]>([]);
  const [uploadingPhotoSlot, setUploadingPhotoSlot] = useState<number | null>(null);

  // Bank Info
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');

  // Storage Paths (uploaded to private rent_friend_kyc bucket)
  const [idProofType, setIdProofType] = useState<'pan_card' | 'driving_license'>('pan_card');
  const [idProofStoragePath, setIdProofStoragePath] = useState('');
  const [aadhaarFrontStoragePath, setAadhaarFrontStoragePath] = useState('');
  const [aadhaarBackStoragePath, setAadhaarBackStoragePath] = useState('');

  // Uploading state per document
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  // Platonic Contract Agreement
  const [platonicContractAgreed, setPlatonicContractAgreed] = useState(false);

  // Overall submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredStrangerId, setRegisteredStrangerId] = useState<string | null>(null);

  // Sync user details if signed in with Google/Firebase
  useEffect(() => {
    const current = auth.currentUser || user;
    if (current?.email && !email) {
      setEmail(current.email);
    }
    if (current?.displayName && !fullName) {
      setFullName(current.displayName);
    }
  }, [user, auth.currentUser]);

  // Google Sign In for Companion
  const handleGoogleSignIn = async () => {
    setIsGoogleSigningIn(true);
    setErrorMessage(null);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        if (result.user.email) setEmail(result.user.email);
        if (result.user.displayName && !fullName) setFullName(result.user.displayName);
      }
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        if (err.code === 'auth/network-request-failed') {
          setErrorMessage('Network request to authentication server failed. If using Brave or an ad-blocker, please allow identitytoolkit.googleapis.com.');
        } else {
          setErrorMessage(err.message || 'Failed to sign in with Google');
        }
      }
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  // Load Razorpay Script dynamically
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Helper to ensure Razorpay script is loaded before opening checkout
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        return resolve(true);
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Fee calculation (Boys ₹999, Girls ₹99, LGBTQ ₹999)
  const feeInr = legalGender === 'female' ? 99 : 999;

  const uploadKycFile = async (file: File, documentType: string) => {
    setUploadingDoc(documentType);
    setErrorMessage(null);

    try {
      const fbUser = auth.currentUser || user;
      const token = fbUser ? await fbUser.getIdToken() : null;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/rent-a-friend/kyc/upload', {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload document');

      if (documentType === 'pan_card' || documentType === 'driving_license') {
        setIdProofStoragePath(data.storagePath);
      }
      if (documentType === 'aadhaar_front') setAadhaarFrontStoragePath(data.storagePath);
      if (documentType === 'aadhaar_back') setAadhaarBackStoragePath(data.storagePath);
    } catch (err: any) {
      setErrorMessage(err.message || 'Upload error');
    } finally {
      setUploadingDoc(null);
    }
  };

  const uploadPhotoFile = async (file: File, slotIndex: number) => {
    setUploadingPhotoSlot(slotIndex);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/rent-a-friend/photos/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload photo');

      setProfilePhotos((prev) => {
        const next = [...prev];
        next[slotIndex] = data.url;
        return next;
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Photo upload error');
    } finally {
      setUploadingPhotoSlot(null);
    }
  };

  const removePhotoFile = (slotIndex: number) => {
    setProfilePhotos((prev) => {
      const next = [...prev];
      next.splice(slotIndex, 1);
      return next;
    });
  };

  const ensureAuthenticated = async () => {
    let fbUser = auth.currentUser || user;
    if (fbUser) return fbUser;

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      throw new Error('Please enter your contact email address.');
    }
    if (!password || password.length < 6) {
      throw new Error('Please set an account password (at least 6 characters) or continue with Google to access your dashboard.');
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password);
      return userCred.user;
    } catch (authErr: any) {
      if (authErr.code === 'auth/email-already-in-use') {
        // Existing member account
        try {
          const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
          return userCred.user;
        } catch (signInErr: any) {
          // If password doesn't match or existing member originally signed up via Google,
          // attach this password to their existing account via the backend admin service
          try {
            const currentToken = auth.currentUser ? await auth.currentUser.getIdToken() : null;
            const attachRes = await fetch('/api/auth/link-account', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(currentToken ? { 'Authorization': `Bearer ${currentToken}` } : {}),
              },
              body: JSON.stringify({
                action: 'attach-password',
                email: cleanEmail,
                password,
              }),
            });
            const attachData = await attachRes.json();
            if (attachData.success) {
              const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password);
              return userCred.user;
            }
          } catch (attachErr: any) {
            console.warn('[RentRegister] Failed to attach password to existing member account:', attachErr);
          }

          throw new Error('An account already exists for this email. Please click "Continue with Google" above or enter your correct account password.');
        }
      } else {
        throw new Error(authErr.message || 'Authentication error with provided email and password');
      }
    }
  };

  const recordAbandonment = async (abandonStep: string, failureReason?: string, orderId?: string) => {
    try {
      if (!email && !phone) return;
      await fetch('/api/rent-a-friend/register/abandoned', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          city,
          legalGender,
          dateOfBirth,
          hourlyRate,
          bio,
          displayTitle,
          profilePhotos: profilePhotos.filter(Boolean),
          abandonStep,
          razorpayOrderId: orderId,
          failureReason,
        }),
      });
    } catch {
      // Non-blocking telemetry
    }
  };

  // Automatically record abandonment whenever checkout / agreement step is reached
  useEffect(() => {
    if (step === 3) {
      recordAbandonment('checkout_page_reached');
    }
  }, [step]);

  const handleCreateOrderAndPay = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const fbUser = await ensureAuthenticated();

      if (!fbUser) {
        throw new Error('Please sign in with Google or enter an account password to register your companion dashboard.');
      }

      const token = await fbUser.getIdToken();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      // 1. Create registration order on backend
      const res = await fetch('/api/rent-a-friend/register/create-order', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fullName,
          legalGender,
          dateOfBirth,
          phone,
          email,
          city,
          displayTitle,
          bio,
          hourlyRate,
          servesMale,
          servesFemale,
          servesLgbtq,
          profilePhotos: profilePhotos.filter(Boolean).slice(0, 3),
          idProofType,
          panStoragePath: idProofType === 'pan_card' ? idProofStoragePath : '',
          drivingLicenseStoragePath: idProofType === 'driving_license' ? idProofStoragePath : '',
          aadhaarFrontStoragePath,
          aadhaarBackStoragePath,
          bankAccountNumber,
          bankIfsc,
          platonicContractAgreed,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to initialize registration');

      const registrationPrice = (orderData.amount || 0) / 100;
      const registrationItem = {
        item_id: 'companion_registration',
        item_name: 'Companion Registration Fee',
        item_category: 'Companion Registration',
        price: registrationPrice,
        quantity: 1,
      };

      // 1. Google Analytics / GTM: Begin Checkout Tracking
      trackBeginCheckout({
        items: [registrationItem],
        value: registrationPrice,
        currency: 'INR',
      });

      // 2. Meta Pixel: Initiate Checkout
      trackInitiateCheckout({
        content_ids: ['companion_registration'],
        content_name: 'Companion Registration Fee',
        num_items: 1,
        value: registrationPrice,
        currency: 'INR',
      });

      sendGAEvent({
        action: 'begin_checkout',
        category: 'companion_registration',
        label: `Registration: ${city}`,
        value: registrationPrice,
      });

      // Ensure Razorpay SDK is loaded
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || !(window as any).Razorpay) {
        throw new Error('Unable to load Razorpay payment SDK. Please check your internet connection and try again.');
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Stranger Mingle',
        description: 'Rent a Friend Registration & KYC Verification Fee',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // 3. Verify payment on backend
            const verifyRes = await fetch('/api/rent-a-friend/register/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                profileId: orderData.profileId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok) throw new Error(verifyData.error || 'Payment verification failed');

            // 4. Fire Google Analytics / GTM: Purchase Event
            const transactionId = response.razorpay_payment_id || orderData.orderId;
            trackPurchase({
              transaction_id: transactionId,
              value: registrationPrice,
              currency: 'INR',
              items: [registrationItem],
            });

            // 5. Fire Meta Pixel Purchase Event
            trackMetaPurchase({
              order_id: transactionId,
              value: registrationPrice,
              currency: 'INR',
              content_ids: ['companion_registration'],
              content_name: 'Companion Registration Fee',
              num_items: 1,
            }, { eventID: transactionId });

            // 6. Custom conversion event
            sendGAEvent({
              action: 'companion_registration_success',
              category: 'registration',
              label: `Registered: ${verifyData.strangerId || city}`,
              value: registrationPrice,
              transaction_id: transactionId,
            });

            // Set companion auth-token cookie
            if (token) {
              document.cookie = `auth-token=${token}; path=/; max-age=1209600; SameSite=Lax`;
            }

            setRegisteredStrangerId(verifyData.strangerId);
            setStep(4); // Success screen
          } catch (vErr: any) {
            setErrorMessage(vErr.message || 'Payment verification error');
          }
        },
        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#e11d48',
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            trackCartAbandonment({
              items: [registrationItem],
              value: registrationPrice,
              currency: 'INR',
              reason: 'payment_dismissed',
            });
            recordAbandonment('payment_dismissed', 'User closed payment window', orderData.orderId);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp: any) {
        setErrorMessage(resp.error?.description || 'Payment was unsuccessful. Please try again.');
        setIsSubmitting(false);
        trackCartAbandonment({
          items: [registrationItem],
          value: registrationPrice,
          currency: 'INR',
          reason: resp.error?.description || 'payment_failed',
        });
        recordAbandonment('payment_failed', resp.error?.description, orderData.orderId);
      });
      razorpayInstance.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
            Open Registration for Everyone
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Register as a Companion
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Hangout as a friendly companion, accompany members to cafes, movies & events in your city, and earn per hour.
          </p>
        </div>

        {/* PROGRESS STEP BAR */}
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-gray-200/80 text-xs font-bold text-gray-500 shadow-2xs">
          <span className={step >= 1 ? 'text-rose-600' : ''}>1. Profile</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-rose-600' : ''}>2. KYC</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-rose-600' : ''}>3. Agreement</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-rose-600' : ''}>4. Complete</span>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: PERSONAL & PUBLIC DETAILS */}
        {step === 1 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 space-y-5 shadow-xs">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-base font-bold text-gray-900">1. Your Details & Hourly Rate</h2>
              <p className="text-xs text-gray-400">Anyone 18+ can apply. We verify your profile before making it live.</p>
            </div>

            {/* COMPANION DASHBOARD AUTHENTICATION HEADER */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
              <div>
                <span className="text-xs font-bold text-gray-900 block">
                  Companion Dashboard Access
                </span>
                <span className="text-[11px] text-gray-500">
                  Already have an account? Sign in with Google or enter your password below to connect your companion profile.
                </span>
              </div>

              {(user || auth.currentUser) ? (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-emerald-950">
                      Signed in as <b>{(user || auth.currentUser)?.email}</b>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900"
                  >
                    Switch account
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={isGoogleSigningIn}
                    className="w-full py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-2xs"
                  >
                    {isGoogleSigningIn ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    )}
                    <span>Continue with Google</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="text-[10px] uppercase font-bold text-gray-400">or set email & password below</span>
                    <div className="h-px bg-gray-200 flex-1" />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Name (As per Aadhaar)</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">Gender</label>
                <div className="grid grid-cols-3 gap-2 mt-1.5">
                  {[
                    { value: 'female', label: 'Girls' },
                    { value: 'male', label: 'Boys' },
                    { value: 'lgbtq', label: 'LGBTQ+' },
                  ].map((g) => (
                    <button
                      key={g.value}
                      type="button"
                      onClick={() => setLegalGender(g.value as any)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        legalGender === g.value
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-600/20'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Primary City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Pune, Mumbai, Bangalore"
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Contact Email (for Dashboard Login)</label>
                <input
                  type="email"
                  required
                  value={email}
                  disabled={!!(user || auth.currentUser)}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    (user || auth.currentUser) ? 'bg-gray-100 cursor-not-allowed text-gray-600' : ''
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit mobile"
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {(!user && !auth.currentUser) && (
                <>
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Account Password (for Dashboard Login)
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      minLength={6}
                      className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      minLength={6}
                      className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Hourly Rate (₹)</label>
                <input
                  type="number"
                  min="200"
                  max="5000"
                  step="50"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  Commission and payout breakdown will be displayed in your Companion Dashboard.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Headline / Tagline</label>
                <input
                  type="text"
                  value={displayTitle}
                  onChange={(e) => setDisplayTitle(e.target.value)}
                  placeholder="e.g. Cafe Explorer & Movie Lover"
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* SERVICE AUDIENCE PREFERENCES */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Who would you like to hangout with?
              </label>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-700">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servesMale}
                    onChange={(e) => setServesMale(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>Boys</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servesFemale}
                    onChange={(e) => setServesFemale(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>Girls</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={servesLgbtq}
                    onChange={(e) => setServesLgbtq(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>LGBTQ+</span>
                </label>
              </div>
            </div>

            {/* 3 MANDATORY PROFILE PHOTOS UPLOAD */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-rose-600" />
                  <span>3 Profile Photos (Mandatory)</span>
                </label>
                <span className={`text-[11px] font-bold ${
                  profilePhotos.filter(Boolean).length === 3 ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {profilePhotos.filter(Boolean).length}/3 Uploaded
                </span>
              </div>
              <p className="text-[11px] text-gray-400">
                All 3 photos will be displayed on the member dashboard and directory once verified.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[0, 1, 2].map((slotIndex) => {
                  const photoUrl = profilePhotos[slotIndex];
                  const isUploading = uploadingPhotoSlot === slotIndex;

                  return (
                    <div
                      key={slotIndex}
                      className="relative h-40 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex flex-col items-center justify-center group hover:border-rose-400 transition-colors"
                    >
                      {photoUrl ? (
                        <>
                          <img
                            src={photoUrl}
                            alt={`Photo slot ${slotIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                            <label className="px-2.5 py-1.5 rounded-xl bg-white text-gray-900 font-bold text-[10px] cursor-pointer hover:bg-gray-100 shadow-xs">
                              <span>Change</span>
                              <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={(e) => {
                                  const f = e.target.files?.[0];
                                  if (f) uploadPhotoFile(f, slotIndex);
                                }}
                              />
                            </label>
                            <button
                              type="button"
                              onClick={() => removePhotoFile(slotIndex)}
                              className="p-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
                              title="Remove photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/70 text-white text-[9px] font-bold">
                            Pic {slotIndex + 1}
                          </span>
                        </>
                      ) : (
                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer p-4 text-center hover:bg-rose-50/30 transition-colors">
                          {isUploading ? (
                            <Loader2 className="w-6 h-6 animate-spin text-rose-600" />
                          ) : (
                            <>
                              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-1">
                                <Upload className="w-4 h-4" />
                              </div>
                              <span className="text-xs font-bold text-gray-800">
                                Upload Pic {slotIndex + 1}
                              </span>
                              <span className="text-[10px] text-gray-400 mt-0.5">
                                JPG, PNG up to 8MB
                              </span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            className="hidden"
                            disabled={isUploading}
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) uploadPhotoFile(f, slotIndex);
                            }}
                          />
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Public Bio & Topics You Like To Discuss</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Describe your personality, hobbies, favorite cafes, conversational interests, and meetup ideas..."
                className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={async () => {
                  if (!fullName || !phone || !email || !bio || !dateOfBirth) {
                    setErrorMessage('Please fill all required personal and rate fields to continue.');
                    return;
                  }
                  if (!user && !auth.currentUser) {
                    if (!password || password.length < 6) {
                      setErrorMessage('Please set an account password (at least 6 characters) or continue with Google to access your dashboard.');
                      return;
                    }
                    if (password !== confirmPassword) {
                      setErrorMessage('Passwords do not match. Please ensure both passwords match.');
                      return;
                    }

                    // Authenticate now so their KYC uploads and session are tied to their account
                    try {
                      setIsSubmitting(true);
                      await ensureAuthenticated();
                    } catch (err: any) {
                      setErrorMessage(err.message || 'Authentication error. Please verify credentials.');
                      return;
                    } finally {
                      setIsSubmitting(false);
                    }
                  }
                  if (profilePhotos.filter(Boolean).length < 3) {
                    setErrorMessage('All 3 profile pictures are strictly mandatory before proceeding to KYC.');
                    return;
                  }
                  setErrorMessage(null);
                  setStep(2);
                }}
                className="px-7 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-rose-600/20 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>To KYC</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: KYC DOCUMENT SUBMISSION */}
        {step === 2 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 space-y-5 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-gray-900">2. Identity Verification (KYC)</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Uploaded to secure private storage for background verification. Personal identity and documents are never shared publicly.
              </p>
            </div>

            {/* BANK ACCOUNT FOR 80% PAYOUT */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase">Bank Account Number (for payouts)</label>
                <input
                  type="text"
                  required
                  value={bankAccountNumber}
                  onChange={(e) => setBankAccountNumber(e.target.value)}
                  placeholder="Enter Account Number"
                  className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase">Bank IFSC Code</label>
                <input
                  type="text"
                  required
                  value={bankIfsc}
                  onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                  placeholder="e.g. SBIN0001234"
                  className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 uppercase"
                />
              </div>
            </div>

            {/* KYC IDENTITY DOCUMENTS: PAN OR DRIVING LICENSE + AADHAAR */}
            <div className="space-y-4">
              {/* ID PROOF SELECTOR (PAN CARD OR DRIVING LICENSE) */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-white space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                      1. Primary ID Proof (Choose One)
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Submit either your PAN Card or Driving License
                    </span>
                  </div>

                  {/* SELECTOR PILLS */}
                  <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setIdProofType('pan_card')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        idProofType === 'pan_card'
                          ? 'bg-white text-gray-900 shadow-xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      PAN Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setIdProofType('driving_license')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        idProofType === 'driving_license'
                          ? 'bg-white text-gray-900 shadow-xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      Driving License
                    </button>
                  </div>
                </div>

                {/* UPLOAD BOX FOR CHOSEN ID PROOF */}
                <div className="pt-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-gray-700">
                      {idProofType === 'pan_card' ? 'PAN Card Document' : 'Driving License Document'}
                    </span>
                    {idProofStoragePath ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Uploaded
                      </span>
                    ) : (
                      <span className="text-[10px] text-rose-500 font-bold">Mandatory</span>
                    )}
                  </div>

                  <label className="block border-2 border-dashed border-gray-200 hover:border-rose-400 rounded-xl p-3.5 text-center cursor-pointer transition-colors bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) uploadKycFile(file, idProofType);
                      }}
                      className="hidden"
                      disabled={uploadingDoc === idProofType}
                    />
                    {uploadingDoc === idProofType ? (
                      <div className="flex items-center justify-center gap-1 text-xs text-rose-600 font-medium">
                        <Loader2 className="w-4 h-4 animate-spin" /> Uploading securely...
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-gray-400" />
                        <span>{idProofStoragePath ? `Replace ${idProofType === 'pan_card' ? 'PAN' : 'Driving License'}` : `Upload ${idProofType === 'pan_card' ? 'PAN Card' : 'Driving License'} (JPG, PNG, PDF)`}</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* AADHAAR FRONT & BACK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: 'aadhaar_front', label: '2. Aadhaar Card (Front)', path: aadhaarFrontStoragePath },
                  { key: 'aadhaar_back', label: '3. Aadhaar Card (Back)', path: aadhaarBackStoragePath },
                ].map((doc) => (
                  <div key={doc.key} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">{doc.label}</span>
                      {doc.path ? (
                        <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Uploaded
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-500 font-bold">Mandatory</span>
                      )}
                    </div>

                    <label className="block border-2 border-dashed border-gray-200 hover:border-rose-400 rounded-xl p-3.5 text-center cursor-pointer transition-colors bg-gray-50/50">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadKycFile(file, doc.key);
                        }}
                        className="hidden"
                        disabled={uploadingDoc === doc.key}
                      />
                      {uploadingDoc === doc.key ? (
                        <div className="flex items-center justify-center gap-1 text-xs text-rose-600 font-medium">
                          <Loader2 className="w-4 h-4 animate-spin" /> Uploading securely...
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-gray-400" />
                          <span>{doc.path ? 'Replace Document' : 'Upload File (JPG, PNG, PDF)'}</span>
                        </div>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!idProofStoragePath || !aadhaarFrontStoragePath || !aadhaarBackStoragePath) {
                    setErrorMessage(`Please upload your ${idProofType === 'pan_card' ? 'PAN Card' : 'Driving License'} and both Aadhaar Front & Back documents.`);
                    return;
                  }
                  if (!bankAccountNumber || !bankIfsc) {
                    setErrorMessage('Bank account number and IFSC are required for companion payouts.');
                    return;
                  }
                  setErrorMessage(null);
                  setStep(3);
                }}
                className="px-7 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md shadow-rose-600/20"
              >
                <span>Agreement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STRICT PLATONIC CONTRACT */}
        {step === 3 && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              Safety & Code of Conduct Agreement
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs text-gray-700 max-h-60 overflow-y-auto space-y-3 font-normal leading-relaxed">
              <p>
                <b>1. Platonic Friendship to Combat Loneliness:</b> Stranger Mingle&apos;s Companion service is strictly and purely meant for platonic friendship to combat urban loneliness — such as trying out cafes, watching movies, exploring city landmarks, or attending social gatherings together.
              </p>
              <p>
                <b>2. Zero Harassment &amp; Non-Romantic:</b> Absolutely NO dating, romance, physical intimacy, or adult activities of any kind are permitted. Any violation will result in an immediate permanent ban, forfeiture of fees, and legal action.
              </p>
              <p>
                <b>3. Public Places Only &amp; Private Places Non-Liability:</b> All companion meetups must happen strictly in open, well-lit public places (like cafes, restaurants, malls, and public parks). Visiting private homes, flats, or hotel rooms is strictly forbidden. <b>Stranger Mingle is strictly not liable or responsible if people are meeting in private places like home, hotel room, etc.</b> Any meeting in private locations is done completely at your own independent risk.
              </p>
              <p>
                <b>4. One-Time Verification Fee:</b> The one-time registration fee (₹{feeInr}) covers your KYC document verification and companion onboarding.
              </p>
            </div>

            <label className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={platonicContractAgreed}
                onChange={(e) => setPlatonicContractAgreed(e.target.checked)}
                className="mt-0.5 rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
              />
              <span className="text-xs font-bold text-gray-900 leading-snug">
                I agree to the Friendly Companion & Zero Harassment Contract. I confirm that all submitted details and ID documents are 100% genuine.
              </span>
            </label>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCreateOrderAndPay}
                disabled={!platonicContractAgreed || isSubmitting}
                className="px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-rose-600/20"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Pay ₹{feeInr} & Submit for Verification</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUCCESS / SUBMITTED */}
        {step === 4 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-5 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-gray-900">Application Submitted Successfully!</h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Your registration fee is received and your KYC documents have been sent to our team for verification.
            </p>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 max-w-sm mx-auto">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Your Assigned Stranger ID</span>
              <span className="text-lg font-mono font-bold text-gray-900">{registeredStrangerId || 'stranger_generated'}</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 max-w-md mx-auto text-left space-y-2">
              <span className="font-bold block text-rose-950">Next Step — Your Companion Dashboard:</span>
              <p className="text-[11px] leading-relaxed">
                You can now log in to your Companion Dashboard at <b>friends.strangermingle.com</b> using your Google account or email & password. You can track your verification status, adjust your hourly rate, update your bio, and manage your photos anytime.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="https://friends.strangermingle.com"
                className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-rose-600/20"
              >
                <span>Open Companion Dashboard</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

