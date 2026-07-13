'use client';

import { useState } from 'react';
import { joinEventWaitlist } from '@/lib/eventInteractions';
import { CheckCircle, Loader2, UserPlus } from 'lucide-react';

interface EventWaitlistProps {
    eventId: string;
    userId?: string;
    isSoldOut: boolean;
}

export default function EventWaitlist({ eventId, userId, isSoldOut }: EventWaitlistProps) {
    const [isJoining, setIsJoining] = useState(false);
    const [isJoined, setIsJoined] = useState(false);
    const [message, setMessage] = useState('');

    const handleJoinWaitlist = async () => {
        if (!userId) {
            alert('Please login to join the waitlist.');
            return;
        }

        setIsJoining(true);
        try {
            const res = await joinEventWaitlist(eventId);
            setIsJoined(true);
            setMessage(res.message);
        } catch (error) {
            console.error('Error joining waitlist:', error);
            alert('Failed to join waitlist. Please try again.');
        } finally {
            setIsJoining(false);
        }
    };

    if (!isSoldOut && !isJoined) return null;

    return (
        <div className="mt-6 p-6 rounded-[2rem] bg-orange-50/50 border border-orange-100/50 text-center">
            {isJoined ? (
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center animate-bounce">
                        <CheckCircle className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{message}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">We&apos;ll notify you if a spot opens up.</p>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center">
                        <UserPlus className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-sm font-black text-gray-900 uppercase tracking-tight">Join the Waitlist</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Get priority access if someone cancels.</p>
                    </div>
                    <button
                        onClick={handleJoinWaitlist}
                        disabled={isJoining}
                        className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-orange-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        {isJoining ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Join Waitlist'}
                    </button>
                </div>
            )}
        </div>
    );
}
