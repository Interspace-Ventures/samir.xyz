"use client"

import React, { useState, useEffect } from 'react'
import { companies, categories } from '../data/portfolio'
import type { Company } from '../types'
import { ErrorBoundary } from '../error-boundary'
import { useTheme } from 'next-themes'

// Better approach to portfolio cards that prevents overlapping text and improves image handling
export default function PortfolioCards() {
  const [category, setCategory] = useState<typeof categories[number]>('All')
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  
  // Add client-side hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark'
  
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
                : isDark 
                  ? 'border border-gray-800 hover:border-purple-500/50 text-gray-300 hover:bg-purple-900/10' 
                  : 'border border-gray-300 hover:border-purple-400/50 text-gray-700 hover:bg-purple-100/30'
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
              <CompanyCard company={company} isDark={isDark} />
            </ErrorBoundary>
          ))
        ) : (
          // Show simple placeholders during server-side render
          companies.slice(0, 6).map((company, index) => (
            <div key={index} className={`h-[160px] rounded-xl border shadow-md
                                        ${isDark 
                                          ? 'border-gray-800 bg-gradient-to-br from-black to-gray-900' 
                                          : 'border-gray-200 bg-gradient-to-br from-white to-gray-50'}`}>
              <div className="h-full flex items-center justify-center">
                <div className={`h-12 w-32 rounded-md animate-pulse backdrop-blur-sm
                               ${isDark ? 'bg-purple-900/20' : 'bg-purple-100/50'}`} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Optimized company card component with better image handling and special cases for problematic logos
const CompanyCard = ({ company, isDark }: { company: Company, isDark: boolean }) => {
  const [fallback, setFallback] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  // List of companies with known problematic logos (text overlap issues)
  const problemLogos = [
    'The Food Company',
    'Swansea City AFC',
    'The Coffee'
  ]
  
  // Special case handling for known problematic logos
  const hasProblemLogo = problemLogos.includes(company.name)
  
  useEffect(() => {
    setMounted(true)
    
    // Force text fallback for known problematic logos
    if (hasProblemLogo) {
      setFallback(true)
    }
  }, [hasProblemLogo])

  return (
    <div className={`h-[160px] rounded-xl border shadow-md transition-all duration-300 
                    hover:-translate-y-1 group
                    ${isDark 
                      ? 'border-gray-800 bg-gradient-to-br from-black to-gray-900 hover:shadow-purple-900/20 hover:border-purple-700/30' 
                      : 'border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-purple-300/30 hover:border-purple-300/50'}`}>
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
          <div className={`absolute inset-0 rounded-xl
                         ${isDark 
                           ? 'bg-gradient-to-r from-purple-500/5 to-blue-500/5' 
                           : 'bg-gradient-to-r from-purple-300/10 to-blue-300/10'}`}></div>
        </div>

        <div className="h-full flex flex-col items-center justify-center relative z-10">
          {/* Main content area with fallback */}
          {fallback || !company.logo ? (
            <div className="text-center">
              <h3 className="text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {company.name}
              </h3>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {company.category}
              </p>
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