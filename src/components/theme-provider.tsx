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
 * Enhanced ThemeProvider with error handling and logging
 * 
 * This component provides theme support with improved error recovery
 * and client-side rendering compatibility.
 */
export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  ...props 
}: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  
  // Make sure we only render once the client is mounted
  // to avoid hydration issues with server/client theme
  useEffect(() => {
    setMounted(true);
    
    // Log theme provider initialized correctly
    console.log("ThemeProvider initialized successfully");
    
    // Clean up on component unmount
    return () => {
      // Any cleanup if needed
    };
  }, []);

  // If we're server-side or mounting, render without theme initially
  if (!mounted) {
    return (
      <div className="theme-provider-loading">
        {children}
      </div>
    );
  }

  // Wrap in error boundary-like try/catch for client components
  try {
    return (
      <NextThemesProvider 
        attribute={attribute as "class"}
        defaultTheme={defaultTheme}
        enableSystem={enableSystem}
        {...props}
      >
        {children}
      </NextThemesProvider>
    );
  } catch (error) {
    // Log the error but still render content without theme
    console.error("ThemeProvider error:", error);
    
    // Write to error log in public/logs/errors
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
    
    // Render children without theme provider on error
    return <div className="theme-provider-error">{children}</div>;
  }
}

export default ThemeProvider