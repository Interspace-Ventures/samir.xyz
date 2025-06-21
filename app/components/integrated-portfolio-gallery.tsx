'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

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
 * Integrated Portfolio Gallery Component
 * 
 * A simplified version of the portfolio gallery that focuses on the filtering functionality
 * with no dynamic loading or skeleton layers, just direct content rendering.
 */
export default function IntegratedPortfolioGallery() {
  // Static filtering state 
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Fetch all portfolio items
  const { 
    data: portfolioItems = [],
    isLoading: isLoadingPortfolio,
  } = useQuery<Portfolio[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      const res = await fetch('/api/portfolio');
      if (!res.ok) throw new Error(`Failed to fetch portfolio items: ${res.status}`);
      return res.json();
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });

  // Get all unique categories from the portfolio items
  const uniqueCategories = useMemo(() => {
    if (!portfolioItems.length) return [];
    return Array.from(new Set(portfolioItems.map(item => item.category)))
      .filter(cat => cat !== null && cat !== '')
      .sort();
  }, [portfolioItems]);

  // Filter portfolio items by selected category
  const filteredItems = useMemo(() => {
    return portfolioItems
      .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
      .sort((a, b) => {
        // Sort by investment status first (Markup > Acquired = Other), then by name
        const statusOrder = { 'Markup': 3, 'Acquired': 2 };
        const aStatus = statusOrder[a.investment_status as keyof typeof statusOrder] || 1;
        const bStatus = statusOrder[b.investment_status as keyof typeof statusOrder] || 1;
        
        if (aStatus !== bStatus) {
          return bStatus - aStatus; // Higher status values first
        }
        
        // If same status, sort alphabetically by name
        return a.name.localeCompare(b.name);
      });
  }, [portfolioItems, selectedCategory]);

  // If no portfolio items have loaded yet, show spinner
  if (isLoadingPortfolio && portfolioItems.length === 0) {
    return (
      <div className="py-4">
        {/* Category filter skeleton */}
        <div className="flex justify-between sm:justify-start overflow-x-auto pb-2 mb-6 pt-1 w-full">
          <div className="inline-flex space-x-1 w-full sm:w-auto">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
            ))}
          </div>
        </div>

        {/* Portfolio Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 16 }).map((_, index) => (
            <div key={index} className="bg-white overflow-hidden relative shadow-sm animate-pulse">
              <div className="h-20 sm:h-24 flex items-center justify-center p-3 sm:p-4 bg-white">
                <div className="w-[140px] h-[70px] bg-gray-200 rounded-sm max-w-full max-h-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Category Filter Buttons */}
      <div className="flex justify-between sm:justify-start overflow-x-auto pb-2 mb-6 pt-1 w-full">
        <div className="inline-flex space-x-1 w-full sm:w-auto">
          <button
            className={`px-2 py-1 text-xs font-medium transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-purple-primary text-white shadow-md border border-purple-primary'
                : 'bg-[#2d0c6a] text-white hover:bg-[#381490] border border-[#7f55dc]'
            }`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`px-2 py-1 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-purple-primary text-white shadow-md border border-purple-primary'
                  : 'bg-[#2d0c6a] text-white hover:bg-[#381490] border border-[#7f55dc]'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const logoUrl = item.logoUrl || '';
            const fallbackLogoUrl = `/logos/${item.name.toLowerCase().replace(/\s+/g, '-')}.png`;
            
            const CardContent = ({ itemIndex }: { itemIndex: number }) => (
              <div className="bg-white overflow-hidden relative group shadow-sm hover:shadow-lg transition-all duration-300">
                {/* Company Logo Container */}
                <div className="h-20 sm:h-24 flex items-center justify-center p-3 sm:p-4 bg-white">
                  <div className="relative w-[140px] h-[70px] max-w-full max-h-full">
                    <Image
                      src={logoUrl ? 
                        (logoUrl.startsWith('/') ? logoUrl : `/logos/${logoUrl.split('/').pop()}`) 
                        : fallbackLogoUrl
                      }
                      alt={`${item.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 120px, 140px"
                      priority={itemIndex < 8}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQwIiBoZWlnaHQ9IjcwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAliIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg=="
                      unoptimized={true}
                    />
                  </div>
                </div>
                
                {/* Status badges */}
                {item.investment_status === 'Markup' && (
                  <div className="absolute top-1 right-1">
                    <span className="bg-purple-primary text-white text-xs px-2 py-0.5 font-medium rounded">
                      Markup
                    </span>
                  </div>
                )}
                
                {item.investment_status === 'Acquired' && (
                  <div className="absolute top-1 right-1">
                    <span className="bg-green-600 text-white text-xs px-2 py-0.5 font-medium rounded">
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
            
            return (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {item.website ? (
                  <Link 
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="block cursor-pointer"
                  >
                    <CardContent itemIndex={index} />
                  </Link>
                ) : (
                  <CardContent itemIndex={index} />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}