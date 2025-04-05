"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function UltraSimpleNavbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Check for system dark mode preference and localStorage theme setting
  useEffect(() => {
    // Check if document is available (client-side only)
    if (typeof window !== 'undefined') {
      // Check localStorage for theme setting
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Check system preference if no saved theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
      
      // Set up listener for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
          ) {
            const htmlElement = document.documentElement;
            const newIsDarkMode = htmlElement.classList.contains('dark');
            setIsDarkMode(newIsDarkMode);
            
            // Reapply wordmark styling whenever theme changes
            setTimeout(() => {
              const brandWordmark = document.querySelector('.brand-wordmark') as HTMLElement | null;
              if (brandWordmark) {
                brandWordmark.style.color = newIsDarkMode ? '#ffffff' : '#111827';
              }
            }, 50);
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      
      // Ensure wordmark styling is applied directly
      const applyWordmarkStyling = () => {
        // Direct DOM manipulation to force the wordmark styling
        const brandWordmark = document.querySelector('.brand-wordmark') as HTMLElement | null;
        const brandWordmarkText = document.querySelector('.brand-wordmark-text') as HTMLElement | null;
        
        if (brandWordmark) {
          brandWordmark.style.color = isDarkMode ? '#ffffff' : '#111827';
          brandWordmark.style.textDecoration = 'none';
        }
        
        if (brandWordmarkText) {
          brandWordmarkText.style.color = 'inherit';
        }
      };
      
      // Apply immediately and whenever dark mode changes
      applyWordmarkStyling();
      
      return () => observer.disconnect();
    }
  }, [isDarkMode]);
  
  return (
    <nav className={`
      relative py-4 px-8
      bg-[#12022e] 
      text-white 
      transition-colors duration-300
      z-50
    `}>
      <div className="flex flex-row items-center w-full">
        {/* Left side - Logo/Name */}
        <div className="flex-1 flex items-center">
          <Link 
            href="/" 
            className="text-white text-3xl font-bold no-underline tracking-tight brand-wordmark"
          >
            Hey - I&apos;m Samir
          </Link>
        </div>
        
        {/* Right side - Navigation links (desktop) */}
        <div className="desktop-nav flex items-center justify-end flex-1" style={{ gap: '2.5rem' }}>
          <Link 
            href="/profile/" 
            className={`nav-link ${pathname.startsWith("/profile") ? 'active' : ''}`}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/" 
            className={`nav-link ${pathname.startsWith("/portfolio") ? 'active' : ''}`}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/" 
            className={`nav-link ${pathname.startsWith("/ventures") ? 'active' : ''}`}
          >
            VENTURES
          </Link>
        </div>
        
        {/* Mobile menu button - Hidden by default on larger screens */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button bg-transparent border-none cursor-pointer p-2 hidden items-center text-white ml-4"
          aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
        >
          <span className="sr-only">
            {isMenuOpen ? "Close main menu" : "Open main menu"}
          </span>
          <div className="flex flex-col items-end">
            <div className={`hamburger-line top ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line middle ${isMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line bottom ${isMenuOpen ? 'open' : ''}`}></div>
          </div>
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      <div
        className={`
          mobile-menu absolute w-full left-0 
          bg-[#12022e]
          px-0 py-4
          ${isMenuOpen 
            ? 'top-16 opacity-100 visible' 
            : '-top-80 opacity-0 invisible'
          }
          z-50 transition-all duration-300 ease-in-out
        `}
      >
        <div className="py-2 flex flex-col gap-6 px-8">
          <Link 
            href="/profile/" 
            className={`mobile-nav-link ${pathname.startsWith("/profile") ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/" 
            className={`mobile-nav-link ${pathname.startsWith("/portfolio") ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/" 
            className={`mobile-nav-link ${pathname.startsWith("/ventures") ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            VENTURES
          </Link>
        </div>
      </div>
      
      <style jsx global>{`
        /* Hamburger menu styling */
        .hamburger-line {
          height: 2px;
          width: 1.25rem;
          background-color: white;
          margin-bottom: 0.25rem;
          transition: all 0.3s;
        }
        
        .hamburger-line.middle.open {
          opacity: 0;
        }
        
        .hamburger-line.top.open {
          transform: translateY(0.375rem) rotate(45deg);
        }
        
        .hamburger-line.bottom.open {
          transform: translateY(-0.375rem) rotate(-45deg);
        }
        
        /* Brand wordmark styling */
        .brand-wordmark {
          color: white !important;
          font-weight: 700 !important;
          font-size: 1.75rem !important;
          line-height: 1.2 !important;
        }
        
        /* Nav link styling */
        .nav-link {
          position: relative;
          padding-bottom: 0.25rem;
          font-weight: 400;
          font-size: 0.85rem;
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .nav-link:hover {
          opacity: 0.8;
        }
        
        .nav-link.active {
          font-weight: 500;
          color: white;
          border-bottom: 2px solid white;
        }
        
        /* Mobile nav link styling */
        .mobile-nav-link {
          padding: 0.5rem 0;
          font-weight: 500;
          color: white;
          text-decoration: none;
          text-transform: uppercase;
        }
        
        .mobile-nav-link:hover {
          opacity: 0.8;
        }
        
        .mobile-nav-link.active {
          font-weight: 600;
          color: white;
          padding-left: 0.5rem;
          border-left: 2px solid white;
        }
        
        /* Only hide desktop menu and show mobile menu at very small screens where menu items would crowd */
        @media (max-width: 420px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-button {
            display: flex;
          }
        }
        
        /* Show desktop menu for all other sizes */
        @media (min-width: 421px) {
          .desktop-nav {
            display: flex;
          }
          .mobile-menu-button {
            display: none;
          }
          .mobile-menu {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}