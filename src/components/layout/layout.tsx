"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Footer from "./footer";
import ErrorBoundary from "../error-boundary";

// Import navbar with no SSR to avoid hydration issues
const Navbar = dynamic(() => import("./navbar"), { ssr: false });

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
        onClick={() => window.location.reload()}
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md"
      >
        Refresh page
      </button>
    </div>
  );
}

/**
 * Simplified layout component with minimal complexity to avoid RSC errors
 */
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  
  // Setup basic functionality
  useEffect(() => {
    setMounted(true);
    
    // Apply theme based on system preference
    try {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    } catch (error) {
      console.error('Theme detection error:', error);
    }
  }, []);
  
  if (!mounted) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div className="flex flex-col min-h-screen w-full max-w-screen overflow-x-hidden">
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
    </ErrorBoundary>
  );
}