"use client"

import * as React from 'react';
import { cn } from '../../../lib/utils';

interface FilterCategoriesProps {
  categories: readonly string[] | string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * FilterCategories component that follows shadcn UI styling principles
 * but doesn't rely on the Button component to avoid dynamic import issues
 */
export default function FilterCategoriesNew({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: FilterCategoriesProps) {
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
              aria-selected={isSelected}
              className={cn(
                // Base styles (always applied)
                "inline-flex items-center justify-center whitespace-nowrap rounded-md",
                "min-w-[80px] px-5 py-2 text-lg font-normal",
                "ring-offset-background transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "shadow-sm transition-all duration-200",
                
                // Conditional styling based on selected state
                isSelected 
                  ? "bg-[#5239cc] text-white border border-[#5239cc]" 
                  : "bg-white border border-gray-300 text-gray-900 hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}