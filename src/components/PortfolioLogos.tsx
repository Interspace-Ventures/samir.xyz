"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Company {
  name: string
  logo: string
  category: 'Fintech' | 'Health' | 'Retail' | 'SaaS'
  markup?: boolean
  acquired?: boolean
}

const companies: Company[] = [
  { name: 'Afar', logo: '/images/portfolio/Afar.svg', category: 'Health' },
  { name: 'AON3D', logo: '/images/portfolio/AON3D.svg', category: 'SaaS', markup: true },
  { name: 'Aura', logo: '/images/portfolio/Aura.svg', category: 'Health', markup: true },
  { name: 'Backpack', logo: '/images/portfolio/Backpack.svg', category: 'Fintech' },
  { name: 'GEM', logo: '/images/portfolio/GEM.svg', category: 'Health', markup: true },
  { name: 'Goodmylk', logo: '/images/portfolio/Goodmylk.svg', category: 'Health' },
  { name: 'Harper', logo: '/images/portfolio/Harper.svg', category: 'Fintech' },
  { name: 'Hedgehog', logo: '/images/portfolio/Hedgehog.svg', category: 'Health' },
  { name: 'Juneshine', logo: '/images/portfolio/Juneshine.svg', category: 'Retail', markup: true },
  { name: 'Juno', logo: '/images/portfolio/Juno.svg', category: 'Retail' },
  { name: 'Kartera', logo: '/images/portfolio/Kartera.svg', category: 'Fintech' },
  { name: 'Keep', logo: '/images/portfolio/Keep.svg', category: 'Fintech' },
  { name: 'Lunar', logo: '/images/portfolio/Lunar.svg', category: 'Retail' },
  { name: 'Margin', logo: '/images/portfolio/Margin.svg', category: 'SaaS' },
  { name: 'Maridea', logo: '/images/portfolio/Maridea.svg', category: 'Fintech', markup: true },
  { name: 'Metadata', logo: '/images/portfolio/Metadata.svg', category: 'SaaS', markup: true },
  { name: 'Moku', logo: '/images/portfolio/Moku.svg', category: 'Retail', markup: true },
  { name: 'Playbook', logo: '/images/portfolio/Playbook.svg', category: 'Health' },
  { name: 'Rely', logo: '/images/portfolio/Rely.svg', category: 'Fintech' },
  { name: 'Restream', logo: '/images/portfolio/Restream.svg', category: 'SaaS' },
  { name: 'RPM', logo: '/images/portfolio/RPM.svg', category: 'Health', acquired: true },
  { name: 'Sanzo', logo: '/images/portfolio/Sanzo.svg', category: 'Retail', markup: true },
  { name: 'Soot', logo: '/images/portfolio/Soot.svg', category: 'SaaS', markup: true },
  { name: 'Sugar', logo: '/images/portfolio/Sugar.svg', category: 'SaaS', acquired: true },
  { name: 'Sundae', logo: '/images/portfolio/Sundae.svg', category: 'Fintech' },
  { name: 'Superplastic', logo: '/images/portfolio/Superplastic.svg', category: 'Retail' },
  { name: 'Swan', logo: '/images/portfolio/Swan.svg', category: 'Fintech', markup: true },
  { name: 'Swansea City AFC', logo: '/images/portfolio/SwanseaCityAFC.svg', category: 'Retail' },
  { name: 'Techmate', logo: '/images/portfolio/Techmate.svg', category: 'SaaS' },
  { name: 'The Coffee', logo: '/images/portfolio/TheCoffee.svg', category: 'Retail', markup: true },
  { name: 'Waldo', logo: '/images/portfolio/Waldo.svg', category: 'Fintech' }
]

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')
  const [isLoading, setIsLoading] = useState(true)

  const filteredCompanies = companies.filter(company => 
    selectedCategory === 'All' || company.category === selectedCategory
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-end">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredCompanies.map((company, index) => (
          <motion.div
            key={company.name}
            className="relative flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={company.logo}
              alt={`${company.name} logo`}
              width={120}
              height={60}
              className="object-contain transition-opacity"
              loading="lazy"
              onLoadingComplete={() => setIsLoading(false)}
            />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {(company.markup || company.acquired) && (
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  company.acquired 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                }`}>
                  {company.acquired ? 'Acquired' : 'Markup'}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}