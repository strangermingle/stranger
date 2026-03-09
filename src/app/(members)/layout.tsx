import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MembersNav } from '@/components/members/MembersNav'
import { getUserById } from '@/lib/repositories/users.repository'
import { RealtimeProvider } from '@/components/providers/RealtimeProvider'
import { NotificationBell } from '@/components/layout/NotificationBell'

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    // Should generally exist due to signup flow, but safety fallback
    redirect('/login')
  }

  return (
    <RealtimeProvider userId={dbUser.id}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
        {/* Sidebar Nav */}
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 relative">
          <MembersNav user={dbUser} />
          {/* Inject NotificationBell somewhere, usually header, but we put it in Nav or top here temporarily if Nav doesn't */}
        </div>
        
        {/* Header mobile top bar usually has NotificationBell, let's inject a crude one for now if no header exists */}
        <div className="md:hidden flex justify-end p-4 absolute top-0 right-0 z-50">
          <NotificationBell userId={dbUser.id} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:pl-64">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-8">
            <div className="hidden md:flex justify-end p-4 border-b border-gray-200 dark:border-zinc-800 mb-4">
               <NotificationBell userId={dbUser.id} />
            </div>
            {children}
          </div>
        </main>
      </div>
    </RealtimeProvider>
  )
}

