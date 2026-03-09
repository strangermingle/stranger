import { createClient } from '@/lib/supabase/server'
import UserActionButton from '@/components/admin/UserActionButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Search,
  CheckCircle,
  MoreVertical,
  ShieldCheck,
  AlertOctagon
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string, role?: string }>
}) {
  const supabase = await createClient()
  const p = await searchParams
  const queryParam = p.q || ''
  const roleParam = p.role || 'all'

  let query = supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (queryParam) {
    query = query.or(`email.ilike.%${queryParam}%,username.ilike.%${queryParam}%`)
  }
  
  if (roleParam !== 'all') {
    query = query.eq('role', roleParam)
  }

  const { data: users } = await query

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading">User Management</h1>
          <p className="text-gray-500 font-body text-sm">Search and manage platform users.</p>
        </div>
        
        <div className="flex items-center gap-2">
           <form className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                name="q"
                type="text" 
                placeholder="Search by email or username..." 
                defaultValue={queryParam}
                className="pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none w-64 md:w-80 shadow-sm"
              />
           </form>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 dark:border-zinc-800">
        {['all', 'member', 'host', 'admin', 'moderator'].map((r) => (
          <Link
            key={r}
            href={`/admin/users?role=${r}${queryParam ? `&q=${queryParam}` : ''}`}
            className={cn(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize",
              roleParam === r 
                ? "border-indigo-600 text-indigo-600" 
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            {r}
          </Link>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-zinc-800/50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">Identity</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Trust Level</th>
                <th className="px-6 py-4">Account Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 font-body">
              {users && users.length > 0 ? (
                users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-zinc-800 ring-1 ring-gray-200 dark:ring-zinc-800 flex items-center justify-center text-gray-400 font-black uppercase overflow-hidden shrink-0">
                          {user.avatar_url ? (
                            <img src={user.avatar_url} alt={user.username} className="w-full h-full object-cover" />
                          ) : (
                            user.username.substring(0, 2)
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 dark:text-zinc-100 truncate max-w-[150px]">{user.username}</p>
                          <p className="text-xs text-gray-400 truncate max-w-[180px] font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge 
                        variant={user.role === 'admin' ? 'default' : user.role === 'host' ? 'secondary' : 'outline'} 
                        className={cn(
                          "capitalize px-2 py-0.5 rounded-md font-bold tracking-tight",
                          user.role === 'admin' && "bg-indigo-600",
                          user.role === 'host' && "bg-purple-100 text-purple-700 border-purple-200"
                        )}
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {user.is_verified ? (
                        <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs uppercase tracking-tighter">
                          <ShieldCheck className="w-4 h-4 fill-blue-50" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs font-medium uppercase tracking-widest opacity-60">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {user.is_suspended ? (
                        <div className="flex items-center gap-1.5 text-red-500 font-bold text-xs uppercase tracking-tighter">
                           <AlertOctagon className="w-4 h-4" />
                           <span>Suspended</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-green-600 font-bold text-xs uppercase tracking-tighter">
                           <CheckCircle className="w-4 h-4" />
                           <span>Active</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!user.is_suspended && user.role !== 'admin' && (
                          <UserActionButton userId={user.id} action="suspend" variant="outline" className="text-red-500 border-red-50 hover:bg-red-50 font-bold text-[10px] h-7 px-2">
                            SUSPEND
                          </UserActionButton>
                        )}
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-gray-600 h-7 w-7 p-0">
                          <MoreVertical className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center flex flex-col items-center">
                    <Search className="w-12 h-12 text-gray-100 mb-4" />
                    <p className="text-gray-400 font-bold">No explorers found matching your search.</p>
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
