import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import PromoCodeForm from '@/components/host/PromoCodeForm'
import { togglePromoCodeAction } from '@/actions/promo.actions'

export const metadata: Metadata = {
  title: 'Promo Codes — Host Dashboard',
  description: 'Manage promo codes and discounts for your events.',
}

export default async function PromoCodesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // Fetch host's events for dropdown
  const { data: events } = await supabase
    .from('events')
    .select('id, title')
    .eq('host_id', user.id)
    .order('start_datetime', { ascending: false })

  // Fetch host's promo codes
  const { data: promoCodes } = await (supabase
    .from('promo_codes') as any)
    .select(`
      *,
      events ( title )
    `)
    .eq('host_id', user.id)
    .order('created_at', { ascending: false })

  const safePromoCodes = (promoCodes || []) as any[]
  const safeEvents = events || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Promo Codes
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Create and manage discount codes to boost your ticket sales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Create New Code</h2>
          <PromoCodeForm events={safeEvents} />
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Active Promo Codes</h2>
          
          <div className="grid gap-4">
            {safePromoCodes.length > 0 ? (
              safePromoCodes.map(promo => (
                <div key={promo.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
                        {promo.code}
                      </h3>
                      {!promo.is_active && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          Inactive
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {promo.discount_type === 'percentage' 
                        ? `${promo.discount_value}% OFF` 
                        : `₹${promo.discount_value} OFF`}
                      {' '}
                      <span className="text-gray-500 font-normal">
                        on {(promo.events as { title?: string } | null)?.title || 'All Events'}
                      </span>
                    </p>
                    
                    <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                      <span>Uses: {promo.used_count} / {promo.max_uses || '∞'}</span>
                      {promo.valid_until && (
                        <span>Valid till: {new Date(promo.valid_until).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex sm:flex-col justify-end gap-2">
                    <form action={async () => {
                      'use server'
                      await togglePromoCodeAction(promo.id, !promo.is_active)
                    }}>
                      <button 
                        type="submit"
                        className={`w-full px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                          promo.is_active 
                            ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'
                            : 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:border-indigo-900/50 dark:text-indigo-400 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40'
                        }`}
                      >
                        {promo.is_active ? 'Deactivate' : 'Reactivate'}
                      </button>
                    </form>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center text-sm text-gray-500 dark:border-zinc-800 dark:bg-zinc-900/50">
                You haven't created any promo codes yet. Use the form to generate one.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
