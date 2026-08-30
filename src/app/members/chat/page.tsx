'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { 
    MessageSquare, Send, Ghost, Loader2, Undo, 
    Search, Plus, MoreVertical, CheckCheck, 
    Check, X, User as UserIcon, Shield, ChevronLeft as ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { callRpc } from '@/lib/rpc-client';
import { supabase } from '@/lib/supabaseClient';

interface Conversation {
    id: string;
    last_message_at: string;
    last_message_preview: string;
    other_participant: {
        id: string;
        anonymous_alias: string;
        avatar_url: string | null;
    };
    is_muted: boolean;
    is_blocked: boolean;
}

interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    created_at: string;
    is_read: boolean;
}

interface Member {
    id: string;
    anonymous_alias: string;
    avatar_url: string | null;
}

export default function ChatPage() {
    const { user, mappedUserId, loading: authLoading, isMemberVerified } = useAuth();
    const router = useRouter();
    
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [availableMembers, setAvailableMembers] = useState<Member[]>([]);
    
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoadingConv, setIsLoadingConv] = useState(true);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isSending, setIsSending] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const pollingInterval = useRef<NodeJS.Timeout | null>(null);
    const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initial Load: Create Audio Instance
    useEffect(() => {
        audioRef.current = new Audio('/tone/message-tone.mp3');
    }, []);

    // 1. Initial Load: Fetch Conversations and Available Members
    useEffect(() => {
        if (!authLoading && (!user || !isMemberVerified)) {
            router.push('/members');
            return;
        }

        if (user && mappedUserId && isMemberVerified) {
            fetchConversations();
            fetchAvailableMembers();
        }
    }, [user, mappedUserId, authLoading, isMemberVerified, router]);

    // 2. Fetch Conversations
    async function fetchConversations() {
        try {
            const result = await callRpc('chatService', 'getConversations', []);
            const convs = result || [];
            setConversations(convs);
            return convs;
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            return [];
        } finally {
            setIsLoadingConv(false);
        }
    }

    // 3. Fetch Available Members for New Chat
    async function fetchAvailableMembers() {
        try {
            const result = await callRpc('chatService', 'getAvailableMembers', []);
            setAvailableMembers(result || []);
        } catch (error) {
            console.error('Failed to fetch members:', error);
        }
    }

    const cleanupRealtime = useCallback(() => {
        if (pollingInterval.current) {
            clearInterval(pollingInterval.current);
            pollingInterval.current = null;
        }
        if (channelRef.current) {
            supabase.removeChannel(channelRef.current);
            channelRef.current = null;
        }
    }, []);

    const refreshMessages = useCallback(async (convId: string) => {
        try {
            const result = await callRpc('chatService', 'getMessages', [convId]);
            setMessages((prev) => {
                const existingIds = new Set(prev.map((m) => m.id));
                const newMsgs = (result || []).filter((m: Message) => !existingIds.has(m.id));

                if (newMsgs.length === 0) return prev;

                const hasIncoming = newMsgs.some((m: Message) => m.sender_id !== mappedUserId);
                if (hasIncoming) {
                    audioRef.current?.play().catch(() => undefined);
                }

                return [...prev, ...newMsgs];
            });
        } catch {
            // Silently fail polling / broadcast refresh
        }
    }, [mappedUserId]);

    // 4. Load messages + realtime when conversation changes (with proper cleanup)
    useEffect(() => {
        if (!activeConversation?.id || !mappedUserId) {
            setMessages([]);
            cleanupRealtime();
            return;
        }

        const convId = activeConversation.id;
        let cancelled = false;

        async function loadConversation() {
            cleanupRealtime();

            setIsLoadingMessages(true);
            try {
                const result = await callRpc('chatService', 'getMessages', [convId]);
                if (!cancelled) setMessages(result || []);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                if (!cancelled) setIsLoadingMessages(false);
            }

            if (cancelled) return;

            console.log('Setting up secure realtime for conversation:', convId);

            const channel = supabase
                .channel(`conversation:${convId}`)
                .on('broadcast', { event: 'refresh' }, (payload) => {
                    if (payload.payload?.sender_id !== mappedUserId) {
                        refreshMessages(convId);
                    }
                })
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'messages',
                        filter: `conversation_id=eq.${convId}`,
                    },
                    (payload) => {
                        const msg = payload.new as Message;
                        setMessages((prev) => {
                            if (prev.find((m) => m.id === msg.id)) return prev;
                            if (msg.sender_id !== mappedUserId) {
                                audioRef.current?.play().catch(() => undefined);
                            }
                            return [...prev, msg];
                        });
                    }
                )
                .subscribe();

            channelRef.current = channel;

            pollingInterval.current = setInterval(() => {
                refreshMessages(convId);
            }, 60000);
        }

        loadConversation();

        return () => {
            cancelled = true;
            cleanupRealtime();
        };
    }, [activeConversation?.id, mappedUserId, cleanupRealtime, refreshMessages]);

    // 4b. Auto-scroll on Messages Change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 6. Send Message
    async function handleSendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!newMessage.trim() || !activeConversation || isSending) return;

        setIsSending(true);
        const text = newMessage;
        setNewMessage('');

        try {
            const result = await callRpc('chatService', 'sendMessage', [activeConversation.id, text]);
            // Optimistically or already handled by refresh
            setMessages(prev => [...prev, result]);
            scrollToBottom();
            fetchConversations(); // Update preview in list
        } catch (error) {
            console.error('Failed to send message:', error);
            setNewMessage(text); // Restore text on failure
        } finally {
            setIsSending(false);
        }
    }

    // 7. Start New Conversation
    async function handleStartChat(targetUserId: string) {
        try {
            const convId = await callRpc('chatService', 'startConversation', [targetUserId]);
            setIsSearching(false);
            const freshConvs = await fetchConversations();
            // Find the conversation object to set as active
            const conv = freshConvs.find((c: Conversation) => c.id === convId);
            if (conv) {
                setActiveConversation(conv);
            } else {
                // If it's a brand new conv, we might need a dummy object until refresh
                const member = availableMembers.find(m => m.id === targetUserId);
                if (member) {
                    setActiveConversation({
                        id: convId,
                        last_message_at: new Date().toISOString(),
                        last_message_preview: '',
                        other_participant: member,
                        is_muted: false,
                        is_blocked: false
                    });
                }
            }
        } catch (error) {
            console.error('Failed to start chat:', error);
        }
    }

    function scrollToBottom() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    if (authLoading || isLoadingConv) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-bold">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    <p className="text-white font-bold uppercase tracking-widest text-xs">Initializing Safe Chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-8 px-4 font-sans antialiased">
            <div className="max-w-7xl mx-auto h-[calc(100vh-160px)] flex flex-col md:flex-row gap-6 relative">
                
                {/* 1. Conversations Sidebar */}
                <div className={`w-full md:w-96 flex flex-col bg-white/[0.03] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl text-green-600 font-bold uppercase tracking-wide">Stranger Mingle</h1>
                            <p className="text-[10px] text-yellow-400 font-bold uppercase tracking-wide">Anonymous Member Chat</p>
                        </div>
                        <button 
                            onClick={() => setIsSearching(!isSearching)}
                            className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5"
                        >
                            {isSearching ? <X className="w-5 h-5 text-green-600" /> : <Plus className="w-5 h-5 text-white" />}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 custom-scrollbar">
                        {isSearching ? (
                            <div className="space-y-4">
                                <div className="relative mb-4">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input 
                                        type="text" 
                                        placeholder="Search member..." 
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-blue-500/50"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-2 mb-2">Available Members</div>
                                {availableMembers
                                    .filter(m => m.anonymous_alias.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(member => (
                                    <button 
                                        key={member.id}
                                        onClick={() => handleStartChat(member.id)}
                                        className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-white/5 transition-all text-left border border-transparent hover:border-white/5 group"
                                    >
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 p-[2px]">
                                            <div className="w-full h-full bg-regular rounded-[calc(1rem-2px)] flex items-center justify-center">
                                                <UserIcon className="w-6 h-6 text-blue-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm tracking-wide group-hover:text-blue-400 transition-colors">{member.anonymous_alias}</div>
                                            <div className="text-[10px] text-green-500 font-regular uppercase tracking-wide">Verified Member</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : conversations.length > 0 ? (
                            conversations.map(conv => (
                                <button 
                                    key={conv.id}
                                    onClick={() => setActiveConversation(conv)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all text-left border ${
                                        activeConversation?.id === conv.id 
                                        ? 'bg-blue-500/10 border-blue-500/30' 
                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                    } group relative overflow-hidden`}
                                >
                                    {activeConversation?.id === conv.id && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                                    )}
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform">
                                        <Ghost className="w-8 h-8 text-green-300 opacity-90" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="font-regular text-sm tracking-wide text-white truncate pr-2">{conv.other_participant.anonymous_alias}</div>
                                            <div className="text-[9px] text-gray-500 font-bold uppercase shrink-0">
                                                {conv.last_message_at ? new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500 truncate font-medium">
                                            {conv.last_message_preview || 'Start a conversation...'}
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                                <MessageSquare className="w-12 h-12 mb-4" />
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">No conversations yet</p>
                                <button 
                                    onClick={() => setIsSearching(true)}
                                    className="mt-4 text-xs text-blue-400 font-black hover:underline"
                                >
                                    START YOUR FIRST EXPLORATION
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Chat Area */}
                <div className={`flex-1 flex flex-col bg-white/[0.03] border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-3xl shadow-2xl relative ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-6 bg-black/40 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => setActiveConversation(null)}
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 md:hidden"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-blue-400" />
                                    </button>
                                    <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/20 items-center justify-center border border-white/10 text-green-400">
                                        <Ghost className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold tracking-wide">{activeConversation.other_participant.anonymous_alias}</h2>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] text-gray-500 font-regular uppercase tracking-widest">Active Stealth Channel</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-3 hover:bg-white/5 rounded-2xl transition-colors border border-transparent hover:border-white/10">
                                        <Shield className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                                {isLoadingMessages ? (
                                    <div className="h-full flex items-center justify-center">
                                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                                    </div>
                                ) : messages.length > 0 ? (
                                    messages.map((msg, i) => {
                                        const isMine = msg.sender_id === mappedUserId;
                                        return (
                                            <div 
                                                key={msg.id} 
                                                className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} group`}
                                            >
                                                <div className={`max-w-[80%] md:max-w-[60%] px-6 py-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                                                    isMine 
                                                    ? 'bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-600/10' 
                                                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-tl-none'
                                                }`}>
                                                    {msg.content}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <span className="text-[9px] text-gray-600 font-bold uppercase tabular-nums">
                                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    {isMine && (
                                                        msg.is_read ? <CheckCheck className="w-3 h-3 text-blue-500" /> : <Check className="w-3 h-3 text-gray-600" />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center opacity-90 gap-4">
                                        <div className="w-20 h-20 rounded-full border border-dashed border-white/30 flex items-center justify-center">
                                            <Ghost className="w-10 h-10 text-green-300" />
                                        </div>
                                        <p className="text-xs font-regular uppercase tracking-widest text-white">Secure connection established.<br/>Messages are encrypted.</p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Message Input */}
                            <div className="p-6 bg-black/40 border-t border-white/5">
                                <form onSubmit={handleSendMessage} className="flex gap-4">
                                    <div className="flex-1 relative group">
                                        <input 
                                            type="text" 
                                            placeholder="Text here..." 
                                            className="w-full bg-white/5 border border-white/30 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium text-sm pr-12"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            disabled={isSending}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-90 group-focus-within:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={!newMessage.trim() || isSending}
                                        className="px-4 bg-green-600 hover:bg-blue-500 text-white rounded-2xl transition-all active:scale-95 shadow-2xl shadow-blue-500/30 disabled:opacity-50 disabled:grayscale flex items-center justify-center"
                                    >
                                        {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-8 relative">
                                <Ghost className="w-16 h-16 text-blue-500/50" />
                                <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-widest mb-4">Select a Stranger</h2>
                            <p className="text-gray-500 max-w-sm text-sm font-medium leading-relaxed">
                                Join a private 1-on-1 stealth channel with other verified members. 
                                Your real details are never exposed. Only your anonymous alias is shared.
                            </p>
                            <button 
                                onClick={() => setIsSearching(true)}
                                className="mt-10 px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:border-blue-500/30 text-blue-400"
                            >
                                Explorer Members Directory
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}
