import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/cdn-cgi/',
                    '/booking-confirmed',
                    '/reset-password',
                    '/verify-membership',
                    '/members/calls',
                    '/members/chat',
                    '/members/games',
                    '/members/groups',
                    '/members/profile',
                    '/members/coupons',
                    '/members/travel',
                    '/phone-a-friend/call/',
                ],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/sitemap-events.xml`,
        ],
    };
}
