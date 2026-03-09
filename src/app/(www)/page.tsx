import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { EventGrid } from '@/components/events/EventGrid'
import { CategoryFilter } from '@/components/events/CategoryFilter'
import Link from 'next/link'
import { EventWithDetails } from '@/types/api.types'
import { unstable_cache } from 'next/cache'
import { getAllCategories } from '@/lib/repositories/categories.repository'
import HeroEventBanner from '@/components/events/HeroEventBanner'

export const metadata: Metadata = {
  title: 'StrangerMingle — Discover Events Near You',
  description: 'Find and book the best local events, workshops, and experiences.',
  openGraph: {
    images: ['/images/og-default.jpg'],
  }
}

function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-indigo-900 py-20 sm:py-32 dark:bg-zinc-900">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"
          alt=""
          className="h-full w-full object-cover opacity-20 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent dark:from-zinc-900/80" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
          Discover local <br className="hidden sm:block" />
          <span className="text-indigo-400">experiences</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100 sm:text-xl">
          Join thousands of people finding their next favorite event. From music festivals to intimate workshops, StrangerMingle has it all.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/events"
            className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-indigo-900 shadow-sm transition-colors hover:bg-indigo-50"
          >
            Explore Events
          </Link>
          <Link
            href="/members/become-host"
            className="rounded-full bg-indigo-800/50 px-8 py-3.5 text-base font-semibold text-white shadow-sm ring-1 ring-inset ring-white/20 backdrop-blur-sm transition-colors hover:bg-indigo-800/80"
          >
            Create an Event
          </Link>
        </div>
      </div>
    </div>
  )
}

const getCachedCategories = unstable_cache(
  async () => getAllCategories(),
  ['categories'],
  { revalidate: 3600, tags: ['categories'] }
)

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = await createClient()

  // Parse category query parameter
  const categorySlug = typeof searchParams.category === 'string' ? searchParams.category : undefined

  // 1. Fetch Categories (Cached)
  const categories = await getCachedCategories()

  // 2. Fetch Events from v_events_public
  let query = supabase
    .from('v_events_public')
    .select('*')
    .eq('status', 'published')
    .gte('start_datetime', new Date().toISOString())

  if (categorySlug) {
    query = query.eq('category_slug', categorySlug)
  }

  // Complex ordering: featured first, then chronologically
  query = query.order('is_featured', { ascending: false }).order('start_datetime', { ascending: true })
  
  const { data: eventsData } = await query

  // Map to strongly typed structure. The view loosely matches our type but we enforce it
  const events = (eventsData || []) as unknown as EventWithDetails[]
  const featuredOnly = events.filter(e => e.is_featured)

  // 3. Recommended Events (Simplified: just some upcoming ones not in the main list)
  const recommendations = events.filter(e => !e.is_featured).slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              {categorySlug ? `${categories.find(c => c.slug === categorySlug)?.name || 'Filtered'} Events` : 'Trending Events'}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Find exactly what you're looking for.
            </p>
          </div>
          
          {categories.length > 0 && (
             <div className="w-full sm:w-auto overflow-hidden">
               <CategoryFilter categories={categories} selectedSlug={categorySlug} />
             </div>
          )}
        </div>

        {!categorySlug && featuredOnly.length > 0 && (
          <div className="mb-12">
            <HeroEventBanner events={featuredOnly} />
          </div>
        )}

        <EventGrid events={events} emptyMessage="No upcoming events found for this selection." />

        {recommendations.length > 0 && !categorySlug && (
          <div className="mt-24">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8 italic underline decoration-indigo-500 underline-offset-8">Recommended for You</h2>
            <EventGrid events={recommendations} />
          </div>
        )}
        
        {events.length > 0 && (
           <div className="mt-12 text-center">
              <Link href="/events" className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-200 dark:hover:bg-zinc-800">
                 View all events
              </Link>
           </div>
        )}
      </section>
    </div>
  )
}
