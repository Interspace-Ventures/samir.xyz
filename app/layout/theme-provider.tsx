import React, { useState, useEffect } from "react"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: "light" | "dark" | "system"
}

/**
 * Simplified ThemeProvider for Remix
 * 
 * This is a basic implementation that supports light/dark themes
 * without relying on Next.js libraries
 */
export function ThemeProvider({ 
  children, 
  defaultTheme = "light"
}: ThemeProviderProps) {
  // Track if component is mounted
  const [mounted, setMounted] = useState(false);
  // Current theme state
  const [theme, setTheme] = useState<string>(defaultTheme);

  // Initialize theme on mount
  useEffect(() => {
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
    
    setMounted(true);
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
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };
    
    // Apply theme whenever it changes
    applyTheme(theme);
  }, [theme]);

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