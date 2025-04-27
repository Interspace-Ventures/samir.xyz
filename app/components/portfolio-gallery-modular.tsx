'use client';

import { useState } from 'react';
import PortfolioCategories from './portfolio-categories';
import PortfolioItems from './portfolio-items';

/**
 * Modular Portfolio Gallery Component
 * 
 * This component combines the categories and items components
 * while managing the selected category state.
 */
export default function PortfolioGalleryModular() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      {/* Portfolio Categories Component */}
      <PortfolioCategories 
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* Portfolio Items Component */}
      <PortfolioItems selectedCategory={selectedCategory} />
    </>
  );
}