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
    <div className="bg-black min-h-screen p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Portfolio
          </h1>
          <p className="text-lg max-w-3xl text-gray-300 mb-6">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>
        
        {/* Stats Section - First Row (Properly formatted 4-column layout with pure Tailwind) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-2 w-full max-w-[800px]">
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis"># Investments</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">32</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis"># Markups</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">13</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis"># Acquisitions</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">2</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis"># Busts</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">4</div>
          </div>
        </div>
        
        {/* Stats Section - Second Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 w-full max-w-[800px]">
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">TVPI</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">1.44x</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Gross Multiple</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">1.22x</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">Net Multiple</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">1.12x</div>
          </div>
          <div className="bg-transparent">
            <div className="text-gray-400 text-sm whitespace-nowrap overflow-hidden text-ellipsis">IRR</div>
            <div className="text-white text-xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">10%</div>
          </div>
        </div>
        
        {/* Add spacing after stats section */}
        <div className="h-10"></div>
        
        {/* Category Filters using shadcn/ui Button components */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              className="min-w-[70px]"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* White background container for portfolio cards - using only Tailwind classes */}
        <div id="white-container" className="bg-white p-6 rounded-xl w-[95%] max-w-[800px] mx-auto mb-12">
          {/* Portfolio grid with enhanced Tailwind styling and shadcn components - added portfolio-grid class */}
          <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-[0.375rem]">
            {filteredCompanies.map(company => (
              <div key={company.name} className="transition-opacity duration-100">
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

// Pure Tailwind company card component with shadcn components
const CompanyCard = memo(function CompanyCard({ company, isDark }: { company: any, isDark: boolean }) {
  const [imageError, setImageError] = useState(false);
  
  // Basic fallback detection 
  const shouldShowFallback = imageError || !company.logo || 
    typeof company.logo !== 'string' || 
    company.logo.trim() === '';
  
  return (
    <Card className="h-[150px]">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        {/* Status badges using shadcn Badge component */}
        {company.markup && (
          <Badge 
            variant="default"
            className="absolute top-2 right-2 z-10"
          >
            Markup
          </Badge>
        )}
        
        {company.acquired && (
          <Badge 
            variant="secondary"
            className="absolute top-2 right-2 z-10"
          >
            Acquired
          </Badge>
        )}

        {/* Card content with Tailwind-only classes */}
        <div className="h-full flex items-center justify-center p-4">
          {shouldShowFallback ? (
            <div className="text-gray-400 text-sm">No image</div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={company.logo}
                alt={company.name}
                className="max-h-[100px] max-w-[140px] object-contain"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </a>
    </Card>
  );
});