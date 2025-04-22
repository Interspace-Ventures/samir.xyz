'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import InvestmentMetrics from './investment-metrics';

type Tag = {
  id: number;
  name: string;
};

type Portfolio = {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  logoUrl: string;
  website?: string | null;
  tags: Tag[];
  // Investment and financial data
  investment_date?: Date | null;
  initial_investment?: number | null;
  original_valuation?: number | null;
  current_valuation?: number | null;
  investment_status?: string | null;
};

type Category = {
  id: number;
  name: string;
  order: number;
};

export default function CompanySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Fetch all categories
  const { 
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      return res.json();
    }
  });

  // Fetch all portfolio items
  const { 
    data: portfolioItems = [],
    isLoading: isLoadingPortfolio,
    error: portfolioError 
  } = useQuery<Portfolio[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const res = await fetch('/api/portfolio');
      if (!res.ok) {
        throw new Error('Failed to fetch portfolio items');
      }
      return res.json();
    }
  });

  // Filter portfolio items by selected category
  const filteredItems = portfolioItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  if (isLoadingCategories || isLoadingPortfolio) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (categoriesError || portfolioError) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-12">
        <div className="flex items-center">
          {/* Category Filter Buttons */}
          <div className="inline-flex flex-wrap gap-2">
            <button
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-purple-primary text-white'
                  : 'bg-purple-dark/50 text-text-secondary hover:bg-purple-dark/70'
              }`}
              onClick={() => setSelectedCategory('All')}
            >
              All
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.name
                    ? 'bg-purple-primary text-white'
                    : 'bg-purple-dark/50 text-text-secondary hover:bg-purple-dark/70'
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <Link 
          href="/portfolio-metrics" 
          className="bg-purple-primary hover:bg-purple-light text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          View Metrics
        </Link>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="card group"
          >
            {/* Company Logo */}
            <div className="company-logo mb-4 h-20 rounded-md">
              <Image
                src={item.logoUrl}
                alt={item.name}
                width={120}
                height={50}
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            {/* Company Details */}
            <div>
              <h3 className="font-medium text-lg text-text-primary">{item.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{item.category}</p>
              
              {/* Company Description */}
              {item.description && (
                <p className="text-sm text-text-tertiary mb-3 line-clamp-3">
                  {item.description}
                </p>
              )}
              
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.map(tag => (
                    <span 
                      key={tag.id} 
                      className={`px-2 py-0.5 text-xs rounded ${
                        tag.name === 'Markup' 
                          ? 'bg-purple-primary text-white' 
                          : tag.name === 'Acquired'
                          ? 'bg-text-secondary/80 text-white'
                          : 'bg-purple-dark/50 text-text-secondary'
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Investment Data */}
              {item.investment_date && (
                <div className="mt-4 pt-3 border-t border-purple-primary/10">
                  <InvestmentMetrics 
                    data={item} 
                    showDetailed={false}
                  />
                </div>
              )}
            </div>
            
            {/* Link overlay if website available */}
            {item.website && (
              <div className="mt-4 text-right">
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  Visit Website 
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}