'use client';

import { useState, useEffect } from 'react';
import { callRpc } from '@/lib/rpc-client';
import { useAuth } from '@/components/AuthProvider';
import { Camera, User as UserIcon, Loader2, Save, Undo, Shield, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
    const { user, mappedUserId, loading: authLoading, isMemberVerified, membershipExpiry } = useAuth();
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

    useEffect(() => {
        if (!authLoading && !user) {
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
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 selection:bg-yellow-200">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-6 mb-12 animate-in fade-in slide-in-from-left duration-700">
                    <Link href="/members" className="p-3 bg-white hover:bg-gray-50 rounded-2xl transition-all border border-gray-100 shadow-sm active:scale-95 group">
                        <Undo className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:-translate-x-1 transition-all" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">Identity Vault</h1>
                        <p className="text-gray-500 font-medium tracking-tight">Manage your verified member credentials.</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 mb-8">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-8 rounded-[2rem] shadow-2xl shadow-yellow-200/50 flex flex-col md:flex-row justify-between items-center text-black gap-6">
                        <div className="text-center md:text-left">
                            <div className="text-xs font-black uppercase tracking-[0.2em] mb-1 opacity-60">Account Standing</div>
                            <div className="text-4xl font-black tracking-tighter">
                                {subscription ? (
                                    subscription.razorpay_plan_id === 'plan_SRHZEI4lcH5QUm' ? 'PLATINUM YEARLY' : 'PLATINUM MONTHLY'
                                ) : (
                                    'GUEST MEMBER'
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="text-center md:text-right">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</div>
                                <div className={`font-black uppercase tracking-tight flex items-center gap-1.5 ${subscription?.status === 'active' ? 'text-green-700' : 'text-orange-700'}`}>
                                    {subscription?.status || 'None'}
                                    {isMemberVerified && <CheckCircle className="w-3 h-3 text-green-700" />}
                                </div>
                            </div>
                            <div className="text-center md:text-right">
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Renewal</div>
                                <div className="font-bold">
                                    {(subscription?.current_period_end || membershipExpiry) 
                                        ? new Date(subscription?.current_period_end || membershipExpiry!).toLocaleDateString('en-US', { month: 'short', year: 'numeric', day: 'numeric' }) 
                                        : 'Active'}
                                </div>
                            </div>
                        </div>
                        <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center shrink-0">
                            <Shield className="w-8 h-8" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8">
                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                        {/* Avatar Upload */}
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-100 border-4 border-white shadow-lg relative">
                                    {avatarUrl ? (
                                        <Image
                                            src={avatarUrl}
                                            alt="Profile"
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <UserIcon className="w-12 h-12 text-gray-300" />
                                        </div>
                                    )}
                                    {uploading && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center shadow-lg cursor-pointer transition-all active:scale-90 z-10">
                                    <Camera className="w-5 h-5" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest mt-4">Change Profile Picture</span>
                        </div>

                        {/* Notifications */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-medium">
                                <AlertCircle className="w-5 h-5" />
                                <span>{error}</span>
                            </div>
                        )}
                        {success && (
                            <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 font-medium">
                                <CheckCircle className="w-5 h-5" />
                                <span>{success}</span>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Read-only Identity Section */}
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Verified Identity (Locked)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                            Full Name
                                        </label>
                                        <div className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-100/50 text-gray-500 font-bold flex items-center justify-between">
                                            <span>{username || 'Anonymous'}</span>
                                            <Lock className="w-4 h-4 opacity-30" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                            Official Email
                                        </label>
                                        <div className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-100/50 text-gray-500 font-bold flex items-center justify-between">
                                            <span className="truncate">{email || 'Not verified'}</span>
                                            <Lock className="w-4 h-4 opacity-30" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                            Anonymous Alias
                                        </label>
                                        <div className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-100/50 text-gray-500 font-bold flex items-center justify-between">
                                            <span>{anonymousAlias || 'CoolStranger007'}</span>
                                            <Lock className="w-4 h-4 opacity-30" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Separator */}
                            <div className="md:col-span-2 border-t border-gray-50 my-2" />
                            
                            {/* Editable Fields */}
                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold"
                                    placeholder="+91 00000 00000"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Bio
                                </label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 transition-all outline-none font-medium text-gray-700"
                                    placeholder="Tell clinical strangers more about yourself..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Gender
                                </label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer_not_to_say">Prefer not to say</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500 transition-all outline-none font-bold"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50 flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-10 py-4 bg-gray-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-gray-900/10 active:scale-95 flex items-center gap-2 uppercase tracking-widest text-sm"
                            >
                                {saving ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        <span>Save Profile</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
