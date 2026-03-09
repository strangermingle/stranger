'use server'

import { createClient } from '../lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function markAsReadAction(notificationId: string) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  const { error: updateError } = await (supabase
    .from('notifications')
    .update({ 
      is_read: true,
      read_at: new Date().toISOString()
    } as never)
    .eq('id', notificationId)
    .eq('user_id', user.id) as unknown as Promise<{ error: any }>)

  if (updateError) {
    return { error: updateError.message }
  }

  return { success: true }
}

export async function markAllReadAction() {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  const { error: updateError } = await (supabase
    .from('notifications')
    .update({ 
      is_read: true,
      read_at: new Date().toISOString()
    } as never)
    .eq('user_id', user.id)
    .eq('is_read', false) as unknown as Promise<{ error: any }>)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/notifications')
  return { success: true }
}
