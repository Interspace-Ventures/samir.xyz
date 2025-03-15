"use client"

import Image from 'next/image'
import { useState, memo, useEffect, Suspense, lazy, useRef, useCallback } from 'react'
import { companies, categories } from './data/portfolio'
import type { Company } from './types'

// Loading skeleton for company cards
const CompanyCardSkeleton = () => (
  <div className="relative bg-white dark:bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
    <div className="aspect-[3/2] relative p-4">
      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
    </div>
  </div>
);

// Initial skeleton grid for better visual loading state
const InitialLoadingSkeleton = () => (
  <div className="space-y-8">
    <div className="flex flex-wrap gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[90px] h-[36px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
      ))}
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(15)].map((_, i) => (
        <CompanyCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

// Separate category filters into their own component for better initial load
const CategoryFilters = memo(({ selectedCategory, onCategoryChange }: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          isSelected={selectedCategory === category}
          onClick={() => onCategoryChange(category)}
        />
      ))}
    </div>
  );
});

CategoryFilters.displayName = 'CategoryFilters';

const CategoryButton = memo(({ category, isSelected, onClick }: {
  category: string;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-[90px] h-[36px] rounded text-sm font-medium transform-gpu transition-all duration-150 ease-out will-change-transform
        ${isSelected
          ? 'bg-purple-600 text-white shadow-md translate-y-[-1px] scale-105'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 hover:scale-102 hover:translate-y-[-1px]'
        }
      `}
    >
      {category}
    </button>
  );
});

CategoryButton.displayName = 'CategoryButton';

// Lazy load the company card for better initial page load
const LazyCompanyCard = lazy(() => import('./CompanyCard'));

export default function PortfolioLogos() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('All');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [visibleCompanies, setVisibleCompanies] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Setup intersection observer for lazy loading
  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const companyName = entry.target.getAttribute('data-company');
            if (companyName) {
              setVisibleCompanies(prev => new Set([...prev, companyName]));
            }
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (node) observerRef.current.observe(node);
  }, []);

  useEffect(() => {
    setIsInitialLoad(false);
    // Remove loading state after initial render
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => {
      clearTimeout(timeout);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Handle category changes with animation
  const handleCategoryChange = useCallback((category: typeof categories[number]) => {
    setSelectedCategory(category);
  }, []);

  const filteredCompanies = companies.filter(company =>
    selectedCategory === 'All' || company.category === selectedCategory
  );

  if (isLoading) {
    return <InitialLoadingSkeleton />;
  }

  return (
    <div className="space-y-8">
      <Suspense fallback={<div className="flex flex-wrap gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[90px] h-[36px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
        ))}
      </div>}>
        <CategoryFilters
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Suspense>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredCompanies.map((company, index) => (
          <div
            key={company.name}
            ref={index === filteredCompanies.length - 1 ? lastElementRef : null}
            data-company={company.name}
            className={`
              transform-gpu transition-all duration-300 ease-out will-change-transform
              ${visibleCompanies.has(company.name) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
            `}
          >
            <Suspense fallback={<CompanyCardSkeleton />}>
              <LazyCompanyCard 
                company={company}
                isVisible={visibleCompanies.has(company.name)}
              />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}