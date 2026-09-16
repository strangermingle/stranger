'use client';

import { useState, useEffect } from 'react';
import { Event, formatEventDate, formatEventTime, getSpotsLabel } from '@/lib/events';
import Image from 'next/image';
import Link from 'next/link';
import PaymentModal from './PaymentModal';
import ContactOrganizerModal from './ContactOrganizerModal';
import SocialLinks from './SocialLinks';
import { sendGAEvent, trackViewItem, trackAddToCart, trackRemoveFromCart } from '@/lib/gtag';
import { trackViewContent } from '@/lib/metaPixel';
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
import UpcomingExperiences from './event/UpcomingExperiences';
import SponsoredAd from './ads/SponsoredAd';
import MembershipAd from './ads/MembershipAd';
import SidebarVideoAd from './ads/SidebarVideoAd';

interface EventDetailsPageProps {
    event: Event;
}

export default function EventDetailsPage({ event }: EventDetailsPageProps) {
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const { mappedUserId } = useAuth();
    const [selectedTickets, setSelectedTickets] = useState<Record<string, number>>({});
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const date = formatEventDate(event.start_datetime, event.end_datetime);
    const time = formatEventTime(event.start_datetime, event.end_datetime);
    const spotsLabel = getSpotsLabel(event);
    const remainingSpots = (event.max_capacity || 0) - event.booking_count;
    const isFillingFast = event.max_capacity ? remainingSpots <= event.max_capacity * 0.2 && remainingSpots > 0 : false;
    const isSoldOut = event.max_capacity ? remainingSpots <= 0 : false;
    const spotsPercentage = event.max_capacity ? (remainingSpots / event.max_capacity) * 100 : 100;

    // GA4 & Meta Ecommerce: Track view_item & ViewContent on page load
    useEffect(() => {
        if (event) {
            const firstTier = event.ticket_tiers?.[0];
            const itemPrice = firstTier?.price || 0;
            trackViewItem({
                item: {
                    item_id: event.id,
                    item_name: event.title,
                    item_category: event.category?.name || 'Event',
                    location_id: event.location?.city || undefined,
                    price: itemPrice,
                    quantity: 1
                },
                value: itemPrice
            });

            trackViewContent({
                content_ids: [event.id],
                content_name: event.title,
                content_category: event.category?.name || 'Event',
                content_type: 'product',
                value: itemPrice,
                currency: 'INR'
            });
        }
    }, [event]);

    const handleTicketChange = (tierId: string, quantity: number) => {
        const prevQuantity = selectedTickets[tierId] || 0;
        const tier = event.ticket_tiers?.find(t => t.id === tierId);

        setSelectedTickets(prev => ({
            ...prev,
            [tierId]: quantity
        }));

        if (tier) {
            if (quantity > prevQuantity) {
                const addedCount = quantity - prevQuantity;
                trackAddToCart({
                    items: [{
                        item_id: tier.id,
                        item_name: `${event.title} - ${tier.name}`,
                        item_category: event.category?.name || 'Event',
                        price: tier.price,
                        quantity: addedCount
                    }],
                    value: tier.price * addedCount
                });
            } else if (quantity < prevQuantity) {
                const removedCount = prevQuantity - quantity;
                trackRemoveFromCart({
                    items: [{
                        item_id: tier.id,
                        item_name: `${event.title} - ${tier.name}`,
                        item_category: event.category?.name || 'Event',
                        price: tier.price,
                        quantity: removedCount
                    }],
                    value: tier.price * removedCount
                });
            }
        }
    };

    const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
    const totalPrice = event.ticket_tiers?.reduce((sum: number, tier) => sum + (tier.price * (selectedTickets[tier.id] || 0)), 0) || 0;

    return (
        <>
            <div className="min-h-screen bg-transparent pt-8 pb-16">
                {/* Breadcrumb */}
                <div className="max-w-7xl mx-auto px-4 mb-6 text-sm text-gray-400">
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
                        <div className="flex-1 lg:max-w-[calc(100%-25rem)] flex flex-col">
                            {/* Hero Image Section */}
                            <div className="order-1 relative w-full overflow-hidden mb-6 rounded-xl shadow-none lg:shadow-xl group border border-gray-100">
                                <div className="aspect-video lg:aspect-[2/1] relative w-full">
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
                            <div className="order-3 lg:order-2 mb-1 mt-1 lg:mt-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-1">
                                    <div>
                                        <div className="text-lg font-medium text-red-600 tracking-tight uppercase">
                                            {date} <span className="text-blue-500 font-medium tracking-tight">{time}</span>
                                        </div>
                                    </div>
                                    <div className="sm:border-l sm:pl-2 border-gray-200">
                                        <div className="text-lg font-regular text-gray-500 tracking-tight">
                                            {event.location?.venue_name || 'Sharing on WhatsApp'}
                                        </div>
                                    </div>
                                </div>

                                {/* Interaction Icons & Counts */}
                                <div className="flex items-center gap-1 py-1 mb-0">
                                    <EventInteractions
                                        eventId={event.id}
                                        userId={mappedUserId || undefined}
                                        initialLikes={event.likes_count}
                                        initialSaves={event.saves_count}
                                    />

                                    <div className="flex items-center gap-6 ml-auto border-l border-gray-100 pl-6">
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-green-700 leading-none">{event.views_count || 0}</span>
                                            <span className="text-[7px] font-regular text-gray-700 uppercase tracking-widest mt-1">Views</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="text-xs font-semibold text-blue-600 leading-none">{event.interests_count || 0}</span>
                                            <span className="text-[7px] font-regular text-gray-700 uppercase tracking-widest mt-1">Interested</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="order-2 lg:order-3 mb-1 lg:mb-1 mt-0 lg:mt-0">
                                <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight tracking-tighter lg:mb-2 text-wrap">
                                    {event.title}
                                </h1>
                            </div>

                            {/* Short Description */}
                            {event.short_description && (
                                <div className="order-4 mb-1">
                                    <p className="text-sm md:text-lg text-blue-500 italic font-regular leading-relaxed border-l-4 border-blue-500 pl-2 py-1">
                                        &ldquo; {event.short_description} &rdquo;
                                    </p>
                                </div>
                            )}

                            {/* Main Content Body */}
                            <div className="order-5 space-y-2">
                                {/* About Section */}
                                <section>
                                    <div className="hidden lg:flex items-center gap-6 mb-1">
                                        <h2 className="text-xl font-semibold text-gray-900 uppercase tracking-tighter shrink-0">Event Details</h2>
                                        <div className="h-0.5 flex-1 bg-gray-50" />
                                    </div>
                                    <div className={`prose prose-md max-w-none text-gray-700 leading-relaxed font-regular whitespace-pre-wrap transition-all duration-300 ${isDescriptionExpanded ? '' : 'line-clamp-4 overflow-hidden'}`}>
                                        {event.description}
                                    </div>
                                    <button
                                        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                        className="mt-1 text-red-600 font-regular hover:text-blue-700 transition-colors"
                                    >
                                        {isDescriptionExpanded ? 'Show Less' : 'Read More'}
                                    </button>
                                </section>

                                {/* Location Section */}

                                {event.location && (
                                    <section>
                                        <div className="text-center gap-6 mb-1">
                                            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-tighter shrink-0">Location</h2>
                                            <div className="h-0.5 flex-1 bg-gray-50" />
                                        </div>
                                        <div className="bg-gray-0 rounded-2xl p-3 border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                            <div>
                                                <h3 className="font-medium text-center text-gray-900 text-lg mb-1">{event.location.venue_name || 'Venue to be announced'}</h3>
                                                <p className="text-center text-gray-500 leading-relaxed max-w-sm">
                                                    {[
                                                        event.location.address_line1,
                                                        event.location.address_line2,
                                                        event.location.city,
                                                        event.location.state,
                                                        event.location.postal_code
                                                    ].filter(Boolean).join(', ')}
                                                </p>
                                            </div>
                                            {event.location.google_maps_url && (
                                                <a
                                                    href={event.location.google_maps_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-white border border-gray-200 text-blue-600 font-medium hover:bg-blue-50 transition-colors shrink-0 shadow-sm"
                                                >
                                                    View on Google Maps
                                                </a>
                                            )}
                                        </div>
                                    </section>
                                )}

                                {/* Host Section */}
                                <section>
                                    <div className="max-w-full mx-auto sm:mx-0 bg-gray-50/0 p-2 rounded-2xl">
                                        <div className="text-10px] font-semibold text-gray-600 tracking-[0.3em] uppercase mb-1 px-1 text-center">Hosted by</div>
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
                                                action: 'click_confirm_booking',
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

                            {/* Upcoming Activities for Mobile only */}
                            <div className="block lg:hidden -mx-4">
                                <UpcomingExperiences city={event.location?.city || 'India'} currentEventId={event.id} />
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
