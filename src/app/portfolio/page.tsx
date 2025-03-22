"use client"

import React from 'react'
import { ErrorBoundary } from '../../components/error-boundary'
import { companies, categories } from '../../components/data/portfolio'
import Image from 'next/image'

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = React.useState<typeof categories[number]>('All')
  const [mounted, setMounted] = React.useState(false)
  
  React.useEffect(() => {
    setMounted(true)
    console.log('Portfolio page mounted')
  }, [])

  // Simplified loading state
  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-6 space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-300">
            Loading portfolio data...
          </p>
        </div>
        
        <div className="w-full grid gap-3 rounded-xl p-3 bg-purple-900/30 border border-purple-800/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[3/2] bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  // Filter companies by category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory)

  return (
    <ErrorBoundary name="PortfolioPage">
      <div className="max-w-4xl mx-auto px-6 space-y-8 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-300">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-purple-900/40 hover:border-purple-800/60'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Stats Section */}
        <div className="w-full grid gap-3 rounded-xl p-3 bg-purple-900/30 border border-purple-800/50">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700">
              <p className="text-sm text-gray-400">Companies</p>
              <p className="text-2xl font-bold text-white">{companies.length}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700">
              <p className="text-sm text-gray-400">Fintech</p>
              <p className="text-2xl font-bold text-white">{companies.filter(c => c.category === 'Fintech').length}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700">
              <p className="text-sm text-gray-400">Health</p>
              <p className="text-2xl font-bold text-white">{companies.filter(c => c.category === 'Health').length}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded shadow-md border border-gray-700">
              <p className="text-sm text-gray-400">Acquired</p>
              <p className="text-2xl font-bold text-white">{companies.filter(c => c.acquired).length}</p>
            </div>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div key={company.name} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-700">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-900/30 rounded-full flex items-center justify-center overflow-hidden relative border border-purple-800/50">
                    {company.logo ? (
                      <div className="w-full h-full relative">
                        <Image 
                          src={company.logo} 
                          alt={company.name} 
                          fill 
                          style={{ objectFit: 'contain' }} 
                        />
                      </div>
                    ) : (
                      <span className="text-xl text-white">{company.name.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{company.name}</h3>
                    <p className="text-sm text-gray-400">{company.category}</p>
                  </div>
                </div>
                <p className="text-gray-300">{company.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {company.website && (
                    <a 
                      href={company.website} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-purple-400 hover:underline"
                    >
                      Visit website →
                    </a>
                  )}
                  {company.markup && (
                    <span className="inline-block px-2 py-1 text-xs bg-purple-900/40 text-purple-200 rounded border border-purple-800/60">
                      Markup
                    </span>
                  )}
                  {company.acquired && (
                    <span className="inline-block px-2 py-1 text-xs bg-green-900/40 text-green-200 rounded border border-green-800/60">
                      Acquired
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}