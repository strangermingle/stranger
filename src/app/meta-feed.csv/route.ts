import { NextResponse } from 'next/server';
import { getAllLiveEvents, Event } from '@/lib/events';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com';

// Dynamic route with revalidation every hour
export const dynamic = 'force-dynamic';
export const revalidate = 3600;

/**
 * Escapes a cell value according to RFC 4180 CSV specifications:
 * - Replaces null/undefined with empty quotes
 * - Converts newlines to spaces or escapes them
 * - Wraps in double quotes and doubles any internal quotes
 */
function escapeCsvCell(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return '""';
    const stringValue = String(value)
        .replace(/[\r\n]+/g, ' ') // Convert linebreaks to spaces for cleaner catalog display
        .trim();
    const escaped = stringValue.replace(/"/g, '""');
    return `"${escaped}"`;
}

/**
 * Strips HTML tags and excessive whitespace from rich text descriptions
 */
function cleanDescription(rawText: string | null | undefined): string {
    if (!rawText) return 'Join Stranger Mingle for an incredible social experience.';
    const textWithoutHtml = rawText.replace(/<[^>]*>/g, ' ');
    const normalized = textWithoutHtml.replace(/\s+/g, ' ').trim();
    return normalized.slice(0, 5000);
}

/**
 * Resolves absolute URL for image
 */
function resolveImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
        return `${BASE_URL}/facebook.jpg`;
    }
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }
    const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${BASE_URL}${cleanPath}`;
}

export async function GET() {
    try {
        const events = await getAllLiveEvents();

        // CSV Header required and recommended by Meta Commerce Manager
        const headers = [
            'id',
            'title',
            'description',
            'availability',
            'condition',
            'price',
            'link',
            'image_link',
            'brand',
            'item_group_id',
            'google_product_category',
            'custom_label_0', // City / Location
            'custom_label_1', // Category / Genre
            'custom_label_2', // Event Type (in_person, online)
            'custom_label_3', // Event Date (YYYY-MM-DD)
        ];

        const rows: string[] = [];

        events.forEach((event: Event) => {
            const eventSlug = event.slug || event.id;
            const eventUrl = `${BASE_URL}/events/${eventSlug}`;
            const eventImage = resolveImageUrl(event.cover_image_url);
            const city = event.location?.city || 'India';
            const categoryName = event.category?.name || 'Social Meetup';
            const eventDateStr = event.start_datetime
                ? new Date(event.start_datetime).toISOString().split('T')[0]
                : '';

            // 1. Determine Event-level availability & base price
            const isEventSoldOut = Boolean(
                event.max_capacity &&
                event.max_capacity > 0 &&
                event.booking_count >= event.max_capacity
            );
            const eventAvailability = isEventSoldOut ? 'out of stock' : 'in stock';

            let basePrice = 0;
            let currency = 'INR';

            if (event.ticket_tiers && event.ticket_tiers.length > 0) {
                const activeTiers = event.ticket_tiers.filter(t => t.is_active !== false);
                const tiersToCheck = activeTiers.length > 0 ? activeTiers : event.ticket_tiers;
                basePrice = Math.min(...tiersToCheck.map(t => Number(t.price) || 0));
                currency = tiersToCheck[0].currency || 'INR';
            }

            const formattedEventPrice = `${basePrice.toFixed(2)} ${currency}`;
            const description = cleanDescription(
                event.short_description || event.description || event.meta_description
            );

            // Add parent Event item (matches Meta Pixel ViewContent content_ids: [event.id])
            rows.push([
                escapeCsvCell(event.id),
                escapeCsvCell(event.title),
                escapeCsvCell(description),
                escapeCsvCell(eventAvailability),
                escapeCsvCell('new'),
                escapeCsvCell(formattedEventPrice),
                escapeCsvCell(eventUrl),
                escapeCsvCell(eventImage),
                escapeCsvCell('Stranger Mingle'),
                escapeCsvCell(event.id), // item_group_id
                escapeCsvCell('Media > Tickets > Event Tickets'),
                escapeCsvCell(city),
                escapeCsvCell(categoryName),
                escapeCsvCell(event.event_type || 'in_person'),
                escapeCsvCell(eventDateStr)
            ].join(','));

            // 2. Add individual Ticket Tiers as child variants if available
            if (event.ticket_tiers && event.ticket_tiers.length > 0) {
                event.ticket_tiers.forEach(tier => {
                    const isTierSoldOut = Boolean(
                        tier.total_quantity &&
                        tier.total_quantity > 0 &&
                        tier.sold_count >= tier.total_quantity
                    );
                    const tierAvailability = isTierSoldOut ? 'out of stock' : 'in stock';
                    const tierPrice = `${Number(tier.price || 0).toFixed(2)} ${tier.currency || 'INR'}`;
                    const tierTitle = `${event.title} - ${tier.name}`;
                    const tierDescription = cleanDescription(
                        tier.description || event.short_description || event.description
                    );

                    rows.push([
                        escapeCsvCell(tier.id),
                        escapeCsvCell(tierTitle),
                        escapeCsvCell(tierDescription),
                        escapeCsvCell(tierAvailability),
                        escapeCsvCell('new'),
                        escapeCsvCell(tierPrice),
                        escapeCsvCell(eventUrl),
                        escapeCsvCell(eventImage),
                        escapeCsvCell('Stranger Mingle'),
                        escapeCsvCell(event.id), // links tier to parent event
                        escapeCsvCell('Media > Tickets > Event Tickets'),
                        escapeCsvCell(city),
                        escapeCsvCell(categoryName),
                        escapeCsvCell(tier.name), // custom_label_2 has tier variant name
                        escapeCsvCell(eventDateStr)
                    ].join(','));
                });
            }
        });

        const csvContent = [headers.join(','), ...rows].join('\n');

        return new NextResponse(csvContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'inline; filename="meta-catalog.csv"',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    } catch (error) {
        console.error('Error generating Meta catalog CSV feed:', error);

        // Fallback minimal valid CSV with header only on error
        const fallbackHeaders = 'id,title,description,availability,condition,price,link,image_link,brand\n';
        return new NextResponse(fallbackHeaders, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'inline; filename="meta-catalog.csv"',
            },
        });
    }
}
