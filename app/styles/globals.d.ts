/**
 * Global type definitions
 * 
 * This file contains TypeScript type declarations for the global scope,
 * such as environment variables, window properties, and more.
 */

/**
 * Extend the Window interface to add custom properties
 */
interface Window {
  // Add client-side theme support
  theme?: {
    current: string;
    setTheme: (theme: string) => void;
  };
  
  // Analytics tracking
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
  
  // Third-party integrations
  fbq?: (...args: any[]) => void;
  
  // Feature flags
  featureFlags?: Record<string, boolean>;
}

/**
 * Extend the Process interface for environment variables
 */
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    DATABASE_URL?: string;
    API_KEY?: string;
    
    // Add any other environment variables your app uses
  }
}

/**
 * Add support for importing various asset types
 */
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: Record<string, any>;
  export default content;
}

/**
 * Add support for CSS modules
 */
declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.module.sass" {
  const classes: Record<string, string>;
  export default classes;
}