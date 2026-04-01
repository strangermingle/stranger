"use client";

import { useState } from "react";
import { Star, X, Loader2, CheckCircle2 } from "lucide-react";
import { EventReview } from "@/lib/events";
import { submitEventReview } from "@/lib/eventInteractions";

interface WriteReviewModalProps {
    eventId: string;
    userId: string;
    bookingId?: string;
    onClose: () => void;
    onSuccess: (review: EventReview) => void;
    title?: string;
    type?: 'event' | 'host' | 'payout'; // Extending for host's profile too
}

export default function WriteReviewModal({ 
    eventId, 
    userId, 
    bookingId, 
    onClose, 
    onSuccess,
    title = "Write a Review",
    type = 'event'
}: WriteReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviewTitle, setReviewTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Multi-criteria ratings (optional)
    const [venueRating, setVenueRating] = useState(0);
    const [hostRating, setHostRating] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0) {
            setError("Please select a rating");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const review = await submitEventReview({
                event_id: eventId,
                user_id: userId,
                booking_id: bookingId,
                rating,
                title: reviewTitle,
                review_text: reviewText,
                rating_venue: venueRating || undefined,
                rating_host: hostRating || undefined,
            });

            setSuccess(true);
            setTimeout(() => {
                onSuccess(review);
                onClose();
            }, 1500);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to submit review");
        } finally {
            setLoading(false);
        }
    };

    const RatingStars = ({ value, onChange, onHover, size = 24 }: { 
        value: number; 
        onChange: (val: number) => void; 
        onHover?: (val: number) => void; 
        size?: number 
    }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
                <button
                    key={s}
                    type="button"
                    onClick={() => onChange(s)}
                    onMouseEnter={() => onHover && onHover(s)}
                    onMouseLeave={() => onHover && onHover(0)}
                    className="transition-transform active:scale-90"
                >
                    <Star 
                        className={`w-${size/4} h-${size/4} ${
                            s <= (hover || value) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-200"
                        } transition-colors`} 
                        size={size}
                    />
                </button>
            ))}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {success ? (
                    <div className="p-12 text-center flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">Thank You!</h4>
                        <p className="text-gray-500">Your review helps the community.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 italic">
                                {error}
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 block text-center">Overall Experience *</label>
                            <div className="flex justify-center">
                                <RatingStars value={rating} onChange={setRating} onHover={setHover} size={40} />
                            </div>
                        </div>

                        {type === 'event' && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Venue</label>
                                    <RatingStars value={venueRating} onChange={setVenueRating} size={20} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Host</label>
                                    <RatingStars value={hostRating} onChange={setHostRating} size={20} />
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 pt-2">
                            <input 
                                type="text" 
                                placeholder="Short summary of your review" 
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                            />
                            <textarea 
                                placeholder="Share your detailed experience..." 
                                rows={4}
                                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || rating === 0}
                            className="w-full py-4 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-200 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Post Review"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
