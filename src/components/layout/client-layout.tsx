"use client";

import React, { useEffect } from "react";
import UltraSimpleNavbar from "./ultra-simple-navbar";
import Footer from "./footer";
import ErrorBoundary from "../error-boundary";

/**
 * Custom fallback UI for the ErrorBoundary component
 */
function ErrorFallback() {
  return (
    <div className="error-fallback p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">We're experiencing some issues</h2>
      <p className="mb-6">
        Our team has been notified and is working to fix this issue.
        Please try refreshing the page.
      </p>
      <button
        onClick={() => {
          // Force a hard refresh to clear any cached errors
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
      >
        Refresh page
      </button>
    </div>
  );
}

/**
 * Client component wrapper for the app layout
 * Contains all interactive elements that need to be client components
 * Uses a simple, direct approach to theme handling for better compatibility
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // Handle errors in ErrorBoundary
  const handleError = (error: Error) => {
    // Log errors to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Layout Error:', error);
    }
  };
  
  // Clean theme detection
  useEffect(() => {
    // Theme detection is now handled by the WebView compatibility module
    // This keeps the client layout component clean and focused
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };
    
    // Add listener for theme changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      <div className="flex flex-col min-h-screen">
        <UltraSimpleNavbar />
        <main className="flex-grow px-4 sm:px-6 py-10 mt-2"> {/* Increased top padding to prevent navbar overlap */}
          <div className="max-w-screen-xl mx-auto w-full">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}