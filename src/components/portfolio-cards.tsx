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
          <div className="bg-purple-900/30 h-12 w-32 rounded animate-pulse" />
        ) : (
          <span className="text-gray-300 text-lg font-medium">
            {company.name}
          </span>
        )}
      </div>

      {/* Client-side only image loading - only processed after mounting */}
      {mounted && company.logo && (
        <div 
          className="absolute inset-0" 
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <Image
            src={company.logo}
            alt={company.name}
            fill
            sizes="200px"
            style={{ objectFit: 'contain' }}
            priority
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}
    </div>
  )
}

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="h-[160px] rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-800/50">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-6 relative"
      >
        {(company.markup || company.acquired) && (
          <div className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-md text-white ${
            company.acquired ? 'bg-green-600/80 border border-green-500/50' : 'bg-purple-600/80 border border-purple-500/50'
          }`}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        <div className="h-full flex items-center justify-center">
          <CompanyLogo company={company} />
        </div>
      </a>
    </div>
  )
}

const Placeholder = () => (
  <div className="bg-purple-900/30 h-12 w-32 rounded animate-pulse" />
);

const CompanyName = ({ name }: { name: string }) => (
  <span className="text-gray-300 text-lg font-medium">
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
            className={`px-4 h-[36px] text-sm font-medium rounded-md transition-colors duration-200 ${
              category === cat
                ? 'bg-purple-600 text-white'
                : 'border border-gray-700 hover:border-purple-600 text-gray-300'
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
            <div key={index} className="h-[160px] rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-900 shadow-md">
              <div className="h-full flex items-center justify-center">
                <div className="bg-purple-900/30 h-12 w-32 rounded animate-pulse" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}