import { NextRequest, NextResponse } from 'next/server';
import { getEventById, createBooking } from '@/lib/events';
import { createOrUpdateUserProfile } from '@/lib/userProfile';
import { createServerClient } from '@/lib/supabaseClient';
import { createPaymentRequest } from '@/lib/instamojo';

// Rate limiting for payment orders
const orderCache = new Map<string, number[]>();
const ORDER_RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_ORDERS_PER_IP = 10;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const orders = orderCache.get(ip) || [];
    const recentOrders = orders.filter(time => now - time < ORDER_RATE_LIMIT_WINDOW);

    if (recentOrders.length >= MAX_ORDERS_PER_IP) {
        return true;
    }

    recentOrders.push(now);
    orderCache.set(ip, recentOrders);
    return false;
}

function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    return forwarded?.split(',')[0] || realIP || 'unknown';
}

// Sanitize input to prevent XSS
function sanitize(str: string): string {
    if (!str) return '';
    return str
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .trim()
        .substring(0, 200); // Limit length
}

export async function POST(request: NextRequest) {
    try {
        const clientIP = getClientIP(request);

        // Rate limiting
        if (isRateLimited(clientIP)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const { eventId, name, phone, email } = body;

        // Validate required fields
        if (!eventId || !name || !phone) {
            return NextResponse.json(
                { error: 'Missing required fields: eventId, name, and phone are required' },
                { status: 400 }
            );
        }

        // Validate eventId is a valid UUID format
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(eventId)) {
            return NextResponse.json(
                { error: 'Invalid event ID format' },
                { status: 400 }
            );
        }

        // Validate phone number format (basic validation)
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanedPhone = phone.replace(/\D/g, '');
        if (!phoneRegex.test(cleanedPhone)) {
            return NextResponse.json(
                { error: 'Invalid phone number format' },
                { status: 400 }
            );
        }

        // Validate email format if provided
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return NextResponse.json(
                    { error: 'Invalid email format' },
                    { status: 400 }
                );
            }
        }

        // Sanitize inputs
        const sanitizedName = sanitize(name);
        const sanitizedEmail = email ? email.toLowerCase().trim().substring(0, 255) : null;

        // Get event details
        const event = await getEventById(eventId);
        if (!event) {
            return NextResponse.json(
                { error: 'Event not found' },
                { status: 404 }
            );
        }

        // Check if event is sold out
        if ((event as any).available_seats <= (event as any).booked_spots) {
            return NextResponse.json(
                { error: 'Event is sold out' },
                { status: 400 }
            );
        }

        // Check if event is live
        if ((event as any).status !== 'live') {
            return NextResponse.json(
                { error: 'Event is not available for booking' },
                { status: 400 }
            );
        }

        // Calculate price (discounted_price if available, else regular_price)
        const price = (event as any).discounted_price && (event as any).discounted_price < (event as any).regular_price
            ? (event as any).discounted_price
            : (event as any).regular_price;

        // Get current user session if available
        const supabase = createServerClient();
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || null;

        // Create or update user profile
        const userProfile = await createOrUpdateUserProfile({
            phone: cleanedPhone,
            name: sanitizedName,
            email: sanitizedEmail,
            user_id: userId,
        });

        if (!userProfile) {
            return NextResponse.json(
                { error: 'Failed to create user profile' },
                { status: 500 }
            );
        }

        // Handle free events (price = 0) - skip gateway and directly confirm booking
        if (price === 0) {
            // Create payment_details record with status 'completed' for free events
            const paymentDetail = await createBooking({
                event_id: eventId,
                user_id: userId,
                guest_email: sanitizedEmail,
                guest_phone: cleanedPhone,
                spots_booked: 1, // Default to 1 spot per booking
                amount_paid: 0,
                payment_status: 'completed', // Free events are instantly completed
            });

            if (!paymentDetail) {
                console.error('Failed to create payment_detail record. Check server logs for details.');
                return NextResponse.json(
                    {
                        error: 'Failed to create booking record',
                        hint: 'Check server logs for detailed error information. This might be due to RLS policies or database constraints.'
                    },
                    { status: 500 }
                );
            }

            // Update event booked_spots for free events using safe RPC
            const { error: updateError } = await supabase.rpc('increment_booked_spots_safe', {
                p_event_id: eventId,
                p_spots: 1
            });

            if (updateError) {
                console.error('Failed to update booked_spots:', updateError);
                // Don't fail the booking if this fails, but log it
            }

            // Return success response for free events (no Razorpay needed)
            return NextResponse.json({
                isFree: true,
                paymentDetailId: paymentDetail.id,
                message: 'Booking confirmed successfully',
            });
        }

        // Create Instamojo payment request for paid events
        const purpose = (event as any).event_name?.substring(0, 40) || 'Event Booking';
        const redirectUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com'}/booking-confirmed`;
        const webhookUrl = process.env.INSTAMOJO_WEBHOOK_URL || 'https://www.strangermingle.com/api/payments/webhook';

        let paymentRequest;
        try {
            paymentRequest = await createPaymentRequest({
                amount: Number(price.toFixed(2)),
                purpose,
                buyer_name: sanitizedName,
                email: sanitizedEmail,
                phone: cleanedPhone,
                redirect_url: redirectUrl,
                webhook: webhookUrl,
                allow_repeated_payments: false,
                send_email: Boolean(sanitizedEmail),
                send_sms: true,
                metadata: {
                    event_id: eventId,
                    event_name: (event as any).event_name,
                },
            });
        } catch (instaError: any) {
            console.error('Failed to create Instamojo payment request:', instaError);
            return NextResponse.json(
                {
                    error: 'Failed to create payment request',
                    message: instaError?.message || 'Unknown error', // Expose message for quicker debugging
                    details: process.env.NODE_ENV === 'development' ? instaError?.message : undefined,
                },
                { status: 500 }
            );
        }

        // Create payment_details record with status 'pending'
        const paymentDetail = await createBooking({
            event_id: eventId,
            user_id: userId,
            guest_email: sanitizedEmail,
            guest_phone: cleanedPhone,
            spots_booked: 1, // Default to 1 spot per booking
            amount_paid: price,
            payment_status: 'pending',
            instamojo_payment_request_id: paymentRequest.id,
        });

        if (!paymentDetail) {
            console.error('Failed to create payment_detail record. Check server logs for details.');
            return NextResponse.json(
                {
                    error: 'Failed to create payment record',
                    hint: 'Check server logs for detailed error information. This might be due to RLS policies or database constraints.'
                },
                { status: 500 }
            );
        }

        // Return order details to client
        return NextResponse.json({
            paymentRequestId: paymentRequest.id,
            amount: paymentRequest.amount,
            currency: 'INR',
            longurl: paymentRequest.longurl,
            paymentDetailId: paymentDetail.id,
        });
    } catch (error: any) {
        console.error('Error creating Instamojo payment:', error);
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
            message: error.message,
            name: error.name,
            code: error.code,
        });

        // Provide more detailed error message
        let errorMessage = 'Failed to create order';
        if (error.message) {
            errorMessage = error.message;
        } else if (error.error?.description) {
            errorMessage = error.error.description;
        }

        return NextResponse.json(
            {
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
