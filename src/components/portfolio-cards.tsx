"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'
import { ErrorBoundary } from './error-boundary'

function CompanyCard({ company }: { company: Company }) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    try {
      setMounted(true)
      console.log(`Mounting CompanyCard for ${company.name}`);
    } catch (error) {
      console.error(`Error mounting CompanyCard for ${company.name}:`, error);
    }
  }, [company.name]);

  if (!mounted) return null;

  return (
    <div className="h-[160px] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-6 relative"
      >
        {/* Badge */}
        {(company.markup || company.acquired) && (
          <div className={`absolute top-2 right-2 text-xs px-2 py-1 rounded text-white ${
            company.acquired ? 'bg-gray-700' : 'bg-purple-600'
          }`}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        {/* Logo or Name */}
        <div className="h-full flex items-center justify-center">
          {company.logo && !imageError ? (
            <div className="relative h-[80px] w-[200px]">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                sizes="200px"
                style={{ objectFit: 'contain' }}
                priority
                onError={(e) => {
                  console.error(`Failed to load image for ${company.name}:`, e);
                  setImageError(true);
                }}
                onLoad={() => setImageLoaded(true)}
                className={`transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-200 h-12 w-32 rounded" />
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-600 dark:text-gray-600 text-lg font-medium">
              {company.name}
            </span>
          )}
        </div>

        {/* Description Hover Overlay */}
        <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-purple-600/80 transition-opacity duration-300 flex items-center justify-center rounded-lg">
          <p className="text-white text-sm text-center px-4">
            {company.description}
          </p>
        </div>
      </a>
    </div>
  )
}

export default function PortfolioCards() {
  const [mounted, setMounted] = useState(false)
  const [category, setCategory] = useState<typeof categories[number]>('All')
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      console.log('PortfolioCards component mounting');
      setMounted(true)
    } catch (e) {
      console.error('Error during PortfolioCards initialization:', e)
      setError(e instanceof Error ? e : new Error('Unknown error during initialization'))
    }
  }, [])

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }, (_, i) => (
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

  if (error) {
    return (
      <div className="text-red-500 p-4 rounded-lg border border-red-200 bg-red-50">
        <h3 className="font-bold">Error loading portfolio</h3>
        <p>{error.message}</p>
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
            <ErrorBoundary key={company.name} name={`CompanyCard-${company.name}`}>
              <CompanyCard company={company} />
            </ErrorBoundary>
          ))}
      </div>
    </div>
  )
}