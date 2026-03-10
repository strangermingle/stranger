import { createClient } from '@/lib/supabase/server'
import { AuditLogTable } from '@/components/admin/AuditLogTable'
import { 
  History, 
  ChevronLeft,
  ChevronRight,
  Database,
  User as UserIcon,
  Calendar,
  Ticket
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AuditLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ entity?: string, page?: string }>
}) {
  const supabase = await createClient()
  const p = await searchParams
  const entity = p.entity || 'all'
  const currentPage = parseInt(p.page || '1')
  const pageSize = 50

  let query = (supabase
    .from('audit_logs') as any)
    .select('*, actor:users!actor_id(username)')
    .order('created_at', { ascending: false })
    .range((currentPage - 1) * pageSize, currentPage * pageSize - 1)

  if (entity !== 'all') query = query.eq('entity_type', entity)

  const { data: logs } = await query

  const entities = [
    { label: 'ALL', value: 'all', icon: History },
    { label: 'USERS', value: 'user', icon: UserIcon },
    { label: 'EVENTS', value: 'event', icon: Calendar },
    { label: 'BOOKINGS', value: 'booking', icon: Ticket },
    { label: 'SCHEMA', value: 'host_profile', icon: Database },
  ]

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight leading-none mb-2">Audit Registry</h1>
          <p className="text-gray-500 text-sm font-medium">Verified historical log of all application mutations.</p>
        </div>
        
        <div className="flex bg-gray-100/50 dark:bg-zinc-800/30 p-1.5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-inner overflow-x-auto max-w-full no-scrollbar">
          {entities.map((ent) => {
            const Icon = ent.icon
            return (
              <Link
                key={ent.value}
                href={`/admin/audit-logs?entity=${ent.value}`}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 text-[10px] font-black tracking-widest rounded-xl transition-all whitespace-nowrap",
                  entity === ent.value 
                    ? "bg-white dark:bg-zinc-900 text-indigo-600 shadow-lg ring-1 ring-gray-100 dark:ring-zinc-800" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                )}
              >
                <Icon className="w-4 h-4" />
                {ent.label}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="min-h-[600px] mb-8">
        <AuditLogTable logs={logs || []} />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pb-16 pt-4 border-t border-gray-100 dark:border-zinc-800/50">
         <div className="flex flex-col">
            <p className="text-[10px] font-black text-gray-300 dark:text-zinc-600 uppercase tracking-[0.2em] mb-1">Pagination Control</p>
            <p className="text-xs text-gray-500 font-bold tabular-nums">
              Page <span className="text-indigo-600 dark:text-indigo-400">{currentPage}</span> of the registry
            </p>
         </div>
         <div className="flex items-center gap-3">
           <Link 
             href={`/admin/audit-logs?page=${Math.max(1, currentPage - 1)}${entity !== 'all' ? `&entity=${entity}` : ''}`}
             className={cn(
               "p-3 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm",
               currentPage === 1 && "opacity-30 pointer-events-none"
             )}
           >
             <ChevronLeft className="w-5 h-5" />
           </Link>
           <Link 
             href={`/admin/audit-logs?page=${currentPage + 1}${entity !== 'all' ? `&entity=${entity}` : ''}`}
             className="p-3 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm hover:translate-x-1"
           >
             <ChevronRight className="w-5 h-5" />
           </Link>
         </div>
      </div>
    </div>
  )
}
