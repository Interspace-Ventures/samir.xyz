"use client"

import Image from 'next/image'
import { AnimatePresence } from "framer-motion/dist/framer-motion"
import { m as motion } from "framer-motion/dist/framer-motion"
import { useState, memo, useEffect } from 'react'

// Performance monitoring
const logPerformance = (component: string, action: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${component} - ${action}: ${performance.now()}ms`);
  }
};

// Memoize the category button to prevent unnecessary re-renders
const CategoryButton = memo(({ category, isSelected, onClick }: {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      w-[90px] h-[36px] rounded text-sm font-medium transition-colors duration-150
      ${isSelected
        ? 'bg-purple-600 text-white'
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
      }
    `}
  >
    {category}
  </button>
));

CategoryButton.displayName = 'CategoryButton';

// Memoize the company card to prevent unnecessary re-renders
const CompanyCard = memo(({ company }: { company: Company }) => (
  <motion.div
    layout
    className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98 }}
    transition={{ duration: 0.15 }}
    style={{ willChange: 'transform, opacity' }}
  >
    <div className="aspect-[4/3] relative p-4">
      <Image
        src={company.logo}
        alt={`${company.name} logo`}
        fill
        className="object-contain"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        priority={company.markup || company.acquired}
        loading={company.markup || company.acquired ? "eager" : "lazy"}
      />
    </div>

    <div className="px-4 pb-4">
      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
        {company.name}
      </p>
    </div>

    {(company.markup || company.acquired) && (
      <div className="absolute top-2 right-2">
        <span className={`
          px-2 py-1 text-xs rounded font-medium
          ${company.acquired
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
            : 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
          }
        `}>
          {company.acquired ? 'Acquired' : 'Markup'}
        </span>
      </div>
    )}
  </motion.div>
));

CompanyCard.displayName = 'CompanyCard';

interface Company {
  name: string;
  logo: string;
  category: 'Fintech' | 'Health' | 'Retail' | 'SaaS';
  markup?: boolean;
  acquired?: boolean;
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
];

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const;

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')

  // Add performance monitoring
  useEffect(() => {
    logPerformance('PortfolioLogos', 'mount');
    return () => logPerformance('PortfolioLogos', 'unmount');
  }, []);

  // Monitor category changes
  useEffect(() => {
    logPerformance('PortfolioLogos', `category-change-${selectedCategory}`);
  }, [selectedCategory]);

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  )

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <motion.div 
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </motion.div>

      {/* Company Logo Grid */}
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        layout
        style={{ willChange: 'transform' }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.name}
              company={company}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}