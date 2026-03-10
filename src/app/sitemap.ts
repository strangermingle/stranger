import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${SITE_URL}/login`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // 2. Dynamic Event Routes
  const { data: events } = await (supabase
    .from('events') as any)
    .select('slug, updated_at')
    .eq('status', 'published')
  
  const eventRoutes: MetadataRoute.Sitemap = (events || []).map((event: any) => ({
    url: `${SITE_URL}/events/${event.slug}`,
    lastModified: new Date(event.updated_at),
    changeFrequency: 'daily',
    priority: 0.7,
  }))

  // 3. Dynamic Category Routes
  const { data: categories } = await (supabase
    .from('categories') as any)
    .select('slug')
    .eq('is_active', true)

  const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map((cat: any) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // 4. Dynamic City Routes
  const { data: cityData } = await (supabase
    .from('locations') as any)
    .select('city')
  
  const uniqueCities = Array.from(new Set((cityData || []).map((l: any) => l.city).filter(Boolean)))

  
  const cityRoutes: MetadataRoute.Sitemap = uniqueCities.map((city) => ({
    url: `${SITE_URL}/city/${encodeURIComponent(city as string)}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  return [...staticRoutes, ...eventRoutes, ...categoryRoutes, ...cityRoutes]
}

