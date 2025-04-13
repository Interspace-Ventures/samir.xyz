import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  attribute?: "class" | "data-theme" | "data-mode";
  defaultTheme?: Theme;
  enableSystem?: boolean;
  [prop: string]: any;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Create theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  setTheme: () => {},
});

/**
 * Simplified ThemeProvider for Remix
 * 
 * This component provides basic theme functionality that works with SSR
 */
export function ThemeProvider({ 
  children, 
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  // State to track the current theme
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  // Function to get system preference
  const getSystemTheme = () => {
    if (!enableSystem) return defaultTheme;
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch (e) {
      return defaultTheme;
    }
  };
  
  // Function to determine the actual theme to apply
  const getActiveTheme = (theme: Theme) => {
    if (theme === "system") return getSystemTheme();
    return theme;
  };
  
  // Apply theme when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    const activeTheme = getActiveTheme(theme);
    
    if (attribute === "class") {
      root.classList.remove("theme-light", "theme-dark");
      root.classList.add(`theme-${activeTheme}`);
    } else {
      root.setAttribute(attribute, activeTheme);
    }
  }, [theme, attribute]);
  
  // Watch for system preference changes
  useEffect(() => {
    if (!enableSystem) return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        const activeTheme = getSystemTheme();
        
        if (attribute === "class") {
          root.classList.remove("theme-light", "theme-dark");
          root.classList.add(`theme-${activeTheme}`);
        } else {
          root.setAttribute(attribute, activeTheme);
        }
      }
    };
    
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, [theme, attribute, enableSystem]);
  
  // Initial theme setup
  useEffect(() => {
    // Try to get theme from localStorage or defaults
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    if (storedTheme) setTheme(storedTheme);
    
    // Apply the theme immediately to avoid flash
    const root = window.document.documentElement;
    const initialTheme = getActiveTheme(storedTheme || theme);
    
    if (attribute === "class") {
      root.classList.add(`theme-${initialTheme}`);
    } else {
      root.setAttribute(attribute, initialTheme);
    }
  }, []);
  
  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme);
      setTheme(theme);
    },
  };
  
  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme from context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
};