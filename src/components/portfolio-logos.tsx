"use client"

import { useState } from 'react'
import { companies, categories } from './data/portfolio'
import CompanyCard from './company-card'

export default function PortfolioLogos() {
  const [category, setCategory] = useState<typeof categories[number]>(categories[0])

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 h-[36px] text-sm font-medium rounded transition-colors duration-200 ${
              category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {companies
          .filter((company) => category === 'All' || company.category === category)
          .map((company) => (
            <CompanyCard key={company.name} company={company} />
          ))}
      </div>
    </div>
  )
}