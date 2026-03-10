import { createClient } from '@/lib/supabase/server'
import PayoutActionButton from '@/components/admin/PayoutActionButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Banknote, 
  Clock, 
  CheckCircle, 
  Calendar,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminPayoutsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createClient()
  const p = await searchParams
  const currentStatus = p.status || 'pending'

  const { data: payouts } = await (supabase
    .from('payouts') as any)
    .select('*, host:users(username, email), event:events(title)')
    .eq('status', currentStatus)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Financial Payouts</h1>
          <p className="text-gray-500 text-sm font-medium">Verify and execute settlements to platform hosts.</p>
        </div>
      </div>

      <div className="flex bg-gray-100 dark:bg-zinc-800/50 p-1.5 rounded-2xl w-fit shadow-inner border border-gray-200 dark:border-zinc-800">
        {['pending', 'processing', 'paid', 'failed', 'on_hold'].map((s) => (
          <Link
            key={s}
            href={`/admin/payouts?status=${s}`}
            className={cn(
              "px-6 py-2 text-xs font-bold rounded-xl transition-all capitalize tracking-widest",
              currentStatus === s 
                ? "bg-white dark:bg-zinc-900 text-indigo-600 shadow-md dark:shadow-none" 
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-400 font-black uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-8 py-5">Host / Settlement Target</th>
                <th className="px-8 py-5">Net Amount</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Requested On</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-zinc-800 font-medium">
              {payouts && payouts.length > 0 ? (
                payouts.map((payout: any) => (
                  <tr key={payout.id} className="hover:bg-gray-50/20 dark:hover:bg-zinc-800/10 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-1.5">
                           <User className="w-3.5 h-3.5 text-gray-400" />
                           <span className="font-bold text-gray-900 dark:text-zinc-100">@{payout.host?.username || 'Unknown'}</span>
                        </div>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                           {payout.event?.title || 'User Balance Settlement'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-1 text-lg font-black tracking-tight text-gray-950 dark:text-zinc-100 italic">
                        <span className="text-sm opacity-50 not-italic">₹</span>
                        {Number(payout.net_amount).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <Badge 
                        variant={
                          payout.status === 'paid' ? 'success' : 
                          payout.status === 'failed' ? 'danger' : 
                          'warning'
                        }
                        className="px-3 py-1 text-[10px] font-black tracking-[0.1em] border-none shadow-sm"
                      >
                        {payout.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="px-8 py-6 text-gray-400 text-xs flex items-center gap-1.5 opacity-60">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(payout.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {payout.status === 'pending' && (
                          <PayoutActionButton payoutId={payout.id} className="shadow-lg shadow-indigo-100 dark:shadow-none hover:translate-y-[-1px] transition-transform">
                            PROCESS PAYOUT
                          </PayoutActionButton>
                        )}
                        {payout.status === 'paid' && (
                          <div className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-tighter opacity-100 group-hover:bg-green-50 dark:group-hover:bg-green-900/10 px-2 py-1 rounded transition-colors">
                            <CheckCircle className="w-4 h-4" /> TRF COMPLETED
                          </div>
                        )}
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                           <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                       <Banknote className="w-16 h-16 text-gray-100 mb-4" />
                       <h3 className="text-lg font-bold text-gray-300">No transactions found here.</h3>
                       <p className="text-gray-400 text-sm italic">Switch filters to see historical settlements.</p>
                    </div>
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
