"use client";

import { EventReview, Event, Booking } from "@/lib/events";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { Star, ThumbsUp, MessageSquare, Calendar, User, UserCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import WriteReviewModal from "./WriteReviewModal";

interface EventReviewsProps {
    event: Event;
    user?: SupabaseUser; // Authenticated user
    bookings?: Booking[]; // Confirm user has a booking
    compact?: boolean;
}

export default function EventReviews({ event, user, bookings, compact }: EventReviewsProps) {
    const [isWriting, setIsWriting] = useState(false);
    const [reviews, setReviews] = useState<EventReview[]>(event.event_reviews || []);

    const hasBooked = bookings?.some(b => b.event_id === event.id && b.status === 'confirmed');
    const hasReviewed = reviews.some(r => r.user_id === user?.id);

    // Filter reviews to show only approved ones (is_approved check handled in Supabase RPC usually)
    const activeReviews = reviews; 
    
    const averageRating = activeReviews.length > 0 
        ? activeReviews.reduce((sum, r) => sum + r.rating, 0) / activeReviews.length 
        : event.rating_avg || 0;


    return (
        <section id="reviews" className={compact ? "" : "py-4 border-t border-gray-100"}>
            <div className={`flex flex-col md:flex-row gap-12 items-start ${compact ? "!gap-0" : ""}`}>
                {/* Summary Section */}
                {!compact && (
                    <div className="w-full md:w-80 flex-shrink-0">
                        <h2 className="text-sm font-bold text-gray-500 mb-6 text-center">Ratings & Reviews</h2>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-4xl font-black text-gray-900 mb-2">
                                {averageRating.toFixed(1)}
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star 
                                        key={s} 
                                        className={`w-6 h-6 ${s <= Math.round(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`} 
                                        size={24}
                                    />
                                ))}
                            </div>
                            <p className="text-sm font-black text-green-400 uppercase tracking-widest leading-none">
                                {activeReviews.length} Verified Reviews
                            </p>

                            {user && hasBooked && !hasReviewed && (
                                <button 
                                    onClick={() => setIsWriting(true)}
                                    className="mt-8 w-full py-4 bg-white text-gray-900 border border-gray-200 hover:border-blue-300 hover:text-blue-600 rounded-2xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 group"
                                >
                                    <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Write a Review
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Review List */}
                <div className="flex-1 w-full">
                    {activeReviews.length === 0 ? (
                        !compact && (
                            <div className="h-full flex flex-col items-center justify-center py-4 bg-gray-50/20 rounded-3xl border border-dashed border-gray-200">
                                <Star className="w-12 h-12 text-blue-500 mb-4" />
                                <p className="text-indigo-500 font-bold text-sm italic">No reviews yet for this event.</p>
                            </div>
                        )
                    ) : (
                        <div className={`space-y-8 ${compact ? "!space-y-6" : ""}`}>
                            {activeReviews.map((review) => (
                                <div key={review.id} className={compact 
                                    ? "py-6 border-b border-gray-50 last:border-0" 
                                    : "p-8 rounded-[2.5rem] bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-100/50 transition-all group"
                                }>
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md bg-blue-50 flex items-center justify-center">
                                                {review.user?.avatar_url ? (
                                                    <Image sizes="56px" 
                                                        src={review.user.avatar_url} 
                                                        alt={review.user.username} 
                                                        fill 
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <User className="w-8 h-8 text-blue-200" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-bold text-gray-900 text-lg">{review.user?.username}</h4>
                                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-600 rounded-full text-[10px] uppercase font-bold tracking-widest border border-green-100">
                                                        <UserCheck className="w-3 h-3" />
                                                        Verified
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5 pt-0.5">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(review.created_at).toLocaleDateString('en-IN', { 
                                                        month: 'short', 
                                                        day: 'numeric', 
                                                        year: 'numeric',
                                                        timeZone: 'Asia/Kolkata'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star 
                                                    key={s} 
                                                    className={`w-5 h-5 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} 
                                                    size={18}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {review.title && (
                                        <h5 className="font-bold text-gray-900 text-lg mb-2 italic">
                                            &ldquo; {review.title} &rdquo;
                                        </h5>
                                    )}

                                    <p className="text-gray-600 leading-relaxed mb-6 text-base md:text-lg italic">
                                        {review.review_text}
                                    </p>

                                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-4">
                                            {[
                                                { label: "Venue", val: review.rating_venue },
                                                { label: "Host", val: review.rating_host },
                                                { label: "Value", val: review.rating_value }
                                            ].filter(i => i.val).map(item => (
                                                <div key={item.label} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-100">
                                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{item.label}</span>
                                                    <div className="flex gap-0.5">
                                                        {[1, 2, 3, 4, 5].map(s => (
                                                            <div key={s} className={`w-1.5 h-1.5 rounded-full ${s <= (item.val || 0) ? "bg-blue-600" : "bg-gray-200"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="flex items-center gap-2 text-gray-400 hover:text-blue-600 transition-colors py-2 px-4 hover:bg-blue-50 rounded-xl group/btn">
                                            <ThumbsUp className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            <span className="text-xs font-bold uppercase tracking-widest">Helpful ({review.helpful_count})</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isWriting && user && (
                <WriteReviewModal 
                    eventId={event.id}
                    userId={user.id}
                    bookingId={bookings?.find(b => b.event_id === event.id)?.id}
                    onClose={() => setIsWriting(false)}
                    onSuccess={(newReview) => {
                        setReviews([newReview, ...reviews]);
                    }}
                />
            )}
        </section>
    );
}
