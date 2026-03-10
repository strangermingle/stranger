import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'

export default async function NotificationsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-black mb-8">Notifications</h1>
      
      <div className="space-y-4">
        {!notifications || notifications.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-dashed border-gray-300 dark:border-zinc-800">
             <p className="text-gray-500">No notifications yet.</p>
          </div>
        ) : (
          (notifications as any[]).map(n => (
            <div key={n.id} className={`p-6 rounded-2xl border transition ${!n.is_read ? 'bg-indigo-50/30 border-indigo-100 dark:bg-indigo-900/10 dark:border-indigo-900/30' : 'bg-white border-gray-100 dark:bg-zinc-900 dark:border-zinc-800'}`}>
               <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg">{n.title}</h3>
                 <span className="text-xs text-gray-400">
                   {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                 </span>
               </div>
               <p className="text-gray-600 dark:text-gray-400">{n.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
