'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createEventSchema, type CreateEventInput } from '@/lib/validations/event.schemas'
import { createEventAction } from '@/actions/event.actions'

interface Category {
  id: string
  name: string
  slug: string
}

interface CreateEventFormProps {
  categories: Category[]
}

const steps = ['Basics', 'Schedule', 'Location', 'Tickets']

export function CreateEventForm({ categories }: CreateEventFormProps) {
  const router = useRouter()
  
  // High-level Wizard State
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Local drafted state backing Zod Schema requirements
  const [formData, setFormData] = useState<Partial<CreateEventInput>>({
    title: '',
    category_id: '',
    event_type: 'in_person',
    ticketing_mode: 'platform',
    start_datetime: '',
    end_datetime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    is_recurring: false,
    short_description: '',
    description: '',
    status: 'draft',
    ticket_tiers: [] // dynamic nested array
  })

  // Handlers
  const handleNext = () => {
    // Basic step validation could occur here by partially pinging `createEventSchema.pick({...})`
    // For scaffolding quickly we allow moving steps and validate comprehensively on Draft/Publish.
    setCurrentStep(s => Math.min(s + 1, steps.length - 1))
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
      location: {
         ...(prev.location || { venue_name: '', address_line_1: '', city: '', state: '', country: '', postal_code: '' }),
         [field]: value
      }
    }))
  }

  const addTicketTier = () => {
     setFormData(prev => ({
       ...prev,
       ticket_tiers: [
         ...(prev.ticket_tiers || []),
         { name: '', tier_type: 'general', price: 0, total_quantity: 100, max_per_booking: 10 }
       ]
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

  const submitForm = async (status: 'draft' | 'published') => {
    setErrorMsg(null)
    setIsSubmitting(true)
    
    try {
       // Validate against schema on client side before hitting server
       const finalPayload = { ...formData, status }
       const parsed = createEventSchema.parse(finalPayload)
       
       const builtFormData = new FormData()
       builtFormData.append('data', JSON.stringify(parsed))

       const res = await createEventAction(builtFormData)
       if (res?.error) throw new Error(res.error)
       
       // Success -> send to success hub
       router.push(`/members/host-dashboard?success=${res?.slug || ''}`)

    } catch (err: any) {
       console.error(err)
       setErrorMsg(err?.message || 'Please check all required fields across all steps before submitting.')
    } finally {
       setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-10">
      
      {/* Progress Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">Create New Event</h1>
        <div className="mt-6 flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step} className="flex flex-1 flex-col items-center">
               <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-sm transition-colors ${idx === currentStep ? 'bg-indigo-600 text-white dark:bg-indigo-500' : idx < currentStep ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-zinc-500'}`}>
                 {idx + 1}
               </div>
               <span className={`mt-2 text-xs font-semibold ${idx === currentStep ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500'}`}>
                 {step}
               </span>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 dark:border-zinc-800" />

      {errorMsg && (
        <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
           {errorMsg}
        </div>
      )}

      {/* STEP 1: Basics */}
      {currentStep === 0 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              maxLength={255}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category *</label>
               <select
                 value={formData.category_id}
                 onChange={(e) => handleChange('category_id', e.target.value)}
                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
               >
                 <option value="">Select Category</option>
                 {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
               </select>
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Format *</label>
               <select
                 value={formData.event_type}
                 onChange={(e) => handleChange('event_type', e.target.value as any)}
                 className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
               >
                 <option value="in_person">In Person</option>
                 <option value="online">Online</option>
                 <option value="hybrid">Hybrid</option>
               </select>
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Short Summary</label>
             <textarea
               value={formData.short_description || ''}
               onChange={(e) => handleChange('short_description', e.target.value)}
               rows={2}
               className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
               placeholder="Briefly describe what your event is about (up to 500 chars)"
             />
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Details</label>
             <textarea
               value={formData.description || ''}
               onChange={(e) => handleChange('description', e.target.value)}
               rows={6}
               className="mt-1 block w-full font-mono rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
               placeholder="Add complete details, agenda, and requirements here..."
             />
          </div>
        </div>
      )}

      {/* STEP 2: Schedule */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Starts *</label>
              <input
                type="datetime-local"
                value={formData.start_datetime}
                onChange={(e) => handleChange('start_datetime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Ends *</label>
              <input
                type="datetime-local"
                value={formData.end_datetime}
                onChange={(e) => handleChange('end_datetime', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Doors Open</label>
              <input
                type="time" // We mock input matching backend expectations conceptually
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Timezone *</label>
              <input
                type="text"
                readOnly
                value={formData.timezone}
                className="mt-1 block w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Location */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           {['in_person', 'hybrid'].includes(formData.event_type!) && (
              <div className="space-y-6 rounded-lg border p-4 bg-gray-50/50 dark:bg-zinc-900 dark:border-zinc-800">
                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">Physical Venue</h3>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Venue Name</label>
                   <input
                     type="text"
                     placeholder="e.g. Central Library"
                     value={formData.location?.venue_name || ''}
                     onChange={(e) => handleLocationChange('venue_name', e.target.value)}
                     className="mt-1 w-full rounded border-gray-300 dark:border-zinc-700 dark:bg-zinc-950 px-3 py-2"
                   />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Address</label>
                   <input
                     type="text"
                     value={formData.location?.address_line_1 || ''}
                     onChange={(e) => handleLocationChange('address_line_1', e.target.value)}
                     className="mt-1 w-full rounded border-gray-300 dark:border-zinc-700 dark:bg-zinc-950 px-3 py-2"
                   />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm mb-1">City</label>
                        <input value={formData.location?.city || ''} onChange={(e) => handleLocationChange('city', e.target.value)} className="w-full rounded border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">State</label>
                        <input value={formData.location?.state || ''} onChange={(e) => handleLocationChange('state', e.target.value)} className="w-full rounded border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Country</label>
                        <input value={formData.location?.country || ''} onChange={(e) => handleLocationChange('country', e.target.value)} className="w-full rounded border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Postal Code</label>
                        <input value={formData.location?.postal_code || ''} onChange={(e) => handleLocationChange('postal_code', e.target.value)} className="w-full rounded border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" />
                    </div>
                 </div>
              </div>
           )}

           {['online', 'hybrid'].includes(formData.event_type!) && (
              <div className="space-y-6 rounded-lg border p-4 bg-gray-50/50 dark:bg-zinc-900 dark:border-zinc-800">
                 <h3 className="font-semibold text-gray-900 dark:text-gray-100">Virtual Stream</h3>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Platform</label>
                   <select
                     value={formData.online_platform || ''}
                     onChange={(e) => handleChange('online_platform', e.target.value)}
                     className="mt-1 w-full rounded border-gray-300 dark:border-zinc-700 dark:bg-zinc-950 px-3 py-2"
                   >
                     <option value="">Select Platform</option>
                     <option value="Zoom">Zoom</option>
                     <option value="Google Meet">Google Meet</option>
                     <option value="Microsoft Teams">Microsoft Teams</option>
                     <option value="Custom Link">Custom Link</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event URL</label>
                   <input
                     type="url"
                     placeholder="https://..."
                     value={formData.online_event_url || ''}
                     onChange={(e) => handleChange('online_event_url', e.target.value)}
                     className="mt-1 w-full rounded border-gray-300 dark:border-zinc-700 dark:bg-zinc-950 px-3 py-2"
                   />
                 </div>
              </div>
           )}
        </div>
      )}

      {/* STEP 4: Tickets */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div>
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ticketing Method *</label>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
               {[
                 { id: 'platform', label: 'Sell via Platform' },
                 { id: 'external', label: 'External Link' },
                 { id: 'free', label: 'Free Event' },
                 { id: 'rsvp', label: 'RSVP Only' }
               ].map(opt => (
                 <label key={opt.id} className={`flex cursor-pointer items-center justify-center rounded-lg border p-4 text-sm font-semibold transition-all hover:bg-gray-50 dark:hover:bg-zinc-800 ${formData.ticketing_mode === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300'}`}>
                   <input type="radio" name="ticketing" className="hidden" checked={formData.ticketing_mode === opt.id} onChange={() => handleChange('ticketing_mode', opt.id)} />
                   {opt.label}
                 </label>
               ))}
             </div>
          </div>

          {formData.ticketing_mode === 'external' && (
             <div>
               <label className="block text-sm font-medium mb-1">External Ticket URL *</label>
               <input type="url" placeholder="https://eventbrite.com/..." className="w-full rounded border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" value={formData.external_ticket_url || ''} onChange={e => handleChange('external_ticket_url', e.target.value)} />
             </div>
          )}

          {(formData.ticketing_mode === 'free' || formData.ticketing_mode === 'rsvp') && (
             <div>
               <label className="block text-sm font-medium mb-1">Maximum Capacity (Optional)</label>
               <input type="number" placeholder="Leave blank for unlimited" className="w-full rounded border-gray-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950" value={formData.max_capacity || ''} onChange={e => handleChange('max_capacity', Number(e.target.value))} />
             </div>
          )}

          {formData.ticketing_mode === 'platform' && (
             <div className="space-y-4">
               <h3 className="font-semibold">Ticket Tiers</h3>
               {formData.ticket_tiers?.map((tier, idx) => (
                  <div key={idx} className="relative rounded-lg border border-gray-200 p-4 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900/50 group">
                      <button onClick={() => removeTicketTier(idx)} className="absolute right-3 top-3 text-red-500 hover:text-red-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition">Remove</button>
                      <div className="grid grid-cols-2 gap-4">
                         <div>
                            <label className="block text-xs mb-1">Tier Name</label>
                            <input value={tier.name} onChange={e => handleTierChange(idx, 'name', e.target.value)} className="w-full rounded border-gray-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950" placeholder="General Adm..." />
                         </div>
                         <div>
                            <label className="block text-xs mb-1">Price (₹)</label>
                            <input type="number" value={tier.price} onChange={e => handleTierChange(idx, 'price', Number(e.target.value))} className="w-full rounded border-gray-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
                         </div>
                         <div>
                            <label className="block text-xs mb-1">Total Qty</label>
                            <input type="number" value={tier.total_quantity} onChange={e => handleTierChange(idx, 'total_quantity', Number(e.target.value))} className="w-full rounded border-gray-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
                         </div>
                         <div>
                            <label className="block text-xs mb-1">Max/Booking</label>
                            <input type="number" value={tier.max_per_booking} onChange={e => handleTierChange(idx, 'max_per_booking', Number(e.target.value))} className="w-full rounded border-gray-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-950" />
                         </div>
                      </div>
                  </div>
               ))}
               <button onClick={addTicketTier} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                  + Add Ticket Tier
               </button>
             </div>
          )}
        </div>
      )}

      {/* Button Controls */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-zinc-800">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || isSubmitting}
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm disabled:opacity-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
        >
          Back
        </button>
        
        <div className="flex gap-3">
          {currentStep === steps.length - 1 ? (
             <>
               <button
                 onClick={() => submitForm('draft')}
                 disabled={isSubmitting}
                 className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800"
               >
                 Save Draft
               </button>
               <button
                 onClick={() => submitForm('published')}
                 disabled={isSubmitting}
                 className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition disabled:opacity-50 dark:bg-indigo-500"
               >
                 {isSubmitting ? 'Publishing...' : 'Publish Event'}
               </button>
             </>
          ) : (
            <button
               onClick={handleNext}
               className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition dark:bg-indigo-500"
            >
               Next
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
