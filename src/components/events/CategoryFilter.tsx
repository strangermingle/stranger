'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Category {
  slug: string
  name: string
  icon_url: string | null
  color_hex: string | null
}

interface CategoryFilterProps {
  categories: Category[]
  selectedSlug?: string
}

export function CategoryFilter({ categories, selectedSlug }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSelect = (slug: string) => {
    // We construct new params manually to preserve other potential filters like ?city=
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="-mx-4 flex overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 scrollbar-hide">
      <div className="flex gap-3">
        <button
          onClick={() => handleSelect('all')}
          className={`
            flex shrink-0 items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors
            ${!selectedSlug 
              ? 'bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900' 
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
            }
          `}
        >
          All
        </button>

        {categories.map((cat) => {
          const isSelected = selectedSlug === cat.slug
          
          return (
             <button
                key={cat.slug}
                onClick={() => handleSelect(cat.slug)}
                className={`
                   flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors
                   ${isSelected 
                     ? 'bg-gray-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent shadow-sm' 
                     : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-300 dark:hover:bg-zinc-800'
                   }
                `}
             >
                {cat.icon_url && (
                   <img src={cat.icon_url} alt="" className="h-4 w-4 object-contain" />
                )}
                {cat.name}
             </button>
          )
        })}
      </div>
    </div>
  )
}
