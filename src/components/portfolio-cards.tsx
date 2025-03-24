"use client"

import React, { useState, useEffect } from 'react'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'
import { ErrorBoundary } from './error-boundary'

// Better approach to portfolio cards that prevents overlapping text and improves image handling
export default function PortfolioCards() {
  const [category, setCategory] = useState<typeof categories[number]>('All')
  const [mounted, setMounted] = useState(false)
  
  // Add client-side hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Filtered companies based on selected category
  const filteredCompanies = React.useMemo(() => {
    return companies.filter((company) => 
      category === 'All' || company.category === category
    )
  }, [category])

  return (
    <div className="w-full">
      {/* Category filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 h-[38px] text-sm font-medium rounded-md transition-all duration-300 ${
              category === cat
                ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-md shadow-purple-900/20'
                : 'border border-gray-800 hover:border-purple-500/50 text-gray-300 hover:bg-purple-900/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Company cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mounted ? (
          // Render full cards after client-side hydration
          filteredCompanies.map((company) => (
            <ErrorBoundary key={company.name} name={`CompanyCard-${company.name}`}>
              <CompanyCard company={company} />
            </ErrorBoundary>
          ))
        ) : (
          // Show simple placeholders during server-side render
          companies.slice(0, 6).map((company, index) => (
            <div key={index} className="h-[160px] rounded-xl border border-gray-800 bg-gradient-to-br from-black to-gray-900 shadow-md">
              <div className="h-full flex items-center justify-center">
                <div className="bg-purple-900/20 h-12 w-32 rounded-md animate-pulse backdrop-blur-sm" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Optimized company card component with better image handling
const CompanyCard = ({ company }: { company: Company }) => {
  const [fallback, setFallback] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="h-[160px] rounded-xl border border-gray-800 bg-gradient-to-br from-black to-gray-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-900/20 hover:border-purple-700/30 group">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-4 relative"
      >
        {/* Status badges */}
        {(company.markup || company.acquired) && (
          <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-md text-white 
            shadow-lg backdrop-blur-sm ${
            company.acquired 
              ? 'bg-gradient-to-r from-green-600 to-emerald-700 border border-green-500/30' 
              : 'bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-500/30'
          }`}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        {/* Subtle purple glow effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl"></div>
        </div>

        <div className="h-full flex flex-col items-center justify-center relative z-10">
          {/* Main content area with fallback */}
          {fallback || !company.logo ? (
            <div className="text-center">
              <h3 className="text-gray-200 text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {company.name}
              </h3>
              <p className="text-gray-400 text-sm mt-2">{company.category}</p>
            </div>
          ) : (
            <div className="relative w-full max-w-[180px] h-[80px] mx-auto">
              {mounted && (
                <div className="w-full h-full relative">
                  {/* Image with onError fallback */}
                  <img 
                    src={company.logo}
                    alt={company.name}
                    className="absolute inset-0 w-full h-full object-contain"
                    onError={() => setFallback(true)}
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  )
}