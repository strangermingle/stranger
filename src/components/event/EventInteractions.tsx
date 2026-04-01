"use client";

import { useState, useEffect } from "react";
import { Heart, Bookmark, Check, Share2, Sparkles, Facebook, Twitter, Linkedin, MessageCircle, Copy, CheckCircle2 } from "lucide-react";
import { toggleEventLike, toggleEventSave, setEventInterest, checkUserInteraction } from "@/lib/eventInteractions";

interface EventInteractionsProps {
    eventId: string;
    userId?: string;
    initialLikes?: number;
    initialSaves?: number;
}

export default function EventInteractions({ eventId, userId, initialLikes = 0, initialSaves = 0 }: EventInteractionsProps) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [interest, setInterest] = useState<'interested' | 'going' | 'not_going' | null>(null);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [savesCount, setSavesCount] = useState(initialSaves);
    const [interactLoading, setInteractLoading] = useState(false);
    const [showShareOptions, setShowShareOptions] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (userId) {
            checkUserInteraction(eventId, userId).then(res => {
                setLiked(res.liked);
                setSaved(res.saved);
                setInterest(res.interest as 'interested' | 'going' | 'not_going' | null);
            }).catch(console.error);
        }
    }, [eventId, userId]);

    const handleLike = async () => {
        if (!userId) return alert("Please log in to like events!");
        setInteractLoading(true);
        try {
            const res = await toggleEventLike(eventId, userId, liked);
            setLiked(res.action === 'liked');
            setLikesCount(prev => res.action === 'liked' ? prev + 1 : prev - 1);
        } catch (err) {
            console.error(err);
        } finally {
            setInteractLoading(false);
        }
    };

    const handleSave = async () => {
        if (!userId) return alert("Please log in to save events!");
        setInteractLoading(true);
        try {
            const res = await toggleEventSave(eventId, userId, saved);
            setSaved(res.action === 'saved');
            setSavesCount(prev => res.action === 'saved' ? prev + 1 : prev - 1);
        } catch (err) {
            console.error(err);
        } finally {
            setInteractLoading(false);
        }
    };

    const handleInterestCycle = async () => {
        if (!userId) return alert("Please log in to set interest!");

        let nextType: 'interested' | 'going' | null = null;
        if (interest === null) nextType = 'interested';
        else if (interest === 'interested') nextType = 'going';
        else nextType = null;

        setInteractLoading(true);
        try {
            await setEventInterest(eventId, userId, nextType);
            setInterest(nextType);
        } catch (err) {
            console.error(err);
        } finally {
            setInteractLoading(false);
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            {/* Like Button */}
            <button
                onClick={handleLike}
                disabled={interactLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-95 ${liked
                        ? "bg-pink-50 border-pink-100 text-pink-600 shadow-sm shadow-pink-100"
                        : "bg-white border-gray-100 text-gray-400 hover:border-pink-200 hover:text-pink-500"
                    }`}
            >
                <Heart className={`w-4 h-4 ${liked ? "fill-pink-600" : ""}`} />
                <span className="text-sm font-bold">{likesCount}</span>
            </button>

            {/* Save Button */}
            <button
                onClick={handleSave}
                disabled={interactLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all active:scale-95 ${saved
                        ? "bg-blue-50 border-blue-100 text-blue-600 shadow-sm shadow-blue-100"
                        : "bg-white border-gray-100 text-gray-400 hover:border-blue-200 hover:text-blue-500"
                    }`}
            >
                <Bookmark className={`w-4 h-4 ${saved ? "fill-blue-600" : ""}`} />
                <span className="text-sm font-bold">{savesCount}</span>
            </button>

            {/* Interest Button (Consolidated) */}
            <button
                onClick={handleInterestCycle}
                disabled={interactLoading}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all active:scale-95 ${interest === 'interested'
                        ? "bg-purple-600 text-white border-transparent shadow-lg shadow-purple-100"
                        : interest === 'going'
                            ? "bg-green-600 text-white border-transparent shadow-lg shadow-green-100"
                            : "bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                    }`}
            >
                {interest === 'going' ? (
                    <Check className="w-4 h-4 font-bold" />
                ) : (
                    <Sparkles className="w-4 h-4 font-bold" />
                )}
                <span className="text-xs font-bold uppercase tracking-widest leading-none">
                    {interest === 'going' ? 'Going' : 'Interested'}
                </span>
            </button>

            {/* Share Menu */}
            <div className="relative">
                <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className={`flex items-center justify-center p-2 rounded-xl border transition-all active:scale-95 ${showShareOptions
                            ? "bg-gray-900 border-gray-900 text-white"
                            : "border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-blue-500"
                        }`}
                >
                    <Share2 className="w-5 h-5" />
                </button>

                {showShareOptions && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setShowShareOptions(false)}
                        />
                        <div className="absolute bottom-full right-0 mb-3 bg-white border border-grey-200 rounded-lg shadow-2xl p-2 z-50 flex items-center gap-1 animate-in fade-in slide-in-from-bottom-3 duration-200">
                            <a
                                href={`https://wa.me/?text=${encodeURIComponent(`Check out this event: ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                className="p-2 rounded-xl hover:bg-green-50 text-gray-600 hover:text-green-600 transition-colors group"
                            >
                                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Facebook"
                                className="p-2 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors group"
                            >
                                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent("Found an interesting event on Stranger Mingle!")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Twitter"
                                className="p-2 rounded-xl hover:bg-sky-50 text-gray-600 hover:text-sky-600 transition-colors group"
                            >
                                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="LinkedIn"
                                className="p-2 rounded-xl hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 transition-colors group"
                            >
                                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            </a>
                            <div className="w-px h-6 bg-gray-500 mx-1" />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                title="Copy Link"
                                className={`p-2 rounded-xl transition-all ${copied
                                        ? "bg-green-600 text-white"
                                        : "hover:bg-gray-100 text-gray-600"
                                    }`}
                            >
                                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
