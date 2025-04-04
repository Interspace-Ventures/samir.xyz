"use client"

import { useState, memo } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';
  
  return (
    <div className="bg-[#080808] min-h-screen p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-bold mb-4 text-white font-inter">
            Portfolio
          </h1>
          <p className="text-lg max-w-3xl text-gray-300 mb-6 font-inter leading-relaxed">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>
        
        {/* Stats Section - perfectly matching the design in the image */}
        <div className="w-full max-w-[800px] mb-10 bg-[#0C0C0C] rounded-md overflow-hidden p-6 font-inter">
          {/* First row - Count metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1"># Investments</div>
              <div className="text-white text-2xl font-bold">32</div>
            </div>
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1"># Markups</div>
              <div className="text-white text-2xl font-bold">13</div>
            </div>
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1"># Acquisitions</div>
              <div className="text-white text-2xl font-bold">2</div>
            </div>
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1"># Busts</div>
              <div className="text-white text-2xl font-bold">4</div>
            </div>
          </div>
          
          {/* Second row - Performance metrics - exact match to design */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1">TVPI</div>
              <div className="text-white text-2xl font-bold">1.44x</div>
            </div>
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1">Gross Multiple</div>
              <div className="text-white text-2xl font-bold">1.22x</div>
            </div>
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1">Net Multiple</div>
              <div className="text-white text-2xl font-bold">1.12x</div>
            </div>
            <div className="bg-transparent">
              <div className="text-gray-400 text-sm font-medium mb-1">IRR</div>
              <div className="text-white text-2xl font-bold">10%</div>
            </div>
          </div>
        </div>
        
        {/* Category Filters using shadcn/ui Button components with improved styling */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`min-w-[70px] font-medium ${
                selectedCategory === category 
                  ? 'bg-purple-700 hover:bg-purple-800 text-white' 
                  : 'text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* Portfolio cards container with dark theme matching the metrics section */}
        <div id="portfolio-container" className="bg-[#0C0C0C] p-6 rounded-md w-full max-w-[800px] mb-12">
          {/* Portfolio grid with enhanced styling */}
          <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCompanies.map(company => (
              <div key={company.name} className="transition-opacity duration-200">
                <CompanyCard 
                  company={company}
                  isDark={isDark}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Updated company card component that matches the dark theme
const CompanyCard = memo(function CompanyCard({ company, isDark }: { company: any, isDark: boolean }) {
  const [imageError, setImageError] = useState(false);
  
  // Basic fallback detection 
  const shouldShowFallback = imageError || !company.logo || 
    typeof company.logo !== 'string' || 
    company.logo.trim() === '';
  
  return (
    <div className="bg-[#151515] h-[150px] rounded-md border border-gray-800 overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:border-purple-800">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        {/* Status badges with updated styling */}
        {company.markup && (
          <Badge 
            variant="default"
            className="absolute top-2 right-2 z-10 bg-purple-600 hover:bg-purple-700"
          >
            Markup
          </Badge>
        )}
        
        {company.acquired && (
          <Badge 
            variant="secondary"
            className="absolute top-2 right-2 z-10 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Acquired
          </Badge>
        )}

        {/* Card content with updated styling for dark theme */}
        <div className="h-full flex items-center justify-center p-4 bg-gradient-to-b from-[#181818] to-[#111111]">
          {shouldShowFallback ? (
            <div className="text-gray-400 text-sm font-inter">No image</div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-[100px] max-w-[140px] object-contain filter brightness-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );
});