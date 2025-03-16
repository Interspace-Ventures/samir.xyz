"use client"

import { useState, memo } from 'react'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'
import dynamic from 'next/dynamic'

// Load CompanyCard dynamically with consistent loading state
const CompanyCard = dynamic(() => import('./company-card'), {
  loading: () => (
    <div className="relative bg-white dark:bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="aspect-[5/4] relative p-2">
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
      </div>
    </div>
  )
});

// Separate category filters for better performance
const CategoryFilters = memo(({ selectedCategory, onCategoryChange }: {
  selectedCategory: string;
  onCategoryChange: (category: typeof categories[number]) => void;
}) => (
  <div className="flex flex-wrap gap-4">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onCategoryChange(category)}
        className={`
          w-[90px] h-[36px] rounded text-sm font-medium transition-all duration-150 ease-out
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <CategoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.name} company={company} />
        ))}
      </div>
    </div>
  );
}