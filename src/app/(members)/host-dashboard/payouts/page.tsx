import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Payouts — Host Dashboard',
  description: 'Track your event earnings and payouts.',
}

export default async function PayoutsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: payouts } = await supabase
    .from('payouts')
    .select(`
      *,
      events ( title )
    `)
    .eq('host_id', user.id)
    .order('created_at', { ascending: false })

  const safePayouts = payouts || []

  const totalEarned = safePayouts
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.net_amount), 0)

  const pendingPayout = safePayouts
    .filter(p => ['pending', 'processing'].includes(p.status))
    .reduce((sum, p) => sum + Number(p.net_amount), 0)

  const platformFeesPaid = safePayouts
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + Number(p.platform_fee) + Number(p.gst_on_fee), 0)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">Paid</span>
      case 'pending':
        return <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Pending</span>
      case 'processing':
        return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Processing</span>
      case 'failed':
        return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400">Failed</span>
      default:
        return <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-400">{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Payouts
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Track your event earnings and payout history.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Earned</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">₹{totalEarned.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Payout</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">₹{pendingPayout.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Platform Fees Paid</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-50">₹{platformFeesPaid.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-zinc-800 flex justify-between items-center">
          <h2 className="font-semibold text-gray-900 dark:text-gray-100">Payout History</h2>
          <div className="text-sm text-gray-500">
            All amounts in INR
          </div>
        </div>
        
        {safePayouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-zinc-800 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">Event</th>
                  <th scope="col" className="px-6 py-3 text-right">Gross Amount</th>
                  <th scope="col" className="px-6 py-3 text-right">Fee (Inc. GST)</th>
                  <th scope="col" className="px-6 py-3 text-right">Net Amount</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
                {safePayouts.map((payout) => (
                  <tr key={payout.id} className="bg-white hover:bg-gray-50 dark:bg-zinc-900 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {(payout.events as { title?: string } | null)?.title || 'Unknown Event'}
                    </td>
                    <td className="px-6 py-4 font-medium text-right">₹{Number(payout.gross_amount).toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      ₹{(Number(payout.platform_fee) + Number(payout.gst_on_fee)).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-gray-100 text-right">
                      ₹{Number(payout.net_amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payout.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(payout.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
            You don't have any payout history yet.
          </div>
        )}
      </div>
    </div>
  )
}
