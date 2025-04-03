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
 * Ultra-simplified ThemeProvider with WebView compatibility
 * 
 * This component prioritizes content visibility over theme consistency,
 * making it more compatible with WebView environments.
 */
export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "dark",
  enableSystem = true,
  ...props 
}: ThemeProviderProps) {
  // Track if component is mounted for theme consistency
  const [mounted, setMounted] = useState(false);
  // Track if we're in a WebView for special handling
  const [isWebView, setIsWebView] = useState(false);
  
  // Detect if we're in a WebView environment on mount
  useEffect(() => {
    const detectWebView = () => {
      try {
        // Check for WebView in user agent
        const ua = navigator.userAgent || '';
        const isWebViewEnv = /(WebView|wv)/.test(ua) || 
          /Android.*(wv|.NET)/.test(ua) ||
          /iPhone|iPad.*AppleWebKit(?!.*Safari)/.test(ua) ||
          /FB_IAB|FBAN|FBAV|Line|Instagram|NAVER|KAKAOTALK|Electron|Capacitor|Cordova/.test(ua);
          
        // Also check URL parameters
        const hasWebViewParam = window.location.search.includes('webview=true');
        
        return isWebViewEnv || hasWebViewParam;
      } catch (e) {
        return false;
      }
    };
    
    // Set WebView state
    setIsWebView(detectWebView());
    
    // Set mounted immediately to ensure content visibility
    setMounted(true);
    console.log("ThemeProvider initialized, WebView:", detectWebView());
    
  }, []);

  // Detect system preference for dark mode for immediate use
  const prefersDarkMode = typeof window !== 'undefined' && 
    window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  
  // For WebView environments, use a much simpler approach that doesn't rely on theme context
  if (isWebView) {
    // Apply dark theme class directly to html element
    if (typeof document !== 'undefined') {
      if (prefersDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Just render children without theme provider to avoid hydration issues
    return <>{children}</>;
  }
  
  // For regular browsers, use the normal theme provider with safety guards
  try {
    return (
      <NextThemesProvider 
        attribute={attribute as "class"}
        defaultTheme={prefersDarkMode ? "dark" : defaultTheme}
        enableSystem={enableSystem}
        {...props}
      >
        {children}
      </NextThemesProvider>
    );
  } catch (error) {
    // Log the error but still render content
    console.error("ThemeProvider error:", error);
    
    // Always render children, even on error
    return <>{children}</>;
  }
}

export default ThemeProvider