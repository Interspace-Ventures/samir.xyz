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
          <div className="bg-purple-100 dark:bg-purple-900/30 h-12 w-32 rounded animate-pulse" />
        ) : (
          <span className="text-gray-600 dark:text-gray-600 text-lg font-medium">
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
    <div className="h-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-6 relative"
      >
        {(company.markup || company.acquired) && (
          <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${
            company.acquired ? 'bg-gray-700' : 'bg-purple-600'
          }`}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        <div className="h-full flex items-center justify-center">
          <CompanyLogo company={company} />
        </div>

        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-purple-600/80 transition-opacity duration-300 flex items-center justify-center rounded-lg">
          <p className="text-white text-sm text-center px-4">
            {company.description}
          </p>
        </div>
      </a>
    </div>
  )
}

const Placeholder = () => (
  <div className="bg-purple-100 dark:bg-purple-900/30 h-12 w-32 rounded animate-pulse" />
);

const CompanyName = ({ name }: { name: string }) => (
  <span className="text-gray-600 dark:text-gray-600 text-lg font-medium">
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
            className={`px-4 h-[36px] text-sm font-medium rounded transition-colors duration-200 ${
              category === cat
                ? 'bg-purple-600 text-white'
                : 'bg-purple-100 hover:bg-purple-200 text-gray-700 dark:bg-purple-900/30 dark:hover:bg-purple-900/40 dark:text-gray-200'
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
            <div key={index} className="h-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white shadow-sm">
              <div className="h-full flex items-center justify-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 h-12 w-32 rounded animate-pulse" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}