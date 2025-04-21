import React, { useState, useEffect } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class" | "data-theme" | "data-mode";
  defaultTheme?: string;
  enableSystem?: boolean;
  [prop: string]: any;
};

/**
 * Simplified ThemeProvider for Remix
 * 
 * This component provides basic theme functionality without relying on Next.js
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
    
    // Get current theme from localStorage if available
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    
    // Detect system preference for dark mode
    const prefersDarkMode = typeof window !== 'undefined' && 
      window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    
    // Determine which theme to use
    let themeToUse = defaultTheme;
    if (savedTheme) {
      themeToUse = savedTheme;
    } else if (enableSystem && prefersDarkMode) {
      themeToUse = 'dark';
    }
    
    // Apply theme
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(themeToUse);
    }
    
  }, [defaultTheme, enableSystem]);

  // Simple theme toggler function to expose
  const setTheme = (theme: string) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  };

  // Simplified provider that just renders children with theme context
  return (
    <ThemeContext.Provider value={{ setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Create a context for theme operations
type ThemeContextType = {
  setTheme: (theme: string) => void;
};

const ThemeContext = React.createContext<ThemeContextType>({
  setTheme: () => {},
});

// Hook to use theme
export const useTheme = () => React.useContext(ThemeContext);

export default ThemeProvider;