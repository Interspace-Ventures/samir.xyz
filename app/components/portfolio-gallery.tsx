'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

type Portfolio = {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  logoUrl: string;
  website?: string | null;
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

/**
 * Portfolio Gallery Component
 * 
 * This component only loads and displays the portfolio gallery (without metrics)
 * for faster loading times.
 */
export default function PortfolioGallery() {
  // Use useState with a key to ensure proper re-rendering when the category changes
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // Use a counter to force re-render when category changes
  const [renderKey, setRenderKey] = useState<number>(0);
  
  // Function to update category and force re-render
  const updateCategory = (category: string) => {
    setSelectedCategory(category);
    setRenderKey(prev => prev + 1); // Increment to force re-render
  };
  
  // Debug/indicator element ID
  const debugId = `portfolio-filter-${Math.random().toString(36).substring(7)}`;
  
  // Effect to debug category changes and ensure component is rendering correctly
  useEffect(() => {
    console.log(`Selected category changed to: ${selectedCategory} (render key: ${renderKey})`);
    console.log(`Component instance ID: ${debugId}`);
    
    // Add a hidden debug element to verify the component is properly updating
    const debugElement = document.createElement('div');
    debugElement.id = debugId;
    debugElement.setAttribute('data-category', selectedCategory);
    debugElement.setAttribute('data-render-key', renderKey.toString());
    debugElement.style.display = 'none';
    
    // Remove any previous debug elements from this component
    document.querySelectorAll(`[id^="portfolio-filter-"]`).forEach(el => el.remove());
    document.body.appendChild(debugElement);
    
    return () => {
      // Clean up on unmount
      const element = document.getElementById(debugId);
      if (element) element.remove();
    };
  }, [selectedCategory, renderKey, debugId]);
  
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

  // Use useMemo to memoize filtered items and recompute when selectedCategory or portfolioItems change
  const filteredItems = useMemo(() => {
    // Perform filtering calculation
    const filtered = portfolioItems
      .filter(item => {
        // Make sure we have valid categories to filter
        console.log(`Filtering item: ${item.name}, Category: ${item.category}, Selected: ${selectedCategory}`);
        return selectedCategory === 'All' || item.category === selectedCategory;
      })
      // Sort alphabetically by company name, always keep consistent sorting
      .sort((a, b) => {
        // Always sort alphabetically
        return a.name.localeCompare(b.name);
      });
      
    // Log filtered items count for debugging
    console.log(`Filtered items: ${filtered.length} of ${portfolioItems.length}`);
    console.log(`Current selected category: ${selectedCategory}`);
    
    return filtered;
  }, [selectedCategory, portfolioItems, renderKey]); // Include renderKey to force recalculation

  // Use a skeleton loader during both loading and error states
  if (isLoadingCategories || isLoadingPortfolio || categoriesError || portfolioError) {
    // Log errors to console for debugging but don't show to user
    if (categoriesError || portfolioError) {
      console.error('Category error:', categoriesError);
      console.error('Portfolio error:', portfolioError);
    }
    
    // Always show the skeleton loader instead of text or error messages
    return (
      <div className="mt-8">
        <div className="mb-6">
          {/* Category tabs skeleton */}
          <div className="flex flex-wrap gap-2 mb-4">
            {Array(5).fill(0).map((_, index) => (
              <div 
                key={`category-skeleton-${index}`}
                className="h-8 w-24 bg-white/5 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>

        {/* Portfolio grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array(12).fill(0).map((_, index) => (
            <div
              key={`portfolio-skeleton-${index}`}
              className="bg-white/5 border border-purple-900/30 rounded-lg overflow-hidden animate-pulse"
            >
              {/* Company logo placeholder */}
              <div className="aspect-video p-6 flex items-center justify-center">
                <div className="w-20 h-12 rounded-md bg-white/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Category Filter Buttons */}
      <div className="flex justify-between sm:justify-start overflow-x-auto scrollbar-thin scrollbar-thumb-purple-primary scrollbar-track-transparent pb-2 mb-8 w-full">
        <div className="inline-flex space-x-2 px-0.5 w-full sm:w-auto">
          <button
            className={`px-6 py-2 text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
              selectedCategory === 'All'
                ? 'bg-purple-primary text-white shadow-md border border-purple-primary'
                : 'bg-[#2d0c6a] text-white hover:bg-[#381490] border border-[#7f55dc]'
            }`}
            onClick={() => {
              console.log("Clicked 'All' category");
              updateCategory('All'); // Use the updateCategory function
            }}
          >
            All
          </button>
          
          {/* Get unique categories from portfolio items */}
          {Array.from(new Set(portfolioItems.map(item => item.category)))
            .filter(cat => cat !== null && cat !== '')
            .sort()
            .map((category, index) => (
            <button
              key={`${category}-${index}-${renderKey}`} // Add renderKey to force re-render
              className={`px-6 py-2 text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-purple-primary text-white shadow-md border border-purple-primary'
                  : 'bg-[#2d0c6a] text-white hover:bg-[#381490] border border-[#7f55dc]'
              }`}
              onClick={() => {
                console.log(`Clicked '${category}' category`);
                updateCategory(category); // Use the updateCategory function
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredItems.map(item => {
          // Handle potential missing logoUrl
          const logoUrl = item.logoUrl || '';
          
          // If we have issues, try fetching the logo based on company name
          const fallbackLogoUrl = `/logos/${item.name.toLowerCase().replace(/\s+/g, '-')}.png`;
          
          // Create the inner content for the card
          const CardContent = () => (
            <div className="bg-white overflow-hidden relative group shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {/* Company Logo Container */}
              <div className="h-20 sm:h-24 flex items-center justify-center p-3 sm:p-4 bg-white">
                {/* Improved logo handling for all path formats */}
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
              
              {/* Status overlay (if present) */}
              {item.investment_status === 'Markup' && (
                <div className="absolute top-1 right-1">
                  <span className="bg-purple-primary text-white text-xs px-2 py-0.5 font-medium">
                    Markup
                  </span>
                </div>
              )}
              
              {item.investment_status === 'Acquired' && (
                <div className="absolute top-1 right-1">
                  <span className="bg-zinc-700 text-white text-xs px-2 py-0.5 font-medium">
                    Acquired
                  </span>
                </div>
              )}
              
              {/* Hover overlay with description */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#2d0c6a]/90 to-[#381490]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 md:p-5 text-center overflow-hidden">
                {item.description ? (
                  <div>
                    <h4 className="text-white text-xs font-bold mb-1">{item.name}</h4>
                    <p className="text-gray-200 text-[10px]">{item.description}</p>
                  </div>
                ) : (
                  <div>
                    <h4 className="text-white text-xs font-bold mb-1">{item.name}</h4>
                    <p className="text-gray-300 text-[10px]">{item.category}</p>
                  </div>
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
    </>
  );
}