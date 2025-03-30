"use client"

import { useState, useEffect } from 'react';
import { companies, categories } from '../../components/data/portfolio';
import { useTheme } from 'next-themes';
import { ErrorBoundary } from '../../components/error-boundary';
import Head from 'next/head';
import Script from 'next/script';

// Cache version
const CACHE_VERSION = 'v4.8.0-' + new Date().getTime();

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
      
      <div className="bg-gray-900 min-h-screen p-4 pt-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Portfolio
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-300 mb-3">
              I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
            </p>
            {/* Motto removed as requested */}
          </div>
          
          {/* Stats Section - Improved table styling */}
          <div className="w-full mb-12 bg-black p-6 sm:p-8 rounded-lg shadow-lg border border-gray-800">
            {/* Enhanced table layout with better styling */}
            <table className="w-full border-separate border-spacing-2 rounded-lg overflow-hidden">
              <tbody className="divide-y divide-gray-800">
                {/* Row 1 - First 4 stats */}
                <tr className="bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="# Investments" value="32" /></td>
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="# Markups" value="13" /></td>
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="# Acquisitions" value="2" /></td>
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="# Busts" value="4" /></td>
                </tr>
                
                {/* Visual separator row */}
                <tr>
                  <td colSpan={4} className="py-2">
                    <div className="border-t border-gray-800 opacity-50"></div>
                  </td>
                </tr>
                
                {/* Row 2 - Second 4 stats */}
                <tr className="bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="TVPI" value="1.44x" /></td>
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="Gross Multiple" value="1.22x" /></td>
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="Net Multiple" value="1.12x" /></td>
                  <td width="25%" className="p-2 border border-gray-800 rounded-lg"><StatItem label="IRR" value="10%" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {/* Category Filters with enhanced purple highlighting when selected */}
          <div className="flex flex-wrap gap-6 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-700 text-white shadow-md shadow-purple-900/30 border border-purple-500 transform scale-105'
                    : 'border border-gray-700 text-gray-300 hover:border-purple-400 hover:text-purple-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Portfolio grid with added CSS class and consistent gap spacing */}
          <div 
            className="portfolio-grid grid mb-12"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gridAutoRows: '130px',
              gap: '1.25rem', /* Consistent spacing for both row and column gaps */
              width: '94%', /* Slightly increased width for better layout */
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '0.5rem'
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

// Enhanced Company card component with white background, hover effects, and animations
function CompanyCard({ company, isDark }: { company: any, isDark: boolean }) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // No longer treating these logos as problematic since we've fixed the paths
  const shouldShowFallback = imageError || !company.logo;

  return (
    <div 
      className="h-[130px] rounded-xl bg-white shadow-md overflow-hidden border border-gray-100 relative transition-all duration-300 transform hover:-translate-y-1 hover:animate-card-hover hover:shadow-lg hover:shadow-gray-400/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={company.website || `https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full px-4 py-4 relative hover:bg-gray-50 transition-colors duration-200"
      >
        {/* Status badge - enhanced with shadow and proper visibility */}
        {(company.markup || company.acquired) && (
          <div className="absolute top-2 right-2 z-20 text-xs px-2.5 py-0.5 rounded-md text-white bg-gray-800 font-semibold shadow-md shadow-gray-900/30 animate-fade-in">
            {company.acquired ? 'Acquired' : 'Markup'}
          </div>
        )}

        {/* Card content */}
        <div className="h-full flex flex-col items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            {shouldShowFallback ? (
              // Text fallback
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                <p className="text-sm mt-1 text-gray-500">{company.category}</p>
              </div>
            ) : (
              // Enhanced image display with proper white background and better sizing
              <div className="h-[70px] w-full max-w-[140px] relative mx-auto bg-white p-2 rounded-md shadow-sm flex items-center justify-center">
                <ErrorBoundary name={`CompanyImage-${company.name}`} fallback={
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900">{company.name}</h3>
                    <p className="text-sm mt-1 text-gray-500">{company.category}</p>
                  </div>
                }>
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-contain object-center max-h-[60px] transition-transform duration-300"
                    onError={() => setImageError(true)}
                    loading="lazy"
                    style={{ 
                      maxWidth: '90%', 
                      display: 'block',
                      margin: '0 auto',
                      filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.05))'
                    }}
                  />
                </ErrorBoundary>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced hover overlay with improved gradient, link styling, and animations */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-gray-900/95 to-gray-800/90 p-4 flex flex-col justify-end text-white transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backdropFilter: isHovered ? 'blur(3px)' : 'none',
            transform: `translateY(${isHovered ? '0' : '10px'})`,
            opacity: isHovered ? 1 : 0,
            boxShadow: isHovered ? 'inset 0 0 15px rgba(107, 114, 128, 0.3)' : 'none',
          }}
        >
          <div 
            className="transform transition-all duration-300 animate-fade-in" 
            style={{ 
              transitionDelay: isHovered ? '50ms' : '0ms',
              transform: isHovered ? 'translateY(0)' : 'translateY(5px)',
              opacity: isHovered ? 1 : 0
            }}
          >
            {/* Improved hover content with company name as button-like element */}
            <div className="px-2 py-1 bg-gray-700/70 rounded mb-2 inline-block">
              <h3 className="text-base font-semibold text-white">{company.name}</h3>
            </div>
            
            <p className="text-xs leading-relaxed text-gray-100 line-clamp-2 mb-2" 
               style={{ 
                 textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                 opacity: isHovered ? 0.95 : 0
               }}
            >
              {company.description}
            </p>
            
            {/* Visit link styled as a button */}
            <div className="mt-1 text-xs">
              <span className="bg-gray-600/70 hover:bg-gray-500/80 px-3 py-1 rounded-full transition-colors">
                Visit {company.name} →
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}