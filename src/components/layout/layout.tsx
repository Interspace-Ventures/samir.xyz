"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "./footer";
import ErrorBoundary from "../error-boundary";
import PageTransition from "../compat/page-transition";

// Import navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import("./navbar"), { ssr: false });

// Import the loading fallback component with ssr: false to ensure it only runs on client
const LoadingFallback = dynamic(
  () => import("../compat/loading-fallback"),
  { ssr: false }
);

/**
 * Custom fallback UI for the ErrorBoundary component
 */
function ErrorFallback() {
  return (
    <div className="p-8 text-center">
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
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md"
      >
        Refresh page
      </button>
    </div>
  );
}

/**
 * Unified layout component for the application
 * Handles both client-side and content layout concerns
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  
  // Handle errors in ErrorBoundary
  const handleError = (error: Error) => {
    // Log errors to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Layout Error:', error);
    }
  };
  
  // Setup theme detection and content readiness
  useEffect(() => {
    // Mark as mounted immediately
    setMounted(true);
    
    // Apply theme based on system preference
    try {
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
    } catch (error) {
      console.error('Error setting up theme detection:', error);
    }
    
    // Use requestAnimationFrame to wait for painting to complete
    requestAnimationFrame(() => {
      // Allow time for the DOM to be fully painted
      setTimeout(() => {
        setContentReady(true);
        document.documentElement.classList.add('content-ready');
      }, 50);
    });
  }, []);
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      {/* Add the PageTransition component to manage smooth transitions */}
      <PageTransition timeout={80} />
      
      {/* Main layout structure */}
      <div 
        className={`flex flex-col min-h-screen m-0 p-0 w-screen max-w-screen overflow-x-hidden ${
          contentReady ? 'content-visible' : 'content-loading'
        }`}
      >
        <Navbar />
        
        {/* Spacer div to account for fixed header height */}
        <div className="h-16 w-full"></div>
        
        {/* Main content area */}
        <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden p-0">
          <div className="max-w-[1200px] mx-auto w-full px-6 md:px-12">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
        
        <Footer />
      </div>
      
      {/* Simplified loading indicator that shows until content is fully ready */}
      {!contentReady && (
        <div className="fixed inset-0 z-[9999] bg-white bg-opacity-75 flex items-center justify-center">
          <LoadingFallback message="Loading content..." />
        </div>
      )}
    </ErrorBoundary>
  );
}