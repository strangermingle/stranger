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
        <div className="bg-white rounded-2xl p-4 border border-gray-200/80 hover:border-gray-300 hover:shadow-sm transition-all group/card flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                        {group.image_url ? (
                            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gray-100 shadow-xs shrink-0">
                                <img src={group.image_url} alt={group.name} className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-11 h-11 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 font-medium text-sm shrink-0">
                                {group.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 group-hover/card:text-indigo-600 transition-colors truncate">
                                {group.name}
                            </h3>
                            {group.category && (
                                <span 
                                    className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-light rounded-md border"
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

                    <div className="flex items-center gap-1.5 shrink-0">
                        {effectiveIsOwned && (
                            <Settings className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors" />
                        )}
                        {effectiveIsOwned ? (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-light rounded-md border border-amber-200/70">
                                Owner
                            </span>
                        ) : effectiveIsJoined ? (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-light rounded-md border border-emerald-200/70">
                                Member
                            </span>
                        ) : null}
                    </div>
                </div>

                <p className="text-gray-500 font-light text-xs line-clamp-2 min-h-[2rem]">
                    {group.description || 'A friendly local group.'}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 font-light">
                    <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-emerald-500" />
                        <span>
                            {group.members_count?.[0]?.count || 0} members
                        </span>
                    </div>
                    
                    {group.location && (
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-blue-500" />
                            <span>
                                {group.location.city}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-purple-500" />
                        <span>
                            by {group.owner?.username || 'Member'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {effectiveIsOwned || effectiveIsJoined ? (
                    <Link 
                        href={`/members/groups/${group.id}`}
                        className="w-full py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-normal text-gray-800 transition-all flex items-center justify-center gap-1.5 border border-gray-200/70"
                    >
                        <span>Open Group</span>
                        <ArrowUpRight className="w-3 h-3 text-gray-500" />
                    </Link>
                ) : (
                    <button 
                        onClick={handleJoin}
                        disabled={loading}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-normal text-white transition-all shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                            <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Join Group</span>
                            </>
                        )}
                    </button>
                )}
                {actionError && (
                    <p className="text-rose-500 text-[11px] font-light text-center mt-1.5">
                        {actionError}
                    </p>
                )}
            </div>
        </div>
    );
};
