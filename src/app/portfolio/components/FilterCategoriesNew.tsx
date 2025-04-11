"use client"

import { Button } from '../../../components/ui/button';

interface FilterCategoriesProps {
  categories: readonly string[] | string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * FilterCategories component using shadcn UI Button component with custom filter variant
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
            <Button
              key={category}
              variant="filter"
              size="filter"
              aria-selected={isSelected}
              onClick={() => onSelectCategory(category)}
              data-testid={`filter-button-${category}`}
            >
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
}