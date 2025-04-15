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
          className={`px-5 py-2 text-sm font-medium rounded ${
            selected === cat
              ? 'bg-purple-600 text-white'
              : 'border border-gray-700 text-gray-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
