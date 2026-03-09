import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { EventGrid } from '@/components/events/EventGrid'
import { EventWithDetails } from '@/types/api.types'
import Link from 'next/link'

interface PageProps {
  params: { city: string }
}

export async function generateStaticParams() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('locations(city)')
    .eq('status', 'published')

  const cities = Array.from(new Set(data?.map(d => d.locations?.city).filter(Boolean)))
  return cities.map((city) => ({ city }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedCity = decodeURIComponent(params.city)
  const title = `Discover Events in ${decodedCity} — StrangerMingle | Concerts, workshops, meetups and more in ${decodedCity}`
  const description = `Discover the best upcoming offline events, workshops, and meetups in ${decodedCity}. Join the StrangerMingle community for unique local experiences.`
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com'

  return { 
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/city/${params.city}`
    },
    openGraph: {
      title,
      description,
      type: 'website'
    }
  }
}

export default async function CityPage({ params }: PageProps) {
  const supabase = await createClient()
  const decodedCity = decodeURIComponent(params.city)

  const [
    { data: eventsData, count: totalCount },
    { data: featuredData },
    { data: categoriesCountData }
  ] = await Promise.all([
    supabase
      .from('v_events_public')
      .select('*', { count: 'exact' })
      .eq('status', 'published')
      .eq('city', decodedCity)
      .gte('start_datetime', new Date().toISOString())
      .order('start_datetime', { ascending: true }),
    supabase
      .from('v_events_public')
      .select('*')
      .eq('status', 'published')
      .eq('city', decodedCity)
      .eq('is_featured', true)
      .gte('start_datetime', new Date().toISOString())
      .limit(3),
    supabase
      .from('v_events_public')
      .select('category_name, category_slug')
      .eq('status', 'published')
      .eq('city', decodedCity)
      .gte('start_datetime', new Date().toISOString())
  ])

  const events = (eventsData || []) as unknown as EventWithDetails[]
  const featuredEvents = (featuredData || []) as unknown as EventWithDetails[]
  
  // Calculate category counts manually since Supabase select doesn't support GROUP BY well
  const categoryMap: Record<string, { name: string, count: number, slug: string }> = {}
  categoriesCountData?.forEach(item => {
    if (!categoryMap[item.category_slug]) {
      categoryMap[item.category_slug] = { name: item.category_name, count: 0, slug: item.category_slug }
    }
    categoryMap[item.category_slug].count++
  })
  const popularCategories = Object.values(categoryMap).sort((a, b) => b.count - a.count).slice(0, 6)

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="relative py-24 px-4 sm:px-6 lg:px-8 bg-indigo-900 overflow-hidden dark:bg-zinc-900 text-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80"
             alt=""
             className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 to-transparent dark:from-zinc-900" />
        </div>
        
        <div className="relative mx-auto max-w-7xl flex flex-col items-center">
           <h1 className="text-4xl font-black text-white sm:text-6xl">
              {decodedCity}
           </h1>
           <p className="mt-4 max-w-2xl text-xl text-indigo-100">
             Discover {totalCount} upcoming {totalCount === 1 ? 'event' : 'events'} in and around {decodedCity}.
           </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {featuredEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Featured in {decodedCity}</h2>
            <EventGrid events={featuredEvents} />
            <div className="mt-8 border-b border-gray-100 dark:border-zinc-800" />
          </div>
        )}

        {popularCategories.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}?city=${params.city}`}
                  className="p-4 border border-gray-100 dark:border-zinc-800 rounded-2xl hover:border-indigo-500 transition-colors text-center"
                >
                  <span className="block font-bold text-gray-900 dark:text-white">{cat.name}</span>
                  <span className="text-xs text-gray-500">{cat.count} listings</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">All Upcoming Events</h2>
        <EventGrid 
          events={events} 
          emptyMessage={`We couldn't find any upcoming events in ${decodedCity} right now.`}
        />
      </div>
    </div>
  )
}
