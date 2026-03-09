import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getConversations, getMessages } from '@/lib/repositories/messages.repository'
import { ConversationList } from '@/components/messages/ConversationList'
import { ChatWindow } from '@/components/messages/ChatWindow'

export const metadata = {
  title: 'Chat | StrangerMingle',
}

export default async function ConversationPage({ params }: { params: { conversationId: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { conversationId } = params
  
  try {
    const [conversations, initialMessages] = await Promise.all([
      getConversations(user.id),
      getMessages(conversationId, user.id)
    ])

    const activeConv = conversations.find(c => c.id === conversationId)
    if (!activeConv) throw new Error('Conversation not found')

    const isBlockedMode = activeConv.is_blocked_by_p1 || activeConv.is_blocked_by_p2
    const otherParticipantAlias = activeConv.other_participant?.anonymous_alias || 'Unknown'
    const otherParticipantId = activeConv.participant_1_id === user.id 
      ? activeConv.participant_2_id 
      : activeConv.participant_1_id

    return (
      <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-zinc-800">
        {/* Sidebar: hidden on mobile when viewing a chat, visible on tablet+ */}
        <div className="hidden md:flex flex-col w-80 lg:w-96 border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-800">
            <h2 className="text-lg font-bold">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList 
              userId={user.id} 
              initialConversations={conversations} 
              activeConversationId={conversationId}
            />
          </div>
        </div>

        {/* Main Content: Chat Window */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <ChatWindow 
            conversationId={conversationId}
            initialMessages={initialMessages}
            currentUserId={user.id}
            otherParticipantAlias={otherParticipantAlias}
            otherParticipantId={otherParticipantId}
            isBlockedMode={isBlockedMode}
          />
        </div>
      </div>
    )
  } catch (error) {
    // If not participant or conv doesn't exist
    redirect('/messages')
  }
}
