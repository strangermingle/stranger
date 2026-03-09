'use client'

import { useState } from 'react'
import { User } from '@/types'
import { updateProfileAction } from '@/actions/user.actions'

export function ProfileForm({ initialData }: { initialData: User }) {
  const [isLoading, setIsLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // NOTE: Simple uncontrolled approach for standard update forms handling FormData via Server Actions
  // Avatar uploading natively to Supabase Storage would be required first before passing an avatar_url.
  // For this exercise, it'll accept a URL string directly or empty.

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    const formData = new FormData(e.currentTarget)
    
    const result = await updateProfileAction(formData)

    if (result?.error) {
      setErrorMsg(result.error)
    } else if (result?.success) {
      setSuccessMsg('Profile updated successfully.')
    }
    
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
          {errorMsg}
        </div>
      )}
      
      {successMsg && (
        <div className="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
          {successMsg}
        </div>
      )}

      {/* Username */}
      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
          Username
        </label>
        <div className="flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-400">
            @
          </span>
          <input
            type="text"
            name="username"
            id="username"
            defaultValue={initialData.username}
            disabled={isLoading}
            className="flex h-10 w-full min-w-0 flex-1 rounded-none rounded-r-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:text-gray-50"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-1">
        <label htmlFor="bio" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
          Bio
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Write a short introduction about yourself.
        </p>
        <textarea
          name="bio"
          id="bio"
          rows={4}
          defaultValue={initialData.bio || ''}
          disabled={isLoading}
          className="flex w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:text-gray-50"
        />
      </div>

      {/* Avatar URL Placeholder */}
      <div className="space-y-1">
        <label htmlFor="avatar_url" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
          Avatar URL
        </label>
        <input
          type="url"
          name="avatar_url"
          id="avatar_url"
          defaultValue={initialData.avatar_url || ''}
          disabled={isLoading}
          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:text-gray-50"
          placeholder="https://example.com/avatar.png"
        />
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="preferred_currency" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Preferred Currency
          </label>
          <select
            name="preferred_currency"
            id="preferred_currency"
            defaultValue={initialData.preferred_currency || 'USD'}
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:text-gray-50"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="AUD">AUD ($)</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="timezone" className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300">
            Timezone
          </label>
          <select
            name="timezone"
            id="timezone"
            defaultValue={initialData.timezone || 'UTC'}
            disabled={isLoading}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:text-gray-50"
          >
            <option value="UTC">UTC (Universal Coordinated Time)</option>
            <option value="America/New_York">Eastern Time (US/New York)</option>
            <option value="Europe/London">Greenwich Mean Time (London)</option>
            <option value="Asia/Kolkata">India Standard Time (Kolkata)</option>
            {/* Adding more robust list omitted for brevity */}
          </select>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-10 items-center justify-center rounded-md bg-indigo-600 px-8 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}
