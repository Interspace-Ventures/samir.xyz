"use client"

import { useState } from 'react';

interface FilterCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * FilterCategories component with clean styling that matches the reference design
 */
export default function FilterCategoriesNew({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: FilterCategoriesProps) {
  return (
    <div className="max-w-[800px] w-full mb-6">
      <div className="flex flex-wrap gap-3 py-2">
        {categories.map((category, index) => {
          // Skip duplicate "All" category
          if (index > 0 && category === "All") return null;
          
          const isActive = selectedCategory === category;
          
          return (
            <button
              key={category}
              className={`
                inline-flex items-center justify-center whitespace-nowrap 
                rounded-md px-5 py-2 text-lg font-normal min-w-[80px] shadow-sm
                transition-all duration-200
                ${isActive 
                  ? 'bg-[#5239cc] text-white border border-[#5239cc]' 
                  : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}
              `}
              onClick={() => onSelectCategory(category)}
              data-testid={`filter-button-${category}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}