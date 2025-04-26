'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import InvestmentMetrics from './investment-metrics';
import PortfolioMetricsSummary from './portfolio-metrics-summary';

type Portfolio = {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  logoUrl: string; // Field name in TypeScript remains camelCase
  website?: string | null;
  // Investment and financial data
  investment_date?: Date | null;
  initial_investment?: number | null;
  original_valuation?: number | null;
  current_valuation?: number | null;
  investment_status?: string | null;
  createdAt: Date;
  updatedAt: Date;
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
  const filteredItems = portfolioItems
    .filter(item => {
      // console.log('Filtering item:', item.name, 'Category:', item.category, 'Selected category:', selectedCategory);
      return selectedCategory === 'All' || item.category === selectedCategory;
    })
    // Sort alphabetically by company name, always keep consistent sorting
    .sort((a, b) => {
      // Always sort alphabetically
      return a.name.localeCompare(b.name);
    });

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
      {/* Portfolio Metrics Summary */}
      <PortfolioMetricsSummary />

      {/* Category Filter Buttons */}
      <div className="flex justify-start overflow-x-auto scrollbar-thin scrollbar-thumb-purple-primary scrollbar-track-transparent pb-2 mb-8">
        <div className="inline-flex space-x-2 px-0.5">
          <button
            className={`px-6 py-2 rounded-md text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
              selectedCategory === 'All'
                ? 'bg-purple-primary text-white shadow-md'
                : 'bg-zinc-900 text-white hover:bg-zinc-800'
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          
          {/* Get unique categories from portfolio items */}
          {Array.from(new Set(portfolioItems.map(item => item.category)))
            .filter(cat => cat !== null && cat !== '') // Don't filter out any categories for now
            .sort()
            .map((category, index) => (
            <button
              key={index}
              className={`px-6 py-2 rounded-md text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-purple-primary text-white shadow-md'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredItems.map(item => {
          // Handle potential missing logoUrl (happens when API field mapping isn't working)
          const logoUrl = item.logoUrl || '';
          
          // All our images should be PNG format based on the database check
          // Let's fix the issue by making sure we can handle different path formats
          // console.log('Logo URL for', item.name, ':', logoUrl);
          
          // If we have issues, try fetching the logo based on company name
          const fallbackLogoUrl = `/logos/${item.name.toLowerCase().replace(/\s+/g, '-')}.png`;
          
          // Create the inner content for the card
          const CardContent = () => (
            <div className="bg-white rounded-lg overflow-hidden relative group shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Company Logo Container */}
              <div className="h-20 sm:h-24 flex items-center justify-center p-3 sm:p-4 bg-white">
                {/* Improved logo handling for all path formats */}
                {/* Using next/image with proper error handling */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={logoUrl ? 
                      (logoUrl.startsWith('/') ? logoUrl : `/logos/${logoUrl.split('/').pop()}`) 
                      : fallbackLogoUrl
                    }
                    alt={`${item.name} logo`}
                    width={140}
                    height={70}
                    style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '80%' }}
                    unoptimized={true}
                  />
                </div>
              </div>
              
              {/* Company Name - More compact */}
              <div className="px-3 py-1.5 bg-gray-50 border-t border-gray-100">
                <h3 className="text-xs font-medium text-gray-800 truncate">{item.name}</h3>
              </div>
              
              {/* Status overlay (if present) */}
              {item.investment_status === 'Markup' && (
                <div className="absolute top-3 right-3">
                  <span className="bg-purple-primary text-white text-xs px-3 py-1 rounded-md font-medium">
                    Markup
                  </span>
                </div>
              )}
              
              {item.investment_status === 'Acquired' && (
                <div className="absolute top-3 right-3">
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-md font-medium">
                    Acquired
                  </span>
                </div>
              )}
              
              {/* Hover overlay with description - fixed rounded corners */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 md:p-5 text-center rounded-lg overflow-hidden">
                {item.description ? (
                  <p className="text-white text-xs sm:text-sm">{item.description}</p>
                ) : (
                  <p className="text-gray-300 text-xs sm:text-sm">{item.name} - {item.category}</p>
                )}
              </div>
            </div>
          );
          
          // Render either a link wrapper or just the content
          return (
            <div key={item.id}>
              {item.website ? (
                <Link 
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="block cursor-pointer"
                  aria-label={`Visit ${item.name} website`}
                >
                  <CardContent />
                </Link>
              ) : (
                <CardContent />
              )}
            </div>
          );
        })}
      </div>
      
      {/* End of Portfolio Section */}
    </>
  );
}