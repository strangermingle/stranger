'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import {
  ShieldCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  HeartHandshake,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function RentFriendRegisterPage() {
  const { user, isMember, isMemberVerified, loading: authLoading } = useAuth();
  const router = useRouter();

  // Step wizard: 1: Details, 2: KYC Uploads, 3: Platonic Contract, 4: Payment
  const [step, setStep] = useState(1);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [legalGender, setLegalGender] = useState<'male' | 'female' | 'lgbtq'>('female');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [city, setCity] = useState('Pune');
  const [displayTitle, setDisplayTitle] = useState('');
  const [bio, setBio] = useState('');
  const [hourlyRate, setHourlyRate] = useState(500);

  // Service Preferences
  const [servesMale, setServesMale] = useState(true);
  const [servesFemale, setServesFemale] = useState(true);
  const [servesLgbtq, setServesLgbtq] = useState(true);

  // Bank Info
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankIfsc, setBankIfsc] = useState('');

  // Storage Paths (uploaded to private rent_friend_kyc bucket)
  const [panStoragePath, setPanStoragePath] = useState('');
  const [aadhaarFrontStoragePath, setAadhaarFrontStoragePath] = useState('');
  const [aadhaarBackStoragePath, setAadhaarBackStoragePath] = useState('');
  const [passbookStoragePath, setPassbookStoragePath] = useState('');

  // Uploading state per document
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  // Platonic Contract Agreement
  const [platonicContractAgreed, setPlatonicContractAgreed] = useState(false);

  // Overall submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registeredStrangerId, setRegisteredStrangerId] = useState<string | null>(null);

  // Sync user details when authenticated
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
    if (user?.displayName && !fullName) {
      setFullName(user.displayName);
    }
  }, [user]);

  // Fee calculation (Boys ₹999, Girls ₹99, LGBTQ ₹999)
  const feeInr = legalGender === 'female' ? 99 : 999;

  const uploadKycFile = async (file: File, documentType: string) => {
    if (!user) return;
    setUploadingDoc(documentType);
    setErrorMessage(null);

    try {
      const token = await user.getIdToken();
      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      const res = await fetch('/api/rent-a-friend/kyc/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload document');

      if (documentType === 'pan_card') setPanStoragePath(data.storagePath);
      if (documentType === 'aadhaar_front') setAadhaarFrontStoragePath(data.storagePath);
      if (documentType === 'aadhaar_back') setAadhaarBackStoragePath(data.storagePath);
      if (documentType === 'passbook') setPassbookStoragePath(data.storagePath);
    } catch (err: any) {
      setErrorMessage(err.message || 'Upload error');
    } finally {
      setUploadingDoc(null);
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
          abandonStep,
          razorpayOrderId: orderId,
          failureReason,
        }),
      });
    } catch {
      // Non-blocking telemetry
    }
  };

  useEffect(() => {
    if (step === 3) {
      recordAbandonment('checkout_page_reached');
    }
  }, [step]);

  const handleCreateOrderAndPay = async () => {
    if (!user) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const token = await user.getIdToken();

      // 1. Create registration order on backend
      const res = await fetch('/api/rent-a-friend/register/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
          panStoragePath,
          aadhaarFrontStoragePath,
          aadhaarBackStoragePath,
          passbookStoragePath,
          bankAccountNumber,
          bankIfsc,
          platonicContractAgreed,
        }),
      });

      const orderData = await res.json();
      if (!res.ok) throw new Error(orderData.error || 'Failed to initialize registration');

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
                Authorization: `Bearer ${token}`,
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
            recordAbandonment('payment_dismissed', 'User closed payment window', orderData.orderId);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on('payment.failed', function (resp: any) {
        setErrorMessage(resp.error?.description || 'Payment was unsuccessful. Please try again.');
        setIsSubmitting(false);
        recordAbandonment('payment_failed', resp.error?.description, orderData.orderId);
      });
      razorpayInstance.open();
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user && !authLoading) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4 max-w-lg mx-auto text-center space-y-4">
        <h1 className="text-2xl font-black text-gray-900">Sign in Required</h1>
        <p className="text-xs text-gray-500">Please sign in to register as a Companion.</p>
        <Link href="/members?mode=login" className="inline-block px-6 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
            Stranger Mingle Official Partner
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Register as a Companion
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Hangout as a friendly companion, attend cafes & events in your city, and earn per hour.
          </p>
        </div>

        {/* PROGRESS STEP BAR */}
        <div className="flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-gray-200/80 text-xs font-bold text-gray-500">
          <span className={step >= 1 ? 'text-rose-600' : ''}>1. Profile & Rates</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-rose-600' : ''}>2. KYC Documents</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-rose-600' : ''}>3. Platonic Contract</span>
          <span>→</span>
          <span className={step >= 4 ? 'text-rose-600' : ''}>4. Verification</span>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: PERSONAL & PUBLIC DETAILS */}
        {step === 1 && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-5 shadow-xs">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-2">
              Candidate Details & Hourly Rate
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Legal Name (as on PAN/Aadhaar)</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
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
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Primary City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Pune, Mumbai, Bangalore"
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10 digit mobile"
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Your Hourly Fees (₹)</label>
                <input
                  type="number"
                  min="200"
                  max="5000"
                  step="50"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  Commission and payout breakdown will be displayed in your Companion Dashboard.
                </span>
              </div>
            </div>

            {/* SERVICE AUDIENCE PREFERENCES */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                Whom do you want to provide companionship to?
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

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Public Bio & Interests</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                placeholder="Share about your interests, favorite cafes, conversational topics, and friendly activities..."
                className="w-full mt-1.5 p-3 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!fullName || !phone || !bio || !dateOfBirth) {
                    setErrorMessage('Please fill all mandatory fields to continue.');
                    return;
                  }
                  setErrorMessage(null);
                  setStep(2);
                }}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Continue to KYC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: KYC DOCUMENT SUBMISSION */}
        {step === 2 && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-5 shadow-xs">
            <div>
              <h2 className="text-base font-bold text-gray-900">KYC Government Documents</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Stored in encrypted Supabase storage. Inspected strictly by Stranger Mingle administration for platform safety.
              </p>
            </div>

            {/* BANK ACCOUNT FOR 80% PAYOUT */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-700 uppercase">Bank Account Number</label>
                <input
                  type="text"
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
                  value={bankIfsc}
                  onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                  placeholder="e.g. HDFC0001234"
                  className="w-full mt-1 p-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 uppercase"
                />
              </div>
            </div>

            {/* 4 MANDATORY DOCUMENTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'pan_card', label: 'PAN Card Copy', path: panStoragePath },
                { key: 'aadhaar_front', label: 'Aadhaar Card (Front)', path: aadhaarFrontStoragePath },
                { key: 'aadhaar_back', label: 'Aadhaar Card (Back)', path: aadhaarBackStoragePath },
                { key: 'passbook', label: 'Bank Passbook / Statement', path: passbookStoragePath },
              ].map((doc) => (
                <div key={doc.key} className="p-4 rounded-2xl border border-gray-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800">{doc.label}</span>
                    {doc.path ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Uploaded
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400">Mandatory</span>
                    )}
                  </div>

                  <label className="block border-2 border-dashed border-gray-200 hover:border-rose-400 rounded-xl p-3 text-center cursor-pointer transition-colors">
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
                        <span>{doc.path ? 'Replace File' : 'Select File (JPG, PNG, PDF)'}</span>
                      </div>
                    )}
                  </label>
                </div>
              ))}
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
                  if (!panStoragePath || !aadhaarFrontStoragePath || !aadhaarBackStoragePath || !passbookStoragePath) {
                    setErrorMessage('Please upload all 4 KYC documents before continuing.');
                    return;
                  }
                  if (!bankAccountNumber || !bankIfsc) {
                    setErrorMessage('Bank account number and IFSC are required.');
                    return;
                  }
                  setErrorMessage(null);
                  setStep(3);
                }}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Platonic Contract</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: STRICT PLATONIC & ANTI-SOLICITATION CONTRACT */}
        {step === 3 && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200/80 space-y-5 shadow-xs">
            <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              Binding Platonic & Non-Sexual Agreement
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 text-xs text-gray-700 max-h-60 overflow-y-auto space-y-3 font-normal leading-relaxed">
              <p>
                <b>1. Platonic Purpose:</b> Stranger Mingle's "Rent a Friend" service is created solely to foster platonic friendships, combat loneliness, and provide social companionship for activities such as cafe visits, city walks, movie screenings, dining, and board games.
              </p>
              <p>
                <b>2. Absolute Ban on Sexual Activity:</b> NO sexual activity, physical intimacy, romance, escorting, or solicitation of any kind is permitted before, during, or after any rented service. Violation results in immediate police reporting, permanent blacklisting, and legal prosecution under applicable laws.
              </p>
              <p>
                <b>3. Public Venues Only:</b> All companion meetups must strictly take place in public venues (cafes, restaurants, public parks, malls, event centers). Private residences and hotel rooms are strictly prohibited.
              </p>
              <p>
                <b>4. Registration Fee:</b> The one-time registration fee (₹{feeInr}) covers identity screening and background verification.
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
                I hereby sign and agree to the Platonic Friendship & Zero Harassment Contract. I certify that all submitted identification documents are genuine and accurate.
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

        {/* STEP 4: SUCCESS / PENDING VERIFICATION SCREEN */}
        {step === 4 && (
          <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-gray-900">Application Submitted Successfully!</h2>
            <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
              Your registration fee has been received and your KYC documents have been securely transmitted to Stranger Mingle Administration.
            </p>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 max-w-sm mx-auto">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Your Generated Stranger ID</span>
              <span className="text-lg font-mono font-bold text-gray-900">{registeredStrangerId || 'stranger_generated'}</span>
            </div>
            <p className="text-[11px] text-gray-400">
              Profiles are typically verified within 24–48 hours. Once approved, your profile will be active in the Members Directory.
            </p>
            <div className="pt-2">
              <Link
                href="/members"
                className="inline-block px-6 py-2.5 rounded-full bg-black text-white font-bold text-xs uppercase tracking-wider"
              >
                Return to Members Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
