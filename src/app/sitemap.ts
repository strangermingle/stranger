import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getAllLiveEvents } from '@/lib/events';
import { LIVE_CITIES } from '@/lib/cities';
import { createServerClient } from '@/lib/supabaseClient';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com';

async function getHosts(): Promise<string[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from('host_profiles')
      .select(`
        users!host_profiles_user_id_fkey (
          anonymous_alias
        )
      `)
      .eq('is_approved', true);

    if (error || !data) {
      console.error('Error fetching hosts for sitemap:', error);
      return [];
    }

    return data
      .map((host: any) => host.users?.anonymous_alias)
      .filter((alias): alias is string => typeof alias === 'string' && alias.trim() !== '');
  } catch (err) {
    console.error('Failed to get hosts for sitemap:', err);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/safety-guidelines`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/cookie-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // Missing top-level public pages
    {
      url: `${BASE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/host-an-event`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/host-application`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/partner-with-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/our-partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/success-stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/venue-partnership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/private-events`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/sponsor-an-event`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/live-online-games`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/brand-partnership`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/authors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/venue-partners`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/talk-to-stranger-male-friend-online-only-for-girls`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/know-your-host`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/best-hangout-places`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/media-kit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/workshops`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // City pages and subpages
  const cityPages: MetadataRoute.Sitemap = [];
  LIVE_CITIES.forEach((city) => {
    // Main city page
    cityPages.push({
      url: `${BASE_URL}/${city}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
    // City subpage: house-parties
    cityPages.push({
      url: `${BASE_URL}/${city}/house-parties`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
    // City subpage: make-new-friends
    cityPages.push({
      url: `${BASE_URL}/${city}/make-new-friends`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    });
    // City best hangout places page
    cityPages.push({
      url: `${BASE_URL}/best-hangout-places/${city}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Dynamic blog posts
  const posts = getAllPosts(['slug', 'date']);
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => {
    const date = post.date ? new Date(post.date) : new Date();
    return {
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: isNaN(date.getTime()) ? new Date() : date,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });

  // Dynamic event pages
  const events = await getAllLiveEvents();
  const eventPages: MetadataRoute.Sitemap = events.map((event) => {
    const updatedAt = event.updated_at ? new Date(event.updated_at) : null;
    const createdAt = event.created_at ? new Date(event.created_at) : null;
    let lastModified = new Date();

    if (updatedAt && !isNaN(updatedAt.getTime())) {
      lastModified = updatedAt;
    } else if (createdAt && !isNaN(createdAt.getTime())) {
      lastModified = createdAt;
    }

    return {
      url: `${BASE_URL}/events/${event.slug || event.id}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    };
  });

  // Dynamic host profile pages
  const hostSlugs = await getHosts();
  const hostPages: MetadataRoute.Sitemap = hostSlugs.map((slug) => ({
    url: `${BASE_URL}/know-your-host/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...blogPages, ...eventPages, ...hostPages];
}
