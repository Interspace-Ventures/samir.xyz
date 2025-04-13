"use client";

import React from 'react';
import styles from './filter-categories.module.css';
import { categories } from '../../../components/data/portfolio';

interface FilterCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterCategories: React.FC<FilterCategoriesProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <div className={styles.filterContainer} data-testid="portfolio-filter-categories">
      {categories.map((category, index) => {
        // Skip duplicate "All" category
        if (index > 0 && category === "All") return null;
        
        const isActive = selectedCategory === category;
        
        return (
          <button
            key={category}
            className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
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
};

export default FilterCategories;