'use client';

import { useState } from 'react';
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

interface PortfolioItemsProps {
  selectedCategory: string;
}

/**
 * Portfolio Items Component
 * 
 * This component manages loading portfolio items and displaying the filtered portfolio grid
 */
export default function PortfolioItems({ selectedCategory }: PortfolioItemsProps) {
  // Fetch all portfolio items
  const { 
    data: portfolioItems = [],
    isLoading: isLoadingPortfolio,
    error: portfolioError 
  } = useQuery<Portfolio[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (!res.ok) {
          throw new Error(`Failed to fetch portfolio items: ${res.status}`);
        }
        return res.json();
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
      return selectedCategory === 'All' || item.category === selectedCategory;
    })
    // Sort alphabetically by company name, always keep consistent sorting
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

  if (isLoadingPortfolio || portfolioError) {
    // Return null during loading or error - parent will handle skeleton display
    if (portfolioError) {
      console.error('Portfolio error:', portfolioError);
    }
    return null;
  }

  return (
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
  );
}