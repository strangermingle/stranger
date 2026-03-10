'use server'

import { createClient } from '@/lib/supabase/server'
import { createEventSchema, type CreateEventInput } from '@/lib/validations/event.schemas'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEventAction(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  try {
    const rawData = formData.get('data') as string
    if (!rawData) return { error: 'No data provided' }
    
    const validated = createEventSchema.parse(JSON.parse(rawData))

    // 1. Create Location if provided
    let locationId = null
    if (validated.location) {
      const { data: loc, error: locError } = await (supabase
        .from('locations') as any)
        .insert({
          venue_name: validated.location.venue_name,
          address_line1: validated.location.address_line_1,
          city: validated.location.city,
          state: validated.location.state,
          country: validated.location.country,
          postal_code: validated.location.postal_code
        } as any)
        .select()
        .single()
      
      if (locError) throw locError
      locationId = (loc as any).id
    }

    // 2. Insert Event
    const { data: event, error: eventError } = await (supabase
      .from('events') as any)
      .insert({
        title: validated.title,
        host_id: user.id,
        category_id: validated.category_id,
        location_id: locationId,
        event_type: validated.event_type,
        status: validated.status as any,
        start_datetime: validated.start_datetime,
        end_datetime: validated.end_datetime,
        timezone: validated.timezone,
        short_description: validated.short_description,
        description: validated.description,
        ticketing_mode: validated.ticketing_mode as any,
        slug: validated.title.toLowerCase().replace(/ /g, '-') + '-' + Math.random().toString(36).substring(2, 7)
      } as any)
      .select()
      .single()

    if (eventError) throw eventError

    // 3. Insert Ticket Tiers
    if (validated.ticket_tiers && validated.ticket_tiers.length > 0) {
      const { error: tierError } = await (supabase
        .from('ticket_tiers') as any)
        .insert(
          validated.ticket_tiers.map(t => ({
            event_id: (event as any).id,
            name: t.name,
            tier_type: t.tier_type as any,
            price: t.price,
            total_quantity: t.total_quantity,
            max_per_booking: t.max_per_booking
          })) as any
        )
      
      if (tierError) throw tierError
    }

    revalidatePath('/members/host-dashboard')
    return { success: true, slug: (event as any).slug, id: (event as any).id }

  } catch (err: any) {
    console.error('createEventAction error:', err)
    return { error: err.message || 'Failed to create event' }
  }
}

export async function updateEventAction(eventId: string, formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'Unauthorized' }
  }

  try {
    const rawData = formData.get('data') as string
    if (!rawData) return { error: 'No data provided' }
    
    const validated = createEventSchema.parse(JSON.parse(rawData))

    // Ownership check
    const { data: existing } = await (supabase.from('events') as any).select('host_id').eq('id', eventId).single()
    if (!existing || (existing as any).host_id !== user.id) return { error: 'Unauthorized' }

    // Update Logic (simplified for brevitiy)
    const { error: updateError } = await (supabase
      .from('events') as any)
      .update({
        title: validated.title,
        category_id: validated.category_id,
        event_type: validated.event_type,
        start_datetime: validated.start_datetime,
        end_datetime: validated.end_datetime,
        short_description: validated.short_description,
        description: validated.description,
        status: validated.status as any
      } as any)
      .eq('id', eventId)

    if (updateError) throw updateError

    revalidatePath('/members/host-dashboard')
    revalidatePath(`/events/${eventId}`)
    return { success: true }
  } catch (err: any) {
    console.error('updateEventAction error:', err)
    return { error: err.message || 'Failed to update event' }
  }
}

export async function uploadEventImageAction(eventId: string, file: File) {
    // Placeholder for image upload logic
    // This would typically use Supabase Storage
    return { error: 'Image upload not fully implemented in this refactor' }
}

export async function updateEventStatusAction(eventId: string, status: string) {
  const supabase = await createClient()
  const { error } = await (supabase.from('events') as any).update({ status: status as any } as any).eq('id', eventId)
  if (error) return { error: error.message }
  revalidatePath('/members/host-dashboard')
  return { success: true }
}
