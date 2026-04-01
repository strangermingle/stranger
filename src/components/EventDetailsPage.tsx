'use client';

import { useState, useEffect } from 'react';
import { Event, formatEventDate, formatEventTime, getSpotsLabel, Booking } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import PaymentModal from './PaymentModal';
import ContactOrganizerModal from './ContactOrganizerModal';
import SocialLinks from './SocialLinks';
import { sendGAEvent } from '@/lib/gtag';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/components/AuthProvider';
import { Shield } from "lucide-react";
import EventComments from './event/EventComments';

// New Event Components
import EventGallery from './event/EventGallery';
import EventAgendaList from './event/EventAgenda';
import EventFAQs from './event/EventFAQ';
import EventCohosts from './event/EventCohosts';
import EventInteractions from './event/EventInteractions';
import EventDiscussions from './event/EventDiscussions';
import EventWaitlist from './event/EventWaitlist';
import BookingFloat from './event/BookingFloat';
import HostMiniCard from './event/HostMiniCard';
import SponsoredAd from './ads/SponsoredAd';
import MembershipAd from './ads/MembershipAd';
import SidebarVideoAd from './ads/SidebarVideoAd';

interface EventDetailsPageProps {
    event: Event;
}

export default function EventDetailsPage({ event }: EventDetailsPageProps) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const { user, mappedUserId } = useAuth();
    const [, setUserBookings] = useState<Booking[]>([]);
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});

    useEffect(() => {
        if (mappedUserId) {
            supabase.from('bookings')
                .select('*')
                .eq('user_id', mappedUserId)
                .eq('event_id', event.id)
                .then(({ data }) => setUserBookings(data || []));
        }
    }, [event.id, mappedUserId]);

    const date = formatEventDate(event.start_datetime, event.end_datetime);
    const time = formatEventTime(event.start_datetime, event.end_datetime);
    const spotsLabel = getSpotsLabel(event);
    const remainingSpots = (event.max_capacity || 0) - event.booking_count;
    const isFillingFast = event.max_capacity ? remainingSpots <= event.max_capacity * 0.2 && remainingSpots > 0 : false;
    const isSoldOut = event.max_capacity ? remainingSpots <= 0 : false;
    const spotsPercentage = event.max_capacity ? (remainingSpots / event.max_capacity) * 100 : 100;

    const handleTicketChange = (tierId: string, quantity: number) => {
        setSelectedTickets(prev => ({
            ...prev,
            [tierId]: quantity
        }));
    };

    const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
    const totalPrice = event.ticket_tiers?.reduce((sum: number, tier) => sum + (tier.price * (selectedTickets[tier.id] || 0)), 0) || 0;

    return (
        <>
            <div className="min-h-screen bg-transparent pt-8 pb-16">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 mb-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar pb-2">
                        <Link href="/" className="hover:text-blue-600 transition-colors tracking-tight">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/events" className="hover:text-blue-600 transition-colors tracking-tight">Events</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-900 font-bold truncate tracking-tight">{event.title}</span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-1">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Main Content */}
                        <div className="flex-1 lg:max-w-[calc(100%-25rem)]">
                            {/* Hero Image Section */}
                            <div className="relative w-full overflow-hidden mb-6 rounded-xl shadow-xl group border border-gray-100">
                                <div className="aspect-[2/1] relative w-full">
                                    {event.cover_image_url ? (
                                        <Image
                                            src={event.cover_image_url}
                                            alt={event.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            priority
                                            sizes="(min-width: 1024px) 1000px, 100vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90" />
                                    )}
                                </div>
                            </div>

                            {/* Event Metadata & Stats */}
                            <div className="mb-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-1">
                                    <div>
                                        <div className="text-xl font-bold text-red-600 tracking-tight uppercase">
                                            {date} <span className="text-blue-500 font-medium tracking-tight">{time}</span>
                                        </div>
                                    </div>
                                    <div className="sm:border-l sm:pl-6 border-gray-200">
                                        <div className="text-lg font-regular text-gray-500 tracking-tight">
                                            {event.location?.venue_name || 'Venue TBA'}
                                        </div>
                                    </div>
                                </div>

                                {/* Interaction Icons & Counts */}
                                <div className="flex items-center gap-6 py-2 mb-2">
                                    <EventInteractions
                                        eventId={event.id}
                                        userId={mappedUserId || undefined}
                                        initialLikes={event.likes_count}
                                        initialSaves={event.saves_count}
                                    />

                                    <div className="flex items-center gap-6 ml-auto border-l border-gray-100 pl-6">
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-black text-gray-600 leading-none">{event.views_count || 0}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Views</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-lg font-black text-gray-600 leading-none">{event.interests_count || 0}</span>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Interested</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Title and Short Description */}
                            <div className="mb-3">
                                <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tighter mb-6 text-wrap">
                                    {event.title}
                                </h1>
                                {event.short_description && (
                                    <p className="text-lg md:text-xl text-blue-500 italic font-medium leading-relaxed border-l-4 border-blue-500 pl-4 py-2">
                                        &ldquo; {event.short_description} &rdquo;
                                    </p>
                                )}
                            </div>

                            {/* Main Content Body */}
                            <div className="space-y-12">
                                {/* About Section */}
                                <section>
                                    <div className="flex items-center gap-6 mb-2">
                                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-tighter shrink-0">Event Details</h2>
                                        <div className="h-0.5 flex-1 bg-gray-50" />
                                    </div>
                                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-regular whitespace-pre-wrap">
                                        {event.description}
                                    </div>
                                </section>

                                {/* Host Section */}
                                <section>
                                    <div className="max-w-full mx-auto sm:mx-0 bg-gray-50/0 p-6 rounded-2xl">
                                        <div className="text-[16px] font-black text-gray-600 tracking-[0.3em] uppercase mb-2 px-1 text-center">Hosted by</div>
                                        {event.host ? (
                                            <HostMiniCard host={event.host} />
                                        ) : (
                                            <div className="text-center text-gray-400 py-4 italic">Host information unavailable</div>
                                        )}
                                    </div>
                                </section>

                                {/* Components Section */}
                                <section className="space-y-12">
                                    <EventGallery images={event.event_images || []} />
                                    <EventAgendaList agenda={event.event_agenda || []} />
                                    <EventCohosts cohosts={event.event_cohosts || []} />
                                    <EventFAQs faqs={event.event_faqs || []} />
                                    <EventComments eventId={event.id} userId={mappedUserId || undefined} />
                                    <EventDiscussions eventId={event.id} userId={mappedUserId || undefined} />
                                </section>
                            </div>
                        </div>

                        {/* Booking Sidebar */}
                        <div className="lg:w-[22rem] lg:sticky lg:top-2 lg:self-start space-y-4 pb-32 lg:pb-0">
                            <div id="booking-section" className="bg-white rounded-3xl border border-gray-500 p-4 shadow-2xl shadow-gray-100/50">
                                <h3 className="text-2xl font-black text-red-600 mb-2 uppercase tracking-tighter text-center">Book Your Spot</h3>

                                {/* Availability Indicator */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isSoldOut ? 'text-red-500' : 'text-blue-600'}`}>
                                            {spotsLabel}
                                        </span>
                                        <span className="text-xs font-black text-gray-900 opacity-70 italic">
                                            {remainingSpots} left
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${isSoldOut ? 'bg-red-500' : isFillingFast ? 'bg-orange-500' : 'bg-blue-600'}`}
                                            style={{ width: `${spotsPercentage}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Ticket Tiers */}
                                <div className="space-y-2 mb-2">
                                    {event.ticket_tiers?.map((tier) => {
                                        const isTierSoldOut = tier.sold_count >= tier.total_quantity;
                                        const isSelected = !!selectedTickets[tier.id];
                                        return (
                                            <div key={tier.id} className={`p-4 rounded-2xl border transition-all duration-300 ${isSelected ? 'border-blue-600 bg-blue-50/10' : 'border-gray-50 bg-gray-50 hover:border-gray-200'}`}>
                                                <div className="flex justify-between items-center gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-900 text-sm truncate tracking-tight">{tier.name}</h4>
                                                        <div className="text-blue-600 font-black text-lg">
                                                            {tier.price === 0 ? 'FREE' : `₹${tier.price}`}
                                                        </div>
                                                    </div>

                                                    {!isTierSoldOut ? (
                                                        <div className="flex items-center gap-2 bg-white border border-gray-100 rounded-xl p-1 shadow-sm">
                                                            <button
                                                                onClick={() => handleTicketChange(tier.id, Math.max(0, (selectedTickets[tier.id] || 0) - 1))}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-900 transition-colors"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="w-4 text-center font-black text-sm">{selectedTickets[tier.id] || 0}</span>
                                                            <button
                                                                onClick={() => handleTicketChange(tier.id, Math.min(tier.max_per_booking, (selectedTickets[tier.id] || 0) + 1))}
                                                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-900 transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Sold Out</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Summary & Actions */}
                                <div className="pt-6 border-t border-gray-100 mb-2">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-black text-gray-600 uppercase tracking-widest">Only</span>
                                        <span className="text-3xl font-black text-gray-900">₹{totalPrice}</span>
                                    </div>

                                    <button
                                        onClick={() => {
                                            sendGAEvent({
                                                action: 'begin_checkout',
                                                category: 'event_details',
                                                label: isSoldOut ? `Sold Out: ${event.title}` : `Book: ${event.title}`,
                                                value: totalPrice
                                            });
                                            if (isSoldOut) setShowContactModal(true);
                                            else setShowPaymentModal(true);
                                        }}
                                        disabled={isSoldOut || (totalTickets === 0 && !isSoldOut)}
                                        className={`w-full py-6 rounded-2xl font-black text-md uppercase tracking-[0.2em] transition-all ${isSoldOut || (totalTickets === 0 && !isSoldOut)
                                            ? 'bg-red-600 text-white cursor-not-allowed'
                                            : 'bg-green-600 text-white hover:bg-green-700 hover:-translate-y-1 active:scale-95'}`}
                                    >
                                        {isSoldOut ? 'Sold Out' : (totalTickets > 0 ? `Confirm Booking` : 'Select Spots')}
                                    </button>
                                </div>

                                {/* Waitlist & Security */}
                                <EventWaitlist eventId={event.id} userId={mappedUserId || undefined} isSoldOut={isSoldOut} />

                                <div className="mt-8 flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-2 text-[9px] text-gray-500 font-black uppercase tracking-widest">
                                        <Shield size={15} className="text-green-500" />
                                        Secure Payment via Razorpay
                                    </div>
                                </div>
                            </div>

                            {/* Social Card */}
                            <div className="bg-white rounded-3xl border border-gray-300 p-4">
                                <h3 className="text-[10px] font-black text-gray-400 mb-4 text-center uppercase tracking-[0.3em]">Stay Connected</h3>
                                <SocialLinks />
                                <p className="text-[10px] text-gray-500 font-bold text-center mt-2 uppercase tracking-widest">
                                    Stranger Mingle Socials
                                </p>
                            </div>

                            {/* Sidebar Ads */}
                            <SponsoredAd />
                            <MembershipAd />
                            <SidebarVideoAd />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                event={event}
                selectedTickets={selectedTickets}
            />
            <ContactOrganizerModal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
            />
            <BookingFloat />
        </>
    );
}
