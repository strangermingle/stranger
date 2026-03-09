import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getConversations } from '@/lib/repositories/messages.repository'
import { ConversationList } from '@/components/messages/ConversationList'
import { MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Messages | StrangerMingle',
  description: 'Anonymous chat with other members',
}

export default async function MessagesIndexPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const conversations = await getConversations(user.id)

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800">
      {/* Sidebar: Lists conversations */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ConversationList 
            userId={user.id} 
            initialConversations={conversations} 
          />
        </div>
      </div>

      {/* Main Content: Empty State */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900">
        <MessageCircle className="w-16 h-16 text-gray-300 dark:text-zinc-700 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Your Messages</h3>
        <p className="text-gray-500 mt-2 max-w-sm text-center">
          Select a conversation from the sidebar to start chatting anonymously with other members.
        </p>
      </div>
    </div>
  )
}
