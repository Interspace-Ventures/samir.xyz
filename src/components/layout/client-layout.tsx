"use client";

import React, { useEffect, useState } from "react";
import UltraSimpleNavbar from "./ultra-simple-navbar";
import Footer from "./footer";
import ErrorBoundary from "../error-boundary";
import dynamic from "next/dynamic";

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
 * Always renders children to avoid hydration mismatches
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  // Handle errors in ErrorBoundary
  const handleError = (error: Error) => {
    // Log errors to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Layout Error:', error);
    }
  };
  
  // Clean theme detection
  useEffect(() => {
    try {
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
    } catch (error) {
      console.error('Error setting up theme detection:', error);
    }
  }, []);
  
  // Track component mount state
  useEffect(() => {
    setMounted(true);
    console.log('ClientLayout mounted and visible');
  }, []);
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      {/* Always render the layout to avoid hydration mismatches */}
      <div className="flex flex-col min-h-screen">
        <UltraSimpleNavbar />
        <main className="flex-grow px-4 sm:px-6 py-10 mt-2">
          <div className="max-w-screen-xl mx-auto w-full">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
        <Footer />
      </div>
      
      {/* Show loading overlay until mounted, but only on client */}
      {!mounted && (
        <div id="loading-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9998,
          display: 'none'
        }}>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                document.getElementById('loading-overlay').style.display = 'block';
              `
            }}
          />
          <LoadingFallback />
        </div>
      )}
    </ErrorBoundary>
  );
}