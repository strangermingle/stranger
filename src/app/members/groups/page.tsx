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

export default function GroupsPage() {
    const { user } = useAuth();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [myGroups, setMyGroups] = useState<{ owned: any[], joined: any[] }>({ owned: [], joined: [] });
    const [discoverGroups, setDiscoverGroups] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

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
        if (user) fetchData();
    }, [user, fetchData]);

    const filteredDiscover = discoverGroups.filter(g => 
        g.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !myGroups.owned.some(o => o.id === g.id) &&
        !myGroups.joined.some(j => j.id === g.id)
    );

    return (
        <div className="min-h-screen bg-[#FDFDFF] pb-10 pt-20 sm:pt-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-[64px] sm:top-[80px] z-[40] backdrop-blur-md bg-white/80">
            <Link href="/members" className="p-3 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 group">
                <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-gray-900" />
            </Link>
                <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        
                        <div>
                            <h1 className="text-2xl font-bold text-green-500 tracking-wider">Local Groups</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-regular text-gray-600 uppercase tracking-widest">
                                    {discoverGroups.length} Communities Active Nearby
                                </span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-regular text-sm flex items-center gap-3 transition-all shadow-xl shadow-indigo-100 active:scale-95"
                    >
                        <Plus className="w-4 h-4" />
                        Create Group
                    </button>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 opacity-50">
                        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                        <p className="font-black text-gray-400 uppercase tracking-widest text-xs">Syncing Communities...</p>
                    </div>
                ) : (
                    <div className="space-y-20">
                        {/* 1. My Groups (Owned & Joined) */}
                        {(myGroups.owned.length > 0 || myGroups.joined.length > 0) && (
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                        <div className="w-7 h-7 bg-indigo-600 rounded-md flex items-center justify-center shadow-lg shadow-indigo-200">
                                            <Shield className="w-5 h-5 text-white" />
                                        </div>
                                        Your Communities
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                            <Globe className="w-5 h-5 text-white" />
                                        </div>
                                        Discover Nearby
                                    </h2>
                                    <p className="text-gray-400 font-medium text-sm mt-1">Join circles sharing your hobbies and interests.</p>
                                </div>

                                <div className="relative w-full md:w-96">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input 
                                        type="text"
                                        placeholder="Search groups..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-[1.5rem] font-bold text-sm outline-none focus:border-indigo-500 focus:shadow-xl focus:shadow-indigo-50 transition-all"
                                    />
                                </div>
                            </div>

                            {filteredDiscover.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredDiscover.map(group => (
                                        <GroupCard key={group.id} group={group} onActionSuccess={fetchData} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border-2 border-dashed border-gray-100 rounded-[3rem] py-24 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                        <Users className="w-10 h-10 text-gray-200" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">No new groups found</h3>
                                    <p className="text-gray-400 font-medium mt-2 max-w-xs">Try a different search or create your own local community!</p>
                                    <button 
                                        onClick={() => setIsCreateModalOpen(true)}
                                        className="mt-8 px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm hover:scale-105 transition-all active:scale-95"
                                    >
                                        Start a New Group
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
