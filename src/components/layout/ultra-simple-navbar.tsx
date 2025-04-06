"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function UltraSimpleNavbar() {
  const pathname = usePathname();
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
      
      // Apply direct styles to ensure text is white
      const applyNavbarStyles = () => {
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
          if (link instanceof HTMLElement) {
            link.style.color = 'white';
          }
        });
      };
      
      // Apply immediately and after a short delay to ensure it works
      setTimeout(applyNavbarStyles, 0);
      setTimeout(applyNavbarStyles, 100);
      
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
            
            // Reapply styles after theme change
            setTimeout(applyNavbarStyles, 0);
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
    <nav className="bg-[#12022e] py-3 px-5 md:px-8 navbar-white-text">
      <div className="flex flex-row items-center justify-between max-w-6xl mx-auto">
        {/* Navigation links - centered */}
        <div className="flex items-center mx-auto" style={{ gap: '0.125rem' }}>
          <Link 
            href="/profile/" 
            className={`nav-item text-sm uppercase ${pathname.startsWith("/profile") ? 'border-b-2 border-white font-medium' : 'font-normal'}`}
            style={{ color: 'white !important', marginRight: '0.125rem' }}
          >
            ABOUT
          </Link>
          <Link 
            href="/portfolio/" 
            className={`nav-item text-sm uppercase ${pathname.startsWith("/portfolio") ? 'border-b-2 border-white font-medium' : 'font-normal'}`}
            style={{ color: 'white !important', marginRight: '0.125rem' }}
          >
            PORTFOLIO
          </Link>
          <Link 
            href="/ventures/" 
            className={`nav-item text-sm uppercase ${pathname.startsWith("/ventures") ? 'border-b-2 border-white font-medium' : 'font-normal'}`}
            style={{ color: 'white !important' }}
          >
            VENTURES
          </Link>
        </div>
      </div>
    </nav>
  );
}