"use client"

import { useState } from 'react';
import FilterButtons from './FilterButtons';
import CompanyGrid from './CompanyGrid';

export default function PortfolioMain() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  return (
    <>
      <FilterButtons 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      <CompanyGrid 
        selectedCategory={selectedCategory} 
      />
    </>
  );
}