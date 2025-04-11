"use client"

import * as React from 'react';
import styles from './filter-button.module.css';

interface FilterCategoriesProps {
  categories: readonly string[] | string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

/**
 * FilterCategories component using dedicated CSS modules
 * for clean styling without dynamic import dependencies
 */
export default function FilterCategoriesNew({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}: FilterCategoriesProps) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterButtonGroup} data-testid="portfolio-filter-categories">
        {categories.map((category, index) => {
          // Skip duplicate "All" category
          if (index > 0 && category === "All") return null;
          
          const isSelected = selectedCategory === category;
          
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              data-testid={`filter-button-${category}`}
              className={`${styles.filterButton} ${isSelected ? styles.filterButtonActive : ''}`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}