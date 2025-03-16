"use client"

import { categories } from './data/portfolio'

type Props = {
  selected: typeof categories[number]
  onChange: (category: typeof categories[number]) => void
}

export default function CategoryFilters({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 h-[36px] rounded text-sm font-medium ${
            selected === cat
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
