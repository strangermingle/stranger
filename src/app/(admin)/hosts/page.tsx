import { createClient } from '@/lib/supabase/server'
import HostActionButton from '@/components/admin/HostActionButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminHostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const supabase = await createClient()
  const p = await searchParams
  const status = p.status || 'all'

  let query = (supabase
    .from('host_profiles') as any)
    .select('*, users(email)')
    .order('created_at', { ascending: false })

  if (status === 'pending') query = query.eq('is_approved', false)
  else if (status === 'approved') query = query.eq('is_approved', true)

  const { data: hosts } = await query

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Host Management</h1>
          <p className="text-gray-500 text-sm">Review and manage host applications.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-zinc-800">
        {['all', 'pending', 'approved', 'rejected'].map((s) => (
          <Link
            key={s}
            href={`/admin/hosts?status=${s}`}
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
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Host Details</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">KYC Status</th>
                <th className="px-6 py-4">Approval</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {hosts && hosts.length > 0 ? (
                hosts.map((host: any) => (
                  <tr key={host.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold uppercase shrink-0">
                          {host.display_name.substring(0, 2)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate max-w-[200px]">{host.display_name}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[200px]">{host.users?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize">
                      <span className="text-gray-600 dark:text-gray-400">{host.host_type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={
                          host.kyc_status === 'verified' ? 'success' : 
                          host.kyc_status === 'rejected' ? 'danger' : 
                          'warning'
                        }
                      >
                        {host.kyc_status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {host.is_approved ? (
                        <div className="flex items-center gap-1.5 text-green-600 font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Approved</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-amber-600 font-medium">
                          <Clock className="w-4 h-4" />
                          <span>Pending</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!host.is_approved ? (
                          <HostActionButton hostId={host.id} approved={true}>
                            Approve
                          </HostActionButton>
                        ) : (
                          <HostActionButton 
                            hostId={host.id} 
                            approved={false} 
                            variant="outline"
                            className="text-red-600 hover:text-red-700 border-red-100 hover:bg-red-50 dark:border-red-900/20 dark:hover:bg-red-900/10"
                          >
                            Revoke
                          </HostActionButton>
                        )}
                        <Link href={`/hosts/${host.id}`} target="_blank">
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
                    No hosts found matching this filter.
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
