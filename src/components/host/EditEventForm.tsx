'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createEventSchema, type CreateEventInput } from '@/lib/validations/event.schemas'
import { updateEventAction, uploadEventImageAction, updateEventStatusAction } from '@/actions/event.actions'
import { Database } from '@/types/database.types'

interface Category {
  id: string
  name: string
  slug: string
}

interface EditEventFormProps {
  event: Database['public']['Tables']['events']['Row']
  categories: Category[]
}

export function EditEventForm({ event, categories }: EditEventFormProps) {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [images, setImages] = useState<Array<{ id: string; url: string; is_cover: boolean }>>([])

  // Initialize form data with existing event values
  const [formData, setFormData] = useState<Partial<CreateEventInput>>({
    title: event.title ?? '',
    category_id: event.category_id ?? '',
    event_type: (event.event_type ?? 'in_person') as 'in_person' | 'online' | 'hybrid',
    ticketing_mode: (event.ticketing_mode ?? 'platform') as 'platform' | 'external' | 'free' | 'rsvp' | 'none',
    start_datetime: event.start_datetime ?? '',
    end_datetime: event.end_datetime ?? '',
    timezone: event.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    is_recurring: event.is_recurring ?? false,
    short_description: event.short_description ?? '',
    description: event.description ?? '',
    status: (event.status ?? 'draft') as 'draft' | 'published' | 'cancelled' | 'completed',
    ticket_tiers: [], // will be fetched separately if needed
  })

  // Load existing images on mount
  // (In a real app you'd fetch via a server action; here we assume they are passed or fetched elsewhere)

  const handleNext = () => {
    setCurrentStep(s => Math.min(s + 1, 4))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setCurrentStep(s => Math.max(s - 1, 0))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleChange = (field: keyof CreateEventInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleLocationChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      location: { ...(prev.location || {}), [field]: value },
    }))
  }

  const addTicketTier = () => {
    setFormData(prev => ({
      ...prev,
      ticket_tiers: [
        ...(prev.ticket_tiers || []),
        { name: '', tier_type: 'general', price: 0, total_quantity: 100, max_per_booking: 10 },
      ],
    }))
  }

  const removeTicketTier = (index: number) => {
    setFormData(prev => {
      const tiers = [...(prev.ticket_tiers || [])]
      tiers.splice(index, 1)
      return { ...prev, ticket_tiers: tiers }
    })
  }

  const handleTierChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const tiers = [...(prev.ticket_tiers || [])]
      tiers[index] = { ...tiers[index], [field]: value }
      return { ...prev, ticket_tiers: tiers }
    })
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsSubmitting(true)
    const res = await uploadEventImageAction(event.id as string, file) as any
    if (res?.error) {
      setErrorMsg(res.error)
    } else if (res?.image) {
      setImages(prev => [...prev, res.image])
    }
    setIsSubmitting(false)
  }

  const setCoverImage = async (imageId: string) => {
    setIsSubmitting(true)
    const res = await updateEventAction(event.id as string, new FormData()) // placeholder to trigger ownership check
    // In a real implementation you'd call a dedicated action to set cover; omitted for brevity
    setIsSubmitting(false)
  }

  const submitForm = async (status: 'draft' | 'published') => {
    setErrorMsg(null)
    setIsSubmitting(true)
    try {
      const finalPayload = { ...formData, status }
      const parsed = createEventSchema.parse(finalPayload)
      const builtFormData = new FormData()
      builtFormData.append('data', JSON.stringify(parsed))
      builtFormData.append('eventId', event.id as string)
      const res = await updateEventAction(event.id as string, builtFormData)
      if (res?.error) throw new Error(res.error)
      router.push(`/members/host-dashboard/events?success=${event.id}`)
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to update event.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // UI rendering (similar steps to CreateEventForm, omitted for brevity)
  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
      {/* Progress Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">Edit Event</h1>
        {/* ... step navigation omitted for brevity ... */}
      </div>
      <hr className="border-gray-200 dark:border-zinc-800" />
      {errorMsg && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">{errorMsg}</div>
      )}
      {/* Render form fields based on currentStep – omitted for brevity */}
      {/* Image Management Section */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Event Images</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isSubmitting} />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map(img => (
            <div key={img.id} className="relative">
              <img src={img.url} alt="Event" className="h-24 w-24 object-cover rounded" />
              {img.is_cover && <span className="absolute inset-0 ring-2 ring-indigo-500" />}
              <button type="button" onClick={() => setCoverImage(img.id)} className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
                Set as Cover
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button onClick={handleBack} disabled={currentStep === 0 || isSubmitting} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">
          Back
        </button>
        {currentStep < 4 ? (
          <button onClick={handleNext} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">
            Next
          </button>
        ) : (
          <div className="space-x-2">
            <button onClick={() => submitForm('draft')} disabled={isSubmitting} className="px-4 py-2 bg-gray-500 text-white rounded">
              Save Draft
            </button>
            <button onClick={() => submitForm('published')} disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">
              Publish
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
