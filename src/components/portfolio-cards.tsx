"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'
import { ErrorBoundary } from './error-boundary'

// Simplified company logo component with better client-side handling
const CompanyLogo = ({ company }: { company: Company }) => {
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Only run on the client after hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative h-[80px] w-[200px]">
      {/* Server-side and initial client render placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        {company.logo ? (
          <div className="bg-purple-900/20 h-12 w-32 rounded-md animate-pulse backdrop-blur" />
        ) : (
          <span className="text-gray-300 text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
            {company.name}
          </span>
        )}
      </div>

      {/* Client-side only image loading - only processed after mounting */}
      {mounted && company.logo && (
        <div 
          className="absolute inset-0 transition-opacity duration-500" 
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <Image
            src={company.logo}
            alt={company.name}
            fill
            sizes="200px"
            style={{ objectFit: 'contain' }}
            priority
            className="filter drop-shadow-md"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}
    </div>
  )
}

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="h-[160px] rounded-xl border border-gray-800 bg-gradient-to-br from-black to-gray-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-900/20 hover:border-purple-700/30 group">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-6 relative"
      >
        {/* Status badges with improved styling */}
        {(company.markup || company.acquired) && (
          <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md text-white 
            shadow-lg backdrop-blur-sm ${
            company.acquired 
              ? 'bg-gradient-to-r from-green-600 to-emerald-700 border border-green-500/30' 
              : 'bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-500/30'
          }`}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-xl"></div>
        </div>

        <div className="h-full flex items-center justify-center relative z-10">
          <CompanyLogo company={company} />
        </div>
      </a>
    </div>
  )
}

const Placeholder = () => (
  <div className="bg-purple-900/20 h-12 w-32 rounded-md animate-pulse backdrop-blur-sm shadow-inner" />
);

const CompanyName = ({ name }: { name: string }) => (
  <span className="text-gray-200 text-lg font-medium bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
    {name}
  </span>
);


export default function PortfolioCards() {
  const [category, setCategory] = useState<typeof categories[number]>('All')
  const [mounted, setMounted] = useState(false)
  
  // Add client-side hydration safety
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Simplified filter function to reduce complexity during hydration
  const filteredCompanies = React.useMemo(() => {
    return companies.filter((company) => 
      category === 'All' || company.category === category
    )
  }, [category])

  return (
    <div className="w-full">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mounted ? (
          // Only render complex components after client-side hydration
          filteredCompanies.map((company) => (
            <ErrorBoundary key={company.name} name={`CompanyCard-${company.name}`}>
              <CompanyCard company={company} />
            </ErrorBoundary>
          ))
        ) : (
          // Show simple placeholders during server-side render and initial hydration
          companies.slice(0, 6).map((company, index) => (
            <div key={index} className="h-[160px] rounded-xl border border-gray-800 bg-gradient-to-br from-black to-gray-900 shadow-md">
              <div className="h-full flex items-center justify-center">
                <div className="bg-purple-900/20 h-12 w-32 rounded-md animate-pulse backdrop-blur-sm" />
              </div>
              {/* Random position badges (some with, some without) */}
              {index % 3 === 0 && (
                <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md bg-gray-800 opacity-40 w-16 h-5`}></div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}