"use client";

import React from "react";
import { ThemeProvider } from "../theme-provider";
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
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const handleError = (error: Error) => {
    // Log errors to the console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Layout Error:', error);
    }
    
    // Could add external error logging service here
  };
  
  return (
    <ErrorBoundary fallback={<ErrorFallback />} onError={handleError}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
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
      </ThemeProvider>
    </ErrorBoundary>
  );
}