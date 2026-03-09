import Image from 'next/image'
import { CalendarIcon, MapPinIcon, Share2Icon } from 'lucide-react'
import { EventWithDetails } from '@/types/api.types'
import { EventInterestBar } from './EventInterestBar'

interface EventDetailHeroProps {
  event: EventWithDetails
  hostProfile: any
}

export function EventDetailHero({ event, hostProfile }: EventDetailHeroProps) {
  const startDate = new Date(event.start_datetime)
  const endDate = event.end_datetime ? new Date(event.end_datetime) : null

  const dateStr = startDate.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Format times with timezone
  const timeStr = `${startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}${endDate ? ` - ${endDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}` : ''} ${event.timezone || ''}`

  return (
    <div className="bg-white dark:bg-zinc-950">
      {/* Cover Image */}
      <div className="relative h-[30vh] min-h-[300px] w-full max-h-[500px] bg-zinc-100 dark:bg-zinc-900 md:h-[50vh]">
        {event.cover_image_url ? (
          <Image
            src={event.cover_image_url}
            alt={event.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content overlaid on image bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
            {event.category_name && (
              <span className="mb-4 inline-flex items-center rounded-md bg-white/20 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {event.category_name}
              </span>
            )}
            <h1 className="text-3xl font-black text-white sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Action / Info Bar below image */}
      <div className="border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <CalendarIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{dateStr}</p>
                <p>{timeStr}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                <MapPinIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {event.event_type === 'online' ? 'Online Event' : event.venue_name || 'Venue TBA'}
                </p>
                <p>{event.city ? `${event.city}, ${event.country}` : 'Location Details'}</p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
             {/* Client Component handling Likes, Saves, Interests */}
             <EventInterestBar eventId={event.id} initialLikes={event.likes_count || 0} initialInterests={event.interests_count || 0} />
             
             <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-400 dark:hover:bg-zinc-800 transition-colors">
                <Share2Icon className="h-4 w-4" />
                <span className="sr-only">Share</span>
             </button>
          </div>

        </div>
      </div>

      {/* Host Byline */}
      <div className="border-b border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-950">
         <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
               <span className="text-sm text-gray-500 dark:text-gray-400">Hosted by</span>
               <div className="flex items-center gap-2">
                  {hostProfile?.user_id && hostProfile.avatar_url ? ( // Assuming joined appropriately or manual fallback
                     <img src={hostProfile.avatar_url} alt="" className="h-6 w-6 rounded-full object-cover" />
                  ) : (
                     <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400">
                        {hostProfile?.display_name?.charAt(0) || event.host_display_name?.charAt(0) || 'H'}
                     </div>
                  )}
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                     {hostProfile?.display_name || event.host_display_name}
                  </span>
               </div>
            </div>
         </div>
      </div>
    </div>
  )
}
