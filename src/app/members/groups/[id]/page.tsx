'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
    Users, MapPin, Tag, Calendar, 
    ArrowLeft, Settings, Edit3, 
    Image as ImageIcon, Loader2,
    Shield, CheckCircle, Globe
} from 'lucide-react';
import Link from 'next/link';
import { callRpc } from '@/lib/rpc-client';
import { useAuth } from '@/components/AuthProvider';
import { EditGroupModal } from '@/components/groups/EditGroupModal';

export default function GroupLoungePage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    
    const [group, setGroup] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchGroup = useCallback(async () => {
        if (!id || id === 'undefined') {
            console.error('[GroupLounge] Invalid ID in params:', id);
            setError('Invalid Group ID');
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            console.log('[GroupLounge] Fetching group with ID:', id);
            const result = await callRpc('groupService', 'getGroup', [null, id]);
            if (result.success) {
                setGroup(result.group);
            } else {
                setError(result.error || 'Group not found');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to load group');
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchGroup();
    }, [id, fetchGroup]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
            </div>
        );
    }

    if (error || !group) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-500 font-medium mb-8">{error || 'This group does not exist or you do not have permission to view it.'}</p>
                    <Link href="/members/groups" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-black text-sm hover:bg-black transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Groups
                    </Link>
                </div>
            </div>
        );
    }

    // Relationship flags are now provided by the backend as group.is_owner and group.is_joined

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-20 sm:pt-24">
            {/* Header / Hero Section */}
            <div className="relative h-80 bg-gray-900 overflow-hidden">
                {group.image_url ? (
                    <img src={group.image_url} alt={group.name} className="w-full h-full object-cover opacity-50" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 opacity-80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-transparent to-transparent" />
                
                <div className="absolute top-8 left-8">
                    <Link href="/members/groups" className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white text-white hover:bg-white/20 transition-all flex items-center gap-2">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Group Info Card */}
                        <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-white">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[1rem] bg-indigo-50 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                                        {group.image_url ? (
                                            <img src={group.image_url} alt={group.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl md:text-5xl font-black text-indigo-600">{group.name.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            {group.category && (
                                                <span 
                                                    className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border"
                                                    style={{ 
                                                        backgroundColor: `${group.category.color_hex}10`, 
                                                        color: group.category.color_hex,
                                                        borderColor: `${group.category.color_hex}30`
                                                    }}
                                                >
                                                    {group.category.name}
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                                <CheckCircle className="w-3 h-3" />
                                                Verified Group
                                            </span>
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                                            {group.name}
                                        </h1>
                                    </div>
                                </div>

                                {group.is_owner && (
                                    <button 
                                        onClick={() => setShowEditModal(true)}
                                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all w-full md:w-auto justify-center"
                                    >
                                        <Settings className="w-4 h-4" />
                                        Manage Group
                                    </button>
                                )}
                            </div>

                            <div className="prose prose-indigo max-w-none">
                                <h3 className="text-xl font-black text-gray-900 mb-4">About this community</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-lg whitespace-pre-wrap">
                                    {group.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 border-t border-gray-50 pt-8">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <Users className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Community</span>
                                        <span className="font-bold text-gray-900">{group.members_count?.[0]?.count || 0} Members</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <MapPin className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Location</span>
                                        <span className="font-bold text-gray-900">{group.location ? `${group.location.city}, ${group.location.country}` : 'Remote'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <Calendar className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Founded</span>
                                        <span className="font-bold text-gray-900">
                                            {new Date(group.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Interaction Placeholder */}
                        <div className="bg-white rounded-[3rem] p-12 shadow-xl shadow-indigo-100/50 border border-white text-center">
                            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-2">Lounge Chat Coming Soon</h2>
                            <p className="text-gray-500 font-medium max-w-sm mx-auto">
                                We're preparing a private encrypted channel for {group.name} members. Stay tuned for real-time anonymous matches.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Creator Info */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/30 border border-white">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Created By</h4>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden">
                                    {group.owner?.avatar_url ? (
                                        <img src={group.owner.avatar_url} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-black uppercase">{group.owner?.username?.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-black text-gray-900">{group.owner?.username}</div>
                                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1">
                                        <Globe className="w-3 h-3" />
                                        Founder
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Details */}
                        {group.location && (
                            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-indigo-100/30 border border-white">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 px-1">Meetup Zone</h4>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="font-black text-gray-900">{group.location.venue_name}</div>
                                            <div className="text-xs text-gray-400 font-medium mt-1">{group.location.address_line1}</div>
                                            <div className="text-xs text-gray-400 font-medium">{group.location.city}, {group.location.country}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {group.is_owner && (
                <EditGroupModal 
                    isOpen={showEditModal}
                    group={group}
                    onClose={() => setShowEditModal(false)}
                    onSuccess={() => {
                        setShowEditModal(false);
                        fetchGroup(); // Refresh data
                    }}
                />
            )}
        </div>
    );
}
