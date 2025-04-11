"use client"

import { useState } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { CompanyCard } from './components/CompanyCard';

export default function SimplePortfolio() {
  // Initialize the page
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';

  // Stats data
  const topRowStats = [
    { label: "# Investments", value: "32" },
    { label: "# Markups", value: "13" },
    { label: "# Acquisitions", value: "2" },
    { label: "# Busts", value: "4" }
  ];
  
  const bottomRowStats = [
    { label: "TVPI", value: "1.44x" },
    { label: "Gross Multiple", value: "1.22x" },
    { label: "Net Multiple", value: "1.12x" },
    { label: "IRR", value: "10%" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto p-8 bg-white">
      {/* Header section with black text */}
      <div className="mb-8 text-left">
        <h1 className="text-4xl font-bold mb-4 text-black">Portfolio</h1>
        <p className="text-lg max-w-3xl text-gray-700 mb-6">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section */}
      <div className="w-full max-w-[800px] mb-8 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col gap-4">
          {/* Top Row - 4 KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {topRowStats.map((stat) => (
              <div 
                key={stat.label} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                           flex flex-col items-center text-center transform hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-black m-0">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          
          {/* Bottom Row - 4 KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {bottomRowStats.map((stat) => (
              <div 
                key={stat.label} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                           flex flex-col items-center text-center transform hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-black m-0">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
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
                onClick={() => setSelectedCategory(category)}
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