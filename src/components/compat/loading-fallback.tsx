'use client';

import { useEffect, useState } from 'react';

interface LoadingFallbackProps {
  message?: string;
}

/**
 * Loading Fallback Component
 * 
 * Displays a loading indicator with optional message
 * Used as a fallback during page transitions
 * Supports both light and dark modes
 */
export default function LoadingFallback({ message = 'Loading...' }: LoadingFallbackProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode
  useEffect(() => {
    try {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem('theme');
      
      // Check if browser supports matchMedia
      if (window.matchMedia) {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(savedTheme === 'dark' || (!savedTheme && isDark));
      }
      
      // Check if dark mode class is present on html element
      const hasDarkClass = document.documentElement.classList.contains('dark');
      if (hasDarkClass) {
        setIsDarkMode(true);
      }
    } catch (error) {
      // Default to light mode if there's an error
      console.error('Error detecting theme:', error);
    }
  }, []);

  return (
    <div 
      className={`loading-fallback-container fixed inset-0 flex flex-col items-center justify-center font-sans translate-z-0 z-[9999] ${
        isDarkMode ? 'bg-[#121212]' : 'bg-white'
      }`}
    >
      <div 
        className={`loading-spinner w-10 h-10 rounded-full border-3 border-purple-600 border-t-purple-600 animate-spin translate-z-0 ${
          isDarkMode ? 'border-zinc-800' : 'border-gray-200'
        }`}
      />
      <style jsx global>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* Ensure animation plays smoothly */
        .loading-spinner {
          will-change: transform;
        }
        
        /* Ensure loading container is always visible */
        .loading-fallback-container {
          opacity: 1;
          visibility: visible;
          display: flex;
        }
      `}</style>
      <p className={`mt-4 visible opacity-100 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-600'
      }`}>
        {message}
      </p>
    </div>
  );
}