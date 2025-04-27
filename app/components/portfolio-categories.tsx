'use client';

import { useQuery } from '@tanstack/react-query';

type Category = {
  id: number;
  name: string;
  order: number;
};

interface PortfolioCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Portfolio Categories Component
 * 
 * This component manages loading categories and displays category filter buttons
 */
export default function PortfolioCategories({ 
  selectedCategory, 
  onCategoryChange 
}: PortfolioCategoriesProps) {
  // Fetch all categories
  const { 
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError 
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        return res.json();
      } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000
  });
  
  if (isLoadingCategories || categoriesError) {
    // Return null during loading or error - parent will handle skeleton display
    return null;
  }

  // Get unique category names from the categories data
  const uniqueCategoryNames = Array.from(
    new Set(categories.map(category => category.name))
  ).filter(name => name !== null && name !== '').sort();

  return (
    <div className="flex justify-start overflow-x-auto scrollbar-thin scrollbar-thumb-purple-primary scrollbar-track-transparent pb-2 mb-8">
      <div className="inline-flex space-x-2 px-0.5">
        <button
          className={`px-6 py-2 text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
            selectedCategory === 'All'
              ? 'bg-purple-primary text-white shadow-md border border-purple-primary'
              : 'bg-[#2d0c6a] text-white hover:bg-[#381490] border border-[#7f55dc]'
          }`}
          onClick={() => onCategoryChange('All')}
        >
          All
        </button>
        
        {uniqueCategoryNames.map((category, index) => (
          <button
            key={index}
            className={`px-6 py-2 text-sm font-medium transform transition-all duration-300 hover:scale-105 ${
              selectedCategory === category
                ? 'bg-purple-primary text-white shadow-md border border-purple-primary'
                : 'bg-[#2d0c6a] text-white hover:bg-[#381490] border border-[#7f55dc]'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}