import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { logoutAction } from '@/actions/auth.actions'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Best effort grab of role/avatar if logged in
  let dbUser = null
  if (user) {
    const { data } = await supabase.from('users').select('username, avatar_url, role').eq('id', user.id).single()
    dbUser = data
  }

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100">
      <SiteHeader user={user} dbUser={dbUser} />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ user, dbUser }: { user: any, dbUser: any }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
              StrangerMingle
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/events" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Events
            </Link>
            <Link href="/cities" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Cities
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/members/dashboard"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <div className="relative group">
                <button className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-2 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-900 transition-colors">
                  {dbUser?.avatar_url ? (
                     <img src={dbUser.avatar_url} alt="" className="h-7 w-7 rounded-full object-cover" />
                  ) : (
                     <div className="h-7 w-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold dark:bg-indigo-900/50 dark:text-indigo-400">
                        {dbUser?.username?.charAt(0).toUpperCase() || 'U'}
                     </div>
                  )}
                  <span className="text-sm font-medium hidden sm:block">{dbUser?.username || 'Menu'}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 hidden w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block dark:bg-zinc-900 dark:ring-zinc-800">
                  <Link href="/members/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800">My Tickets</Link>
                  <Link href="/members/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800">Profile</Link>
                  <form action={logoutAction} className="block w-full text-left">
                     <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/10">Sign out</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="hidden rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:block dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              StrangerMingle
            </span>
          </div>
          <p className="mt-8 text-center text-sm text-gray-500 md:mt-0 md:text-left dark:text-gray-400">
            &copy; {new Date().getFullYear()} StrangerMingle, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
