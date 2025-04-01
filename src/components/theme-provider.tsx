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
  // Detect WebView environment - sync detection before any effects
  const isWebviewSync = typeof window !== 'undefined' && 
    window.__NEXT_WEBVIEW_COMPATIBILITY__ === true;
    
  // Initialize mounted state based on WebView detection
  // If we're in a WebView, we want content to be visible immediately
  const [mounted, setMounted] = useState(isWebviewSync);
  
  // Set mounted state once the client is hydrated
  // This happens after the initial render
  useEffect(() => {
    // Define a universal function to enforce visibility
    function enforceVisibility() {
      if (document.body) {
        // Use setAttribute for maximum CSS priority
        document.body.setAttribute('style', 
          'visibility: visible !important; ' +
          'opacity: 1 !important; ' + 
          'display: block !important; ' +
          'animation: none !important; ' +
          'transition: none !important;'
        );
        
        // Add data attribute that can be used by CSS selectors
        document.documentElement.setAttribute('data-webview-ready', 'true');
        
        // Also apply to common content containers
        const contentContainers = document.querySelectorAll(
          '#__next, ' +
          '#__next > *, ' +
          'main, ' +
          '.flex-grow, ' +
          '[class*="container"], ' +
          '[class*="content"]'
        );
        
        contentContainers.forEach(container => {
          (container as HTMLElement).setAttribute('style',
            'visibility: visible !important; opacity: 1 !important;'
          );
        });
        
        console.log("ThemeProvider: visibility enforcement applied");
      }
    }
    
    // Apply immediate visibility for WebView before any timeouts
    if (isWebviewSync && typeof document !== 'undefined') {
      // IMMEDIATELY force visibility for webviews - no delay
      enforceVisibility();
      
      // Content should be visible immediately - set mounted if not already
      if (!mounted) {
        setMounted(true);
      }
      
      // Apply again after minimal delay as extra insurance
      const timer = setTimeout(enforceVisibility, 50);
      return () => clearTimeout(timer);
    } 
    // For non-WebView or if we can't detect yet
    else {
      // For regular browsers, small delay is fine
      // Immediate timeout (0ms) to ensure it runs as soon as possible in the event loop
      const timer = setTimeout(() => {
        setMounted(true);
        console.log("ThemeProvider fully mounted");
      }, 0);
      
      return () => clearTimeout(timer);
    }
  }, [mounted, isWebviewSync]);

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