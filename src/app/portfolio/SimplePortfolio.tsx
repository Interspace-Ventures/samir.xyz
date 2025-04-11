"use client"

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { cn } from '../../lib/utils';

// Sample data for now - we'll replace with actual data imports when fixed
const companies = [
  { 
    name: "Company One", 
    category: "SaaS", 
    logo: "/logos/ventures/interspace.png",
    url: "https://example.com",
    description: "A great company doing important things"
  },
  { 
    name: "Company Two", 
    category: "AI", 
    logo: "/logos/ventures/perspectives.png",
    url: "https://example.com",
    description: "AI-powered solutions for businesses"
  },
  { 
    name: "Company Three", 
    category: "Web3", 
    logo: "/logos/ventures/predictive.film-icon-2025.png",
    url: "https://example.com",
    description: "Blockchain innovation platform"
  },
  { 
    name: "Company Four", 
    category: "SaaS", 
    logo: "/logos/ventures/solo-wordmark---gradient-2025.png",
    url: "https://example.com",
    description: "Productivity tools for teams"
  }
];

const categories = ["All", "SaaS", "AI", "Web3"];

// Simple company card component
const CompanyCard = ({ company, isDark }: { company: any, isDark: boolean }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 mr-3 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="w-8 h-8 object-contain"
          />
        </div>
        <h3 className="font-medium text-lg">{company.name}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-3">{company.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-full">
          {company.category}
        </span>
        <a 
          href={company.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#5239cc] hover:text-[#3b2aa1] text-sm font-medium"
        >
          Visit →
        </a>
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
              className={cn(
                // Use the custom variant from shadcn Button component
                isSelected && "bg-[#5239cc] text-white border-[#5239cc]",
                "transition-all duration-200"
              )}
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