"use client"

import React from 'react';
import { categories } from '../../components/data/portfolio';

interface FilterButtonsProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * FilterButtons component with inline Tailwind styling
 */
export default function FilterButtons({ 
  selectedCategory, 
  onSelectCategory 
}: FilterButtonsProps) {
  return (
    <div className="max-w-[800px] w-full mb-6">
      <div className="flex flex-wrap gap-3 py-2" data-testid="portfolio-filter-categories">
        {categories.map((category, index) => {
          // Skip duplicate "All" category
          if (index > 0 && category === "All") return null;
          
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              data-testid={`filter-button-${category}`}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-md 
                min-w-[80px] px-5 py-2 text-lg font-normal shadow-sm transition-all duration-200
                ${isSelected 
                  ? 'bg-[#5239cc] text-white border border-[#5239cc]' 
                  : 'bg-white text-black border border-gray-300 hover:bg-gray-100'}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}