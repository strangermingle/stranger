import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { BecomeHostForm } from '@/components/host/BecomeHostForm'

export const metadata: Metadata = {
  title: 'Become a Host — StrangerMingle',
  description: 'Apply to host events on StrangerMingle',
}

export default async function BecomeHostPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: hostProfile } = await (supabase
    .from('host_profiles') as any)
    .select('id, is_approved, kyc_status')
    .eq('user_id', user.id)
    .single()

  if (hostProfile) {
    if ((hostProfile as any).is_approved) {
      redirect('/members/host-dashboard')
    } else {
      return (
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Application Pending
          </h1>
          <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 dark:border-orange-900/50 dark:bg-orange-900/20">
            <p className="text-sm text-orange-800 dark:text-orange-200">
              Your host profile is currently under review by our team. We'll notify you once it's approved.
            </p>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Become a Host
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join StrangerMingle as an event organiser. Setup your host profile below.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <BecomeHostForm />
      </div>
    </div>
  )
}
