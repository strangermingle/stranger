'use server'

import { createClient } from '../lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Note: A robust implementation would use a Zod schema here, 
// but we'll accept the structured data from the client component which handles validation
export async function updateProfileAction(formData: FormData) {
  const username = formData.get('username') as string
  const bio = formData.get('bio') as string
  const avatar_url = formData.get('avatar_url') as string
  const preferred_currency = formData.get('preferred_currency') as string
  const timezone = formData.get('timezone') as string

  // basic validation 
  if (!username || username.length < 3 || username.length > 50) {
    return { error: 'Username must be between 3 and 50 characters' }
  }

  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  // Check username uniqueness if they are changing it
  const { data: existingUser, error: checkError } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .neq('id', user.id)
    .single()
    
  if (existingUser) {
    return { error: 'Username is already taken' }
  }

  const { error: updateError } = await (supabase
    .from('users')
    .update({
      username,
      bio: bio || null,
      avatar_url: avatar_url || null,
      preferred_currency: preferred_currency || null,
      timezone: timezone || null,
      updated_at: new Date().toISOString()
    } as never)
    .eq('id', user.id) as unknown as Promise<{ error: any }>)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/dashboard')
  revalidatePath('/profile')

  return { success: true }
}

const VALID_NOTIFICATION_TYPES = [
  'booking_confirmed',
  'booking_cancelled',
  'payment_failed',
  'event_reminder_24h',
  'event_reminder_1h',
  'event_cancelled',
  'new_message',
  'waitlist_offer',
  'new_event_from_followed_host',
  'review_received',
  'host_response_received',
  'saved_search_alert'
];

export async function updateNotificationPrefsAction(prefs: Record<string, any>) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  // Validate keys
  const keys = Object.keys(prefs);
  const invalidKeys = keys.filter(k => !VALID_NOTIFICATION_TYPES.includes(k));
  if (invalidKeys.length > 0) {
    return { error: `Invalid notification types: ${invalidKeys.join(', ')}` };
  }

  // Fetch current prefs to merge
  const { data: currentUser, error: fetchError } = await supabase
    .from('users')
    .select('notification_prefs')
    .eq('id', user.id)
    .single();

  if (fetchError) {
    return { error: 'Failed to fetch current preferences' };
  }

  const currentPrefs = (currentUser?.notification_prefs as Record<string, any>) || {};
  
  // Merge granularly: newPrefs[type] = { ...currentPrefs[type], ...prefs[type] }
  const mergedPrefs = { ...currentPrefs };
  for (const [type, channels] of Object.entries(prefs)) {
    mergedPrefs[type] = {
      ...(mergedPrefs[type] || { in_app: true, email: true }),
      ...channels
    };
  }

  const { error: updateError } = await (supabase
    .from('users')
    .update({
      notification_prefs: mergedPrefs,
      updated_at: new Date().toISOString()
    } as never)
    .eq('id', user.id) as unknown as Promise<{ error: any }>)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/settings/notifications')
  return { success: true }
}
