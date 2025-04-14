import React, { useState, useEffect } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: "light" | "dark" | "system"
}

/**
 * Enhanced ThemeProvider for Remix with WebView compatibility
 * 
 * This implementation supports light/dark themes without relying on Next.js libraries
 * and includes special handling for WebView environments
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = "light"
}: ThemeProviderProps) {
  // Track if component is mounted
  const [mounted, setMounted] = useState(false);
  // Current theme state
  const [theme, setTheme] = useState<string>(defaultTheme);
  // Track if we're in a WebView for special handling
  const [isWebView, setIsWebView] = useState(false);

  // Initialize theme on mount and detect WebView
  useEffect(() => {
    // Detect if we're in a WebView environment
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
    
    // For WebView, apply system preference directly for immediate visibility
    if (detectWebView()) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      applyTheme(prefersDark ? "dark" : "light");
    } else {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme");
      
      // Apply system preference if requested
      if (savedTheme === "system" || (!savedTheme && defaultTheme === "system")) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
        
        // Watch for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
          setTheme(e.matches ? "dark" : "light");
          applyTheme(e.matches ? "dark" : "light");
        };
        
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      } 
      // Otherwise use saved or default theme
      else {
        const themeToApply = savedTheme || defaultTheme;
        setTheme(themeToApply);
        applyTheme(themeToApply);
      }
    }
    
    setMounted(true);
    console.log("ThemeProvider initialized, WebView:", detectWebView());
    
  }, [defaultTheme]);

  // Function to apply theme to document
  const applyTheme = (newTheme: string) => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  // Expose theme change function to window for global access
  useEffect(() => {
    window.theme = {
      current: theme,
      setTheme: (newTheme: string) => {
        if (!isWebView) {
          localStorage.setItem("theme", newTheme);
        }
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };
    
    // Apply theme whenever it changes
    applyTheme(theme);
  }, [theme, isWebView]);

  // Skip rendering until after client-side hydration
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <div className={theme}>
      {children}
    </div>
  );
}

export default ThemeProvider