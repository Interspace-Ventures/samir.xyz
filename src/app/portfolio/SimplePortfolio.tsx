"use client"

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';
import { companies, categories } from '../../components/data/portfolio';
import { Company } from '../../components/types';

// Improved company card component
const CompanyCard = ({ company, isDark }: { company: Company, isDark: boolean }) => {
  // Use a default logo path from our known working public directory
  const getLogoPath = (name: string) => {
    // Map company names to known logo files in our public directory
    const logoMap: Record<string, string> = {
      'Interspace': '/logos/ventures/interspace.png',
      'Solo': '/logos/ventures/solo-wordmark---gradient-2025.png',
      'Predictive.film': '/logos/ventures/predictive.film-icon-2025.png',
      'Hey I\'m Samir': '/logos/ventures/hey-im-samir.png',
      '2 Days Early': '/logos/ventures/2de-interspace.png',
    };
    
    return logoMap[name] || '/logos/ventures/perspectives.png'; // fallback logo
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 mr-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={getLogoPath(company.name)}
            alt={`${company.name} logo`}
            className="w-8 h-8 object-contain"
          />
        </div>
        <h3 className="font-medium text-lg">
          {company.name}
          {company.markup && <span className="ml-2 text-xs text-green-600 font-medium">↑</span>}
          {company.acquired && <span className="ml-2 text-xs text-blue-600 font-medium">✓</span>}
        </h3>
      </div>
      <p className="text-gray-600 text-sm mb-3">{company.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full">
          {company.category}
        </span>
        {company.markup ? (
          <span className="text-xs font-semibold px-2 py-1 bg-green-50 text-green-600 rounded-full">
            Markup
          </span>
        ) : company.acquired ? (
          <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
            Acquired
          </span>
        ) : (
          <span className="text-sm text-gray-400">
            Active
          </span>
        )}
      </div>
    </div>
  );
};

// Stats Display component with restored styling
const StatsDisplay = () => {
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
    <div className="stats-container w-full max-w-[800px] mb-8 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
      <div className="flex flex-col gap-4">
        {/* Top Row - 4 KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topRowStats.map((stat) => (
            <div 
              key={stat.label} 
              className="stat-card p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                         flex flex-col items-center text-center transform hover:-translate-y-0.5"
            >
              <h3 className="stat-label text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {stat.label}
              </h3>
              <p className="stat-value text-2xl font-bold text-black m-0">
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
              className="stat-card p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                         flex flex-col items-center text-center transform hover:-translate-y-0.5"
            >
              <h3 className="stat-label text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {stat.label}
              </h3>
              <p className="stat-value text-2xl font-bold text-black m-0">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Filter Categories component using shadcn/ui Button
const FilterCategories = ({ selectedCategory, onCategorySelect }: { 
  selectedCategory: string; 
  onCategorySelect: (category: string) => void 
}) => {
  return (
    <div className="filter-container max-w-[800px] w-full mb-6">
      <div className="flex flex-wrap gap-3 py-2" data-testid="portfolio-filter-categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          
          return (
            <Button
              key={category}
              onClick={() => onCategorySelect(category)}
              data-testid={`filter-button-${category}`}
              variant="filter"
              size="filter"
              aria-selected={isSelected}
            >
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default function SimplePortfolio() {
  // Initialize the page
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="portfolio-page w-full max-w-[1400px] mx-auto p-8 bg-white">
      {/* Header section with black text */}
      <div className="header-section mb-8 text-left">
        <h1 className="text-4xl font-bold mb-4 text-black">Portfolio</h1>
        <p className="text-lg max-w-3xl text-gray-700 mb-6">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section with enhanced styling */}
      <StatsDisplay />
      
      {/* Filter Categories using shadcn/ui Button with custom styling */}
      <FilterCategories 
        selectedCategory={selectedCategory} 
        onCategorySelect={setSelectedCategory}
      />
      
      {/* Company Grid */}
      <div id="company-grid-container" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-[800px] mx-auto mb-12">
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <CompanyCard key={company.name} company={company} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}