import Image from 'next/image'
import Link from 'next/link'
import { EventWithDetails } from '@/types/api.types'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

interface EventCardProps {
  event: EventWithDetails
}

export function EventCard({ event }: EventCardProps) {
  // Parsing date roughly
  const startDate = new Date(event.start_datetime)
  const month = startDate.toLocaleString('default', { month: 'short' })
  const day = startDate.getDate()

  // Format Price Display
  let priceDisplay = 'Free'
  if (event.min_price && event.min_price > 0) {
    priceDisplay = `₹${event.min_price} onwards`
  }

  // Placeholder image fallback
  const imgUrl = event.cover_image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'

  return (
    <Link href={`/events/${event.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
        <Image
          src={imgUrl}
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false}
        />
        <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-100">
          {priceDisplay}
        </div>
        {event.category_name && (
          <div className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm dark:bg-zinc-800/80">
            {event.category_name}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
            <span className="text-xs font-bold uppercase">{month}</span>
            <span className="text-xl font-black leading-none">{day}</span>
          </div>
          <h3 className="line-clamp-2 flex-1 text-lg font-bold leading-tight text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            {event.title}
          </h3>
        </div>

        <div className="mt-auto space-y-2 pt-4">
          {event.city && (
             <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
               <MapPinIcon className="mr-1.5 h-4 w-4 shrink-0" />
               <span className="truncate">{event.city}{event.country ? `, ${event.country}` : ''}</span>
             </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
             {event.host_logo ? (
                <img src={event.host_logo} alt={event.host_display_name || ''} className="mr-2 h-5 w-5 rounded-full object-cover" />
             ) : (
                <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-600 dark:bg-zinc-800 dark:text-gray-400">
                   {event.host_display_name?.charAt(0) || 'H'}
                </div>
             )}
            <span className="truncate">By {event.host_display_name}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
