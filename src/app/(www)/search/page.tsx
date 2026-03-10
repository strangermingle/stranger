import { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { EventGrid } from '@/components/events/EventGrid'
import { SearchFilters } from '@/components/events/SearchFilters'
import { EventWithDetails } from '@/types/api.types'
import Link from 'next/link'
import { SaveSearchButton } from '@/components/events/SaveSearchButton'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
  const q = searchParams.q as string | undefined
  const city = searchParams.city as string | undefined
  const category = searchParams.category as string | undefined

  let title = 'Search Events — StrangerMingle'
  if (q) title = `Results for "${q}" — StrangerMingle`
  else if (city) title = `Events in ${city} — StrangerMingle`
  else if (category) title = `${category} Events — StrangerMingle`

  const description = `Discover upcoming offline events, workshops, and meetups. Filter by city, category, and date to find your next unique experience on StrangerMingle.`

  return { 
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website'
    }
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = await createClient()

  // Parse filters
  const q = searchParams.q as string | undefined
  const city = searchParams.city as string | undefined
  const categoryStr = searchParams.category as string | undefined
  const eventType = searchParams.event_type as string | undefined
  const page = parseInt((searchParams.page as string) || '1', 10)
  
  const pageSize = 12
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  // 1. Fetch filter dependencies (Cities and Categories)
  const [
    { data: citiesData },
    { data: categoriesData }
  ] = await Promise.all([
    (supabase.from('locations') as any).select('city').order('city'),
    (supabase.from('categories') as any).select('slug, name').eq('is_active', true).order('sort_order')
  ])

  // Get unique valid cities
  const uniqueCities = Array.from(new Set(citiesData?.map((c: any) => c.city).filter(Boolean))) as string[]
  const categories = categoriesData || []

  // 2. Build Query on v_events_public
  let query = (supabase
    .from('v_events_public') as any)
    .select('*', { count: 'exact' })
    .eq('status', 'published')
    .gte('start_datetime', new Date().toISOString())

  if (q) {
    // Basic text search utilizing Supabase's wrapper mapped to PostgreSQL fts
    query = query.textSearch('title', q, { type: 'websearch', config: 'english' })
  }
  
  if (city) {
    query = query.eq('city', city)
  }
  
  if (categoryStr) {
    query = query.eq('category_slug', categoryStr)
  }

  if (eventType) {
    query = query.eq('event_type', eventType)
  }

  // Finalize pagination & sorting
  const { data: eventsData, count, error } = await query
    .order('start_datetime', { ascending: true })
    .range(from, to)

  const events = (eventsData || []) as unknown as EventWithDetails[]
  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      <div className="bg-white border-b border-gray-200 dark:bg-zinc-900 dark:border-zinc-800 py-6 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div>
               <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">
                  {q ? `Results for "${q}"` : 'Discover Events'}
               </h1>
               <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {totalCount} {totalCount === 1 ? 'event' : 'events'} found
               </p>
             </div>
             
             {/* Save Search Button */}
             <div className="shrink-0">
               <SaveSearchButton 
                 currentQuery={q || ''} 
                 currentCity={city || null} 
                 currentCategory={categoryStr || null} 
               />
             </div>
           </div>

           <div className="mt-8">
             <SearchFilters 
               categories={categories} 
               cities={uniqueCities} 
               initialKeyword={q || ''} 
             />
           </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <EventGrid 
          events={events} 
          emptyMessage="No events match your current filters. Try adjusting your search."
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
              const params = new URLSearchParams(searchParams as Record<string, string>)
              params.set('page', p.toString())
              const isActive = p === page

              return (
                <Link
                  key={p}
                  href={`/search?${params.toString()}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors
                    ${isActive 
                      ? 'border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
                    }
                  `}
                >
                  {p}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
