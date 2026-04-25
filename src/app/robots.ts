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
                ],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/sitemap-events.xml`,
        ],
    };
}
