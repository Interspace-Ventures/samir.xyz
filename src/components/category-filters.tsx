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
          className={`px-5 h-[38px] text-sm font-medium rounded-md transition-all duration-300 ${
            selected === cat
              ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md shadow-purple-900/20'
              : 'border border-gray-800 hover:border-purple-500/50 text-gray-300 hover:bg-purple-900/10'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
