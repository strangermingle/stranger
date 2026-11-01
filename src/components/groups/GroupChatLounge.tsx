'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
    MessageSquare, Send, Loader2, Lock, 
    Sparkles, User, AlertCircle, RefreshCw
} from 'lucide-react';
import { callRpc } from '@/lib/rpc-client';
import { supabase } from '@/lib/supabaseClient';

interface SenderInfo {
    id: string;
    anonymous_alias: string;
    avatar_url: string | null;
}

interface GroupMessage {
    id: string;
    group_id: string;
    sender_id: string;
    content: string;
    message_type: string;
    media_url?: string | null;
    created_at: string;
    is_self?: boolean;
    sender: SenderInfo;
}

interface GroupChatLoungeProps {
    groupId: string;
    groupName: string;
    isMember: boolean;
    currentUserId: string | null;
    onJoinGroup?: () => Promise<void>;
}

export function GroupChatLounge({
    groupId,
    groupName,
    isMember,
    currentUserId,
    onJoinGroup
}: GroupChatLoungeProps) {
    const [messages, setMessages] = useState<GroupMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [joining, setJoining] = useState(false);
    const [content, setContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pollingTimer = useRef<NodeJS.Timeout | null>(null);

    // Message tone initialization
    useEffect(() => {
        audioRef.current = new Audio('/tone/message-tone.mp3');
    }, []);

    const scrollToBottom = (smooth = true) => {
        messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    // Fetch messages from backend RPC
    const fetchMessages = useCallback(async (isInitial = false) => {
        if (!isMember || !groupId) return;
        if (isInitial) setLoading(true);

        try {
            const result = await callRpc('groupService', 'getGroupMessages', [groupId]);
            if (result && result.success) {
                const incoming: GroupMessage[] = result.messages || [];
                setMessages(prev => {
                    const existingIds = new Set(prev.map(m => m.id));
                    const newIncoming = incoming.filter(m => !existingIds.has(m.id));

                    // Play audio tone if incoming message is from someone else
                    if (!isInitial && newIncoming.length > 0) {
                        const fromOther = newIncoming.some(m => m.sender_id !== currentUserId);
                        if (fromOther) {
                            audioRef.current?.play().catch(() => undefined);
                        }
                    }

                    return incoming;
                });
                setError(null);
            } else if (result && !result.success) {
                setError(result.error || 'Failed to load messages');
            }
        } catch (err: any) {
            console.error('[GroupChatLounge] Error fetching messages:', err);
            if (isInitial) {
                setError(err.message || 'Failed to connect to group chat');
            }
        } finally {
            if (isInitial) {
                setLoading(false);
                setTimeout(() => scrollToBottom(false), 100);
            }
        }
    }, [groupId, isMember, currentUserId]);

    // Initial load + Realtime setup + Polling fallback
    useEffect(() => {
        if (!isMember || !groupId) {
            setMessages([]);
            setLoading(false);
            return;
        }

        fetchMessages(true);

        // Setup Supabase Realtime channel
        const channelName = `group:${groupId}`;
        const channel = supabase.channel(channelName);

        channel
            .on('broadcast', { event: 'refresh' }, (payload: any) => {
                if (payload?.payload?.group_id === groupId) {
                    fetchMessages(false);
                }
            })
            .subscribe();

        channelRef.current = channel;

        // Polling fallback every 10 seconds as a secondary sync alongside Supabase Realtime
        pollingTimer.current = setInterval(() => {
            fetchMessages(false);
        }, 10000);

        return () => {
            if (channelRef.current) {
                supabase.removeChannel(channelRef.current);
                channelRef.current = null;
            }
            if (pollingTimer.current) {
                clearInterval(pollingTimer.current);
                pollingTimer.current = null;
            }
        };
    }, [groupId, isMember, fetchMessages]);

    // Scroll down when new messages arrive
    useEffect(() => {
        scrollToBottom(true);
    }, [messages.length]);

    // Handle sending a message
    const handleSend = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed || sending || !isMember) return;

        setSending(true);
        setError(null);

        try {
            const result = await callRpc('groupService', 'sendGroupMessage', [groupId, trimmed]);
            if (result && result.success) {
                setContent('');
                const newMsg: GroupMessage = result.message;
                setMessages(prev => {
                    if (prev.some(m => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
                setTimeout(() => scrollToBottom(true), 50);
            } else {
                setError(result?.error || 'Failed to send message');
            }
        } catch (err: any) {
            console.error('[GroupChatLounge] Send error:', err);
            setError(err.message || 'Error sending message');
        } finally {
            setSending(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleJoinClick = async () => {
        if (!onJoinGroup || joining) return;
        setJoining(true);
        try {
            await onJoinGroup();
        } catch (err: any) {
            console.error('[GroupChatLounge] Join error:', err);
        } finally {
            setJoining(false);
        }
    };

    // If user is NOT a member: Render locked preview card
    if (!isMember) {
        return (
            <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl shadow-indigo-100/50 border border-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 rounded-full blur-3xl -z-10" />
                <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Lock className="w-10 h-10" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200/60 rounded-full text-[11px] font-black uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Members Only Lounge
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
                    {groupName} Group Chat
                </h2>
                <p className="text-gray-500 font-medium max-w-md mx-auto mb-8 text-base leading-relaxed">
                    This encrypted chat lounge is exclusive to members of this local community. Join now to start chatting, planning meetups, and sharing with fellow verified members.
                </p>
                {onJoinGroup && (
                    <button
                        onClick={handleJoinClick}
                        disabled={joining}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-200 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                    >
                        {joining ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Joining Community...
                            </>
                        ) : (
                            <>
                                <MessageSquare className="w-4 h-4" />
                                Join Group to Enter Chat
                            </>
                        )}
                    </button>
                )}
            </div>
        );
    }

    // Active Member Chat View
    return (
        <div className="bg-white rounded-[3rem] shadow-xl shadow-indigo-100/50 border border-white overflow-hidden flex flex-col h-[640px]">
            {/* Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-indigo-50/30 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200">
                        <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-black text-gray-900 text-base leading-tight">
                            {groupName} Lounge Chat
                        </h3>
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span>Active local community</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => fetchMessages(false)}
                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-white rounded-xl transition-all"
                    title="Refresh messages"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="px-6 py-2 bg-red-50 text-red-600 text-xs font-bold flex items-center gap-2 border-b border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F9FAFB]/40">
                {loading ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                        <span className="text-xs font-bold uppercase tracking-wider">Connecting to lounge...</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
                        <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h4 className="font-black text-gray-900 text-lg mb-1">Welcome to the Group Lounge!</h4>
                        <p className="text-xs font-medium text-gray-500 max-w-xs">
                            Be the first to say hello, ask a question, or coordinate a meetup with your fellow members.
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isSelf = msg.is_self || msg.sender_id === currentUserId;
                        const formattedTime = new Date(msg.created_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        });

                        return (
                            <div 
                                key={msg.id} 
                                className={`flex items-end gap-2.5 ${isSelf ? 'justify-end' : 'justify-start'}`}
                            >
                                {!isSelf && (
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xs font-black shrink-0 overflow-hidden shadow-sm">
                                        {msg.sender?.avatar_url ? (
                                            <img src={msg.sender.avatar_url} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            (msg.sender?.anonymous_alias || 'S').charAt(0).toUpperCase()
                                        )}
                                    </div>
                                )}

                                <div className={`max-w-[78%] flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                                    <div className="flex items-center gap-1.5 mb-1 px-1">
                                        <span className="text-[11px] font-bold text-gray-500">
                                            {isSelf ? 'You' : (msg.sender?.anonymous_alias || 'Member')}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium">
                                            {formattedTime}
                                        </span>
                                    </div>
                                    <div 
                                        className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                                            isSelf 
                                                ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-sm shadow-md shadow-indigo-100' 
                                                : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100 shadow-sm'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200/80 focus-within:border-indigo-500 focus-within:bg-white transition-all">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Message #${groupName}...`}
                        disabled={sending}
                        maxLength={2000}
                        className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 placeholder:text-gray-400 py-1"
                    />
                    <button
                        type="submit"
                        disabled={!content.trim() || sending}
                        className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-100 shrink-0"
                    >
                        {sending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

