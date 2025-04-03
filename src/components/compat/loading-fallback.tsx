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
      className="loading-fallback-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDarkMode ? '#121212' : 'white',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        opacity: 1,
        visibility: 'visible',
        // Hardware acceleration for smoother animation in WebView
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
      }}
    >
      <div 
        className="loading-spinner"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `3px solid ${isDarkMode ? '#27272a' : '#e5e7eb'}`,
          borderTopColor: '#9333ea', // Purple accent color works in both themes
          animation: 'spin 1s linear infinite',
          // Hardware acceleration for smoother animation
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
        }}
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
          opacity: 1 !important;
          visibility: visible !important;
          display: flex !important;
        }
      `}</style>
      <p 
        style={{ 
          marginTop: '16px', 
          color: isDarkMode ? '#e5e7eb' : '#4b5563',
          // Ensure text is visible
          opacity: 1,
          visibility: 'visible',
        }}
      >
        {message}
      </p>
    </div>
  );
}