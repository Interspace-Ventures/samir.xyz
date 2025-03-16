"use client"

import { useState, memo } from 'react'
import type { Company } from './types'

const CompanyCard = memo(({ company }: { company: Company }) => {
  const [showFallback, setShowFallback] = useState(false)

  return (
    <a
      href={`https://www.${company.name.toLowerCase()}.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full block"
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 group">
        <div className="p-6 h-full p-4 flex items-center justify-center relative">
          {/* Markup/Acquired badge */}
          {(company.markup || company.acquired) && (
            <div className="absolute top-0 right-0 text-white text-xs px-2 py-1 bg-[#7343d0]">
              {company.acquired ? 'Acquired' : 'Markup'}
            </div>
          )}

          {/* Description overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center z-20">
            <p className="text-white text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {company.description}
            </p>
          </div>

          {/* Content area */}
          <div className="flex items-center justify-center w-full h-full">
            {!showFallback ? (
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="w-auto h-auto max-h-[60px] max-w-[200px] object-contain"
                onError={() => setShowFallback(true)}
              />
            ) : (
              <div className="text-gray-700 dark:text-gray-300 font-medium text-center">{company.name}</div>
            )}
          </div>
        </div>
      </div>
    </a>
  )
})

CompanyCard.displayName = 'CompanyCard'

export default CompanyCard