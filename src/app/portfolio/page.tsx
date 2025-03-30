"use client"

import { useState, useEffect, useMemo, memo } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { ErrorBoundary } from '../../components/error-boundary';
import Head from 'next/head';
import Script from 'next/script';

// Cache version
const CACHE_VERSION = 'v6.0.1-' + new Date().getTime();

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
    
    // Force a full page refresh once per session to clear cached styles
    const hasRefreshed = sessionStorage.getItem('portfolioRefreshed');
    if (!hasRefreshed) {
      console.log('First visit - forcing refresh to clear caches - ver:', CACHE_VERSION);
      sessionStorage.setItem('portfolioRefreshed', 'true');
      
      // Set a very short timeout to allow session storage to save
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }
    
    // Aggressive approach to ensure our styling takes precedence
    const applyCustomStyles = () => {
      console.log('Applying custom portfolio styles -', CACHE_VERSION);
      
      // Force stylesheet refresh by adding a dynamic style with cache buster
      const style = document.createElement('style');
      style.textContent = `
        /* Force-refresh cache buster: ${CACHE_VERSION} */
        .portfolio-grid { display: grid !important; }
        .portfolio-motto { display: inline-block !important; }
        .portfolio-grid > div > div > a { display: block !important; }
        .portfolio-grid div[class*="absolute inset-0"] { position: absolute !important; }
        .portfolio-grid .absolute.top-2.right-2 { position: absolute !important; }
      `;
      document.head.appendChild(style);
      
      // Force a redraw of the grid first
      const gridElement = document.querySelector<HTMLElement>('.portfolio-grid');
      if (gridElement) {
        // Apply essential grid styles
        gridElement.classList.add('grid-loaded');
        
        // Set a specific data attribute to track version
        gridElement.setAttribute('data-version', CACHE_VERSION);
        
        // Apply styles to company cards
        const cards = document.querySelectorAll<HTMLElement>('.portfolio-grid > div > div');
        cards.forEach(card => {
          // Force the card to reset its styles with proper typing
          card.style.opacity = '0.99';
          setTimeout(() => card.style.opacity = '1', 10);
          
          // Add custom classes
          card.classList.add('custom-card');
          
          // Ensure hover overlay has correct styles
          const overlay = card.querySelector('div[class*="absolute inset-0"]');
          if (overlay) overlay.classList.add('custom-overlay');
          
          // Find badges and ensure they're visible
          const badge = card.querySelector('.absolute.top-2.right-2');
          if (badge) badge.classList.add('portfolio-badge');
        });
      }
    };
    
    // Apply styles multiple times to ensure they stick
    const timer1 = setTimeout(applyCustomStyles, 100);
    const timer2 = setTimeout(applyCustomStyles, 500);
    const timer3 = setTimeout(applyCustomStyles, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  const isDark = mounted && resolvedTheme === 'dark';
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);
  
  return (
    <>
      {/* Add reset script to ensure grid renders properly with version parameter to force reload */}
      <Script src={`/reset-portfolio.js?v=${new Date().getTime()}`} strategy="afterInteractive" />
      
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
          
          {/* Stats Section - Forced 2 rows of 4 columns layout */}
          <div className="stats-row-1 grid grid-cols-4 gap-x-4 gap-y-6 mb-6">
            <div className="stats-item">
              <div className="text-gray-400 text-sm"># Investments</div>
              <div className="text-white text-xl font-bold">32</div>
            </div>
            <div className="stats-item">
              <div className="text-gray-400 text-sm"># Markups</div>
              <div className="text-white text-xl font-bold">13</div>
            </div>
            <div className="stats-item">
              <div className="text-gray-400 text-sm"># Acquisitions</div>
              <div className="text-white text-xl font-bold">2</div>
            </div>
            <div className="stats-item">
              <div className="text-gray-400 text-sm"># Busts</div>
              <div className="text-white text-xl font-bold">4</div>
            </div>
          </div>
          
          <div className="stats-row-2 grid grid-cols-4 gap-x-4 gap-y-6 mb-10">
            <div className="stats-item">
              <div className="text-gray-400 text-sm">TVPI</div>
              <div className="text-white text-xl font-bold">1.44x</div>
            </div>
            <div className="stats-item">
              <div className="text-gray-400 text-sm">Gross Multiple</div>
              <div className="text-white text-xl font-bold">1.22x</div>
            </div>
            <div className="stats-item">
              <div className="text-gray-400 text-sm">Net Multiple</div>
              <div className="text-white text-xl font-bold">1.12x</div>
            </div>
            <div className="stats-item">
              <div className="text-gray-400 text-sm">IRR</div>
              <div className="text-white text-xl font-bold">10%</div>
            </div>
          </div>
          
          {/* Add more spacing after stats section */}
          <div className="h-10"></div>
          
          {/* Category Filters - Purple All button with gray category buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 text-sm font-medium ${
                  selectedCategory === category 
                    ? 'bg-purple-700 text-white' 
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
                style={{
                  backgroundColor: selectedCategory === category ? '#7e22ce' : '#1f2937',
                  minWidth: '70px',
                  outline: 'none',
                  border: 'none'
                }}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Portfolio grid with exactly 2 cards per row and minimal spacing */}
          <div 
            className="portfolio-grid grid mb-12"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', /* Exactly 2 cards per row */
              gridAutoRows: '150px', /* Matching our card height */
              gap: '1.5rem', /* Increased spacing between cards */
              width: '90%', /* Width that ensures cards aren't too wide */
              maxWidth: '800px', /* Max width to control card size */
              margin: '0 auto',
              padding: '0'
            }}
          >
            {filteredCompanies.map(company => (
                <div key={company.name} className="transition-opacity duration-200">
                  <CompanyCard 
                    company={company}
                    isDark={isDark}
                  />
                </div>
            ))}
          </div>
          
          {/* No Back to Profile button here as requested */}
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

// Ultra-simplified company card component that exactly matches the reference image
// Featuring only a centered logo and "Markup" badge when applicable
const CompanyCard = memo(function CompanyCard({ company, isDark }: { company: any, isDark: boolean }) {
  const [imageError, setImageError] = useState(false);
  
  // Basic fallback detection 
  const shouldShowFallback = imageError || !company.logo || 
    typeof company.logo !== 'string' || 
    company.logo.trim() === '';
  
  return (
    <div className="h-[150px] rounded-xl bg-white shadow-sm overflow-hidden transition-all duration-300">
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        {/* Purple Markup badge - positioned in top right, exact match to reference image */}
        {company.markup && (
          <div 
            data-status="Markup"
            className="badge-markup absolute top-2 right-2 z-20 text-white font-medium"
            style={{ 
              backgroundColor: '#7e22ce', 
              fontSize: '0.7rem',
              lineHeight: '1.4',
              padding: '0.15rem 0.5rem', 
              borderRadius: '0.25rem'
            }}
          >
            Markup
          </div>
        )}
        {/* Acquired badges are gray in the same position */}
        {company.acquired && (
          <div 
            data-status="Acquired"
            className="badge-acquired absolute top-2 right-2 z-20 text-white font-medium"
            style={{ 
              backgroundColor: '#6b7280', 
              fontSize: '0.7rem',
              lineHeight: '1.4',
              padding: '0.15rem 0.5rem',
              borderRadius: '0.25rem'
            }}
          >
            Acquired
          </div>
        )}

        {/* Card content - only contains a centered logo with minimal styling */}
        <div className="h-full flex items-center justify-center">
          {shouldShowFallback ? (
            // No visible fallback content to match reference image
            <div></div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <ErrorBoundary name={`CompanyImage-${company.name}`} fallback={<div></div>}>
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-[70px] max-w-[120px] object-contain"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </a>
    </div>
  );
});