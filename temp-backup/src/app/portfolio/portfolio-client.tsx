"use client"

import { useState, useCallback } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { CompanyCard } from './components/CompanyCard';
import styles from './styles.module.css';

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';

  // Handler for filter selection
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <div>
      {/* Filter Categories */}
      <div className="max-w-[800px] w-full mb-6">
        <div className="flex flex-wrap gap-3 py-2" data-testid="portfolio-filter-categories">
          {categories.map((category, index) => {
            // Skip duplicate "All" category
            if (index > 0 && category === "All") return null;
            
            const isSelected = selectedCategory === category;
            
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
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
      
      {/* Company Grid */}
      <div id="white-container" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-[800px] mx-auto mb-12">
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.name} company={company} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}