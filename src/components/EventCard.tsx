'use client';

import { useState, useRef, useEffect } from 'react';
import { Event, formatEventPrice, formatEventDate, formatEventTime, getSpotsLabel } from "@/lib/events";
import Image from "next/image";
import Link from "next/link";
import PaymentModal from "./PaymentModal";
import ContactOrganizerModal from "./ContactOrganizerModal";
import { ReportModal } from "./modals/ReportModal";
import { sendGAEvent } from "@/lib/gtag";
import { MoreVertical, Flag } from 'lucide-react';

interface EventCardProps {
    event: Event;
}

export default function EventCard({ event }: EventCardProps) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const price = formatEventPrice(event.min_price);
    const date = formatEventDate(event.start_datetime, event.end_datetime);
    const time = formatEventTime(
        new Date(event.start_datetime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }), 
        new Date(event.end_datetime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    );
    const spotsLabel = getSpotsLabel(event);
    const remainingSpots = (event.max_capacity || 0) - event.booking_count;
    const isFillingFast = event.max_capacity ? remainingSpots <= event.max_capacity * 0.2 && remainingSpots > 0 : false;
    const isSoldOut = event.max_capacity ? remainingSpots === 0 : false;
    const spotsPercentage = event.max_capacity ? (remainingSpots / event.max_capacity) * 100 : 100;

    // Enhanced gradient colors based on category (fallback if no image)
    const categoryGradients: Record<string, string> = {
        'TREK & BREAKFAST': 'from-emerald-400 via-green-500 to-teal-600',
        'SOCIAL MIXER': 'from-orange-400 via-amber-500 to-yellow-600',
        'GAME NIGHT': 'from-purple-400 via-violet-500 to-indigo-600',
        'CULTURE & HISTORY': 'from-amber-400 via-yellow-500 to-orange-600',
        'ART WORKSHOP': 'from-pink-400 via-rose-500 to-red-600',
        'LITERATURE': 'from-blue-400 via-cyan-500 to-teal-600',
        'ENTERTAINMENT': 'from-purple-400 via-pink-500 to-rose-600',
        'FOOD & DRINK': 'from-amber-400 via-orange-500 to-red-600',
        'FOOD WALK': 'from-orange-400 via-red-500 to-pink-600',
        'PHOTOGRAPHY': 'from-rose-400 via-pink-500 to-purple-600',
    };
    const gradient = categoryGradients[event.category_name || ''] || 'from-gray-400 via-gray-500 to-gray-600';

    return (
        <>
            <div className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 shadow-lg h-full flex flex-col">
                {/* Image/Header Section */}
                <div className={`h-56 bg-linear-to-br ${gradient} relative overflow-hidden`}>
                    {event.cover_image_url ? (
                        <>
                            <Image
                                src={event.cover_image_url || '/placeholder.png'}
                                alt={event.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                        </>
                    ) : (
                        <div className="absolute inset-0 bg-linear-to-br opacity-80" />
                    )}

                    {/* Report Menu */}
                    <div className="absolute top-4 right-4 z-20" ref={menuRef}>
                        <button 
                            onClick={(e) => { e.preventDefault(); setShowMenu(!showMenu); }}
                            className="p-1.5 bg-white/90 backdrop-blur text-gray-700 rounded-full hover:bg-white shadow-sm transition flex items-center justify-center"
                        >
                            <MoreVertical className="w-5 h-5" />
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1 flex flex-col pointer-events-auto">
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowMenu(false);
                                        setShowReportModal(true);
                                    }}
                                    className="px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                    <Flag className="w-4 h-4" />
                                    Report this event
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
                        <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/50">
                            {event.category_name}
                        </span>
                        {event.event_type === 'online' && (
                            <span className="bg-blue-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-blue-400/50">
                                🌐 Online
                            </span>
                        )}
                        {isSoldOut && (
                            <span className="bg-red-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-red-400/50">
                                Sold Out
                            </span>
                        )}
                        {isFillingFast && !isSoldOut && (
                            <span className="bg-orange-500/95 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-orange-400/50 animate-pulse">
                                ⚡ Filling Fast
                            </span>
                        )}
                    </div>

                            {/* Price Badge - Floating */}
                            {event.min_price && event.min_price > 0 ? (
                                <span className="text-lg font-bold text-gray-900">{price}</span>
                            ) : (
                                <span className="text-lg font-bold text-gray-900">Free</span>
                            )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col grow">
                    {/* Title and Date */}
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                            {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">{date}</span>
                            <span className="text-gray-300">•</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{time}</span>
                        </div>
                    </div>

                    {/* Location and Spots */}
                    <div className="space-y-3 mb-6 mt-auto">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="font-medium">{event.city}</span>
                        </div>

                        {/* Spots Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className={`font-semibold ${isSoldOut ? 'text-red-600' :
                                        isFillingFast ? 'text-orange-600' :
                                            'text-green-600'
                                        }`}>
                                        {remainingSpots} / {event.max_capacity || 0} spots
                                    </span>
                                </div>
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isSoldOut ? 'bg-red-100 text-red-700' :
                                    isFillingFast ? 'bg-orange-100 text-orange-700' :
                                        'bg-green-100 text-green-700'
                                    }`}>
                                    {spotsLabel}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? 'bg-red-500' :
                                        isFillingFast ? 'bg-orange-500' :
                                            'bg-green-500'
                                        }`}
                                    style={{ width: `${spotsPercentage}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Link
                            href={`/events/${event.slug || event.id}`}
                            onClick={() => sendGAEvent({
                                action: 'click',
                                category: 'event_card',
                                label: `View Details: ${event.title}`
                            })}
                            className="flex-1 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-center"
                        >
                            <span className="flex items-center justify-center gap-2">
                                Details
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </span>
                        </Link>
                        <Link
                            href={`/events/${event.slug || event.id}`}
                            onClick={() => {
                                sendGAEvent({
                                    action: 'click',
                                    category: 'event_card',
                                    label: isSoldOut ? `Sold Out: ${event.title}` : `Book: ${event.title}`,
                                    value: event.min_price || 0
                                });
                            }}
                            className={`flex-1 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 ${isSoldOut
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none'
                                : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-center'
                                }`}
                        >
                            {isSoldOut ? (
                                <span className="flex items-center justify-center gap-2">
                                    Sold Out
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Book Now
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Report Modal */}
            <ReportModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                reportedType="event"
                reportedId={event.id}
            />
        </>
    );
}
