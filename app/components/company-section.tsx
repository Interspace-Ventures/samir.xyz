'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

type Tag = {
  id: number;
  name: string;
};

type Company = {
  id: number;
  name: string;
  category: string;
  logoUrl: string;
  website?: string | null;
  featured: boolean;
  tags: Tag[];
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

  // Fetch all companies
  const { 
    data: companies = [],
    isLoading: isLoadingCompanies,
    error: companiesError 
  } = useQuery<Company[]>({
    queryKey: ['companies'],
    queryFn: async () => {
      const res = await fetch('/api/companies');
      if (!res.ok) {
        throw new Error('Failed to fetch companies');
      }
      return res.json();
    }
  });

  // Filter companies by selected category
  const filteredCompanies = companies.filter(company => 
    selectedCategory === 'All' || company.category === selectedCategory
  );

  if (isLoadingCategories || isLoadingCompanies) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (categoriesError || companiesError) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
  }

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Companies</h2>
        
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

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <div 
              key={company.id} 
              className="relative bg-white rounded-lg p-8 flex items-center justify-center h-48"
            >
              {/* Company Logo */}
              <div className="relative h-16 flex items-center justify-center">
                <Image
                  src={company.logoUrl}
                  alt={company.name}
                  width={160}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              
              {/* Tags */}
              {company.tags.length > 0 && (
                <div className="absolute top-4 right-4 flex gap-2">
                  {company.tags.map(tag => (
                    <span 
                      key={tag.id} 
                      className={`px-2 py-1 text-xs rounded ${
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
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 opacity-0 hover:opacity-100 bg-black bg-opacity-10 transition-opacity duration-300 flex items-center justify-center rounded-lg"
                >
                  <span className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium">
                    Visit Website
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}