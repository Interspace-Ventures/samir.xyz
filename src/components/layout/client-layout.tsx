"use client";

import React, { useEffect, useState } from "react";
import Footer from "./footer";
import ErrorBoundary from "../error-boundary";
import PageTransition from "../compat/page-transition";
import dynamic from "next/dynamic";
import { applyAllRenderingOptimizations } from "../../utils/page-render-optimizer";

// Import navbar with no SSR to avoid hydration issues
const SimplestNavbar = dynamic(() => import("./SimplestNavbar"), { ssr: false });

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
        className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-800 dark:hover:bg-purple-700 text-white py-2 px-6 rounded-md font-inter font-sans"
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
 * Always renders children to avoid hydration mismatches
 */
export default function ClientLayout({
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
  
  // Apply rendering optimizations and theme detection
  useEffect(() => {
    try {
      // Apply all rendering optimizations for smoother loading
      applyAllRenderingOptimizations();
      
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
    } catch (error) {
      console.error('Error setting up theme detection:', error);
    }
  }, []);
  
  // Unified mounting and content readiness approach
  useEffect(() => {
    // Mark as mounted immediately
    setMounted(true);
    
    // Use requestAnimationFrame to wait for painting to complete
    requestAnimationFrame(() => {
      // Allow time for the DOM to be fully painted
      setTimeout(() => {
        setContentReady(true);
        console.log('Content ready and fully rendered');
        
        // Add a class to the html element to show we're fully loaded
        document.documentElement.classList.add('content-ready');
        
        // Tell the browser we're idle - good time to preload other resources
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => {
            console.log('Page idle - all content rendered');
          });
        }
      }, 50); // Short delay to ensure rendering is complete
    });
  }, []);
  
  // Debug log to verify we're attempting to render the navbar
  console.log("ClientLayout is rendering and will include SimplestNavbar");
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      {/* Add the PageTransition component to manage smooth transitions */}
      <PageTransition timeout={80} />
      
      {/* Always render the layout to avoid hydration mismatches */}
      <div 
        className={`flex flex-col min-h-screen font-inter font-sans ${contentReady ? 'content-visible' : 'content-loading'}`}
        style={{ 
          margin: 0, 
          padding: 0, 
          width: '100vw', 
          maxWidth: '100vw', 
          overflowX: 'hidden', 
          boxSizing: 'border-box' 
        }}
      >
        {/* Explicit debug comment to verify in source */}
        {/* NAVBAR SHOULD APPEAR HERE */}
        <SimplestNavbar />
        {/* No need for a spacer div - we'll handle content positioning differently */}
        <main 
          className="flex-grow"
          style={{ 
            width: '100vw', 
            maxWidth: '100vw', 
            overflowX: 'hidden', 
            boxSizing: 'border-box',
            margin: '80px 0 0 0', /* This pushes content down exactly the height of navbar */
            padding: 0
          }}
        >
          <div 
            className="max-w-[1200px] mx-auto w-full"
            style={{ 
              boxSizing: 'border-box',
              margin: '0 auto', 
              padding: '0 48px', /* More generous side padding */
              marginTop: 0
            }}
          >
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
        <Footer />
      </div>
      
      {/* Simplified loading indicator that shows until content is fully ready */}
      {!contentReady && (
        <div id="page-loading-indicator" className="fixed inset-0 z-[9999] bg-opacity-75 flex items-center justify-center">
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // This script ensures the loading indicator is visible before React hydrates
                document.getElementById('page-loading-indicator').style.backgroundColor = 
                  document.documentElement.classList.contains('dark') 
                    ? 'rgba(18, 2, 46, 0.75)' 
                    : 'rgba(255, 255, 255, 0.75)';
              `
            }}
          />
          <LoadingFallback message="Loading content..." />
        </div>
      )}
    </ErrorBoundary>
  );
}