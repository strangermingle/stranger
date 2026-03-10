'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings, 
  Heart,
  MessageSquare,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface User {
  id: string
  full_name?: string | null
  email?: string | null
}

interface MembersNavProps {
  user: User
}

const navigation = [
  { name: 'Dashboard', href: '/members/dashboard', icon: LayoutDashboard },
  { name: 'My Bookings', href: '/members/bookings', icon: Calendar },
  { name: 'Favorites', href: '/members/favorites', icon: Heart },
  { name: 'Messages', href: '/members/messages', icon: MessageSquare },
  { name: 'Host Events', href: '/members/host-dashboard', icon: Users },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Settings', href: '/members/profile', icon: Settings },
]

export function MembersNav({ user }: MembersNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-1 flex-col bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 px-4 py-8">
      <div className="mb-8 px-2">
        <h2 className="text-xl font-black text-gray-900 dark:text-white truncate">
          {user.full_name || user.email || 'Member'}
        </h2>
        <p className="text-xs text-gray-500 mt-1">Member Portal</p>
      </div>

      <ul role="list" className="flex flex-1 flex-col gap-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white',
                  'group flex gap-x-3 rounded-xl p-3 text-sm font-bold transition-all'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-white',
                    'h-5 w-5 shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="mt-auto">
        <Link 
          href="/logout"
          className="flex gap-x-3 rounded-xl p-3 text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
        >
          Sign Out
        </Link>
      </div>
    </nav>
  )
}
