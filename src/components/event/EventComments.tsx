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
        <section className="py-2 border-t border-gray-200">
            <div className="text-center items-center gap-1 mb-1">
                <h2 className="text-lg font-medium text-gray-900">Comments</h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-2 border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Login to comment"
                        className="flex-1 bg-transparent border-none px-3 py-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting || !comment.trim()}
                        className={`px-6 py-3 rounded-full font-bold flex items-center gap-2 transition-all shrink-0 active:scale-95 ${
                            comment.trim() && !isSubmitting
                                ? 'bg-blue-600 text-white hover:bg-black hover:shadow-md'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <span className="text-sm hidden sm:inline">Comment</span>
                        <Send size={14} className={isSubmitting ? 'animate-pulse' : ''} />
                    </button>
                </form>
            </div>
        </section>
    );
}
