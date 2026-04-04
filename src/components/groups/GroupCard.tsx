import React, { useState } from 'react';
import Link from 'next/link';
import { Users, User, ArrowUpRight, Check, Loader2, MapPin, Tag, Settings, Plus } from 'lucide-react';
import { callRpc } from '@/lib/rpc-client';

interface GroupCardProps {
    group: any;
    isJoined?: boolean;
    isOwned?: boolean;
    onActionSuccess?: () => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({ group, isJoined, isOwned, onActionSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);

    const handleJoin = async () => {
        setLoading(true);
        setActionError(null);
        try {
            const result = await callRpc('groupService', 'joinGroup', [null, group.id]);

            if (result.success) {
                onActionSuccess?.();
            } else {
                setActionError(result.error || 'Failed to join group');
            }
        } catch (err: any) {
            setActionError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const effectiveIsOwned = isOwned || group.is_owner;
    const effectiveIsJoined = isJoined || group.is_joined;

    return (
        <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-200 hover:border-indigo-900 hover:shadow-xl hover:shadow-indigo-50 transition-all group/card">
            <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col gap-2">
                    {group.image_url ? (
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-50 shadow-sm transition-all group-hover/card:ring-4 group-hover/card:ring-indigo-100">
                             <img src={group.image_url} alt={group.name} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black text-xl group-hover/card:bg-indigo-600 group-hover/card:text-white transition-all duration-300">
                            {group.name.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                        {effectiveIsOwned && (
                             <Settings className="w-4 h-4 text-gray-400 hover:text-indigo-600 cursor-pointer transition-colors" />
                        )}
                        {effectiveIsOwned ? (
                            <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-amber-100">
                                Owner
                            </span>
                        ) : effectiveIsJoined ? (
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-regular uppercase tracking-widest rounded-full border border-indigo-100">
                                Member
                            </span>
                        ) : null}
                    </div>
                    
                    {group.category && (
                        <span 
                            className="px-3 py-1 text-[10px] font-regular uppercase tracking-widest rounded-full border"
                            style={{ 
                                backgroundColor: `${group.category.color_hex}10`, 
                                color: group.category.color_hex,
                                borderColor: `${group.category.color_hex}30`
                            }}
                        >
                            {group.category.name}
                        </span>
                    )}
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 group-hover/card:text-indigo-600 transition-colors uppercase">
                {group.name}
            </h3>
            <p className="text-gray-500 font-medium text-sm mt-2 line-clamp-2 min-h-[2.5rem]">
                {group.description || 'No description provided.'}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-regular text-gray-600">
                        {group.members_count?.[0]?.count || 0} Members
                    </span>
                </div>
                
                {group.location && (
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span className="text-xs font-regular text-gray-600">
                            {group.location.city}, {group.location.country}
                        </span>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-regular text-gray-600">
                        by {group.owner?.username || 'Stranger'}
                    </span>
                </div>
            </div>

            <div className="mt-6">
                {effectiveIsOwned || effectiveIsJoined ? (
                    <Link 
                        href={`/members/groups/${group.id}`}
                        className="w-full py-4 bg-gray-50 rounded-2xl font-black text-sm text-gray-900 hover:bg-gray-100 transition-all flex items-center justify-center gap-2 group-hover/card:shadow-lg"
                    >
                        Open Group
                        <ArrowUpRight className="w-4 h-4" />
                    </Link>
                ) : (
                    <button 
                        onClick={handleJoin}
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 rounded-2xl font-black text-sm text-white hover:bg-indigo-700 transition-all shadow-md hover:shadow-xl shadow-indigo-100 hover:shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Plus className="w-4 h-4" />
                                Join Group
                            </>
                        )}
                    </button>
                )}
                {actionError && (
                    <p className="text-red-500 text-[10px] font-black text-center mt-2 uppercase">
                        {actionError}
                    </p>
                )}
            </div>
        </div>
    );
};
