import React from 'react';
import { categories } from '../config/data/portfolio';

interface FilterCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterCategories({ 
  selectedCategory, 
  onCategoryChange 
}: FilterCategoriesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8" data-testid="portfolio-filter-categories">
      {categories.map((category, index) => {
        // Skip duplicate "All" category
        if (index > 0 && category === "All") return null;
        
        const isActive = selectedCategory === category;
        
        return (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border
              ${isActive 
                ? 'bg-purple-600 text-white border-purple-600' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700'
              }`}
            onClick={() => onCategoryChange(category)}
            data-testid={`filter-button-${category}`}
            data-active={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}