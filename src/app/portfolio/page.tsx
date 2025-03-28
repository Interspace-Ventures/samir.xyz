"use client"

import { useState, useEffect } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { ErrorBoundary } from '../../components/error-boundary';
import Head from 'next/head';
import Script from 'next/script';

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
    
    // Force a redraw of the grid after component mounts
    const timer = setTimeout(() => {
      const gridElement = document.querySelector('.portfolio-grid');
      if (gridElement) {
        // Apply a style change to force a reflow
        gridElement.classList.add('grid-loaded');
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const isDark = mounted && resolvedTheme === 'dark';
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  return (
    <>
      {/* Add reset script to ensure grid renders properly */}
      <Script src="/reset-portfolio.js" strategy="afterInteractive" />
      
      <div className="bg-gray-900 min-h-screen p-4 pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              My Investment Portfolio
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300">
              I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
            </p>
          </div>
          
          {/* Stats Section - Manually coded as a table for maximum layout control */}
          <div className="w-full mb-12 bg-black p-6 sm:p-8 rounded-lg shadow-lg border border-gray-800">
            {/* Hardcoded table layout for consistent display across all viewports */}
            <table className="w-full border-separate border-spacing-2">
              <tbody>
                {/* Row 1 - First 4 stats */}
                <tr>
                  <td width="25%"><StatItem label="# Investments" value="32" /></td>
                  <td width="25%"><StatItem label="# Markups" value="13" /></td>
                  <td width="25%"><StatItem label="# Acquisitions" value="2" /></td>
                  <td width="25%"><StatItem label="# Busts" value="4" /></td>
                </tr>
                
                {/* Visual separator row */}
                <tr>
                  <td colSpan={4} className="py-2">
                    <div className="border-t border-gray-800 opacity-50"></div>
                  </td>
                </tr>
                
                {/* Row 2 - Second 4 stats */}
                <tr>
                  <td width="25%"><StatItem label="TVPI" value="1.44x" /></td>
                  <td width="25%"><StatItem label="Gross Multiple" value="1.22x" /></td>
                  <td width="25%"><StatItem label="Net Multiple" value="1.12x" /></td>
                  <td width="25%"><StatItem label="IRR" value="10%" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Category Filters with improved spacing and white text on purple */}
          <div className="flex flex-wrap gap-6 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'border border-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Portfolio grid with added CSS class and inline styles for targeting */}
          <div 
            className="portfolio-grid grid mb-12"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gridAutoRows: '130px',
              gap: '1rem',
              width: '100%',
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
            {companies.map(company => {
              const isVisible = selectedCategory === 'All' || company.category === selectedCategory;
              return (
                <div 
                  key={company.name}
                  className={`transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}
                >
                  <CompanyCard 
                    company={company}
                    isDark={isDark}
                  />
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/profile" 
              className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-medium 
                       hover:bg-purple-500 transition-all duration-200"
            >
              Back to Profile
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// Enhanced stat item component specifically sized for the table layout
function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center">
      <div className="text-gray-400 text-xs font-medium tracking-wide uppercase mb-1">{label}</div>
      <div className="text-white text-lg sm:text-xl md:text-2xl font-bold">{value}</div>
    </div>
  );
}

// Company card component with white background in both modes
function CompanyCard({ company, isDark }: { company: any, isDark: boolean }) {
  const [imageError, setImageError] = useState(false);
  
  // Check if this is a company with known problematic logos
  const problemLogos = ['The Food Company', 'Swansea City AFC', 'The Coffee', 'Predictive.film', 'Interspace', 'Solo', 'Aon3D', 'Hey I\'m Samir'];
  const hasProblemLogo = problemLogos.includes(company.name);
  
  // Use text fallback for problematic logos or if logo path is missing
  const shouldShowFallback = imageError || hasProblemLogo || !company.logo;

  return (
    <div className="h-[130px] rounded-xl bg-white shadow-md overflow-hidden border border-gray-100">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full p-3 relative hover:bg-gray-50 transition-colors duration-200"
      >
        {/* Status badge - pure purple with white text */}
        {(company.markup || company.acquired) && (
          <div className="absolute top-2 right-2 z-10 text-xs px-2 py-0.5 rounded text-white bg-purple-700 font-bold">
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            {shouldShowFallback ? (
              // Text fallback
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                <p className="text-sm mt-1 text-gray-500">{company.category}</p>
              </div>
            ) : (
              // Image display with direct path reference and controlled sizing
              <div className="h-[45px] w-full max-w-[120px] relative mx-auto bg-white p-1 rounded">
                <ErrorBoundary name={`CompanyImage-${company.name}`} fallback={
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                    <p className="text-sm mt-1 text-gray-500">{company.category}</p>
                  </div>
                }>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain object-center max-h-[40px]"
                    onError={() => setImageError(true)}
                    loading="lazy"
                    style={{ maxWidth: '100%', display: 'block' }}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}