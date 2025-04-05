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
      
      // Apply simple layout fix
      const fixNavbarLayout = () => {
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.classList.add('layout-fixed');
        }
      };
      
      // Apply immediately
      setTimeout(fixNavbarLayout, 0);
      
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
    <nav className="bg-[#12022e] py-3 px-5 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center">
          {/* Left side - Logo/Name */}
          <div className="flex-initial">
            <Link 
              href="/" 
              className="text-white text-2xl md:text-3xl font-bold no-underline tracking-tight"
            >
              Hey - I&apos;m Samir
            </Link>
          </div>
          
          {/* Right side - Navigation links (desktop) */}
          <div className="flex items-center space-x-10">
            <Link 
              href="/profile/" 
              className={`text-white text-sm uppercase ${pathname.startsWith("/profile") ? 'border-b-2 border-white font-medium' : 'font-normal'}`}
            >
              ABOUT
            </Link>
            <Link 
              href="/portfolio/" 
              className={`text-white text-sm uppercase ${pathname.startsWith("/portfolio") ? 'border-b-2 border-white font-medium' : 'font-normal'}`}
            >
              PORTFOLIO
            </Link>
            <Link 
              href="/ventures/" 
              className={`text-white text-sm uppercase ${pathname.startsWith("/ventures") ? 'border-b-2 border-white font-medium' : 'font-normal'}`}
            >
              VENTURES
            </Link>
          </div>
          
          {/* Mobile menu button (not shown in this simplified version) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hidden bg-transparent border-none cursor-pointer p-2 items-center text-white ml-4"
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
      </div>
      
      {/* Mobile menu dropdown (not shown in this simplified version) */}
      {isMenuOpen && (
        <div className="hidden py-4 bg-[#12022e]">
          <div className="container mx-auto">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/profile/" 
                className={`text-white ${pathname.startsWith("/profile") ? 'border-l-2 border-white pl-2 font-medium' : 'font-normal'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </Link>
              <Link 
                href="/portfolio/" 
                className={`text-white ${pathname.startsWith("/portfolio") ? 'border-l-2 border-white pl-2 font-medium' : 'font-normal'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                PORTFOLIO
              </Link>
              <Link 
                href="/ventures/" 
                className={`text-white ${pathname.startsWith("/ventures") ? 'border-l-2 border-white pl-2 font-medium' : 'font-normal'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                VENTURES
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}