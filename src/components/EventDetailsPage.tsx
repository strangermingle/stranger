'use client';

import { useState } from 'react';
import { Event, formatEventPrice, formatEventDate, formatEventTime, getSpotsLabel } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import PaymentModal from './PaymentModal';
import ContactOrganizerModal from './ContactOrganizerModal';
import SocialLinks from './SocialLinks';
import { sendGAEvent } from '@/lib/gtag';
import { DiscussionSection } from './events/DiscussionSection';
import { createClient } from '@/lib/supabase/client';
import { useEffect } from 'react';

interface EventDetailsPageProps {
    event: Event;
}

export default function EventDetailsPage({ event }: EventDetailsPageProps) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            setCurrentUser(data.user);
        });
    }, [supabase]);

    const price = formatEventPrice((event as any).min_price);
    const date = formatEventDate((event as any).start_date || (event as any).start_datetime, (event as any).end_date || (event as any).end_datetime);
    const time = formatEventTime((event as any).start_time, (event as any).end_time);
    const spotsLabel = getSpotsLabel(event as any);
    const remainingSpots = ((event as any).available_seats || 0) - ((event as any).booked_spots || 0);
    const isFillingFast = (event as any).available_seats ? remainingSpots <= (event as any).available_seats * 0.2 && remainingSpots > 0 : false;
    const isSoldOut = remainingSpots === 0;
    const spotsPercentage = (event as any).available_seats ? (remainingSpots / (event as any).available_seats) * 100 : 100;

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
    }
    const gradient = categoryGradients[(event as any).category || (event as any).category_name || ''] || 'from-gray-400 via-gray-500 to-gray-600';

    // Check if google_map_link is an embed URL or regular link
    const isEmbedUrl = (event as any).google_map_link?.includes('embed') || (event as any).google_map_link?.includes('/maps/embed/');
    const googleMapsUrl = (event as any).google_map_link || ((event as any).full_address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((event as any).full_address)}` : null);

    return (
        <>
            <div className="min-h-screen bg-gray-50 pt-32 pb-16">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 mb-8 text-sm text-gray-500">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/events" className="hover:text-blue-600">Events</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 truncate">{(event as any).event_name || (event as any).title}</span>
                </div>

                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Hero Section with Image */}
                            <div className={`relative w-full h-96 rounded-2xl overflow-hidden mb-8 shadow-lg ${!((event as any).image_url || (event as any).cover_image_url) ? `bg-linear-to-br ${gradient}` : ''}`}>
                                { (event as any).image_url || (event as any).cover_image_url ? (
                                    <Image
                                        src={(event as any).image_url || (event as any).cover_image_url}
                                        alt={(event as any).event_name || (event as any).title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 900px"
                                    />
                                ) : (
                                    <div className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-80`} />
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 z-10">
                                    <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-white/50">
                                        {(event as any).category || (event as any).category_name}
                                    </span>
                                    {(event as any).event_type === 'online' && (
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

                                {/* Price Badge */}
                                <div className="absolute bottom-4 right-4 z-10">
                                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl border border-white/50">
                                        {(event as any).discounted_price && (event as any).discounted_price < (event as any).regular_price ? (
                                            <div className="text-center">
                                                <div className="flex items-baseline gap-1.5 justify-center">
                                                    <span className="text-xs text-gray-400 line-through font-medium">
                                                        ₹{(event as any).regular_price.toFixed(0)}
                                                    </span>
                                                    <span className="text-lg font-bold text-gray-900">
                                                        {price}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-green-600 font-semibold">
                                                    {(event as any).discount_rate?.toFixed(0)}% OFF
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-lg font-bold text-gray-900">{price}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Event Title and Basic Info */}
                            <header className="mb-8">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    {(event as any).event_name || (event as any).title}
                                </h1>

                                {/* Event Info Grid */}
                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                        <svg className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Date</div>
                                            <div className="font-semibold text-gray-900">{date}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                        <svg className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Time</div>
                                            <div className="font-semibold text-gray-900">{time}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                        <svg className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <div className="flex-1">
                                            <div className="text-sm text-gray-500 mb-1">Location</div>
                                            <div className="font-semibold text-gray-900">{(event as any).short_address}</div>
                                            {(event as any).full_address && (event as any).full_address !== (event as any).short_address && (
                                                <div className="text-sm text-gray-600 mt-1">{(event as any).full_address}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                                        <svg className="w-6 h-6 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div>
                                            <div className="text-sm text-gray-500 mb-1">Availability</div>
                                            <div className="font-semibold text-gray-900">
                                                {remainingSpots} / {(event as any).available_seats || (event as any).max_capacity || 0} spots
                                            </div>
                                            <div className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full inline-block ${isSoldOut ? 'bg-red-100 text-red-700' :
                                                isFillingFast ? 'bg-orange-100 text-orange-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {spotsLabel}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Spots Progress Bar */}
                                <div className="mb-6">
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? 'bg-red-500' :
                                                isFillingFast ? 'bg-orange-500' :
                                                    'bg-green-500'
                                                }`}
                                            style={{ width: `${spotsPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            </header>

                            {/* Description Section */}
                            {((event as any).description || (event as any).about) && (
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                                    <div className="prose prose-lg max-w-none bg-white p-6 rounded-xl border border-gray-200">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                            {(event as any).description || (event as any).about}
                                        </p>
                                    </div>
                                </section>
                            )}

                            {/* Discussion Section */}
                            <DiscussionSection 
                                eventId={(event as any).id} 
                                currentUserId={currentUser?.id} 
                            />

                            {/* Location Section with Google Maps */}
                            {googleMapsUrl && (
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                        {isEmbedUrl && (event as any).google_map_link ? (
                                            <iframe
                                                src={(event as any).google_map_link}
                                                width="100%"
                                                height="450"
                                                style={{ border: 0 }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="w-full"
                                                title="Event location map"
                                            />
                                        ) : (
                                            <div className="p-6">
                                                <div className="mb-4">
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-semibold">Address:</span> {(event as any).full_address || (event as any).short_address}
                                                    </p>
                                                </div>
                                                <a
                                                    href={googleMapsUrl || '#'}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    View on Google Maps
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Contact Information Section */}
                            {((event as any).organizer_name || (event as any).organizer_email || (event as any).organizer_phone || (event as any).whatsapp_link) && (
                                <section className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Organizer</h2>
                                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                                        <div className="space-y-4">
                                            {(event as any).organizer_name && (
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="text-gray-900 font-medium">{(event as any).organizer_name}</span>
                                                </div>
                                            )}
                                            {(event as any).organizer_email && (
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    <a href={`mailto:${(event as any).organizer_email}`} className="text-blue-600 hover:underline">
                                                        {(event as any).organizer_email}
                                                    </a>
                                                </div>
                                            )}
                                            {(event as any).organizer_phone && (
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <a href={`tel:${(event as any).organizer_phone}`} className="text-blue-600 hover:underline">
                                                        {(event as any).organizer_phone}
                                                    </a>
                                                </div>
                                            )}
                                            {(event as any).whatsapp_link && (
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                    </svg>
                                                    <a
                                                        href={(event as any).whatsapp_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-green-600 hover:underline"
                                                    >
                                                        Message on WhatsApp
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Back to Events Link */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <Link href="/events" className="text-blue-600 font-medium hover:underline inline-flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to all events
                                </Link>
                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:w-80 lg:sticky lg:top-32 lg:self-start">
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg sticky top-32">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Book Your Spot</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Price</span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            {price}
                                        </span>
                                    </div>
                                    {(event as any).discounted_price && (event as any).discounted_price < (event as any).regular_price && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-400 line-through">₹{(event as any).regular_price.toFixed(0)}</span>
                                            <span className="text-green-600 font-semibold">{(event as any).discount_rate?.toFixed(0)}% OFF</span>
                                        </div>
                                    )}
                                    <div className="pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600">Available spots</span>
                                            <span className={`font-semibold ${isSoldOut ? 'text-red-600' :
                                                isFillingFast ? 'text-orange-600' :
                                                    'text-green-600'
                                                }`}>
                                                {remainingSpots} / {(event as any).available_seats || (event as any).max_capacity || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        sendGAEvent({
                                            action: 'click',
                                            category: 'event_details',
                                            label: isSoldOut ? `Sold Out: ${(event as any).event_name || (event as any).title}` : `Book: ${(event as any).event_name || (event as any).title}`,
                                            value: (event as any).discounted_price || (event as any).regular_price
                                        });

                                        if (isSoldOut) {
                                            setShowContactModal(true);
                                        } else {
                                            setShowPaymentModal(true);
                                        }
                                    }}
                                    disabled={isSoldOut}
                                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${isSoldOut
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                                        }`}
                                >
                                    {isSoldOut ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Sold Out
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Book Your Spot
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-4">
                                    Secure payment powered by Razorpay.
                                </p>
                            </div>

                            {/* Social Media Links Sidebar */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg mt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Follow Stranger Mingle</h3>
                                <SocialLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                event={event}
            />

            {/* Contact Organizer Modal */}
            <ContactOrganizerModal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
            />
        </>
    );
}
