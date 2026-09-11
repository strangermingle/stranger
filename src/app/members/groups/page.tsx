'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { callRpc } from '@/lib/rpc-client';
import { 
    Users, 
    Plus, 
    Search, 
    ChevronRight, 
    Globe, 
    Shield, 
    ArrowLeft,
    Loader2,
    LayoutGrid,
    Layers as GroupIcon
} from 'lucide-react';
import Link from 'next/link';
import { CreateGroupModal } from '@/components/groups/CreateGroupModal';
import { GroupCard } from '@/components/groups/GroupCard';

import { useRouter } from 'next/navigation';

export default function GroupsPage() {
    const { user, loading: authLoading, isMemberVerified } = useAuth();
    const router = useRouter();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [myGroups, setMyGroups] = useState<{ owned: any[], joined: any[] }>({ owned: [], joined: [] });
    const [discoverGroups, setDiscoverGroups] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (!authLoading && (!user || !isMemberVerified)) {
            router.push('/members');
        }
    }, [user, isMemberVerified, authLoading, router]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // 1. Fetch User Groups
            const myData = await callRpc('groupService', 'getUserGroups', [null]);

            // 2. Fetch Discover Groups
            const discData = await callRpc('groupService', 'getGroups', []);

            if (myData.success) setMyGroups(myData);
            if (discData.success) setDiscoverGroups(discData.groups);

        } catch (err) {
            console.error('[Groups] Fetch Error:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user && isMemberVerified) fetchData();
    }, [user, isMemberVerified, fetchData]);

    const filteredDiscover = discoverGroups.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !myGroups.owned.some(o => o.id === g.id) &&
        !myGroups.joined.some(j => j.id === g.id)
    );

    return (
        <div className="min-h-screen bg-[#fafbfc] pb-16 pt-20 sm:pt-24 font-sans text-gray-900">
            {/* Top Navigation & Header */}
            <div className="bg-white border-b border-gray-200/70 sticky top-[64px] sm:top-[80px] z-[40] backdrop-blur-md bg-white/90">
                <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Link 
                            href="/members" 
                            className="p-2 hover:bg-gray-50 rounded-xl transition-all border border-gray-200/80 text-gray-500 hover:text-gray-900 active:scale-95"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <div>
                            <h1 className="text-base sm:text-lg font-medium text-gray-900 tracking-tight leading-snug">
                                Local Groups
                            </h1>
                            <div className="flex items-center gap-1.5 mt-0.5 text-xs text-gray-400 font-light">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                <span>{discoverGroups.length} groups active</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-gray-900 hover:bg-black text-white px-3.5 py-2 rounded-xl text-xs font-normal flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Group</span>
                    </button>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-8">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
                        <p className="text-xs font-light">Loading groups...</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* 1. My Groups (Owned & Joined) */}
                        {(myGroups.owned.length > 0 || myGroups.joined.length > 0) && (
                            <section>
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-indigo-600" />
                                        Your Groups
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {myGroups.owned.map(group => (
                                        <GroupCard key={group.id} group={group} isOwned onActionSuccess={fetchData} />
                                    ))}
                                    {myGroups.joined.map(group => (
                                        <GroupCard key={group.id} group={group} isJoined onActionSuccess={fetchData} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 2. Discover Groups */}
                        <section>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                                <div>
                                    <h2 className="text-sm sm:text-base font-medium text-gray-900 flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-emerald-600" />
                                        Discover Groups
                                    </h2>
                                    <p className="text-xs text-gray-400 font-light mt-0.5">
                                        Join circles for weekend hobbies, sports, and meetups
                                    </p>
                                </div>

                                <div className="relative w-full sm:w-72">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search groups by name..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200/80 rounded-xl text-xs text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 transition-all font-light"
                                    />
                                </div>
                            </div>

                            {filteredDiscover.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                                    {filteredDiscover.map(group => (
                                        <GroupCard key={group.id} group={group} onActionSuccess={fetchData} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border border-gray-200/70 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-3">
                                        <Users className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900">No groups found</h3>
                                    <p className="text-xs text-gray-400 font-light mt-1 max-w-xs">
                                        Try a different search or create your own group!
                                    </p>
                                    <button 
                                        onClick={() => setIsCreateModalOpen(true)}
                                        className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-normal hover:bg-black transition-all active:scale-95 shadow-sm"
                                    >
                                        + Create New Group
                                    </button>
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </main>

            <CreateGroupModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSuccess={fetchData}
            />
        </div>
    );
}
