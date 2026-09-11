'use client';

import { useState, useEffect } from 'react';
import { callRpc } from '@/lib/rpc-client';
import { useAuth } from '@/components/AuthProvider';
import { Camera, User as UserIcon, Loader2, Save, Undo, Shield, AlertCircle, CheckCircle, Lock, CreditCard, Ban, Trash2, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, mappedUserId, loading: authLoading, isMemberVerified, membershipExpiry, credits } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form states
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');
    const [anonymousAlias, setAnonymousAlias] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [subscription, setSubscription] = useState<any>(null);
    const [subLoading, setSubLoading] = useState(false);
    const [cancelling, setCancelling] = useState(false);
    const [managingPayment, setManagingPayment] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    useEffect(() => {
        if (!authLoading && (!user || !isMemberVerified)) {
            router.push('/members');
            return;
        }

        const fetchProfile = async () => {
            if (!mappedUserId) return;
            try {
                const data = await callRpc('userProfile', 'getUserProfileByUserId', [mappedUserId]);
                if (!data) return;

                // Initialize form values
                setUsername(data.username || '');
                setEmail(data.email || '');
                setPhone(data.phone || '');
                setBio(data.bio || '');
                setAnonymousAlias(data.anonymous_alias || '');
                setGender(data.gender || '');
                setDob(data.date_of_birth || '');
                setAvatarUrl(data.avatar_url || '');

            } catch (err) {
                const message = err instanceof Error ? err.message : 'Failed to load profile';
                console.error('Error fetching profile:', err);
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        const fetchSubscription = async () => {
            if (!mappedUserId) return;
            setSubLoading(true);
            try {
                const subData = await callRpc('userProfile', 'getUserSubscription', [mappedUserId]);
                setSubscription(subData);
            } catch (err) {
                console.error('Error fetching subscription:', err);
            } finally {
                setSubLoading(false);
            }
        };

        if (mappedUserId) {
            fetchProfile();
            fetchSubscription();
        } else if (!loading) {
            setLoading(false); // No user found
        }
    }, [mappedUserId, loading]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!mappedUserId) return;
        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            // Sanitize data: convert empty strings to null for database compatibility
            const updatePayload = {
                bio: bio || null,
                phone: phone || null,
                gender: gender || null,
                date_of_birth: dob || null,
                avatar_url: avatarUrl || null,
                updated_at: new Date().toISOString(),
            };

            const result = await callRpc('userProfile', 'updateUserProfile', [mappedUserId, updatePayload]);

            if (!result) throw new Error('Update failed on backend');

            setSuccess('Profile updated successfully!');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to update profile';
            console.error('Error updating profile:', err);
            setError(message);
        } finally {
            setSaving(false);
        }
    };

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Get fresh token for secure upload
            const { auth } = await import('@/lib/firebase');
            const token = await auth.currentUser?.getIdToken();

            const response = await fetch('/api/members/profile/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed');
            }

            setAvatarUrl(data.url);
            setSuccess('Profile image uploaded! Remember to save the profile.');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to upload image';
            console.error('Error uploading avatar:', err);
            setError(message);
        } finally {
            setUploading(false);
        }
    };

    const handleManagePayment = async () => {
        setManagingPayment(true);
        setError(null);
        try {
            const { auth } = await import('@/lib/firebase');
            const token = await auth.currentUser?.getIdToken();

            const response = await fetch('/api/subscription/manage-payment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to generate link');

            if (data.short_url) {
                window.open(data.short_url, '_blank');
            } else {
                throw new Error('Link generation failed');
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Management failed';
            setError(message);
        } finally {
            setManagingPayment(false);
        }
    };

    const handleCancelSubscription = async () => {
        setCancelling(true);
        setError(null);
        try {
            const { auth } = await import('@/lib/firebase');
            const token = await auth.currentUser?.getIdToken();

            const response = await fetch('/api/subscription/cancel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ reason: cancelReason })
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Cancellation failed');

            setSuccess(data.message || 'Subscription cancelled successfully');
            setShowCancelConfirm(false);

            // Refresh subscription data
            if (mappedUserId) {
                const subData = await callRpc('userProfile', 'getUserSubscription', [mappedUserId]);
                setSubscription(subData);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Cancellation failed';
            setError(message);
        } finally {
            setCancelling(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="text-center bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-sm">
                    <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-500 mb-6">Please log in to view and manage your profile.</p>
                    <Link href="/members" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95 shadow-lg">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafbfc] pt-20 sm:pt-24 pb-16 px-3 sm:px-6 font-sans">
            <div className="max-w-3xl mx-auto space-y-4">
                
                {/* TOP NAV & HEADER */}
                <div className="flex items-center gap-3">
                    <Link 
                        href="/members" 
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200/80 bg-white hover:bg-gray-50 text-gray-600 text-xs font-normal transition-all active:scale-95 shadow-none"
                    >
                        <Undo className="w-3.5 h-3.5" />
                        <span>Dashboard</span>
                    </Link>
                    <div>
                        <h1 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight leading-snug">
                            Profile
                        </h1>
                        <p className="text-xs text-gray-400 font-light mt-0.5">
                            Manage your photo, age, gender, and details
                        </p>
                    </div>
                </div>

                {/* MEMBERSHIP SUMMARY CARD (SLIM & SLEEK) */}
                <div className="bg-white rounded-2xl border border-gray-200/70 p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-light leading-none mb-1">
                                Membership Plan
                            </div>
                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                <span>
                                    {subscription ? (
                                        subscription.razorpay_plan_id === process.env.NEXT_PUBLIC_RAZORPAY_PLAN_YEARLY ? 'Yearly Member' : 'Monthly Member'
                                    ) : (
                                        'Verified Member'
                                    )}
                                </span>
                                {isMemberVerified && (
                                    <span className="inline-flex items-center gap-1 text-[10px] font-light text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                                        Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100 text-xs">
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase font-light">Status</div>
                                <div className="font-normal text-emerald-600 capitalize">
                                    {subscription?.status || 'Active'}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase font-light">Renews on</div>
                                <div className="font-normal text-gray-700">
                                    {(subscription?.current_period_end || membershipExpiry)
                                        ? new Date(subscription?.current_period_end || membershipExpiry!).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                        : 'Active'}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] text-gray-400 uppercase font-light">Credits</div>
                                <div className="font-medium text-amber-600 flex items-center gap-1">
                                    🪙 {credits || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* EDIT PROFILE FORM */}
                <div className="bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-6 shadow-sm">
                    <form onSubmit={handleUpdateProfile} className="space-y-5">
                        
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200/80 shadow-sm relative">
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt="Profile"
                                            fill
                                            sizes="96px"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <UserIcon className="w-10 h-10 text-gray-300" />
                                        </div>
                                    )}
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-900 hover:bg-black text-white rounded-xl flex items-center justify-center shadow-md cursor-pointer transition-all active:scale-95 z-10">
                                    <Camera className="w-4 h-4" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            <span className="text-[11px] text-gray-400 font-light mt-2">Tap camera icon to change photo</span>
                        </div>

                        {/* Notifications */}
                        {error && (
                            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-xs font-light">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-emerald-700 text-xs font-light">
                                <CheckCircle className="w-4 h-4 shrink-0" />
                                <span>{success}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Read-only Identity Section */}
                            <div className="sm:col-span-2 space-y-3">
                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-normal">
                                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Verified Account Details (Cannot be edited)</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-[11px] text-gray-400 font-light mb-1">
                                            Full Name
                                        </label>
                                        <div className="w-full px-3 py-2 rounded-xl border border-gray-200/70 bg-gray-50 text-gray-600 text-xs font-normal flex items-center justify-between">
                                            <span className="truncate">{username || 'Anonymous'}</span>
                                            <Lock className="w-3 h-3 text-gray-400 shrink-0" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] text-gray-400 font-light mb-1">
                                            Email Address
                                        </label>
                                        <div className="w-full px-3 py-2 rounded-xl border border-gray-200/70 bg-gray-50 text-gray-600 text-xs font-normal flex items-center justify-between">
                                            <span className="truncate">{email || 'Not verified'}</span>
                                            <Lock className="w-3 h-3 text-gray-400 shrink-0" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] text-gray-400 font-light mb-1">
                                            Screen Name (Visible to others)
                                        </label>
                                        <div className="w-full px-3 py-2 rounded-xl border border-gray-200/70 bg-gray-50 text-gray-600 text-xs font-normal flex items-center justify-between">
                                            <span className="truncate">{anonymousAlias || (loading ? 'Loading...' : 'Anonymous Member')}</span>
                                            <Lock className="w-3 h-3 text-gray-400 shrink-0" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="sm:col-span-2 border-t border-gray-100 my-1" />

                            {/* Editable Fields */}
                            <div>
                                <label className="block text-[11px] text-gray-500 font-light mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200/80 bg-white focus:outline-none focus:border-gray-400 text-xs text-gray-800 transition-all font-light"
                                    placeholder="+91 00000 00000"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] text-gray-500 font-light mb-1">
                                    Gender
                                </label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200/80 bg-white focus:outline-none focus:border-gray-400 text-xs text-gray-800 transition-all font-light"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] text-gray-500 font-light mb-1">
                                    Date of Birth (Used to show your age)
                                </label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200/80 bg-white focus:outline-none focus:border-gray-400 text-xs text-gray-800 transition-all font-light"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block text-[11px] text-gray-500 font-light mb-1">
                                    About Me
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 rounded-xl border border-gray-200/80 bg-white focus:outline-none focus:border-gray-400 text-xs text-gray-800 transition-all font-light resize-none"
                                    placeholder="Tell other members a little about yourself..."
                                />
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-normal rounded-xl transition-all active:scale-95 flex items-center gap-2 shadow-sm"
                            >
                                {saving ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        <span>Save Profile</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Membership Management Section */}
                {subscription && subscription.status === 'active' && (
                    <div className="bg-white rounded-2xl border border-gray-200/70 p-4 sm:p-5 shadow-sm">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                                <CreditCard className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">Membership Settings</h3>
                                <p className="text-[11px] text-gray-400 font-light">Manage your subscription and payments</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {/* Update Payment Method */}
                            <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-100 flex flex-col justify-between">
                                <div className="mb-3">
                                    <h4 className="text-xs font-medium text-gray-900 mb-0.5">Payment Method</h4>
                                    <p className="text-[11px] text-gray-400 font-light">Update your card or autopay via Razorpay.</p>
                                </div>
                                <button
                                    onClick={handleManagePayment}
                                    disabled={managingPayment}
                                    className="w-full py-2 bg-white hover:bg-gray-100 text-gray-800 text-xs font-normal rounded-xl border border-gray-200 transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                                >
                                    {managingPayment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <ExternalLink className="w-3.5 h-3.5" />}
                                    <span>Update Payment Method</span>
                                </button>
                            </div>

                            {/* Cancel Subscription */}
                            <div className="p-4 bg-rose-50/30 rounded-xl border border-rose-100/60 flex flex-col justify-between">
                                <div className="mb-3">
                                    <h4 className="text-xs font-medium text-rose-900 mb-0.5">Cancel Membership</h4>
                                    <p className="text-[11px] text-rose-700/70 font-light">Stop future charges. You keep access until current expiry.</p>
                                </div>
                                {subscription.cancel_at_period_end ? (
                                    <div className="w-full py-2 bg-rose-100 text-rose-700 text-xs font-normal rounded-xl border border-rose-200 flex items-center justify-center gap-1.5">
                                        <Ban className="w-3.5 h-3.5" />
                                        <span>Cancellation Scheduled</span>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowCancelConfirm(true)}
                                        className="w-full py-2 bg-white hover:bg-rose-50 text-rose-600 text-xs font-normal rounded-xl border border-rose-200 transition-all flex items-center justify-center gap-1.5 active:scale-95"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Cancel Membership</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancellation Modal */}
                {showCancelConfirm && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
                            <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center mb-3">
                                <AlertCircle className="w-5 h-5 text-rose-600" />
                            </div>
                            <h2 className="text-base font-medium text-gray-900 tracking-tight mb-1">
                                Are you sure you want to cancel?
                            </h2>
                            <p className="text-xs text-gray-500 font-light mb-4 leading-relaxed">
                                You will still have access to member calls, chats, and meetups until <b>{new Date(subscription?.current_period_end).toLocaleDateString()}</b>.
                            </p>

                            <div className="space-y-3">
                                <textarea
                                    placeholder="Optional: Why would you like to cancel?"
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200/80 outline-none focus:bg-white focus:border-gray-400 transition-all text-xs font-light resize-none"
                                    rows={2}
                                />

                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        onClick={() => setShowCancelConfirm(false)}
                                        className="py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-normal rounded-xl transition-all active:scale-95 text-xs"
                                    >
                                        Keep Membership
                                    </button>
                                    <button
                                        onClick={handleCancelSubscription}
                                        disabled={cancelling}
                                        className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-normal rounded-xl transition-all shadow-sm active:scale-95 flex items-center justify-center gap-1.5 text-xs"
                                    >
                                        {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm Cancel'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
