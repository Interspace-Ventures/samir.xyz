/**
 * Path Configuration
 * 
 * This file centralizes all path definitions for assets, images, and other static files
 * to make future updates easier and more consistent.
 */

// Base paths for different asset types
export const BASE_URL = '/';
export const IMAGE_BASE_PATH = '/';
export const ASSET_BASE_PATH = '/';

// Specific asset path categories
export const ASSET_PATHS = {
  // Main assets directories
  MAIN: `${ASSET_BASE_PATH}assets/`,
  IMAGES: `${ASSET_BASE_PATH}assets/images/`,
  PROFILES: `${ASSET_BASE_PATH}assets/profiles/`,
  COMPANIES: `${ASSET_BASE_PATH}assets/companies/`,
  VENTURES: `${ASSET_BASE_PATH}assets/ventures/`,
  ICONS: `${ASSET_BASE_PATH}assets/icons/`,
  
  // Documents
  DOCUMENTS: `${ASSET_BASE_PATH}assets/documents/`,
  REPORTS: `${ASSET_BASE_PATH}assets/documents/reports/`,
  PRESENTATIONS: `${ASSET_BASE_PATH}assets/documents/presentations/`,
  
  // For backward compatibility
  ATTACHED: `${ASSET_BASE_PATH}assets/`,
  
  // Legacy paths (kept for backward compatibility during migration)
  logos: {
    main: `${IMAGE_BASE_PATH}assets/images/logo.svg`,
    icon: `${IMAGE_BASE_PATH}assets/images/icon.svg`,
    companies: `${IMAGE_BASE_PATH}assets/companies/`
  },
  
  images: {
    profiles: `${IMAGE_BASE_PATH}assets/profiles/`,
    backgrounds: `${IMAGE_BASE_PATH}assets/images/backgrounds/`,
    icons: `${IMAGE_BASE_PATH}assets/icons/`
  },
  
  documents: {
    reports: `${ASSET_BASE_PATH}assets/documents/reports/`,
    presentations: `${ASSET_BASE_PATH}assets/documents/presentations/`
  },
};

// URL paths for different sections of the application
export const APP_PATHS = {
  home: '/',
  portfolio: '/portfolio',
  profile: '/profile',
  ventures: '/ventures',
  
  // Add other app paths as needed
  about: '/about',
  contact: '/contact',
  blog: '/blog',
};

// API endpoints
export const API_PATHS = {
  base: '/api',
  data: '/api/data',
  auth: '/api/auth',
  
  // Add other API paths as needed
  companies: '/api/companies',
  ventures: '/api/ventures',
};