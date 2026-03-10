import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EventGrid } from '@/components/events/EventGrid'
import { EventWithDetails } from '@/types/api.types'
import Link from 'next/link'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: category } = await (supabase.from('categories') as any).select('name, description').eq('slug', slug).single()

  if (!category) return { title: 'Category Not Found' }
  
  const title = `${category.name} Events — StrangerMingle`
  const description = category.description || `Discover upcoming ${category.name.toLowerCase()} events, workshops, and meetups on StrangerMingle.`
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.strangermingle.com'

  return { 
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/category/${slug}`
    },
    openGraph: {
      title,
      description,
      type: 'website'
    }
  }
}

export const dynamic = 'force-dynamic'


export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  // 1. Fetch category
  const { data: category } = await (supabase.from('categories') as any).select('*').eq('slug', slug).single()
  if (!category) notFound()

  // 2. Fetch events
  const { data: eventsData } = await (supabase
    .from('v_events_public') as any)
    .select('*')
    .eq('status', 'published')
    .eq('category_slug', slug)
    .gte('start_datetime', new Date().toISOString())
    .order('start_datetime', { ascending: true })

  const events = (eventsData || []) as unknown as EventWithDetails[]

  // 3. Fetch subcategories
  const { data: subcategories } = await supabase
    .from('categories')
    .select('name, slug, color_hex')
    .eq('parent_id', category.id)
    .eq('is_active', true) as any

  // 4. Fetch featured hosts in this category
  // This is a bit complex as we need to join host_profiles with events to find hosts who have hosted in this category
  const { data: hostsData } = await supabase
    .from('host_profiles')
    .select(`
      id,
      display_name,
      logo_url,
      tagline,
      rating_avg,
      user:users!host_profiles_user_id_fkey ( username )
    `)
    .limit(4) as any // Simplified for now, in prod you'd filter by category usage

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div 
        className="relative py-20 px-4 sm:px-6 lg:px-8 text-center"
        style={{ backgroundColor: category.color_hex || '#4f46e5' }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-7xl flex flex-col items-center">
           {category.icon_url && (
              <div className="mb-4 h-16 w-16 overflow-hidden rounded-xl bg-white/20 p-3 backdrop-blur-md">
                 <img src={category.icon_url} alt="" className="h-full w-full object-contain" />
              </div>
           )}
           <h1 className="text-4xl font-black text-white sm:text-5xl">
              {category.name} Events
           </h1>
           {category.description && (
             <p className="mt-4 max-w-2xl text-lg text-white/90">
               {category.description}
             </p>
           )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {subcategories && subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Explore {category.name}</h2>
            <div className="flex flex-wrap gap-3">
              {subcategories.map((sub: any) => (
                <Link
                  key={sub.slug}
                  href={`/category/${sub.slug}`}
                  className="px-4 py-2 rounded-full border border-gray-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors text-sm font-medium"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Upcoming Events</h2>
            <EventGrid 
              events={events} 
              emptyMessage={`We couldn't find any upcoming ${category.name.toLowerCase()} events right now.`}
            />
          </div>

          {hostsData && hostsData.length > 0 && (
            <div className="lg:w-80 shrink-0">
               <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Top Hosts</h2>
               <div className="space-y-6">
                  {hostsData?.map((host: any) => (
                   <Link 
                    key={host.id} 
                    href={`/hosts/${host.user.username}`}
                    className="flex items-center gap-4 group"
                   >
                     <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                       <img src={host.logo_url || '/placeholder-host.jpg'} alt="" className="h-full w-full object-cover" />
                     </div>
                     <div className="min-w-0">
                       <h3 className="font-bold text-gray-900 dark:text-white truncate group-hover:text-indigo-600 transition-colors">{host.display_name}</h3>
                       <p className="text-xs text-gray-500 truncate">{host.tagline || 'Verified Host'}</p>
                     </div>
                   </Link>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>

      {/* JSON-LD breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": process.env.NEXT_PUBLIC_SITE_URL
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": category.name,
                "item": `${process.env.NEXT_PUBLIC_SITE_URL}/category/${slug}`
              }
            ]
          }),
        }}
      />
    </div>
  )
}
