"use client"

import { useState, useEffect } from 'react'
import { companies, categories } from './data/portfolio'
import dynamic from 'next/dynamic'
import { ErrorBoundary } from './error-boundary'

// Dynamically import CompanyCard with error handling
const CompanyCard = dynamic(() => import('./company-card').catch(err => {
  console.error('Failed to load CompanyCard:', err);
  return () => (
    <div className="h-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white shadow-sm">
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-200 h-12 w-32 rounded" />
      </div>
    </div>
  );
}), {
  loading: () => (
    <div className="h-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white shadow-sm">
      <div className="h-full flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 dark:bg-gray-200 h-12 w-32 rounded" />
      </div>
    </div>
  ),
  ssr: false
});

export default function PortfolioLogos() {
  const [mounted, setMounted] = useState(false)
  const [category, setCategory] = useState<typeof categories[number]>('All')

  useEffect(() => {
    try {
      setMounted(true)
    } catch (e) {
      console.error('Error during PortfolioLogos initialization:', e)
    }
  }, [])

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white shadow-sm">
              <div className="h-full flex items-center justify-center">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-200 h-12 w-32 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies
          .filter((company) => category === 'All' || company.category === category)
          .map((company) => (
            <ErrorBoundary key={company.name}>
              <CompanyCard company={company} />
            </ErrorBoundary>
          ))}
      </div>
    </div>
  )
}