import { createClient } from '@/lib/supabase/server'
import { 
  Users, 
  Calendar, 
  Ticket, 
  IndianRupee, 
  ArrowUpRight, 
  ShieldAlert, 
  Flag 
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { ROUTES } from '@/lib/routes'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Admin Dashboard | StrangerMingle',
    description: 'Manage overview, events, users, and reports.',
  }
}

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayISO = today.toISOString()

  // 1. Total users
  const { count: totalUsers } = await (supabase
    .from('users') as any)
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // 2. Total events
  const { count: totalEvents } = await (supabase
    .from('events') as any)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  // 3. Bookings today
  const { count: bookingsToday } = await (supabase
    .from('bookings') as any)
    .select('*', { count: 'exact', head: true })
    .gte('created_at', todayISO)

  // 4. Revenue today (platform_fee)
  const { data: revenueData } = await (supabase
    .from('bookings') as any)
    .select('platform_fee')
    .gte('paid_at', todayISO)
  
  const revenueToday = (revenueData as any[])?.reduce((acc: number, curr: any) => acc + Number(curr.platform_fee), 0) || 0

  // Recent activity
  // Last 10 bookings
  const { data: recentBookings } = await (supabase
    .from('bookings') as any)
    .select('booking_ref, total_amount, created_at, event:events(title)')
    .order('created_at', { ascending: false })
    .limit(10)

  // Last 5 new users
  const { data: recentUsers } = await (supabase
    .from('users') as any)
    .select('username, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  // Pending host approvals count
  const { count: pendingHosts } = await (supabase
    .from('host_profiles') as any)
    .select('*', { count: 'exact', head: true })
    .eq('is_approved', false)

  // Pending reports count
  const { count: pendingReports } = await (supabase
    .from('reports') as any)
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const stats = [
    { name: 'Total Active Users', value: totalUsers, icon: Users, color: 'text-blue-600' },
    { name: 'Published Events', value: totalEvents, icon: Calendar, color: 'text-green-600' },
    { name: 'Bookings Today', value: bookingsToday, icon: Ticket, color: 'text-purple-600' },
    { name: 'Revenue Today', value: `₹${revenueToday.toLocaleString()}`, icon: IndianRupee, color: 'text-amber-600' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-gray-500">Live statistics and recent platform activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={cn("p-3 rounded-lg bg-gray-50 dark:bg-zinc-900", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
            <h2 className="font-semibold flex items-center gap-2">
              <Ticket className="w-4 h-4 text-gray-400" />
              Recent Bookings
            </h2>
            <Link href={ROUTES.ADMIN.EVENTS} className="text-xs text-indigo-600 hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-zinc-800 flex-1">
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((booking: any) => (
                  <div key={booking.booking_ref} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium">{(booking.event as any)?.title || 'Unknown Event'}</p>
                      <p className="text-xs text-gray-400">{booking.booking_ref} • {new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm font-semibold">₹{Number(booking.total_amount).toLocaleString()}</p>
                  </div>
                ))
            ) : (
              <div className="p-8 text-center text-gray-500 text-sm italic">No recent bookings</div>
            )}
          </div>
        </div>

        {/* Action Required & New Users */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
                <h2 className="font-semibold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-orange-400" />
                  Action Required
                </h2>
             </div>
             <div className="p-4 grid grid-cols-2 gap-4">
                <Link href={ROUTES.ADMIN.USERS + '?status=pending'} className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/20 group transition-all hover:shadow-md">
                   <p className="text-sm text-orange-800 dark:text-orange-400 font-medium whitespace-nowrap">Pending Hosts</p>
                   <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-orange-900 dark:text-orange-300">{pendingHosts || 0}</span>
                      <ArrowUpRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </div>
                </Link>
                <Link href={ROUTES.ADMIN.REPORTS} className="p-4 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 group transition-all hover:shadow-md">
                   <p className="text-sm text-red-800 dark:text-red-400 font-medium whitespace-nowrap">Open Reports</p>
                   <div className="flex items-center justify-between mt-1">
                      <span className="text-2xl font-bold text-red-900 dark:text-red-300">{pendingReports || 0}</span>
                      <ArrowUpRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </div>
                </Link>
             </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                New Users
              </h2>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-zinc-800">
              {recentUsers && recentUsers.length > 0 ? (
                recentUsers.map((user: any) => (
                  <div key={user.username} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase">
                        {user.username.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-gray-400">Joined {new Date(user.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm italic">No new users</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
