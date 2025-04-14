import { useState } from "react";
import { Button } from "../layout/button";
import { categories } from "../config/data/portfolio";

type FilterButtonsProps = {
  selectedCategory: string;
  onChange: (category: string) => void;
};

export default function FilterButtons({ selectedCategory, onChange }: FilterButtonsProps) {
  return (
    <div className="max-w-[800px] w-full mb-6">
      <h2 className="text-lg font-medium mb-3 text-gray-900">Filter by Category</h2>
      <div className="flex flex-wrap gap-3 py-2" data-testid="portfolio-filter-categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          
          return (
            <Button
              key={category}
              onClick={() => onChange(category)}
              data-testid={`filter-button-${category}`}
              variant="filter"
              size="filter"
              data-state={isSelected ? "selected" : "default"}
              className="rounded-md"
            >
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
}