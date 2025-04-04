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
            setIsDarkMode(htmlElement.classList.contains('dark'));
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
      
      return () => observer.disconnect();
    }
  }, []);
  
  return (
    <nav className={`
      relative py-4 
      bg-gray-100 dark:bg-[#12022e] 
      text-gray-900 dark:text-white 
      border-b border-gray-200 dark:border-purple-950
      transition-colors duration-300 
      ${isDarkMode ? 'dark:shadow-[0_0_15px_rgba(91,33,182,0.7)]' : ''}
      z-50
    `}>
      <div className="nav-container">
        {/* Left side - Logo/Name */}
        <div>
          <Link href="/" className="text-lg font-semibold no-underline text-gray-900 dark:text-white">
            Hey - I&apos;m Samir
          </Link>
        </div>
        
        {/* Right side - Navigation links (desktop) */}
        <div className="desktop-nav flex gap-8">
          <Link 
            href="/profile/" 
            className={`nav-link ${pathname.startsWith("/profile") ? 'active' : ''}`}
          >
            About
            {pathname.startsWith("/profile") && (
              <span className="nav-link-indicator"></span>
            )}
          </Link>
          <Link 
            href="/portfolio/" 
            className={`nav-link ${pathname.startsWith("/portfolio") ? 'active' : ''}`}
          >
            Portfolio
            {pathname.startsWith("/portfolio") && (
              <span className="nav-link-indicator"></span>
            )}
          </Link>
          <Link 
            href="/ventures/" 
            className={`nav-link ${pathname.startsWith("/ventures") ? 'active' : ''}`}
          >
            Ventures
            {pathname.startsWith("/ventures") && (
              <span className="nav-link-indicator"></span>
            )}
          </Link>
        </div>
        
        {/* Mobile menu button - Hidden by default on larger screens */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="mobile-menu-button bg-transparent border-none cursor-pointer p-2 hidden items-center"
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
          bg-white dark:bg-purple-950
          px-0 py-4
          ${isMenuOpen 
            ? 'top-14 opacity-100 visible shadow-md dark:shadow-purple-900/60 border-b border-gray-200 dark:border-purple-900' 
            : '-top-80 opacity-0 invisible'
          }
          z-50 transition-all duration-300 ease-in-out
        `}
      >
        <div className="nav-container py-2 flex flex-col gap-4">
          <Link 
            href="/profile/" 
            className={`mobile-nav-link ${pathname.startsWith("/profile") ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/portfolio/" 
            className={`mobile-nav-link ${pathname.startsWith("/portfolio") ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Portfolio
          </Link>
          <Link 
            href="/ventures/" 
            className={`mobile-nav-link ${pathname.startsWith("/ventures") ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Ventures
          </Link>
        </div>
      </div>
      
      <style jsx global>{`
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