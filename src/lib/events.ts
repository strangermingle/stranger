import { supabase as sharedClient, createAdminClient } from './supabaseClient';
import { callRpc } from './rpc-client';
import { toISTISOString, formatEventDate, formatEventTime } from './date-utils';

export { toISTISOString, formatEventDate, formatEventTime };


export interface TicketTier {
    id: string;
    event_id: string;
    name: string;
    description: string | null;
    tier_type: 'free' | 'paid' | 'donation';
    price: number;
    currency: string;
    total_quantity: number;
    sold_count: number;
    reserved_count: number;
    max_per_booking: number;
    min_per_booking: number;
    sale_start_at: string | null;
    sale_end_at: string | null;
    is_active: boolean;
    is_visible: boolean;
    sort_order: number;
}

export interface EventReview {
    id: string;
    event_id: string;
    user_id: string;
    rating: number;
    title: string | null;
    review_text: string | null;
    rating_venue?: number;
    rating_host?: number;
    rating_value?: number;
    helpful_count: number;
    created_at: string;
    user?: {
        username: string;
        avatar_url: string | null;
    };
}

export interface EventImage {
    id: string;
    event_id: string;
    image_url: string;
    alt_text: string | null;
    is_cover: boolean;
    sort_order: number;
}

export interface EventFAQ {
    id: string;
    event_id: string;
    question: string;
    answer: string;
    sort_order: number;
}

export interface EventAgenda {
    id: string;
    event_id: string;
    title: string;
    description: string | null;
    speaker: string | null;
    starts_at: string | null;
    ends_at: string | null;
    sort_order: number;
}

export interface EventTag {
    event_id: string;
    tag_id: string;
    tag?: {
        name: string;
        slug: string;
    };
}

export interface EventCohost {
    id: string;
    event_id: string;
    host_user_id: string;
    role: string | null;
    is_confirmed: boolean;
    user?: {
        username: string;
        avatar_url: string | null;
    };
}

// Database view interfaces
export interface PublicEventRow {
    id: string;
    location_id: string | null;
    title: string;
    slug: string;
    description: string | null;
    short_description: string | null;
    cover_image_url: string | null;
    event_type: 'in_person' | 'online' | 'hybrid';
    status: 'draft' | 'published' | 'cancelled' | 'completed' | 'suspended' | 'under_review';
    start_datetime: string;
    end_datetime: string;
    timezone: string;
    ticketing_mode: 'platform' | 'external' | 'free' | 'rsvp' | 'none';
    max_capacity: number | null;
    booking_count: number;
    likes_count: number;
    saves_count: number;
    views_count?: number;
    interests_count?: number;
    reviews_count?: number;
    is_recurring: boolean;
    created_at: string;
    updated_at: string;
    meta_description: string | null;
    meta_title: string | null;
    category_name: string;
    category_slug: string;
    category_color: string;
    venue_name: string | null;
    city: string | null;
    state: string | null;
    country: string;
    address_line1: string | null;
    address_line2: string | null;
    postal_code: string | null;
    latitude: number | null;
    longitude: number | null;
    google_maps_url: string | null;
    place_id: string | null;
    host_username: string;
    host_alias: string | null;
    host_display_name: string;
    host_logo: string | null;
    host_tagline: string | null;
}

export interface TicketAvailabilityRow {
    event_id: string;
    tier_id: string;
    tier_name: string;
    tier_type: string;
    price: number;
    currency: string;
    total_quantity: number;
    sold_count: number;
    reserved_count: number;
}

// Database Event interface matching the new database schema
export interface Event {
    id: string;
    host_id: string;
    category_id: string;
    location_id: string | null;
    title: string;
    slug: string;
    description: string | null;
    short_description: string | null;
    cover_image_url: string | null;
    event_type: 'in_person' | 'online' | 'hybrid';
    status: 'draft' | 'published' | 'cancelled' | 'completed' | 'suspended' | 'under_review';
    start_datetime: string; // ISO date string
    end_datetime: string; // ISO date string
    timezone: string;
    ticketing_mode: 'platform' | 'external' | 'free' | 'rsvp' | 'none';
    max_capacity: number | null;
    booking_count: number;
    likes_count: number;
    saves_count: number;
    views_count?: number;
    interests_count?: number;
    reviews_count?: number;
    rating_avg?: number;
    created_at: string;
    updated_at: string;
    meta_description?: string | null;
    meta_title?: string | null;

    // Joins
    ticket_tiers?: TicketTier[];
    category?: {
        name: string;
    } | null;
    host?: {
        id: string;
        username: string;
        anonymous_alias?: string;
        host_profile: {
            id: string;
            display_name: string;
            profile_image: string | null;
            tagline: string | null;
            city: string | null;
            follower_count: number;
            rating_avg: number;
            total_events_hosted: number;
            anonymous_alias?: string; // Duplicate for easy access
        } | null;
    } | null;
    location?: {
        venue_name: string | null;
        address_line1: string | null;
        address_line2: string | null;
        city: string | null;
        state: string | null;
        country: string;
        postal_code: string | null;
        latitude: number | null;
        longitude: number | null;
        google_maps_url: string | null;
        place_id: string | null;
    } | null;
    event_images?: EventImage[];
    event_faqs?: EventFAQ[];
    event_agenda?: EventAgenda[];
    event_tags?: EventTag[];
    event_cohosts?: EventCohost[];
    event_reviews?: EventReview[];
    is_recurring: boolean;
    
    // User interactions (set on fetch if user is logged in)
    user_has_liked?: boolean;
    user_has_saved?: boolean;
    user_has_booked?: boolean;
}

// PaymentDetail interface matching public.bookings
export interface PaymentDetail {
    id: string;
    booking_ref: string;
    user_id: string | null;
    event_id: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'refunded' | 'partially_refunded' | 'failed' | 'expired';
    payment_status: 'unpaid' | 'paid' | 'refunded' | 'partially_refunded' | 'failed';
    subtotal: number;
    discount_amount: number;
    total_amount: number;
    currency: string;
    razorpay_order_id: string | null;
    razorpay_payment_id: string | null;
    razorpay_signature: string | null;
    paid_at: string | null;
    attendee_name: string;
    attendee_email: string;
    attendee_phone: string | null;
    created_at: string;
    updated_at: string;
}

// Keep Booking as alias for backward compatibility
export type Booking = PaymentDetail;

// Event status suggestion based on dates and capacity
export function calculateEventStatus(event: Event): 'published' | 'cancelled' | 'completed' | 'suspended' {
    // If manually set to cancelled, keep it
    if (event.status === 'cancelled') {
        return 'cancelled';
    }

    const now = new Date();
    const endDate = new Date(event.end_datetime);

    // If event has passed, suggest completed
    if (endDate < now) {
        return 'completed';
    }

    // If fully booked, suggest completed (or handle via availability check)
    if (event.max_capacity && event.booking_count >= event.max_capacity) {
        return 'completed';
    }

    return 'published';
}

// Format event for display (helper functions)
export function formatEventPrice(event: Event): string {
    if (event.ticketing_mode === 'free') {
        return 'Free';
    }

    if (!event.ticket_tiers || event.ticket_tiers.length === 0) {
        return 'Contact for Price';
    }

    if (!event.ticket_tiers || event.ticket_tiers.length === 0) return 'TBA';

    // Get the lowest price from active tiers
    const activeTiers = event.ticket_tiers.filter(t => t.is_active !== false);
    if (activeTiers.length === 0) {
        const anyTiers = event.ticket_tiers;
        if (anyTiers.length === 0) return 'TBA';
        const minP = Math.min(...anyTiers.map(t => t.price));
        return `₹${minP.toFixed(0)}`;
    }

    const minPrice = Math.min(...activeTiers.map(t => t.price));
    const maxPrice = Math.max(...activeTiers.map(t => t.price));

    if (minPrice === 0 && maxPrice === 0) return 'Free';
    if (minPrice === maxPrice) return `₹${minPrice.toFixed(0)}`;

    return `₹${minPrice.toFixed(0)} - ₹${maxPrice.toFixed(0)}`;
}



/**
 * Returns an ISO string representation in Asia/Kolkata (+05:30)
 * Example: 2026-03-29T14:00:00+05:30
 */


export function getSpotsLabel(event: Event): string {
    if (!event.max_capacity) return 'Open';

    const remaining = event.max_capacity - event.booking_count;

    if (remaining <= 0) {
        return 'Sold Out';
    }

    if (remaining <= 3) {
        return 'Few Left';
    }

    if (remaining <= event.max_capacity * 0.2) {
        return 'Filling Fast';
    }

    if (remaining <= event.max_capacity * 0.5) {
        return 'Limited Spots';
    }

    return 'Open';
}

// Database query functions
export async function getEventsByCity(city: string): Promise<Event[]> {
    return callRpc('events', 'getEventsByCity', [city], { useCookies: false, cache: 'no-store' });
}

function mapPublicViewToEvent(row: PublicEventRow, tiers: TicketAvailabilityRow[]): Event {
    const eventTiers = tiers
        .filter(t => t.event_id === row.id)
        .map(t => ({
            id: t.tier_id,
            event_id: t.event_id,
            name: t.tier_name,
            description: null,
            tier_type: t.tier_type as TicketTier['tier_type'],
            price: Number(t.price),
            currency: t.currency,
            total_quantity: t.total_quantity,
            sold_count: t.sold_count,
            reserved_count: t.reserved_count,
            max_per_booking: 5, // Default
            min_per_booking: 1, // Default
            sale_start_at: null,
            sale_end_at: null,
            is_active: true,
            is_visible: true,
            sort_order: 0
        }));

    // Calculate total capacity and bookings from tiers if they are the source of truth
    const calculatedMaxCapacity = eventTiers.reduce((sum, t) => sum + (t.total_quantity || 0), 0);
    const calculatedBookingCount = eventTiers.reduce((sum, t) => sum + (t.sold_count || 0), 0);

    return {
        id: row.id,
        host_id: '', // Not in view but needed for type
        category_id: '', // Not in view but needed for type
        location_id: row.location_id || null,
        title: row.title,
        slug: row.slug,
        description: row.description || null,
        short_description: row.short_description,
        cover_image_url: row.cover_image_url,
        event_type: row.event_type as Event['event_type'],
        status: row.status as Event['status'],
        start_datetime: row.start_datetime,
        end_datetime: row.end_datetime,
        timezone: row.timezone,
        ticketing_mode: row.ticketing_mode as Event['ticketing_mode'],
        max_capacity: calculatedMaxCapacity || row.max_capacity,
        booking_count: calculatedBookingCount || row.booking_count,
        likes_count: row.likes_count,
        saves_count: row.saves_count,
        views_count: row.views_count,
        interests_count: row.interests_count,
        reviews_count: row.reviews_count,
        created_at: row.created_at || '',
        updated_at: row.updated_at || '',
        meta_description: row.meta_description,
        meta_title: row.meta_title,
        category: {
            name: row.category_name
        },
        location: {
            venue_name: row.venue_name,
            address_line1: row.address_line1,
            address_line2: row.address_line2,
            city: row.city,
            state: row.state,
            country: row.country,
            postal_code: row.postal_code,
            latitude: row.latitude ? Number(row.latitude) : null,
            longitude: row.longitude ? Number(row.longitude) : null,
            google_maps_url: row.google_maps_url,
            place_id: row.place_id
        },
        host: {
            id: '',
            username: row.host_username,
            anonymous_alias: row.host_alias || undefined,
            host_profile: {
                id: '',
                display_name: row.host_display_name,
                profile_image: row.host_logo,
                tagline: row.host_tagline,
                city: row.city,
                follower_count: 0,
                rating_avg: 0,
                total_events_hosted: 0,
                anonymous_alias: row.host_alias || undefined
            }
        },
        ticket_tiers: eventTiers,
        is_recurring: row.is_recurring
    };
}

export async function getAllLiveEvents(): Promise<Event[]> {
    return callRpc('events', 'getAllLiveEvents', [], { useCookies: false, cache: 'no-store' });
}

export async function getFeaturedEvents(limit: number = 6): Promise<Event[]> {
    return callRpc('events', 'getFeaturedEvents', [limit], { useCookies: false, cache: 'no-store' });
}

export async function getSponsoredEvents(limit: number = 3): Promise<Event[]> {
    return callRpc('events', 'getSponsoredEvents', [limit], { useCookies: false, cache: 'no-store' });
}

export async function getAllCompletedEvents(): Promise<Event[]> {
    return callRpc('events', 'getAllCompletedEvents', [], { useCookies: false, cache: 'no-store' });
}


export async function getEventById(id: string): Promise<Event | null> {
    return callRpc('events', 'getEventById', [id]);
}

// Public event query - only returns 'published' or 'completed' events (not 'cancelled')
export async function getPublicEventById(id: string): Promise<Event | null> {
    return callRpc('events', 'getPublicEventById', [id], { useCookies: false, cache: 'no-store' });
}


// Public event query by slug - only returns 'published' or 'completed' events (not 'cancelled')
export async function getPublicEventBySlug(slug: string): Promise<Event | null> {
    return callRpc('events', 'getPublicEventBySlug', [slug], { useCookies: false, cache: 'no-store' });
}

export async function createBooking(bookingData: {
    event_id: string;
    user_id?: string | null;
    attendee_name: string;
    attendee_email: string;
    attendee_phone?: string | null;
    total_amount: number;
    subtotal: number;
    discount_amount?: number;
    payment_status?: 'unpaid' | 'paid' | 'failed';
    razorpay_order_id?: string | null;
    items: {
        ticket_tier_id: string;
        quantity: number;
        unit_price: number;
        subtotal: number;
    }[];
}): Promise<Booking | null> {
    return callRpc('events', 'createBooking', [bookingData]);
}

/**
 * Get upcoming events for a city, falling back to other cities if needed
 */
export async function getUpcomingEventsForCity(city: string, limit: number = 6): Promise<Event[]> {
    return callRpc('events', 'getUpcomingEventsForCity', [city, limit], { useCookies: false, cache: 'no-store' });
}

/**
 * Get events by host display name
 */
export async function getEventsByHostDisplayName(displayName: string): Promise<Event[]> {
    return callRpc('events', 'getEventsByHostDisplayName', [displayName]);
}
export async function getUpcomingEvents(limit: number = 6): Promise<Event[]> {
    return callRpc('events', 'getUpcomingEvents', [limit], { useCookies: false, cache: 'no-store' });
}

export async function getWeekendEvents(limit: number = 6): Promise<Event[]> {
    return callRpc('events', 'getWeekendEvents', [limit], { useCookies: false, cache: 'no-store' });
}

export async function getTrendingEvents(limit: number = 2): Promise<Event[]> {
    return callRpc('events', 'getTrendingEvents', [limit], { useCookies: false, cache: 'no-store' });
}

/**
 * Get only online events
 */
export async function getOnlineEvents(limit: number = 10): Promise<Event[]> {
    return callRpc('events', 'getOnlineEvents', [limit], { useCookies: false, cache: 'no-store' });
}

/**
 * Get only recurring events
 */
export async function getRecurringEvents(limit: number = 10): Promise<Event[]> {
    return callRpc('events', 'getRecurringEvents', [limit], { useCookies: false, cache: 'no-store' });
}

export interface VenuePartner {
    venue_name: string;
    city: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    google_maps_url: string | null;
    event_count: number;
    // New rich metadata
    description?: string | null;
    cover_image_url?: string | null;
    website_url?: string | null;
    rating_avg?: number;
    rating_count?: number;
    amenities?: string[] | null;
    is_active?: boolean;
}

export async function getAllVenuePartners(): Promise<VenuePartner[]> {
    return callRpc('events', 'getAllVenuePartners', [], { useCookies: false, cache: 'no-store' });
}

export async function getVenuePartnersByCity(city: string): Promise<VenuePartner[]> {
    return callRpc('events', 'getVenuePartnersByCity', [city], { useCookies: false, cache: 'no-store' });
}

export async function getUpcomingVenuePartners(): Promise<VenuePartner[]> {
    return callRpc('events', 'getUpcomingVenuePartners', [], { useCookies: false, cache: 'no-store' });
}
