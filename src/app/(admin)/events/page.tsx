import { createClient } from '@/lib/supabase/server'
import EventActionButton from '@/components/admin/EventActionButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  User, 
  Eye, 
  Ticket, 
  AlertTriangle,
  Star,
  ExternalLink,
  Search 
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string, reported?: string }>
}) {
  const supabase = await createClient()
  const p = await searchParams
  const status = p.status || 'all'
  const reportedOnly = p.reported === 'true'

  let query = supabase
    .from('events')
    .select('*, host:users(username)')
    .order('created_at', { ascending: false })

  if (status !== 'all') query = query.eq('status', status)
  
  const { data: allEvents } = await query

  // Client-side filtering for reports (for now) and fetching counts
  const eventIds = allEvents?.map(e => e.id) || []
  const { data: reportsData } = await supabase
    .from('reports')
    .select('reported_id')
    .in('reported_id', eventIds)
    .eq('reported_type', 'event')
  
  const reportCounts = reportsData?.reduce((acc: any, curr: any) => {
    acc[curr.reported_id] = (acc[curr.reported_id] || 0) + 1
    return acc
  }, {}) || {}

  const events = reportedOnly 
    ? allEvents?.filter(e => reportCounts[e.id] > 0)
    : allEvents

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Event Moderation</h1>
          <p className="text-gray-500 text-sm">Monitor and manage platform events.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 dark:border-zinc-800">
        {['all', 'published', 'draft', 'suspended', 'cancelled'].map((s) => (
          <Link
            key={s}
            href={`/admin/events?status=${s}${reportedOnly ? '&reported=true' : ''}`}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize",
              status === s 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            {s}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-2 mb-2">
           <Link 
             href={`/admin/events?status=${status}${reportedOnly ? '' : '&reported=true'}`}
             className={cn(
               "px-3 py-1 text-xs font-medium rounded-full border transition-all flex items-center gap-1.5",
               reportedOnly 
                ? "bg-red-50 text-red-600 border-red-200 shadow-sm" 
                : "bg-white dark:bg-zinc-900 text-gray-500 border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800"
             )}
           >
             <AlertTriangle className={cn("w-3 h-3", reportedOnly ? "text-red-500" : "text-gray-400")} />
             Reported Only
           </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Event Details</th>
                <th className="px-6 py-4">Host</th>
                <th className="px-6 py-4">Engagement</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {events && events.length > 0 ? (
                events.map((event: any) => (
                  <tr key={event.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {event.cover_image_url ? (
                          <img src={event.cover_image_url} alt={event.title} className="w-12 h-12 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-zinc-800" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-semibold truncate max-w-[200px] hover:text-indigo-600 transition-colors">
                            {event.title}
                            {reportCounts[event.id] > 0 && (
                              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                                {reportCounts[event.id]} reports
                              </span>
                            )}
                          </p>
                          <p className="text-xs text-gray-400">Created {new Date(event.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="truncate max-w-[120px] font-medium">{event.host?.username || 'System'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 tabular-nums">
                          <Ticket className="w-3.5 h-3.5" /> 
                          <span className="font-medium text-gray-700 dark:text-gray-300">{event.booking_count}</span> 
                          <span className="opacity-70">bookings</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 tabular-nums">
                          <Eye className="w-3.5 h-3.5" /> 
                          <span className="font-medium text-gray-700 dark:text-gray-300">{event.views_count}</span> 
                          <span className="opacity-70">views</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={
                          event.status === 'published' ? 'success' : 
                          event.status === 'suspended' ? 'danger' : 
                          'outline'
                        }
                        className="capitalize"
                      >
                        {event.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                         <EventActionButton 
                           eventId={event.id} 
                           action="feature" 
                           value={!event.is_featured}
                           variant="ghost"
                           className={cn(event.is_featured ? "text-amber-500 hover:text-amber-600" : "text-gray-300 hover:text-gray-400")}
                         >
                           <Star className={cn("w-4 h-4", event.is_featured && "fill-current")} />
                         </EventActionButton>
                         
                         {event.status !== 'suspended' && (
                           <EventActionButton 
                             eventId={event.id} 
                             action="suspend" 
                             variant="outline"
                             className="text-red-500 hover:text-red-600 border-red-50 hover:bg-red-50 dark:border-red-900/20 dark:hover:bg-red-900/10"
                           >
                             Suspend
                           </EventActionButton>
                         )}

                         <Link href={`/events/${event.slug}`} target="_blank">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-600">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                    {reportedOnly ? "No reported events found." : "No events found matching this filter."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
