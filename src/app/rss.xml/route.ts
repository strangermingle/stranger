import { NextResponse } from 'next/server';
import { getAllLiveEvents } from '@/lib/events';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com';

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
    try {
        // Fetch all live events
        const events = await getAllLiveEvents();

        // Build RSS XML
        const rssItems = events.map((event) => {
            const eventSlug = event.slug || event.id;
            const url = `${BASE_URL}/events/${eventSlug}`;
            
            // Use updated_at if available, otherwise use created_at
            let pubDate = new Date();
            const updatedAt = event.updated_at ? new Date(event.updated_at) : null;
            const createdAt = event.created_at ? new Date(event.created_at) : null;

            if (updatedAt && !isNaN(updatedAt.getTime())) {
                pubDate = updatedAt;
            } else if (createdAt && !isNaN(createdAt.getTime())) {
                pubDate = createdAt;
            }

            const description = event.short_description || event.description || 'Join us for this exciting event!';
            
            return `    <item>
      <title>${escapeXml(event.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="false">${event.id}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <description>${escapeXml(description)}</description>
      ${event.category?.name ? `<category>${escapeXml(event.category.name)}</category>` : ''}
    </item>`;
        }).join('\n');

        const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Stranger Mingle Events</title>
    <link>${BASE_URL}/events</link>
    <description>Latest events and meetups from Stranger Mingle</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

        // Return XML with proper headers
        return new NextResponse(rss, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
            },
        });
    } catch (error) {
        console.error('Error generating events RSS feed:', error);

        // Return empty RSS on error
        const emptyRss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Stranger Mingle Events</title>
    <link>${BASE_URL}/events</link>
    <description>Latest events and meetups from Stranger Mingle</description>
  </channel>
</rss>`;

        return new NextResponse(emptyRss, {
            status: 200,
            headers: {
                'Content-Type': 'application/xml; charset=utf-8',
            },
        });
    }
}

// Helper function to escape special XML characters
function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}
