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
      {/* Header section with white text */}
      <div className="mb-8 text-left">
        <h1 className="text-4xl font-bold mb-4 text-white">Portfolio</h1>
        <p className="text-lg max-w-3xl text-gray-300 mb-6">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section - Styled to match the provided screenshot with responsive grid */}
      <div className="mb-10 w-full max-w-[800px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm"># Investments</div>
            <div className="text-white text-2xl font-bold">32</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm"># Markups</div>
            <div className="text-white text-2xl font-bold">13</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm"># Acquisitions</div>
            <div className="text-white text-2xl font-bold">2</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm"># Busts</div>
            <div className="text-white text-2xl font-bold">4</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm">TVPI</div>
            <div className="text-white text-2xl font-bold">1.44x</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm">Gross Multiple</div>
            <div className="text-white text-2xl font-bold">1.22x</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm">Net Multiple</div>
            <div className="text-white text-2xl font-bold">1.12x</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm">IRR</div>
            <div className="text-white text-2xl font-bold">10%</div>
          </div>
        </div>
      </div>
      
      {/* Category filters - Enhanced styled buttons */}
      <div className="flex flex-wrap gap-3 mb-8 bg-gradient-to-r from-gray-900 to-gray-800 p-4 rounded-xl max-w-[800px] shadow-lg border border-gray-700">
        <Button
          variant={selectedCategory === 'All' ? "default" : "outline"}
          size="sm"
          className={selectedCategory === 'All' 
            ? "bg-gradient-to-r from-purple-700 to-purple-500 text-white border-none font-medium shadow-md hover:from-purple-800 hover:to-purple-600 transform hover:scale-105 transition-all" 
            : "bg-gray-800/60 text-gray-200 border border-gray-600 hover:border-purple-400 hover:text-white hover:bg-gray-700 transform hover:scale-105 transition-all"}
          onClick={() => setSelectedCategory('All')}
        >
          All
        </Button>
        
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            className={selectedCategory === category 
              ? "bg-gradient-to-r from-purple-700 to-purple-500 text-white border-none font-medium shadow-md hover:from-purple-800 hover:to-purple-600 transform hover:scale-105 transition-all" 
              : "bg-gray-800/60 text-gray-200 border border-gray-600 hover:border-purple-400 hover:text-white hover:bg-gray-700 transform hover:scale-105 transition-all"}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Company Grid - With white background container and always 2 columns */}
      <div id="white-container" className="bg-white p-6 rounded-xl w-[95%] max-w-[800px] mx-auto mb-12">
        <div className="portfolio-grid grid grid-cols-2 gap-4">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.name} company={company} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}
