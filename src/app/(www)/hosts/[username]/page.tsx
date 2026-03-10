import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { EventGrid } from '@/components/events/EventGrid'
import { EventWithDetails } from '@/types/api.types'
import { Star, Users, Calendar, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  params: { username: string }
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()
  const { data: host } = await (supabase
    .from('host_profiles') as any)
    .select('display_name, tagline')
    .eq('user:users!host_profiles_user_id_fkey(username)', username)
    .single()

  if (!host) return { title: 'Host Not Found' }

  const title = `${host.display_name} — Host Profile | StrangerMingle`
  const description = host.tagline || `Check out upcoming events by ${host.display_name} on StrangerMingle.`
  const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og/host/${username}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: host.display_name,
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  }
}

export default async function HostProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()

  // 1. Fetch host profile with user details and stats
  const { data: host, error } = await (supabase
    .from('host_profiles') as any)
    .select(`
      *,
      user:users!host_profiles_user_id_fkey (
        username,
        avatar_url,
        created_at
      )
    `)
    .eq('user.username', username)
    .single()

  if (!host || error) notFound()

  // 2. Fetch upcoming events
  const { data: upcomingEventsData } = await (supabase
    .from('v_events_public')
    .select('*')
    .eq('host_username', username)
    .eq('status', 'published')
    .gte('start_datetime', new Date().toISOString())
    .order('start_datetime', { ascending: true }) as any)

  // 3. Fetch past events (last 3)
  const { data: pastEventsData } = await (supabase
    .from('v_events_public')
    .select('*')
    .eq('host_username', username)
    .eq('status', 'published')
    .lt('start_datetime', new Date().toISOString())
    .order('start_datetime', { ascending: false })
    .limit(3) as any)

  // 4. Fetch reviews
  const { data: reviews } = await (supabase
    .from('event_reviews') as any)
    .select(`
      id,
      rating,
      review_text,
      created_at,
      user:users!event_reviews_user_id_fkey ( display_name, avatar_url ),
      event:events!event_reviews_event_id_fkey ( title )
    `)
    .eq('event.host_id', host.user_id)
    .order('created_at', { ascending: false })
    .limit(5)

  const upcomingEvents = (upcomingEventsData || []) as unknown as EventWithDetails[]
  const pastEvents = (pastEventsData || []) as unknown as EventWithDetails[]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Hero Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-gray-100 dark:border-zinc-800 pt-24 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative h-32 w-32 rounded-3xl overflow-hidden bg-gray-100 border-4 border-white dark:border-zinc-800 shadow-lg">
              <img 
                src={host.logo_url || host.user.avatar_url || '/placeholder-avatar.jpg'} 
                alt={host.display_name} 
                className="h-full w-full object-cover" 
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">{host.display_name}</h1>
                {host.is_approved && (
                  <ShieldCheck className="h-6 w-6 text-indigo-500" fill="currentColor" fillOpacity={0.1} />
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg">{host.tagline}</p>
              
              <div className="flex flex-wrap items-center gap-6 mt-6">
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-gray-900 dark:text-white">{host.rating_avg}</span>
                  <span className="text-gray-400 font-normal">({host.rating_count} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <Users className="h-4 w-4 text-indigo-500" />
                  <span className="text-gray-900 dark:text-white">{host.follower_count}</span>
                  <span className="text-gray-400 font-normal">followers</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm font-bold">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span className="text-gray-900 dark:text-white">{host.total_events_hosted}</span>
                  <span className="text-gray-400 font-normal">events hosted</span>
                </div>
              </div>
            </div>

            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
              Follow Host
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-16">
          {/* About */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">About the Host</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              {host.description || "This host hasn't provided a bio yet."}
            </div>
          </section>

          {/* Upcoming Events */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Upcoming Events</h2>
            <EventGrid 
              events={upcomingEvents} 
              emptyMessage={`${host.display_name} doesn't have any scheduled events right now.`}
            />
          </section>

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Recently Hosted</h2>
              <EventGrid events={pastEvents} />
            </section>
          )}

          {/* Reviews */}
          <section>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Attendee Reviews</h2>
            <div className="space-y-6">
              {reviews && reviews.length > 0 ? reviews.map((review: any) => (
                <div key={review.id} className="p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <img src={review.user.avatar_url || '/placeholder-avatar.jpg'} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{review.user.display_name}</div>
                        <div className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200'}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs font-medium text-indigo-500 mb-2 uppercase tracking-wider">{review.event.title}</div>
                  <p className="text-gray-600 dark:text-gray-400 italic line-clamp-3">"{review.review_text}"</p>
                </div>
              )) : (
                <p className="text-gray-500 italic">No reviews yet for this host.</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 shrink-0 space-y-8">
           <div className="p-6 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl sticky top-24 shadow-sm">
              <h3 className="font-black text-gray-900 dark:text-white mb-4">Connect</h3>
              <div className="space-y-4">
                {host.website_url && (
                  <Link href={host.website_url} className="block text-sm text-indigo-600 hover:underline">Official Website</Link>
                )}
                {host.instagram_handle && (
                   <Link href={`https://instagram.com/${host.instagram_handle}`} className="block text-sm text-gray-600 hover:text-indigo-600 transition-colors">Instagram</Link>
                )}
                {host.twitter_handle && (
                   <Link href={`https://twitter.com/${host.twitter_handle}`} className="block text-sm text-gray-600 hover:text-indigo-600 transition-colors">Twitter / X</Link>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                 <div className="text-xs text-gray-400 text-center">
                   Member since {new Date(host.user.created_at).getFullYear()}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": host.host_type === 'organisation' ? 'Organization' : 'Person',
            "name": host.display_name,
            "description": host.description,
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/hosts/${username}`,
            "image": host.logo_url || host.user.avatar_url,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": host.rating_avg,
              "reviewCount": host.rating_count
            }
          }),
        }}
      />
    </div>
  )
}
