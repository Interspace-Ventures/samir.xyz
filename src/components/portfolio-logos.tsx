"use client"

import { useState, memo } from 'react'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'
import dynamic from 'next/dynamic'

const CompanyCard = dynamic(() => import('./company-card'), {
  loading: () => (
    <div className="h-32">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800">
        <div className="p-6 h-full p-4 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-purple-600 rounded-full animate-spin border-t-transparent" />
        </div>
      </div>
    </div>
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <CategoryFilters
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCompanies.map((company) => (
          <div key={company.name} className="h-32">
            <CompanyCard company={company} />
          </div>
        ))}
      </section>
    </div>
  );
}