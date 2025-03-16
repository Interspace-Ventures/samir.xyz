"use client"

import { useState, memo } from 'react'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'
import dynamic from 'next/dynamic'

const CompanyCard = dynamic(() => import('./company-card'), {
  loading: () => (
    <div className="h-[160px] bg-card/50 rounded-lg animate-pulse" />
  )
});

const CategoryFilters = memo(({ selectedCategory, onCategoryChange }: {
  selectedCategory: string;
  onCategoryChange: (category: typeof categories[number]) => void;
}) => (
  <div className="flex flex-wrap gap-4 mb-8">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`
          px-4 h-[36px] rounded text-sm font-medium transition-all duration-150 ease-out
          ${selectedCategory === category
            ? 'bg-purple-600 text-white shadow-md'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
          }
        `}
      >
        {category}
      </button>
    ))}
  </div>
));

CategoryFilters.displayName = 'CategoryFilters';

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All');

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  );

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <CategoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>
    </div>
  );
}