'use client';

import { useState, useEffect } from 'react';
import { Event, formatEventPrice, formatEventDate, formatEventTime } from '@/lib/events';
import Image from 'next/image';
import { sendGAEvent } from '@/lib/gtag';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event;
}

declare global {
    interface Window {
        Instamojo: any;
    }
}

export default function PaymentModal({ isOpen, onClose, event }: PaymentModalProps) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [instamojoLoaded, setInstamojoLoaded] = useState(false);

    const price = event.discounted_price && event.discounted_price < (event.regular_price || 0)
        ? event.discounted_price
        : (event.regular_price || 0);

    // Load Instamojo script only for paid events
    useEffect(() => {
        if (!isOpen || instamojoLoaded || price === 0) return;

        const script = document.createElement('script');
        script.src = process.env.NEXT_PUBLIC_INSTAMOJO_CHECKOUT_SCRIPT || 'https://js.instamojo.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
            setInstamojoLoaded(true);
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup on unmount
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, [isOpen, instamojoLoaded, price]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Create order
            const response = await fetch('/api/payments/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId: event.id,
                    name,
                    phone,
                    email: email || null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = data.error || data.message || 'Failed to create order';
                console.error('Order creation failed:', {
                    status: response.status,
                    error: data.error,
                    details: data.details,
                });
                throw new Error(errorMessage);
            }

            // Handle free events - skip payment
            if (data.isFree) {
                // Track free purchase
                sendGAEvent({
                    action: 'purchase',
                    category: 'ecommerce',
                    label: 'Free Event Booking',
                    value: 0,
                    currency: 'INR',
                    transaction_id: data.paymentDetailId,
                    items: [{
                        item_id: event.id,
                        item_name: event.event_name,
                        price: 0,
                        quantity: 1
                    }]
                });

                setLoading(false);
                onClose();
                alert('Booking confirmed successfully! Your spot has been reserved.');
                window.location.reload();
                return;
            }

            if (!window.Instamojo) {
                throw new Error('Instamojo SDK not loaded');
            }

            try {
                window.Instamojo.configure({
                    handlers: {
                        onOpen: () => setLoading(true),
                        onClose: () => setLoading(false),
                    },
                    redirect_mode: 'modal',
                });
            } catch (configError) {
                console.warn('Instamojo configure not available, continuing with open():', configError);
            }

            // Save transaction details for GA4 tracking on confirmation page
            if (typeof window !== 'undefined') {
                sessionStorage.setItem('pendingTransaction', JSON.stringify({
                    amount: price,
                    eventId: event.id,
                    eventName: event.event_name,
                    timestamp: Date.now()
                }));
            }

            window.Instamojo.open(data.longurl);

            // Rely on webhook as source of truth; inform user to await confirmation
            setLoading(false);
            onClose();
            alert('Complete the payment in the popup. You will receive confirmation shortly.');
        } catch (err: any) {
            setError(err.message || 'An error occurred. Please try again.');
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-2 shadow-sm"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Content */}
                <div className="p-8">
                    {/* Event Info */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Complete Your Booking
                        </h2>

                        <div className="flex gap-4">
                            {event.image_url && (
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={event.image_url}
                                        alt={event.event_name || event.title || 'Event'}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {event.event_name}
                                </h3>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatEventDate(event.start_date || event.start_datetime, event.end_date || event.end_datetime)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                        <span>{event.short_address}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                    {formatEventPrice(event.min_price || event.discounted_price || event.regular_price)}
                                </div>
                                {event.discounted_price && event.discounted_price < (event.regular_price || 0) && (
                                    <div className="text-sm text-gray-400 line-through">
                                        ₹{(event.regular_price || 0).toFixed(0)}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                Mobile Number *
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                required
                                pattern="[6-9]\d{9}"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="10-digit mobile number"
                            />
                            <p className="text-xs text-gray-500 mt-1">We'll use this to send booking confirmation</p>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email (Optional)
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading || (price > 0 && !instamojoLoaded)}
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : (price === 0 ? 'Confirm Booking' : `Pay ${formatEventPrice(event.min_price || event.discounted_price || event.regular_price)}`)}
                            </button>
                        </div>

                        <p className="text-xs text-gray-500 text-center">
                            {price === 0 ? (
                                'By confirming, you agree to our Terms & Conditions and Privacy Policy'
                            ) : (
                                'By proceeding, you agree to our Terms & Conditions and Privacy Policy'
                            )}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
