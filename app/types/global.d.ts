/**
 * Global type declarations
 * 
 * This file contains TypeScript type declarations for the global scope,
 * such as window properties and more.
 */

interface Window {
  // Client-side theme support
  theme?: {
    current: string;
    setTheme: (theme: string) => void;
  };
}

// Add other global type declarations as needed