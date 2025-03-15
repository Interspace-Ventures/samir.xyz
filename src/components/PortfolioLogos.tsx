"use client"

import Image from 'next/image'
import { useState } from 'react'

interface Company {
  name: string
  logo: string
  category: 'Fintech' | 'Health' | 'Retail' | 'SaaS'
  markup?: boolean
  acquired?: boolean
}

const companies: Company[] = [
  { name: 'Afar', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health' },
  { name: 'AON3D', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS', markup: true },
  { name: 'Aura', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health', markup: true },
  { name: 'Backpack', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' },
  { name: 'GEM', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health', markup: true },
  { name: 'Goodmylk', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health' },
  { name: 'Harper', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' },
  { name: 'Hedgehog', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health' },
  { name: 'Juneshine', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail', markup: true },
  { name: 'Juno', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail' },
  { name: 'Kartera', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' },
  { name: 'Keep', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' },
  { name: 'Lunar', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail' },
  { name: 'Margin', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS' },
  { name: 'Maridea', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech', markup: true },
  { name: 'Metadata', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS', markup: true },
  { name: 'Moku', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail', markup: true },
  { name: 'Playbook', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health' },
  { name: 'Rely', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' },
  { name: 'Restream', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS' },
  { name: 'RPM', logo: '/images/portfolio-logos/placeholder.svg', category: 'Health', acquired: true },
  { name: 'Sanzo', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail', markup: true },
  { name: 'Soot', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS', markup: true },
  { name: 'Sugar', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS', acquired: true },
  { name: 'Sundae', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' },
  { name: 'Superplastic', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail' },
  { name: 'Swan', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech', markup: true },
  { name: 'Swansea City AFC', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail' },
  { name: 'Techmate', logo: '/images/portfolio-logos/placeholder.svg', category: 'SaaS' },
  { name: 'The Coffee', logo: '/images/portfolio-logos/placeholder.svg', category: 'Retail', markup: true },
  { name: 'Waldo', logo: '/images/portfolio-logos/placeholder.svg', category: 'Fintech' }
]

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  )

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded font-medium
              ${selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Company Logo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredCompanies.map((company) => (
          <div
            key={company.name}
            className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700/50 h-[200px] relative flex flex-col items-center"
          >
            <div className="w-full h-32 relative mb-2">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              />
            </div>

            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
              {company.name}
            </p>

            {(company.markup || company.acquired) && (
              <div className="absolute top-2 right-2">
                <span className={`
                  px-2 py-1 text-xs rounded font-medium
                  ${company.acquired
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                  }
                `}>
                  {company.acquired ? 'Acquired' : 'Markup'}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}