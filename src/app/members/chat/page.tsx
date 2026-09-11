'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { 
    MessageSquare, Send, Ghost, Loader2, Undo, 
    Search, Plus, MoreVertical, CheckCheck, 
    Check, X, User as UserIcon, Shield, ChevronLeft as ArrowLeft,
    ShieldAlert, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { callRpc } from '@/lib/rpc-client';
import { supabase } from '@/lib/supabaseClient';
import { submitReportApi } from '@/lib/callService';
import { getDeviceFingerprint } from '@/lib/deviceFingerprint';

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
    
    // Harassment / Misconduct Reporting State
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('verbal_harassment');
    const [reportDetails, setReportDetails] = useState('');
    const [isSubmittingReport, setIsSubmittingReport] = useState(false);
    const [reportSubmitted, setReportSubmitted] = useState(false);

    const handleSubmitReport = async (e: React.FormEvent) => {
        e.preventDefault();
        const reporterId = mappedUserId || user?.uid;
        if (!activeConversation || !reporterId) {
            alert('Unable to identify user session. Please re-login.');
            return;
        }
        setIsSubmittingReport(true);
        try {
            const dfp = getDeviceFingerprint();
            await submitReportApi({
                reporterId,
                reportedId: activeConversation.other_participant.id,
                reportedType: 'user',
                reason: reportReason,
                details: reportDetails,
                conversationId: activeConversation.id,
                deviceFingerprint: dfp,
            });
            setReportSubmitted(true);
        } catch (err: any) {
            alert(err.message || 'Failed to submit report. Please try again.');
        } finally {
            setIsSubmittingReport(false);
        }
    };
    
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
        <div className="min-h-screen bg-black text-white pt-20 sm:pt-24 pb-8 px-3 sm:px-6 font-sans antialiased">
            <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col md:flex-row gap-4 relative">
                
                {/* 1. Conversations Sidebar */}
                <div className={`w-full md:w-80 flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl ${activeConversation ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-3.5 border-b border-zinc-850 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Link 
                                href="/members" 
                                className="p-1.5 hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-white transition-colors border border-zinc-800"
                                title="Back to Dashboard"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </Link>
                            <div>
                                <h1 className="text-sm font-medium text-white tracking-tight">Anonymous Chat</h1>
                                <p className="text-[10px] text-zinc-400 font-light">1-on-1 private messaging</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsSearching(!isSearching)}
                            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all border border-zinc-800 text-zinc-300"
                            title={isSearching ? 'Close search' : 'New chat'}
                        >
                            {isSearching ? <X className="w-4 h-4 text-rose-400" /> : <Plus className="w-4 h-4 text-emerald-400" />}
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                        {isSearching ? (
                            <div className="space-y-2 p-1">
                                <div className="relative mb-2">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                                    <input 
                                        type="text" 
                                        placeholder="Search members by name..." 
                                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-light"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="text-[10px] text-zinc-500 font-light uppercase tracking-wider px-1">Available Members</div>
                                {availableMembers
                                    .filter(m => m.anonymous_alias.toLowerCase().includes(searchQuery.toLowerCase()))
                                    .map(member => (
                                    <button 
                                        key={member.id}
                                        onClick={() => handleStartChat(member.id)}
                                        className="w-full flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-zinc-900 transition-all text-left border border-transparent hover:border-zinc-800 group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center shrink-0">
                                            <UserIcon className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-xs font-medium text-white truncate">{member.anonymous_alias}</div>
                                            <div className="text-[10px] text-emerald-400 font-light">Verified Member</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : conversations.length > 0 ? (
                            conversations.map(conv => (
                                <button 
                                    key={conv.id}
                                    onClick={() => setActiveConversation(conv)}
                                    className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl transition-all text-left border ${
                                        activeConversation?.id === conv.id 
                                        ? 'bg-zinc-900 border-zinc-700 text-white' 
                                        : 'bg-transparent border-transparent hover:bg-zinc-900/60 text-zinc-300'
                                    } group`}
                                >
                                    <div className="w-9 h-9 rounded-xl bg-zinc-850 border border-zinc-800 flex items-center justify-center text-zinc-400 shrink-0">
                                        <Ghost className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-0.5">
                                            <div className="text-xs font-medium text-white truncate pr-1">{conv.other_participant.anonymous_alias}</div>
                                            <div className="text-[9px] text-zinc-500 font-light shrink-0">
                                                {conv.last_message_at ? new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                            </div>
                                        </div>
                                        <div className="text-[11px] text-zinc-400 truncate font-light">
                                            {conv.last_message_preview || 'Start chat...'}
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                                <MessageSquare className="w-8 h-8 mb-2 opacity-50" />
                                <p className="text-xs font-light">No chats yet</p>
                                <button 
                                    onClick={() => setIsSearching(true)}
                                    className="mt-2 text-xs text-blue-400 hover:underline font-normal"
                                >
                                    + Start a new chat
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Chat Area */}
                <div className={`flex-1 flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl relative ${!activeConversation ? 'hidden md:flex' : 'flex'}`}>
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="px-4 py-3 bg-zinc-900/70 border-b border-zinc-850 flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <button 
                                        onClick={() => setActiveConversation(null)}
                                        className="p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all border border-zinc-700 md:hidden"
                                    >
                                        <ArrowLeft className="w-4 h-4 text-blue-400" />
                                    </button>
                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center border border-zinc-700 text-emerald-400">
                                        <Ghost className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-xs sm:text-sm font-medium text-white">{activeConversation.other_participant.anonymous_alias}</h2>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            <span className="text-[10px] text-zinc-400 font-light">Online • Private Chat</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => {
                                            setShowReportModal(true);
                                            setReportSubmitted(false);
                                            setReportDetails('');
                                        }}
                                        className="flex items-center gap-1 px-2.5 py-1 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-lg transition-all border border-rose-800/60 text-[11px] font-normal"
                                        title="Report member"
                                    >
                                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                                        <span>Report</span>
                                    </button>
                                </div>
                            </div>

                            {/* Messages List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                                {isLoadingMessages ? (
                                    <div className="h-full flex items-center justify-center">
                                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                                    </div>
                                ) : messages.length > 0 ? (
                                    messages.map((msg, i) => {
                                        const isMine = msg.sender_id === mappedUserId;
                                        return (
                                            <div 
                                                key={msg.id} 
                                                className={`flex flex-col ${isMine ? 'items-end' : 'items-start'} group`}
                                            >
                                                <div className={`max-w-[85%] sm:max-w-[70%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-light leading-relaxed ${
                                                    isMine 
                                                    ? 'bg-blue-600 text-white rounded-br-xs' 
                                                    : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-xs'
                                                }`}>
                                                    {msg.content}
                                                </div>
                                                <div className="mt-1 flex items-center gap-1 text-[9px] text-zinc-500">
                                                    <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    {isMine && <Check className="w-2.5 h-2.5 text-zinc-400" />}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                                        <p className="text-xs font-light">No messages yet.</p>
                                        <p className="text-[11px] text-zinc-500 mt-0.5">Say hello to start the conversation!</p>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Chat Input Bar */}
                            <div className="p-3 bg-zinc-900/50 border-t border-zinc-850">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Type a message..." 
                                        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 font-light"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        disabled={isSending}
                                    />
                                    <button 
                                        type="submit"
                                        disabled={!newMessage.trim() || isSending}
                                        className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
                                    >
                                        {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
                            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center mb-4">
                                <Ghost className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h2 className="text-sm font-medium text-white mb-1">Select a Conversation</h2>
                            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed font-light">
                                Chat privately with verified members. Your real name and phone number are never shared.
                            </p>
                            <button 
                                onClick={() => setIsSearching(true)}
                                className="mt-4 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-normal transition-all text-blue-400"
                            >
                                Browse Members
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Harassment / Misconduct Reporting Modal */}
            {showReportModal && activeConversation && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 text-white">
                    <div className="bg-zinc-950 text-white rounded-3xl w-full max-w-sm border border-zinc-800 p-5 space-y-3 shadow-2xl relative">
                        <button
                            onClick={() => setShowReportModal(false)}
                            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-200 rounded-full hover:bg-zinc-900 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {reportSubmitted ? (
                            <div className="text-center py-6 space-y-3">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-base font-normal text-white">
                                    Report Sent
                                </h3>
                                <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                                    Thank you. Our team will review this chat and take strict action against this user.
                                </p>
                                <div className="pt-2 flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => setShowReportModal(false)}
                                        className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 hover:bg-zinc-700 text-xs font-normal transition-colors"
                                    >
                                        Back to Chat
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowReportModal(false);
                                            setActiveConversation(null);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30 text-xs font-normal transition-colors"
                                    >
                                        Leave Chat
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitReport} className="space-y-3">
                                <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                                    <ShieldAlert className="w-4 h-4" />
                                    <span>Report {activeConversation.other_participant.anonymous_alias}</span>
                                </div>

                                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                                    We do not allow bad language, threats, asking for money, or personal numbers.
                                </p>

                                <div>
                                    <label className="text-[11px] text-zinc-400 font-light block mb-2">
                                        Why are you reporting this member?
                                    </label>
                                    <div className="space-y-1.5">
                                        {[
                                            { value: 'demanding_contact', label: 'Asking for WhatsApp, phone, or money' },
                                            { value: 'verbal_harassment', label: 'Rude or abusive messages' },
                                            { value: 'sexual_inappropriate', label: 'Inappropriate or sexual remarks' },
                                            { value: 'spam_commercial', label: 'Spam or advertising' },
                                            { value: 'other', label: 'Other problem' },
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setReportReason(opt.value)}
                                                className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                                                    reportReason === opt.value
                                                        ? 'border-red-500/60 bg-red-950/40 text-red-200'
                                                        : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-850'
                                                }`}
                                            >
                                                <span>{opt.label}</span>
                                                <span
                                                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                                        reportReason === opt.value
                                                            ? 'border-red-500 bg-red-500'
                                                            : 'border-zinc-700'
                                                    }`}
                                                >
                                                    {reportReason === opt.value && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                    )}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[11px] text-zinc-400 font-light block mb-1">
                                        Tell us more (optional)
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={reportDetails}
                                        onChange={(e) => setReportDetails(e.target.value)}
                                        placeholder="What happened in this chat..."
                                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/80 resize-none"
                                    />
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowReportModal(false)}
                                        className="flex-1 py-2.5 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-300 text-xs font-light transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmittingReport}
                                        className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-normal transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/20 active:scale-95 disabled:opacity-50"
                                    >
                                        {isSubmittingReport ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Send Report'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

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
