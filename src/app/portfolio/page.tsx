"use client"

import { useState, memo } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { CompanyCard } from './components/CompanyCard';
import StatsDisplay from './components/StatsDisplay';
import styles from './styles.module.css';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';

  // Stats calculations
  const totalCompanies = companies.length;
  const acquiredCompanies = companies.filter(c => c.acquired).length;
  const markupCompanies = companies.filter(c => c.markup).length;
  const bustedCompanies = 4; // Hardcoded for now based on reference
  const tvpi = "1.8x"; // Time Value Paid In - Hardcoded based on reference

  return (
    <div className={styles.portfolioContainer}>
      {/* Header section with black text */}
      <div className="mb-8 text-left">
        <h1 className="text-4xl font-bold mb-4 text-black">Portfolio</h1>
        <p className="text-lg max-w-3xl text-gray-700 mb-6">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section - Using dedicated component with Tailwind classes */}
      <StatsDisplay />
      
      {/* Category filters - with cleaner UI and no header */}
      <div className="mb-8 max-w-[800px]">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => {
              // Skip duplicate "All" category
              if (index > 0 && category === "All") return null;
              
              const isActive = selectedCategory === category;
              
              return (
                <Button
                  key={category}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-sm' 
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Company Grid - With white background container and always 2 cards per row */}
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
