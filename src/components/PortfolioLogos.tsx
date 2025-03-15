"use client"

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, memo, useEffect } from 'react'

// Memoize the category button to prevent unnecessary re-renders
const CategoryButton = memo(({ category, isSelected, onClick }: {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`
      w-[90px] h-[36px] rounded text-sm font-medium transition-colors
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
const CompanyCard = memo(({ company, imageLoadError, imageLoading, onLoadComplete, onError }: {
  company: Company;
  imageLoadError: boolean;
  imageLoading: boolean;
  onLoadComplete: () => void;
  onError: () => void;
}) => (
  <motion.div
    layout
    className="relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    style={{ willChange: 'transform, opacity' }}
  >
    <div className="aspect-[4/3] relative p-4">
      {imageLoadError ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <p className="text-sm text-gray-400">{company.name}</p>
        </div>
      ) : (
        <>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={company.markup || company.acquired}
            loading={company.markup || company.acquired ? "eager" : "lazy"}
            onLoadingComplete={onLoadComplete}
            onError={onError}
          />
        </>
      )}
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

// Add useEffect for preloading important images
const usePreloadImages = (companies: Company[]) => {
  useEffect(() => {
    // Preload important images first
    const importantCompanies = companies.filter(c => c.markup || c.acquired);
    importantCompanies.forEach(company => {
      const img = new Image();
      img.src = company.logo;
    });

    // Then preload other images with a delay
    const timer = setTimeout(() => {
      const otherCompanies = companies.filter(c => !c.markup && !c.acquired);
      otherCompanies.forEach(company => {
        const img = new Image();
        img.src = company.logo;
      });
    }, 2000); // Delay other images by 2 seconds

    return () => clearTimeout(timer);
  }, [companies]);
};

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

const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS'] as const

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All')
  const [imageLoadError, setImageLoadError] = useState<Record<string, boolean>>({})
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({})
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Preload important images
  usePreloadImages(companies);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoadComplete = useCallback((companyName: string) => {
    setImageLoading(prev => ({ ...prev, [companyName]: false }))
  }, [])

  const handleImageError = useCallback((companyName: string) => {
    setImageLoadError(prev => ({ ...prev, [companyName]: true }))
    setImageLoading(prev => ({ ...prev, [companyName]: false }))
  }, [])

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  )

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      <motion.div 
        className="flex flex-wrap gap-4"
        initial={isInitialLoad ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
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
        initial={isInitialLoad ? { opacity: 0, y: 20 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        layout
        layoutRoot
        style={{ willChange: 'transform, opacity' }}
      >
        <AnimatePresence mode="popLayout">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.name}
              company={company}
              imageLoadError={imageLoadError[company.name]}
              imageLoading={imageLoading[company.name]}
              onLoadComplete={() => handleImageLoadComplete(company.name)}
              onError={() => handleImageError(company.name)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}