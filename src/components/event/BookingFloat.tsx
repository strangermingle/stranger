'use client';

import React from 'react';
import { Ticket } from 'lucide-react';
import { sendGAEvent } from "@/lib/gtag";

const BookingFloat = () => {
    const handleClick = () => {
        sendGAEvent({
            action: 'generate_lead',
            category: 'lead',
            label: 'Floating Book Button'
        });
        sendGAEvent({
            action: 'booking_float_click',
            category: 'booking_float',
            label: 'Floating Book Button'
        });
        
        // Scroll to booking section
        const bookingSection = document.getElementById('booking-section');
        if (bookingSection) {
            const offset = 100; // Account for sticky headers if any
            const elementPosition = bookingSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 left-6 z-[999] group flex items-center justify-center p-0 border-none bg-transparent"
            aria-label="Book your spot now"
        >
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-3 py-1.5 bg-gray-900 text-white text-sm font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none">
                Book My Spot ⚡
            </span>

            {/* Ripple Effect */}
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></span>

            {/* Main Button */}
            <div className="relative w-20 h-20 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 border-2 border-white/20">
                <Ticket className="w-7 h-7" />
            </div>
        </button>
    );
};

export default BookingFloat;
