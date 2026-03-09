import { createClient } from '@/lib/supabase/server'
import { toggleFeaturedEvent, toggleSponsoredEvent } from '@/actions/admin.actions'

export default async function AdminFeaturedPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('id, title, is_featured, is_sponsored, start_datetime, city')
    .order('start_datetime', { ascending: false })
    .limit(50)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-black mb-8">Feature Management</h1>
      
      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/50">
              <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Event</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Date & City</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Featured</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-400 uppercase tracking-wider">Sponsored</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {events?.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900 dark:text-white">{event.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(event.start_datetime).toLocaleDateString()} • {event.city}
                </td>
                <td className="px-6 py-4">
                  <form action={async () => {
                    'use server'
                    await toggleFeaturedEvent(event.id, !event.is_featured)
                  }}>
                    <button 
                      type="submit"
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        event.is_featured 
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200 hover:border-yellow-400 hover:text-yellow-600'
                      }`}
                    >
                      {event.is_featured ? 'FEATURED' : 'Toggle'}
                    </button>
                  </form>
                </td>
                <td className="px-6 py-4">
                   <form action={async () => {
                    'use server'
                    await toggleSponsoredEvent(event.id, !event.is_sponsored)
                  }}>
                    <button 
                      type="submit"
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        event.is_sponsored 
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200 hover:border-indigo-400 hover:text-indigo-600'
                      }`}
                    >
                      {event.is_sponsored ? 'SPONSORED' : 'Toggle'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
