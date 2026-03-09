'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createHostProfileSchema, CreateHostProfileInput } from '@/lib/validations/host.schemas'
import { createHostProfileAction } from '@/actions/host.actions'

export function BecomeHostForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<CreateHostProfileInput>({
    resolver: zodResolver(createHostProfileSchema),
    mode: 'onChange',
    defaultValues: {
      host_type: 'individual'
    }
  })

  // Watch host_type for conditional rendering if needed
  const hostType = watch('host_type')

  const nextStep = async () => {
    let fieldsToValidate: (keyof CreateHostProfileInput)[] = []
    
    if (step === 1) fieldsToValidate = ['host_type', 'display_name']
    if (step === 2) fieldsToValidate = ['description', 'tagline', 'website_url', 'instagram_handle']
    
    // We are skipping the Zod schema's literal adherence for city/state/country because they aren't in the schema per prompt, 
    // but they are required in step 3 so we'll just validate they are filled natively or via action parsing.

    const isStepValid = await trigger(fieldsToValidate)
    if (isStepValid) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  async function onSubmit(data: CreateHostProfileInput) {
    setIsLoading(true)
    setErrorMsg(null)

    // Using FormData to match Server Action signature directly
    const formData = new FormData()
    formData.append('host_type', data.host_type)
    formData.append('display_name', data.display_name)
    if (data.tagline) formData.append('tagline', data.tagline)
    if (data.description) formData.append('description', data.description)
    if (data.website_url) formData.append('website_url', data.website_url)
    if (data.instagram_handle) formData.append('instagram_handle', data.instagram_handle)

    // Manual grab since they weren't in schema definition but requested in prompt explicitly
    const citySelect = document.getElementById('city') as HTMLSelectElement
    const stateSelect = document.getElementById('state') as HTMLSelectElement
    const countrySelect = document.getElementById('country') as HTMLSelectElement
    
    if(citySelect && stateSelect && countrySelect) {
      formData.append('city', citySelect.value)
      formData.append('state', stateSelect.value)
      formData.append('country', countrySelect.value)
    }

    const result = await createHostProfileAction(formData)

    if (result?.error) {
      setErrorMsg(result.error)
      setIsLoading(false)
    }
    // On success, redirect happens in server action natively
  }

  return (
    <div className="w-full">
      <div className="mb-8">
         <div className="flex items-center justify-between">
           <div className={`flex flex-col items-center ${step >= 1 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
             <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current bg-white dark:bg-zinc-900 font-bold">1</span>
             <span className="text-xs font-medium mt-1">Basics</span>
           </div>
           <div className={`h-1 w-full flex-1 mx-2 rounded ${step >= 2 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-zinc-700'}`}></div>
           <div className={`flex flex-col items-center ${step >= 2 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
             <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current bg-white dark:bg-zinc-900 font-bold">2</span>
             <span className="text-xs font-medium mt-1">Details</span>
           </div>
           <div className={`h-1 w-full flex-1 mx-2 rounded ${step >= 3 ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-gray-200 dark:bg-zinc-700'}`}></div>
           <div className={`flex flex-col items-center ${step >= 3 ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400'}`}>
             <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-current bg-white dark:bg-zinc-900 font-bold">3</span>
             <span className="text-xs font-medium mt-1">Location</span>
           </div>
         </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {errorMsg && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {errorMsg}
          </div>
        )}

        {/* STEP 1 */}
        <div className={step === 1 ? 'block space-y-4' : 'hidden'}>
          <div className="space-y-1">
            <label className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
              Host Type
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="individual" {...register('host_type')} className="text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                <span className="text-sm dark:text-gray-300">Individual</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="organisation" {...register('host_type')} className="text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                <span className="text-sm dark:text-gray-300">Organisation</span>
              </label>
            </div>
            {errors.host_type && <p className="text-sm text-red-500 dark:text-red-400">{errors.host_type.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="display_name" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
              {hostType === 'organisation' ? 'Organisation Name' : 'Display Name'}
            </label>
            <input
              {...register('display_name')}
              id="display_name"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
              placeholder={hostType === 'organisation' ? 'Event Co.' : 'John Doe'}
            />
            {errors.display_name && <p className="text-sm text-red-500 dark:text-red-400">{errors.display_name.message}</p>}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Continue
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div className={step === 2 ? 'block space-y-4' : 'hidden'}>
           <div className="space-y-1">
            <label htmlFor="tagline" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
              Short Tagline (Optional)
            </label>
            <input
              {...register('tagline')}
              id="tagline"
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
              placeholder="Creating unforgettable moments"
            />
            {errors.tagline && <p className="text-sm text-red-500 dark:text-red-400">{errors.tagline.message}</p>}
          </div>

          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
              Description / Bio
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={4}
              className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
              placeholder="Tell attendees more about what you do..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label htmlFor="website_url" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                Website URL
              </label>
              <input
                {...register('website_url')}
                id="website_url"
                type="url"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400"
                placeholder="https://example.com"
              />
              {errors.website_url && <p className="text-sm text-red-500 dark:text-red-400">{errors.website_url.message}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="instagram_handle" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
                Instagram Handle
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400">@</span>
                <input
                  {...register('instagram_handle')}
                  id="instagram_handle"
                  className="flex h-10 w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:text-gray-50"
                  placeholder="username"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Continue
            </button>
          </div>
        </div>

        {/* STEP 3 */}
        <div className={step === 3 ? 'block space-y-4' : 'hidden'}>
          <div className="space-y-1">
             <label htmlFor="country" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">Country</label>
             <select id="country" name="country" required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50">
                <option value="">Select country...</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="IN">India</option>
                <option value="CA">Canada</option>
             </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
             <div className="space-y-1">
                <label htmlFor="state" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">State / Region</label>
                <input id="state" name="state" required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400" placeholder="State" />
             </div>
             <div className="space-y-1">
                <label htmlFor="city" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">City</label>
                <input id="city" name="city" required className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:border-zinc-700 dark:text-gray-50 dark:focus:ring-indigo-400" placeholder="City" />
             </div>
          </div>

          <div className="pt-4 flex items-start gap-3">
             <input required id="agreement" type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
             <label htmlFor="agreement" className="text-sm text-gray-600 dark:text-gray-400">
               I agree to the StrangerMingle Host Terms of Service. I confirm that all submitted details are accurate and acknowledge that KYC verification may be required before payouts are processed.
             </label>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700 disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              {isLoading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}
