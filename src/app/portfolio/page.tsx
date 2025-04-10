"use client"

import { useState, memo } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { CompanyCard } from './components/CompanyCard';
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
      
      {/* Stats Section - Styled to match the single column format from the screenshot */}
      <div className="mb-10 w-full max-w-[400px]">
        <div className="bg-white px-6 py-8 flex flex-col gap-2">
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0"># Investments</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">32</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0"># Markups</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">13</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0"># Acquisitions</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">2</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0"># Busts</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">4</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0">TVPI</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">1.44x</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0">Gross Multiple</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">1.22x</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0">Net Multiple</div>
            <div className="text-4xl font-bold text-black leading-tight mb-2">1.12x</div>
          </div>
          
          <div className="text-left">
            <div className="text-black font-medium text-xl mb-0">IRR</div>
            <div className="text-4xl font-bold text-black leading-tight mb-0">10%</div>
          </div>
        </div>
      </div>
      
      {/* Category filters - styled with better UI */}
      <div className="mb-8 max-w-[800px]">
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => {
              // Skip duplicate "All" category
              if (index > 0 && category === "All") return null;
              
              const isActive = selectedCategory === category;
              
              return (
                <Button
                  key={category}
                  className={`px-4 py-1 rounded-md text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-purple-600 text-white shadow-md' 
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
        <h3 className="text-gray-700 font-medium mb-4 pb-2 border-b border-gray-100">Portfolio Companies:</h3>
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.name} company={company} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}
