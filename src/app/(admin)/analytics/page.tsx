import { createClient } from '@/lib/supabase/server'
import { RevenueChart, CategoryChart } from '@/components/admin/AnalyticsChart'
import { 
  TrendingUp, 
  Calendar, 
  CreditCard, 
  Activity,
  ArrowDownRight,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string }>
}) {
  const supabase = await createClient()
  const p = await searchParams
  const period = p.period || '7d'
  
  const days = period === '30d' ? 30 : period === '90d' ? 90 : 7
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  // 1. Fetch historical data from analytics_daily
  const { data: history } = await (supabase
    .from('analytics_daily') as any)
    .select('*')
    .eq('metric_type', 'platform')
    .gte('snapshot_date', startDate.toISOString().split('T')[0])
    .order('snapshot_date', { ascending: true })

  // 2. Fetch Category breakdown (Current)
  const { data: eventsByCategory } = await (supabase
    .from('events') as any)
    .select('category_id, categories(name)')
  
  const categoryCounts = eventsByCategory?.reduce((acc: any, curr: any) => {
    const name = curr.categories?.name || 'Uncategorized'
    acc[name] = (acc[name] || 0) + 1
    return acc
  }, {}) || {}
  
  const categoryChartData = Object.entries(categoryCounts)
    .map(([name, count]) => ({ category_name: name, count }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5)

  // 3. Live Counts
  const { count: activeEvents } = await (supabase
    .from('events') as any)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .lte('start_datetime', new Date().toISOString())
    .gte('end_datetime', new Date().toISOString())

  const { data: pendingPayoutsData } = await (supabase
    .from('payouts') as any)
    .select('net_amount')
    .eq('status', 'pending')
  
  const pendingPayoutsTotal = (pendingPayoutsData as any[])?.reduce((acc: number, curr: any) => acc + Number(curr.net_amount), 0) || 0

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Analytics Performance</h1>
          <p className="text-gray-500 text-sm font-medium">Deep dive into platform growth and revenue trends.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white dark:bg-zinc-900 rounded-xl p-1 border border-gray-200 dark:border-zinc-800 shadow-sm">
            {['7d', '30d', '90d'].map((d) => (
              <Link
                key={d}
                href={`/admin/analytics?period=${d}`}
                className={cn(
                  "px-6 py-2 text-xs font-bold rounded-lg transition-all uppercase tracking-widest",
                  period === d 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                )}
              >
                {d}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Live Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="relative group p-8 bg-indigo-600 rounded-3xl text-white shadow-2xl shadow-indigo-200 dark:shadow-none overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-500 text-white border-none animate-pulse">LIVE NOW</Badge>
               </div>
               <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest opacity-80">Currently Active Events</p>
               <h3 className="text-5xl font-black mt-2 tabular-nums">{activeEvents || 0}</h3>
            </div>
         </div>
         <div className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                 <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center">
                   <CreditCard className="w-6 h-6 text-amber-500" />
                 </div>
                 <Link href="/admin/payouts" className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1">
                   MANAGE PAYOUTS <ArrowDownRight className="w-3 h-3 rotate-[225deg]" />
                 </Link>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Pending Payouts</p>
              <h3 className="text-5xl font-black mt-2 text-gray-900 dark:text-zinc-100 tabular-nums">
                ₹{pendingPayoutsTotal.toLocaleString()}
              </h3>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="font-bold text-lg flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-indigo-500" />
              Revenue Evolution
            </h2>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-indigo-500" />
               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PLATFORM FEE REVENUE</span>
            </div>
          </div>
          <div className="p-6">
            <RevenueChart data={history || []} />
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
           <div className="p-8 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="font-bold text-lg flex items-center gap-3">
                <Calendar className="w-6 h-6 text-purple-500" />
                Popular Categories
              </h2>
           </div>
           <div className="p-6 flex-1 flex flex-col justify-center">
              <CategoryChart data={categoryChartData} />
           </div>
        </div>
      </div>
      
      {/* Daily Metrics Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
           <h2 className="font-bold text-lg">Platform Performance Logs</h2>
           <span className="text-xs text-gray-400 font-medium">LATEST {history?.length || 0} RECORDS</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-400 font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-4">SNAPSHOT DATE</th>
                <th className="px-8 py-4">NEW USERS</th>
                <th className="px-8 py-4">NEW EVENTS</th>
                <th className="px-8 py-4">BOOKINGS</th>
                <th className="px-8 py-4 text-right">GROSS REVENUE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 font-medium">
              {history?.slice().reverse().map((day: any) => (
                <tr key={day.id} className="hover:bg-gray-50/30 dark:hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-8 py-5">
                    <span className="text-gray-900 dark:text-zinc-100">{new Date(day.snapshot_date).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                  </td>
                  <td className="px-8 py-5 text-indigo-600 dark:text-indigo-400">+{day.new_users}</td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 text-xs">
                      {day.new_events} events
                    </span>
                  </td>
                  <td className="px-8 py-5 tabular-nums font-bold">{day.total_bookings}</td>
                  <td className="px-8 py-5 text-right font-black text-gray-900 dark:text-zinc-100">
                    ₹{Number(day.total_revenue).toLocaleString()}
                  </td>
                </tr>
              ))}
              {(!history || history.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-gray-500 italic">
                    Historical playback will appear here once daily snapshots are initiated.
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
