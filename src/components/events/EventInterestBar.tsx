'use client'

import { useState } from 'react'
import { HeartIcon, BookmarkIcon, StarIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface EventInterestBarProps {
  eventId: string
  initialLikes: number
  initialInterests: number
}

// NOTE: A production app would fetch initial user-specific state 
// (e.g., hasLiked = true) from the server component and pass it down.
// For this scaffolding, we handle optimistic UI assuming standard toggle mechanisms.

export function EventInterestBar({ eventId, initialLikes, initialInterests }: EventInterestBarProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [likes, setLikes] = useState(initialLikes)
  const [hasLiked, setHasLiked] = useState(false) // placeholder
  
  const [interests, setInterests] = useState(initialInterests)
  const [hasInterested, setHasInterested] = useState(false) // placeholder
  
  const [hasSaved, setHasSaved] = useState(false) // placeholder

  // Helper to ensure auth before interaction
  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      router.push(`/login?next=/events/${eventId}`)
      return false
    }
    return session.user
  }

  const toggleLike = async () => {
    const user = await checkAuth()
    if (!user) return

    setHasLiked(!hasLiked)
    setLikes(prev => hasLiked ? prev - 1 : prev + 1)
    
    // Fire and forget actual db insert/delete logic 
    // e.g. supabase.from('event_likes').insert(...)
  }

  const toggleSave = async () => {
    const user = await checkAuth()
    if (!user) return

    setHasSaved(!hasSaved)
    // Fire and forget db toggle
  }

  const toggleInterest = async () => {
    const user = await checkAuth()
    if (!user) return

    setHasInterested(!hasInterested)
    setInterests(prev => hasInterested ? prev - 1 : prev + 1)
    // Fire and forget db toggle
  }

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={toggleLike}
        className={`flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors
          ${hasLiked 
            ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400' 
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
          }
        `}
      >
        <HeartIcon className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
        <span>{likes > 0 ? likes : 'Like'}</span>
      </button>

      <button 
        onClick={toggleInterest}
        className={`flex h-10 items-center justify-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors
          ${hasInterested 
            ? 'border-yellow-200 bg-yellow-50 text-yellow-600 dark:border-yellow-900/50 dark:bg-yellow-900/20 dark:text-yellow-400' 
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
          }
        `}
      >
        <StarIcon className={`h-4 w-4 ${hasInterested ? 'fill-current' : ''}`} />
        <span className="hidden sm:inline">{interests > 0 ? `${interests} Interested` : 'Interested'}</span>
      </button>

      <button 
        onClick={toggleSave}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors
           ${hasSaved
             ? 'border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-400'
             : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
           }
        `}
      >
        <BookmarkIcon className={`h-4 w-4 ${hasSaved ? 'fill-current' : ''}`} />
        <span className="sr-only">Save</span>
      </button>
    </div>
  )
}
