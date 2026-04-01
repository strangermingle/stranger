'use client';

import { useState } from 'react';
import { Send, MessageSquare } from 'lucide-react';

interface EventCommentsProps {
    eventId: string;
    userId?: string;
}

export default function EventComments({ eventId, userId }: EventCommentsProps) {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        if (!userId) return alert('Please login to comment!');

        setIsSubmitting(true);
        // Here you would normally push to the database via Supabase
        // For now, we'll just mock the submission
        console.log('Submitting comment:', comment, 'for event:', eventId);
        
        setTimeout(() => {
            setComment('');
            setIsSubmitting(false);
            alert('Comment submitted! It will appear after moderation.');
        }, 800);
    };

    return (
        <section className="py-12 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-6 h-6 text-gray-900" />
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Comments</h2>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts or ask a question..."
                            className="w-full bg-white border border-gray-200 rounded-2xl p-6 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-sm"
                            rows={3}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting || !comment.trim()}
                            className={`absolute bottom-4 right-4 px-6 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                                comment.trim() && !isSubmitting
                                    ? 'bg-blue-600 text-white hover:bg-black hover:shadow-blue-200'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-200'
                            }`}
                        >
                            <span className="text-sm">Comment</span>
                            <Send size={14} className={isSubmitting ? 'animate-pulse' : ''} />
                        </button>
                    </div>
                    <p className="mt-4 text-xs text-gray-400 font-medium px-2">
                        Your comment will be visible to everyone after a quick safety check.
                    </p>
                </form>
            </div>
        </section>
    );
}
