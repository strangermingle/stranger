import { useState, useEffect, useRef } from 'react';
import { Event, formatEventDate } from '@/lib/events';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { sendGAEvent } from '@/lib/gtag';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
    selectedTickets: Record<string, number>;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: string;
    };
}

interface RazorpayInstance {
    open: () => void;
    on: (event: string, callback: (response: { error: { description: string } }) => void) => void;
}

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
        dataLayer: (Record<string, unknown> | unknown[])[];
    }
}

export default function PaymentModal({ isOpen, onClose, event, selectedTickets }: PaymentModalProps) {
    const hasFiredRef = useRef(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const router = useRouter();

    const totalTickets = Object.values(selectedTickets).reduce((a, b) => a + b, 0);
    const totalPrice = event.ticket_tiers?.reduce((sum, tier) => sum + (tier.price * (selectedTickets[tier.id] || 0)), 0) || 0;

    // Load Razorpay script
    useEffect(() => {
        if (!isOpen || razorpayLoaded) return;

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setRazorpayLoaded(true);
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [isOpen, razorpayLoaded]);

    // GA4 Tracking: Begin Checkout
    useEffect(() => {
        if (isOpen && !hasFiredRef.current && event && selectedTickets && typeof window !== 'undefined' && window.dataLayer) {
            const items = Object.entries(selectedTickets)
                .filter(([_, qty]) => qty > 0)
                .map(([tierId, qty]) => {
                    const tier = event.ticket_tiers?.find(t => t.id === tierId);
                    return {
                        item_id: tierId,
                        item_name: tier?.name || 'Ticket',
                        price: tier?.price || 0,
                        quantity: qty
                    };
                });

            if (items.length > 0) {
                window.dataLayer.push({ ecommerce: null }); // Clear previous
                window.dataLayer.push({
                    event: 'begin_checkout',
                    ecommerce: {
                        currency: 'INR',
                        value: totalPrice,
                        items: items
                    }
                });
                hasFiredRef.current = true;
            }
        }
        if (!isOpen) {
            hasFiredRef.current = false;
        }
    }, [isOpen, event, selectedTickets, totalPrice]);

    const handlePaymentSuccess = async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        setLoading(true);
        try {
            const verifyResponse = await fetch('/api/payments/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                }),
            });

            const data = await verifyResponse.json();
            if (!verifyResponse.ok) throw new Error(data.error || 'Verification failed');

            onClose();
            router.push(`/booking-confirmed?booking_id=${data.bookingId}&razorpay_payment_id=${response.razorpay_payment_id}`);
        } catch (err: unknown) {
            setError('Payment verified but booking confirmation failed. Please contact support.');
            console.error('Verification error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        sendGAEvent({
            action: 'qualify_lead',
            category: 'checkout',
            label: `Qualified Lead: ${event.title}`,
            value: totalPrice
        });

        try {
            const tickets = Object.entries(selectedTickets)
                .filter(([_, qty]) => qty > 0)
                .map(([tierId, quantity]) => ({ tierId, quantity }));

            const response = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventId: event.id,
                    name,
                    phone,
                    email: email || null,
                    tickets,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Failed to create order');

            if (data.isFree) {
                onClose();
                router.push(`/booking-confirmed?booking_id=${data.bookingId}&status=success`);
                return;
            }

            const options = {
                key: data.keyId,
                amount: data.amount,
                currency: data.currency,
                name: 'Stranger Mingle',
                description: `Booking for ${event.title}`,
                order_id: data.razorpayOrderId,
                handler: handlePaymentSuccess,
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: '#2563eb',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response: { error: { description: string } }) {
                setError(response.error.description);
                setLoading(false);
            });
            rzp.open();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'An error occurred.');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 bg-white rounded-full p-2 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="p-8">
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete Your Booking</h2>
                        <div className="flex gap-4">
                            {event.cover_image_url && (
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <Image sizes="96px" src={event.cover_image_url} alt={event.title} fill className="object-cover" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        <span>{formatEventDate(event.start_datetime, event.end_datetime)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                                        <span>{event.location?.venue_name || event.location?.city}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">₹{totalPrice}</div>
                                <div className="text-xs text-gray-400">{totalTickets} ticket(s)</div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="Full name" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} required pattern="[6-9]\d{9}" className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="10-digit mobile" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 rounded-xl" placeholder="email@example.com" />
                        </div>
                        {error && <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl">{error}</div>}
                        <button type="submit" disabled={loading || !razorpayLoaded} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg disabled:opacity-50">
                            {loading ? 'Processing...' : `Pay ₹${totalPrice}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
