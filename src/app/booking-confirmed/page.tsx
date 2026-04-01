'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Calendar, MapPin } from 'lucide-react';

interface TicketTier {
    id: string;
    name: string;
}

interface BookingItem {
    id: string;
    ticket_tiers: TicketTier | null;
    quantity: number;
    subtotal: number;
}

interface EventDetails {
    title: string;
    start_datetime: string;
    location: {
        venue_name: string;
    } | null;
}

interface Booking {
    id: string;
    booking_ref: string;
    attendee_name: string;
    attendee_email: string;
    events: EventDetails;
    booking_items: BookingItem[];
}

function BookingContent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'processing' | 'success' | 'failed'>('processing');
    const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
    const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const paymentId = searchParams.get('payment_id');
    const paymentRequestId = searchParams.get('payment_request_id');

    useEffect(() => {
        const verifyAndFetch = async () => {
            try {
                // Determine which fields to send based on what's in URL
                // Razorpay usually sends razorpay_payment_id if it's a direct flow
                const razorpay_payment_id = searchParams.get('razorpay_payment_id') || paymentId;
                const razorpay_order_id = searchParams.get('razorpay_order_id');
                const razorpay_signature = searchParams.get('razorpay_signature');
                const directBookingId = searchParams.get('booking_id');

                // If we have a direct booking ID, fetch it via secure API (bypassing RLS for guest checkouts)
                if (directBookingId) {
                    const response = await fetch(`/api/bookings/${directBookingId}`);
                    const booking = await response.json();
                    
                    if (response.ok && booking) {
                        setBookingDetails(booking);
                        setEventDetails(booking.events);
                        setStatus('success');
                        setLoading(false);
                        return;
                    } else {
                        setStatus('failed');
                        setLoading(false);
                        return;
                    }
                }

                // If we have minimal info, try to verify
                if (razorpay_payment_id && !directBookingId) {
                    const vResponse = await fetch('/api/payments/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature,
                        }),
                    });

                    const vData = await vResponse.json();
                    if (vResponse.ok && vData.success) {
                        // Success! Now fetch details via secure API
                        const bResponse = await fetch(`/api/bookings/${vData.bookingId}`);
                        const booking = await bResponse.json();
                        
                        if (bResponse.ok && booking) {
                            setStatus('success');
                            setBookingDetails(booking);
                            setEventDetails(booking.events);
                        } else {
                            setStatus('failed');
                        }
                    } else {
                        setStatus('failed');
                    }
                } else if (!paymentId && !paymentRequestId) {
                    setStatus('failed');
                }
            } catch (error) {
                console.error('Error:', error);
                setStatus('failed');
            } finally {
                setLoading(false);
            }
        };

        verifyAndFetch();
    }, [paymentId, paymentRequestId, searchParams]);

    useEffect(() => {
        if (status === 'success' && bookingDetails && eventDetails) {
            // Check if already tracked to avoid duplicate triggers
            const win = window as unknown as { _ga_purchase_tracked?: boolean; dataLayer?: Record<string, unknown>[] };
            if (!win._ga_purchase_tracked) {
                win._ga_purchase_tracked = true;
                
                const items = bookingDetails.booking_items?.map((item: BookingItem) => ({
                    item_id: item.ticket_tiers?.id || item.id,
                    item_name: item.ticket_tiers?.name || 'Ticket',
                    price: item.subtotal / item.quantity,
                    quantity: item.quantity
                })) || [];

                const totalValue = bookingDetails.booking_items?.reduce((sum: number, item: BookingItem) => sum + item.subtotal, 0) || 0;

                // Push GA4 purchase event directly to data layer for GTM
                if (typeof window !== "undefined" && win.dataLayer) {
                    win.dataLayer.push({ ecommerce: null }); // Clear previous
                    win.dataLayer.push({
                        event: "purchase",
                        ecommerce: {
                            transaction_id: bookingDetails.booking_ref,
                            value: totalValue,
                            currency: "INR",
                            items: items
                        }
                    });
                }
            }
        }
    }, [status, bookingDetails, eventDetails]);

    if (status === 'failed') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
                    <p className="text-gray-600 mb-8">
                        We couldn&apos;t confirm your booking details. If you were charged, please check your email or contact support.
                    </p>
                    <Link href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors w-full">
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (loading || status === 'processing') {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Verifying Payment</h1>
                    <p className="text-gray-600">Please wait while we confirm your booking...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Success Banner */}
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-gray-600">
                        Thank you for your booking, {bookingDetails?.attendee_name}. We&apos;ve sent your tickets to {bookingDetails?.attendee_email}.
                    </p>
                </div>

                {/* Ticket Details for Printing */}
                {bookingDetails && (
                    <div id="booking-ticket" className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 print:shadow-none print:border-none">
                        <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-sm font-semibold uppercase tracking-wider opacity-80 mb-2">Booking Confirmation</h3>
                                <h2 className="text-3xl font-bold">{eventDetails?.title}</h2>
                            </div>
                            <div className="absolute right-0 top-0 opacity-10 p-4">
                                <Calendar className="w-32 h-32" />
                            </div>
                        </div>
                        
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar className="w-5 h-5 text-blue-600" />
                                        <span>{eventDetails ? new Date(eventDetails.start_datetime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading date...'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                        <span>{eventDetails?.location?.venue_name || 'Event Location'}</span>
                                    </div>
                                </div>
                                <div className="space-y-2 text-right md:text-left">
                                    <div className="text-sm text-gray-400">Booking Reference</div>
                                    <div className="text-xl font-bold text-gray-900 font-mono">{bookingDetails.booking_ref}</div>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 pt-8 flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4 w-full">
                                    <h4 className="font-bold text-gray-900 mb-4">Tickets Details</h4>
                                    <div className="space-y-3">
                                        {bookingDetails.booking_items?.map((item: BookingItem) => (
                                            <div key={item.id} className="flex justify-between items-center text-gray-700 bg-gray-50 p-4 rounded-2xl">
                                                <span>{item.quantity}x {item.ticket_tiers?.name || 'Ticket'}</span>
                                                <span className="font-semibold">₹{item.subtotal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* QR Code Section */}
                                <div className="p-4 bg-white border-2 border-dashed border-gray-100 rounded-3xl shrink-0 flex flex-col items-center gap-2">
                                    <Image 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://strangermingle.com/verify-ticket/${bookingDetails.booking_ref}`)}`}
                                        alt="Ticket QR Code"
                                        width={128}
                                        height={128}
                                        className="w-32 h-32"
                                        unoptimized
                                    />
                                    <span className="text-[10px] font-black font-mono text-gray-400 uppercase tracking-widest">{bookingDetails.booking_ref}</span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 pt-4 print:hidden">
                                <a 
                                    href={`/api/tickets/download/${bookingDetails.id}`}
                                    className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                                    Download Ticket (PDF)
                                </a>
                                <Link href="/events" className="flex-1 inline-flex items-center justify-center px-6 py-4 border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all">
                                    Browse More Events
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <div className="text-center text-sm text-gray-400 mt-8 print:hidden">
                    <p>Having issues? Contact us at strangermingleteam@gmail.com</p>
                    {paymentId && <p className="mt-1 opacity-60">TXN ID: {paymentId}</p>}
                </div>
            </div>
        </div>
    );
}

export default function BookingConfirmedPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <BookingContent />
        </Suspense>
    );
}
