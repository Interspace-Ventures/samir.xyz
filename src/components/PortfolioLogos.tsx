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
  { name: 'Afar', logo: '/assets/images/portfolio-logos/Afar.svg', category: 'Health' },
  { name: 'AON3D', logo: '/assets/images/portfolio-logos/AON3D.svg', category: 'SaaS', markup: true },
  { name: 'Aura', logo: '/assets/images/portfolio-logos/Aura.svg', category: 'Health', markup: true },
  { name: 'Backpack', logo: '/assets/images/portfolio-logos/Backpack.svg', category: 'Fintech' },
  { name: 'GEM', logo: '/assets/images/portfolio-logos/GEM.svg', category: 'Health', markup: true },
  { name: 'Goodmylk', logo: '/assets/images/portfolio-logos/Goodmylk.svg', category: 'Health' },
  { name: 'Harper', logo: '/assets/images/portfolio-logos/Harper.svg', category: 'Fintech' },
  { name: 'Hedgehog', logo: '/assets/images/portfolio-logos/Hedgehog.svg', category: 'Health' },
  { name: 'Juneshine', logo: '/assets/images/portfolio-logos/Juneshine.svg', category: 'Retail', markup: true },
  { name: 'Juno', logo: '/assets/images/portfolio-logos/Juno.svg', category: 'Retail' },
  { name: 'Kartera', logo: '/assets/images/portfolio-logos/Kartera.svg', category: 'Fintech' },
  { name: 'Keep', logo: '/assets/images/portfolio-logos/Keep.svg', category: 'Fintech' },
  { name: 'Lunar', logo: '/assets/images/portfolio-logos/Lunar.svg', category: 'Retail' },
  { name: 'Margin', logo: '/assets/images/portfolio-logos/Margin.svg', category: 'SaaS' },
  { name: 'Maridea', logo: '/assets/images/portfolio-logos/Maridea.svg', category: 'Fintech', markup: true },
  { name: 'Metadata', logo: '/assets/images/portfolio-logos/Metadata.svg', category: 'SaaS', markup: true },
  { name: 'Moku', logo: '/assets/images/portfolio-logos/Moku.svg', category: 'Retail', markup: true },
  { name: 'Playbook', logo: '/assets/images/portfolio-logos/Playbook.svg', category: 'Health' },
  { name: 'Rely', logo: '/assets/images/portfolio-logos/Rely.svg', category: 'Fintech' },
  { name: 'Restream', logo: '/assets/images/portfolio-logos/Restream.svg', category: 'SaaS' },
  { name: 'RPM', logo: '/assets/images/portfolio-logos/RPM.svg', category: 'Health', acquired: true },
  { name: 'Sanzo', logo: '/assets/images/portfolio-logos/Sanzo.svg', category: 'Retail', markup: true },
  { name: 'Soot', logo: '/assets/images/portfolio-logos/Soot.svg', category: 'SaaS', markup: true },
  { name: 'Sugar', logo: '/assets/images/portfolio-logos/Sugar.svg', category: 'SaaS', acquired: true },
  { name: 'Sundae', logo: '/assets/images/portfolio-logos/Sundae.svg', category: 'Fintech' },
  { name: 'Superplastic', logo: '/assets/images/portfolio-logos/Superplastic.svg', category: 'Retail' },
  { name: 'Swan', logo: '/assets/images/portfolio-logos/Swan.svg', category: 'Fintech', markup: true },
  { name: 'Swansea City AFC', logo: '/assets/images/portfolio-logos/SwanseaCityAFC.svg', category: 'Retail' },
  { name: 'Techmate', logo: '/assets/images/portfolio-logos/Techmate.svg', category: 'SaaS' },
  { name: 'The Coffee', logo: '/assets/images/portfolio-logos/TheCoffee.svg', category: 'Retail', markup: true },
  { name: 'Waldo', logo: '/assets/images/portfolio-logos/Waldo.svg', category: 'Fintech' }
]

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')

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
            <div className="relative w-full h-16">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                fill
                className="object-contain"
                loading="eager"
                priority={index < 8}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
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