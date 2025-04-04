"use client"

import { useState, memo } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import './page.css';

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  const isDark = resolvedTheme === 'dark';
  
  return (
    <div className="portfolio-container">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <h1 className="portfolio-title">
            Portfolio
          </h1>
          <p className="portfolio-subtitle">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>
        
        {/* Stats Section */}
        <div className="stats-section">
          <div className="section-header">
            <h2 className="section-title">Portfolio Performance</h2>
          </div>
          
          {/* First row - Count metrics */}
          <div className="stats-grid mb-8">
            <div>
              <div className="stat-label"># Investments</div>
              <div className="stat-value">32</div>
            </div>
            <div>
              <div className="stat-label"># Markups</div>
              <div className="stat-value">13</div>
            </div>
            <div>
              <div className="stat-label"># Acquisitions</div>
              <div className="stat-value">2</div>
            </div>
            <div>
              <div className="stat-label"># Busts</div>
              <div className="stat-value">4</div>
            </div>
          </div>
          
          {/* Second row - Performance metrics */}
          <div className="stats-grid">
            <div>
              <div className="stat-label">TVPI</div>
              <div className="stat-value">1.44x</div>
            </div>
            <div>
              <div className="stat-label">Gross Multiple</div>
              <div className="stat-value">1.22x</div>
            </div>
            <div>
              <div className="stat-label">Net Multiple</div>
              <div className="stat-value">1.12x</div>
            </div>
            <div>
              <div className="stat-label">IRR</div>
              <div className="stat-value">10%</div>
            </div>
          </div>
        </div>
        
        {/* Category Filters */}
        <div className="mb-8">
          <div className="filter-section">
            <div className="filter-header">
              <h3 className="filter-title">Filter by Category</h3>
            </div>
            <div className="filter-button-container">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category 
                      ? 'filter-button filter-button-active' 
                      : 'filter-button filter-button-inactive'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Portfolio cards container */}
        <div className="portfolio-cards-container">
          <div className="section-header">
            <h2 className="section-title">Portfolio Companies</h2>
          </div>
          
          {/* Portfolio grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

// Company card component
const CompanyCard = memo(function CompanyCard({ company, isDark }: { company: any, isDark: boolean }) {
  const [imageError, setImageError] = useState(false);
  
  // Basic fallback detection 
  const shouldShowFallback = imageError || !company.logo || 
    typeof company.logo !== 'string' || 
    company.logo.trim() === '';
  
  return (
    <div className="company-card">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        {/* Status badges */}
        {company.markup && (
          <Badge 
            variant="default"
            className="badge markup-badge"
          >
            Markup
          </Badge>
        )}
        
        {company.acquired && (
          <Badge 
            variant="secondary"
            className="badge acquired-badge"
          >
            Acquired
          </Badge>
        )}

        {/* Card content */}
        <div className="card-content">
          {shouldShowFallback ? (
            <div className="fallback-text">No image</div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={company.logo}
                alt={company.name}
                className="card-image"
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