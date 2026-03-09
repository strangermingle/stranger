import { createClient } from '@/lib/supabase/server'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/members/ProfileForm'
import { getUserById } from '@/lib/repositories/users.repository'

export const metadata: Metadata = {
  title: 'Profile Settings — StrangerMingle',
  description: 'Manage your personal profile and account settings.',
}

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const dbUser = await getUserById(user.id)

  if (!dbUser) {
    redirect('/login')
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Profile Settings
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Update your personal information and how others see you on the platform.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <ProfileForm initialData={dbUser} />
      </div>
    </div>
  )
}
