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
  { name: 'Afar', logo: '/images/portfolio-logos/Afar.png', category: 'Health' },
  { name: 'AON3D', logo: '/images/portfolio-logos/AON3D.png', category: 'SaaS', markup: true },
  { name: 'Aura', logo: '/images/portfolio-logos/Aura.png', category: 'Health', markup: true },
  { name: 'Backpack', logo: '/images/portfolio-logos/Backpack.png', category: 'Fintech' },
  { name: 'GEM', logo: '/images/portfolio-logos/GEM.png', category: 'Health', markup: true },
  { name: 'Goodmylk', logo: '/images/portfolio-logos/Goodmylk.png', category: 'Health' },
  { name: 'Harper', logo: '/images/portfolio-logos/Harper.png', category: 'Fintech' },
  { name: 'Hedgehog', logo: '/images/portfolio-logos/Hedgehog.png', category: 'Health' },
  { name: 'Juneshine', logo: '/images/portfolio-logos/Juneshine.png', category: 'Retail', markup: true },
  { name: 'Juno', logo: '/images/portfolio-logos/Juno.png', category: 'Retail' },
  { name: 'Kartera', logo: '/images/portfolio-logos/Kartera.png', category: 'Fintech' },
  { name: 'Keep', logo: '/images/portfolio-logos/Keep.png', category: 'Fintech' },
  { name: 'Lunar', logo: '/images/portfolio-logos/Lunar.png', category: 'Retail' },
  { name: 'Margin', logo: '/images/portfolio-logos/Margin.png', category: 'SaaS' },
  { name: 'Maridea', logo: '/images/portfolio-logos/Maridea.png', category: 'Fintech', markup: true },
  { name: 'Metadata', logo: '/images/portfolio-logos/Metadata.png', category: 'SaaS', markup: true },
  { name: 'Moku', logo: '/images/portfolio-logos/Moku.png', category: 'Retail', markup: true },
  { name: 'Playbook', logo: '/images/portfolio-logos/Playbook.png', category: 'Health' },
  { name: 'Rely', logo: '/images/portfolio-logos/Rely.png', category: 'Fintech' },
  { name: 'Restream', logo: '/images/portfolio-logos/Restream.png', category: 'SaaS' },
  { name: 'RPM', logo: '/images/portfolio-logos/RPM.png', category: 'Health', acquired: true },
  { name: 'Sanzo', logo: '/images/portfolio-logos/Sanzo.png', category: 'Retail', markup: true },
  { name: 'Soot', logo: '/images/portfolio-logos/Soot.png', category: 'SaaS', markup: true },
  { name: 'Sugar', logo: '/images/portfolio-logos/Sugar.png', category: 'SaaS', acquired: true },
  { name: 'Sundae', logo: '/images/portfolio-logos/Sundae.png', category: 'Fintech' },
  { name: 'Superplastic', logo: '/images/portfolio-logos/Superplastic.png', category: 'Retail' },
  { name: 'Swan', logo: '/images/portfolio-logos/Swan.png', category: 'Fintech', markup: true },
  { name: 'Swansea City AFC', logo: '/images/portfolio-logos/Swansea City AFC.png', category: 'Retail' },
  { name: 'Techmate', logo: '/images/portfolio-logos/Techmate.png', category: 'SaaS' },
  { name: 'The Coffee', logo: '/images/portfolio-logos/The Coffee.png', category: 'Retail', markup: true },
  { name: 'Waldo', logo: '/images/portfolio-logos/Waldo.png', category: 'Fintech' }
]

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-4 justify-start">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-md transition-colors ${
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
            className="relative flex items-center justify-center p-4 bg-white dark:bg-white/10 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-border/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-full h-16">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
            {(company.markup || company.acquired) && (
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 text-xs rounded ${
                  company.acquired
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
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