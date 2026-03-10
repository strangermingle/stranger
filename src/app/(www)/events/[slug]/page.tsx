import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getEventBySlug } from '@/lib/repositories/events.repository'
import { EventDetailHero } from '@/components/events/EventDetailHero'
import { EventTicketPanel } from '@/components/events/EventTicketPanel'
import { MapPinIcon, GlobeIcon, ClockIcon } from 'lucide-react'
import { generateEventMetadata } from '@/lib/metadata'
import ShareButtons from '@/components/events/ShareButtons'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)

  if (!event || event.status !== 'published') {
    return { title: 'Event Not Found' }
  }

  return generateEventMetadata(event)
}

export const dynamic = 'force-dynamic'


export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const event = await getEventBySlug(slug)

  if (!event || event.status !== 'published') {
    notFound()
  }

  // Fire and forget view count
  (supabase as any).rpc('increment_event_views', { event_id: event.id }).then()

  // Parallel fetches
  const [
    { data: ticketTiers },
    { data: images },
    { data: agenda },
    { data: faqs },
    { data: host },
  ] = await Promise.all([
    (supabase.from('v_ticket_availability') as any).select('*').eq('event_id', event.id),
    (supabase.from('event_images') as any).select('*').eq('event_id', event.id).order('sort_order'),
    (supabase.from('event_agenda') as any).select('*').eq('event_id', event.id).order('sort_order'),
    (supabase.from('event_faqs') as any).select('*').eq('event_id', event.id).order('sort_order'),
    (supabase.from('host_profiles') as any).select('*').eq('user_id', event.host_id).single()
  ])

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.start_datetime,
    endDate: event.end_datetime || event.start_datetime,
    eventAttendanceMode: event.event_type === 'online' ? 'https://schema.org/OnlineEventAttendanceMode' : event.event_type === 'hybrid' ? 'https://schema.org/MixedEventAttendanceMode' : 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': event.event_type === 'online' ? 'VirtualLocation' : 'Place',
      name: event.venue_name || 'TBA',
      url: event.online_event_url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressCountry: event.country,
      }
    },
    image: event.cover_image_url ? [event.cover_image_url] : [],
    description: event.short_description || event.description,
    organizer: {
      '@type': 'Organization',
      name: host?.display_name || event.host_display_name,
      url: host?.website_url || undefined
    }
  }

  return (
    <div className="bg-white dark:bg-zinc-950 pb-20">
      {/* Inject Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <EventDetailHero event={event} hostProfile={host} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          {/* Main Content (Left, 2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Share & Actions */}
            <div className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-zinc-800">
               <ShareButtons 
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/events/${event.slug}`} 
                title={event.title} 
               />
            </div>
            
            {/* About Section */}
            {(event.description || event.short_description) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">About this event</h2>
                <div className="prose prose-indigo max-w-none text-gray-600 dark:text-gray-300 dark:prose-invert">
                  {/* Note: in a real app, description might be markdown/HTML that needs sanitization */}
                  <p className="whitespace-pre-wrap">{event.description || event.short_description}</p>
                </div>
              </section>
            )}

            {/* Location / Venue details */}
            <section>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Location</h2>
               <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-start gap-4">
                     <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {event.event_type === 'online' ? <GlobeIcon className="h-6 w-6" /> : <MapPinIcon className="h-6 w-6" />}
                     </div>
                     <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                           {event.event_type === 'online' ? 'Online Event' : event.venue_name || 'Location to be announced'}
                        </h3>
                        {event.event_type !== 'online' && (
                           <p className="mt-1 text-gray-600 dark:text-gray-400">
                              {/* Rough address concat */ }
                              {[event.address_line_1, event.address_line_2, event.city, event.state, event.country, event.postal_code].filter(Boolean).join(', ')}
                           </p>
                        )}
                        {event.event_type !== 'in_person' && event.online_event_url && (
                           <a href={event.online_event_url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                              Join Link
                           </a>
                        )}
                     </div>
                  </div>
               </div>
            </section>

            {/* Agenda */}
            {agenda && agenda.length > 0 && (
              <section>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Agenda</h2>
                <div className="space-y-6 rounded-xl border border-gray-200 p-6 dark:border-zinc-800">
                  {(agenda || []).map((item: any, idx: number) => (
                    <div key={item.id} className="relative flex gap-4">
                      {/* Line connector */}
                      {idx !== (agenda || []).length - 1 && (
                         <div className="absolute left-[11px] top-8 h-full w-0.5 bg-gray-200 dark:bg-zinc-800" />
                      )}
                      
                      <div className="relative mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 ring-4 ring-white dark:bg-indigo-900/50 dark:ring-zinc-950">
                        <div className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                      </div>
                      
                      <div className="pb-6">
                        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                           <ClockIcon className="h-4 w-4" />
                           {new Date(item.starts_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           {item.ends_at && ` - ${new Date(item.ends_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                        </div>
                        <h3 className="mt-1 font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
                        {item.description && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{item.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQs */}
            {faqs && faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {(faqs || []).map((faq: any) => (
                    <details key={faq.id} className="group rounded-xl border border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                      <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-gray-900 dark:text-gray-100">
                        {faq.question}
                        <span className="ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-400 group-open:bg-indigo-50 group-open:text-indigo-600 dark:bg-zinc-800 dark:group-open:bg-indigo-900/30 dark:group-open:text-indigo-400">
                          <svg className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </summary>
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-400">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Ticket Panel */}
          <div className="lg:col-span-1">
            <EventTicketPanel
              eventId={event.id}
              ticketingMode={event.ticketing_mode as any} // Forced cast compatible with the union
              ticketTiers={(ticketTiers || []) as any[]}
              externalTicketUrl={event.external_ticket_url}
            />
            {/* Additional Host Sidebar info could go here too */}
          </div>
          
        </div>
      </main>
    </div>
  )
}
