'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Send, MessageSquare, CornerDownRight, ThumbsUp, Trash2, Pin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface DiscussionMessage {
    id: string;
    event_id: string;
    user_id: string;
    parent_id: string | null;
    message: string;
    is_anonymous: boolean;
    is_pinned: boolean;
    is_host_reply: boolean;
    like_count: number;
    created_at: string;
    user?: {
        username: string;
        avatar_url: string | null;
    };
    replies?: DiscussionMessage[];
}

interface EventDiscussionsProps {
    eventId: string;
    userId?: string;
}

export default function EventDiscussions({ eventId, userId }: EventDiscussionsProps) {
    const [messages, setMessages] = useState<DiscussionMessage[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyTo, setReplyTo] = useState<DiscussionMessage | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchMessages = useCallback(async () => {
        try {
            // Fetch messages with user details
            const { data, error } = await supabase
                .from('event_discussions')
                .select(`
                    *,
                    user:users!event_discussions_user_id_fkey(username, avatar_url)
                `)
                .eq('event_id', eventId)
                .is('is_deleted', false)
                .order('is_pinned', { ascending: false })
                .order('created_at', { ascending: true });

            if (error) throw error;

            // Organize into tree (parents and children)
            const messageMap: Record<string, DiscussionMessage> = {};
            const roots: DiscussionMessage[] = [];

            (data || []).forEach((msg) => {
                const message = { ...msg, replies: [] } as DiscussionMessage;
                messageMap[msg.id] = message;
                if (!msg.parent_id) {
                    roots.push(message);
                } else if (msg.parent_id && messageMap[msg.parent_id]) {
                    messageMap[msg.parent_id].replies?.push(message);
                }
            });

            setMessages(roots);
        } catch (error) {
            console.error('Error fetching discussions:', error);
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    useEffect(() => {
        fetchMessages();
        
        // Subscribe to real-time updates
        const channel = supabase
            .channel(`event_discussions:${eventId}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'event_discussions',
                    filter: `event_id=eq.${eventId}`
                },
                () => fetchMessages()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [eventId, fetchMessages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !newMessage.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const { error } = await supabase
                .from('event_discussions')
                .insert({
                    event_id: eventId,
                    user_id: userId,
                    parent_id: replyTo?.id || null,
                    message: newMessage.trim(),
                    is_host_reply: false // Logic for host check can be added
                });

            if (error) throw error;
            setNewMessage('');
            setReplyTo(null);
            fetchMessages();
        } catch (error) {
            console.error('Error posting message:', error);
            alert('Failed to post message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (messageId: string) => {
        if (!userId) return;
        // In a real app, check if already liked (discussion_likes table)
        try {
            await supabase.rpc('increment_discussion_like', { msg_id: messageId });
            // If RPC doesn't exist, we'd do a select/update or just insert into discussion_likes
            // For now, let's assume we use discussion_likes
            await supabase.from('discussion_likes').insert({ discussion_id: messageId, user_id: userId });
            fetchMessages();
        } catch (error) {
            console.error('Error liking message:', error);
        }
    };

    const handleDelete = async (messageId: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;
        try {
            const { error } = await supabase
                .from('event_discussions')
                .update({ is_deleted: true, deleted_by: userId })
                .eq('id', messageId);
            if (error) throw error;
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-20 bg-gray-100 rounded-3xl"></div>
            </div>
        );
    }

    return (
        <section id="discussions" className="scroll-mt-32">
            <div className="flex items-center gap-6 mb-8">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">Event Wall</h2>
                <div className="h-0.5 flex-1 bg-gray-100" />
                <div className="px-5 py-2 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                    {messages.length} Messages
                </div>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 p-8 md:p-12 shadow-2xl shadow-gray-100/50">
                {/* Message Input */}
                {userId ? (
                    <div className="mb-2">
                        {replyTo && (
                            <div className="flex justify-between items-center bg-blue-50/50 px-6 py-3 rounded-2xl mb-4 text-xs font-bold text-blue-600 border border-blue-100">
                                <span className="flex items-center gap-2">
                                    <CornerDownRight className="w-4 h-4" />
                                    Replying to @{replyTo.user?.username || 'user'}
                                </span>
                                <button onClick={() => setReplyTo(null)} className="hover:text-blue-800 uppercase tracking-widest text-[10px]">Cancel</button>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="relative">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Share something about the event..."
                                className="w-full bg-gray-50 border-none rounded-[2rem] p-6 pr-20 text-sm font-medium focus:ring-2 focus:ring-blue-600/20 transition-all min-h-[120px] resize-none"
                            />
                            <button
                                type="submit"
                                disabled={!newMessage.trim() || isSubmitting}
                                className="absolute bottom-4 right-4 bg-gray-900 text-white p-4 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-gray-50 p-8 rounded-[2rem] text-center mb-2 border border-dashed border-gray-200">
                        <p className="text-gray-400 font-bold uppercase tracking-[0.1em] text-xs mb-4">You must be logged in to participate</p>
                        <Link href="/login" className="px-8 py-3 bg-gray-900 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all hover:bg-black shadow-xl inline-block">Login Now</Link>
                    </div>
                )}

                {/* Messages List */}
                <div className="space-y-10">
                    {messages.length === 0 ? (
                        <div className="py-10 text-center">
                            <MessageSquare className="w-12 h-12 text-gray-100 mx-auto mb-4 opacity-50" />
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <MessageItem 
                                key={msg.id} 
                                msg={msg} 
                                userId={userId} 
                                onReply={(m) => {
                                    setReplyTo(m);
                                    window.scrollTo({ top: document.querySelector('form')?.offsetTop ? (document.querySelector('form')!.offsetTop - 200) : 0, behavior: 'smooth' });
                                }}
                                onLike={handleLike}
                                onDelete={handleDelete}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

function MessageItem({ msg, userId, onReply, onLike, onDelete, isReply = false }: { 
    msg: DiscussionMessage; 
    userId?: string; 
    onReply: (m: DiscussionMessage) => void;
    onLike: (id: string) => void;
    onDelete: (id: string) => void;
    isReply?: boolean;
}) {
    return (
        <div className={`group ${isReply ? 'ml-12 md:ml-20 mt-6' : ''}`}>
            <div className="flex gap-4 md:gap-6">
                <div className="shrink-0">
                    <div className="relative w-10 md:w-12 h-10 md:h-12 rounded-2xl overflow-hidden bg-gray-100 ring-2 ring-white shadow-xl">
                        {msg.user?.avatar_url ? (
                            <Image sizes="(max-width: 768px) 40px, 48px" src={msg.user.avatar_url} alt={msg.user.username} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-200 to-gray-300 text-gray-400 font-black text-xs">
                                {msg.user?.username?.[0] || '?'}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <span className="font-black text-gray-900 text-sm tracking-tight uppercase">
                            {msg.is_anonymous ? 'Member' : (msg.user?.username || 'Stranger')}
                        </span>
                        {msg.is_host_reply && (
                            <span className="bg-blue-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">Host</span>
                        )}
                        {msg.is_pinned && (
                            <Pin className="w-3 h-3 text-orange-500 fill-orange-500" />
                        )}
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">
                            {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                    </div>
                    <div className={`${msg.is_host_reply ? 'bg-blue-50/50 p-5 rounded-tr-[2rem] rounded-bl-[2rem] rounded-br-[2rem] border border-blue-100' : 'bg-transparent'} text-gray-700 text-sm font-medium leading-relaxed mb-4`}>
                        {msg.message}
                    </div>
                    
                    {/* Action Bar */}
                    <div className="flex items-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => onLike(msg.id)}
                            className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
                        >
                            <ThumbsUp className="w-3 h-3" />
                            {msg.like_count > 0 && msg.like_count} Like
                        </button>
                        {!isReply && (
                            <button 
                                onClick={() => onReply(msg)}
                                className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-[0.2em]"
                            >
                                <MessageSquare className="w-3 h-3" />
                                Reply
                            </button>
                        )}
                        {userId === msg.user_id && (
                            <button 
                                onClick={() => onDelete(msg.id)}
                                className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-[0.2em]"
                            >
                                <Trash2 className="w-3 h-3" />
                                Delete
                            </button>
                        )}
                    </div>

                    {/* Replies */}
                    {msg.replies && msg.replies.length > 0 && (
                        <div className="mt-4 border-l-2 border-gray-50">
                            {msg.replies.map((reply) => (
                                <MessageItem 
                                    key={reply.id} 
                                    msg={reply} 
                                    userId={userId} 
                                    onReply={onReply}
                                    onLike={onLike}
                                    onDelete={onDelete}
                                    isReply={true} 
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
