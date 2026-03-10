'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function toggleFeaturedEvent(eventId: string, isFeatured: boolean) {
  const supabase = await createClient()

  const { error } = await (supabase
    .from('events') as any)
    .update({ is_featured: isFeatured })
    .eq('id', eventId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/events')
  return { success: true }
}

export async function toggleSponsoredEvent(eventId: string, isSponsored: boolean) {
  const supabase = await createClient()

  const { error } = await (supabase
    .from('events') as any)
    .update({ is_sponsored: isSponsored })
    .eq('id', eventId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  return { success: true }
}
export async function approveHostAction(hostProfileId: string, approved: boolean) {
  const supabase = await createClient()

  // 1. Verify admin role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: profile } = await (supabase
    .from('users') as any)
    .select('role')
    .eq('id', user.id)
    .single()

  if ((profile as any)?.role !== 'admin') return { success: false, error: 'Forbidden' }

  // 2. Update host_profiles
  const { data: hostProfile, error: updateError } = await (supabase
    .from('host_profiles') as any)
    .update({ 
      is_approved: approved,
      approved_by: user.id,
      approved_at: new Date().toISOString()
    })
    .eq('id', hostProfileId)
    .select('user_id, display_name')
    .single()

  if (updateError) return { success: false, error: updateError.message }

  // 3. Insert into admin_actions
  await supabase
    .from('admin_actions')
    .insert({
      admin_id: user.id,
      action_type: 'host_approval',
      target_type: 'host_profile',
      target_id: hostProfileId,
      description: `${approved ? 'Approved' : 'Rejected'} host: ${hostProfile.display_name}`,
      metadata: { approved }
    } as any)

  // 4. Send notification if approved
  // Import dynamically to avoid circular dependencies if any
  const { sendNotification } = await import('@/lib/notifications/send')
  
  if (approved) {
    await sendNotification(hostProfile.user_id, 'host_approved', {
      host_name: hostProfile.display_name
    })
  }

  revalidatePath('/admin/hosts')
  return { success: true }
}

export async function resolveReportAction(reportId: string, status: 'resolved' | 'dismissed', note: string) {
  const supabase = await createClient()

  // Verify admin/moderator
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: profile } = await (supabase.from('users') as any).select('role').eq('id', user.id).single()
  if ((profile as any)?.role !== 'admin' && (profile as any)?.role !== 'moderator') return { success: false, error: 'Forbidden' }

  // Update report
  const { error: updateError } = await (supabase
    .from('reports') as any)
    .update({ 
      status, 
      resolution_note: note, 
      reviewed_by: user.id, 
      reviewed_at: new Date().toISOString() 
    })
    .eq('id', reportId)

  if (updateError) return { success: false, error: updateError.message }

  // Insert into admin_actions
  await (supabase.from('admin_actions') as any).insert({
    admin_id: user.id,
    action_type: 'report_resolution',
    target_type: 'report',
    target_id: reportId,
    description: `Report ${reportId} marked as ${status}. Note: ${note}`,
  })

  revalidatePath('/admin/reports')
  return { success: true }
}

export async function suspendEventAction(eventId: string, reason: string) {
  const supabase = await createClient()

  // Verify admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: profile } = await (supabase.from('users') as any).select('role').eq('id', user.id).single()
  if ((profile as any)?.role !== 'admin') return { success: false, error: 'Forbidden' }

  // Update events
  const { data: event, error: updateError } = await ((supabase
    .from('events') as any)
    .update({ status: 'suspended', admin_notes: reason })
    .eq('id', eventId)
    .select('host_id, title')
    .single() as unknown as Promise<{ data: any, error: any }>)

  if (updateError) return { success: false, error: updateError.message }

  // Insert into admin_actions
  await (supabase.from('admin_actions') as any).insert({
    admin_id: user.id,
    action_type: 'event_suspension',
    target_type: 'event',
    target_id: eventId,
    description: `Suspended event: ${event.title}. Reason: ${reason}`
  })

  // Send notification to host
  const { sendNotification } = await import('@/lib/notifications/send')
  await sendNotification(event.host_id, 'event_suspended', {
    event_title: event.title,
    reason: reason
  })

  revalidatePath('/admin/events')
  revalidatePath(`/events/${eventId}`)
  return { success: true }
}

export async function suspendUserAction(userId: string, reason: string, until?: string) {
  const supabase = await createClient()

  // Verify admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: profile } = await (supabase.from('users') as any).select('role').eq('id', user.id).single()
  if ((profile as any)?.role !== 'admin') return { success: false, error: 'Forbidden' }

  // Update users
  const { error: updateError } = await (supabase
    .from('users') as any)
    .update({ 
      is_suspended: true, 
      suspension_reason: reason, 
      suspended_until: until || null 
    })
    .eq('id', userId)

  if (updateError) return { success: false, error: updateError.message }

  // Invalidate all sessions
  await (supabase
    .from('user_sessions') as any)
    .delete()
    .eq('user_id', userId)

  // Insert into admin_actions
  await (supabase.from('admin_actions') as any).insert({
    admin_id: user.id,
    action_type: 'user_suspension',
    target_type: 'user',
    target_id: userId,
    description: `Suspended user ${userId}. Reason: ${reason}`
  })

  revalidatePath('/admin/users')
  return { success: true }
}

export async function processPayoutAction(payoutId: string) {
  const supabase = await createClient()

  // Verify admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'Unauthorized' }

  const { data: profile } = await (supabase.from('users') as any).select('role').eq('id', user.id).single()
  if ((profile as any)?.role !== 'admin') return { success: false, error: 'Forbidden' }

  // 1. Fetch payout details
  const { data: payout, error: fetchError } = await ((supabase
    .from('payouts') as any)
    .select('*, host:users(email, host_profiles(razorpay_account_id))')
    .eq('id', payoutId)
    .single() as unknown as Promise<{ data: any, error: any }>)

  if (fetchError || !payout) return { success: false, error: 'Payout not found' }

  // 2. Mock Razorpay Payout API Call
  // In a real app, call Razorpay SDK here
  const mockRazorpayPayoutId = `pout_${Math.random().toString(36).substring(2, 11)}`

  // 3. Update payout status
  const { error: updateError } = await ((supabase
    .from('payouts') as any)
    .update({ 
      status: 'paid', 
      razorpay_payout_id: mockRazorpayPayoutId, 
      paid_at: new Date().toISOString() 
    })
    .eq('id', payoutId) as unknown as Promise<{ error: any }>)

  if (updateError) return { success: false, error: updateError.message }

  // 4. Audit Log
  await (supabase.from('admin_actions') as any).insert({
    admin_id: user.id,
    action_type: 'payout_processing',
    target_type: 'payout',
    target_id: payoutId,
    description: `Processed payout of ₹${payout.net_amount} for payout ID: ${payoutId}`
  })

  revalidatePath('/admin/payouts')
  return { success: true }
}
