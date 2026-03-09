import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/events/', '/category/', '/city/'],
        disallow: ['/members/', '/admin/', '/auth/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

