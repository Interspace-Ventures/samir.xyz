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
      try {
        console.log('Fetching categories...');
        const res = await fetch('/api/categories');
        if (!res.ok) {
          console.error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        const data = await res.json();
        console.log(`Fetched ${data.length} categories`);
        return data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000
  });

  // Fetch all portfolio items
  const { 
    data: portfolioItems = [],
    isLoading: isLoadingPortfolio,
    error: portfolioError 
  } = useQuery<Portfolio[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      try {
        console.log('Fetching portfolio items...');
        const res = await fetch('/api/portfolio');
        if (!res.ok) {
          console.error(`Failed to fetch portfolio items: ${res.status} ${res.statusText}`);
          throw new Error(`Failed to fetch portfolio items: ${res.status}`);
        }
        const data = await res.json();
        console.log(`Fetched ${data.length} portfolio items`);
        return data;
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000
  });

  // Filter portfolio items by selected category
  const filteredItems = portfolioItems.filter(item => 
    selectedCategory === 'All' || item.category === selectedCategory
  );

  if (isLoadingCategories || isLoadingPortfolio) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (categoriesError || portfolioError) {
    console.error('Category error:', categoriesError);
    console.error('Portfolio error:', portfolioError);
    
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-lg">
          <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-lg mb-2">Error Loading Data</h3>
            <p className="mb-2">We were unable to load the portfolio items.</p>
            <p className="text-sm text-red-700">
              {categoriesError ? `Categories: ${categoriesError.message}` : ''}
              {portfolioError ? `Portfolio: ${portfolioError.message}` : ''}
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-primary hover:bg-purple-dark text-white px-6 py-2 rounded-md text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
            selectedCategory === 'All'
              ? 'bg-purple-primary text-white'
              : 'bg-[#1C1C1E] text-white hover:bg-gray-800'
          }`}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </button>
        
        {categories.filter(cat => cat.name !== 'All').map(category => (
          <button
            key={category.id}
            className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
              selectedCategory === category.name
                ? 'bg-purple-primary text-white'
                : 'bg-[#1C1C1E] text-white hover:bg-gray-800'
            }`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg overflow-hidden relative group shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Company Logo Container */}
            <div className="h-44 flex items-center justify-center p-8 bg-white">
              <Image
                src={item.logoUrl.startsWith('/') 
                  ? item.logoUrl 
                  : `/${item.logoUrl}`}
                alt={item.name}
                width={200}
                height={90}
                style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '80%' }}
              />
            </div>
            
            {/* Tag overlay (if present) */}
            {item.tags.some(tag => tag.name === 'Markup') && (
              <div className="absolute top-3 right-3">
                <span className="bg-purple-primary text-white text-xs px-3 py-1 rounded-md font-medium">
                  Markup
                </span>
              </div>
            )}
            
            {/* Link overlay if website available */}
            {item.website && (
              <Link 
                href={item.website}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Visit ${item.name} website`}
              >
                <span className="bg-purple-primary text-white px-4 py-2 rounded-md text-sm">
                  Visit Website
                </span>
              </Link>
            )}
          </div>
        ))}
      </div>
      
      {/* Metrics Link */}
      <div className="mt-12 text-right">
        <Link 
          href="/portfolio-metrics" 
          className="bg-purple-primary hover:bg-purple-light text-white px-8 py-3 rounded-md text-sm font-medium transition-colors"
        >
          View All Metrics
        </Link>
      </div>
    </>
  );
}