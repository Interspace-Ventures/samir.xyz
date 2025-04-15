import React from 'react';
import { categories } from '../data/portfolio';
import { Badge } from '../components/ui/badge';
import { cn } from '../lib/utils';

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
          <Badge
            key={category}
            className={cn(
              "px-4 py-2 text-sm font-medium cursor-pointer hover:bg-primary/80 transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
            onClick={() => onCategoryChange(category)}
            data-testid={`filter-button-${category}`}
            data-active={isActive}
            variant={isActive ? "default" : "secondary"}
          >
            {category}
          </Badge>
        );
      })}
    </div>
  );
}