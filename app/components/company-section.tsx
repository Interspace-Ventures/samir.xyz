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
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Portfolio</h2>
          <Link href="/portfolio-metrics" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm">
            View Investment Metrics
          </Link>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.name
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div 
              key={item.id} 
              className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Company Logo */}
              <div className="relative h-32 bg-white flex items-center justify-center p-4">
                <Image
                  src={item.logoUrl}
                  alt={item.name}
                  width={160}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              {/* Company Details */}
              <div className="p-4 text-black">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                
                {/* Company Description */}
                {item.description && (
                  <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                    {item.description}
                  </p>
                )}
                
                {/* Investment Data */}
                {item.investment_date && (
                  <div className="mt-3">
                    <InvestmentMetrics 
                      data={item} 
                      showDetailed={true}
                    />
                  </div>
                )}
              </div>
              
              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {item.tags.map(tag => (
                    <span 
                      key={tag.id} 
                      className={`px-2 py-0.5 text-xs rounded ${
                        tag.name === 'Markup' 
                          ? 'bg-purple-600 text-white' 
                          : tag.name === 'Acquired'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Link overlay if website available */}
              {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-0 left-0 right-0 text-center py-2 bg-black text-white text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Visit Website →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}