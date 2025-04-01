"use client"

import React, { useState, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

type ThemeProviderProps = {
  children: React.ReactNode
  attribute?: "class" | "data-theme" | "data-mode"
  defaultTheme?: string
  enableSystem?: boolean
  [prop: string]: any
}

/**
 * Enhanced ThemeProvider with error handling and immediate content display
 * 
 * This component provides theme support with improved error recovery
 * and guaranteed content visibility even during client-side mounting.
 */
export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state once the client is hydrated
  // This happens after the initial render
  useEffect(() => {
    // Check if we're in a webview environment (compatibility script sets this)
    const isWebview = typeof window !== 'undefined' && window.__NEXT_WEBVIEW_COMPATIBILITY__ === true;
    
    // Set timeout of 0 to ensure this happens after initial render cycle
    // For webview, use a shorter timeout to improve visual experience
    const timer = setTimeout(() => {
      setMounted(true);
      console.log("ThemeProvider fully mounted");
      
      // For webview environments, ensure body is visible
      if (isWebview && typeof document !== 'undefined') {
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';
      }
    }, isWebview ? 0 : 0);
    
    // Immediate visibility for webviews to prevent blank screens
    if (isWebview && typeof document !== 'undefined') {
      // Force immediate visibility in webviews
      document.body.style.visibility = 'visible';
    }
    
    return () => clearTimeout(timer);
  }, []);

  // Detect system preference for dark mode to use as initial value
  // before the client-side mounting is complete
  const prefersDarkMode = typeof window !== 'undefined' && 
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  
  // Always render content immediately, just adjust the theme settings
  // based on whether we're mounted or not
  try {
    return (
      <NextThemesProvider 
        attribute={attribute as "class"}
        defaultTheme={prefersDarkMode ? "dark" : defaultTheme}
        // Only enable system theme detection after mounting to prevent flicker
        enableSystem={mounted ? enableSystem : false}
        forcedTheme={!mounted ? (prefersDarkMode ? "dark" : defaultTheme) : undefined}
        {...props}
      >
        {/* No need for conditional rendering or loading wrapper */}
        {children}
      </NextThemesProvider>
    );
  } catch (error) {
    // Log the error but still render content without theme
    console.error("ThemeProvider error:", error);
    
    // Write to error log for tracking
    if (typeof window !== 'undefined') {
      const errorLog = {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        component: "ThemeProvider"
      };
      
      // Log to console in a structured way
      console.error("THEME_PROVIDER_ERROR", JSON.stringify(errorLog, null, 2));
    }
    
    // Always render children, even on error
    return <div className="theme-provider-error">{children}</div>;
  }
}

export default ThemeProvider