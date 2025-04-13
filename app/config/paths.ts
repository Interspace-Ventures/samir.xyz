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
  // Logo images
  logos: {
    main: `${IMAGE_BASE_PATH}logos/logo.svg`,
    icon: `${IMAGE_BASE_PATH}logos/icon.svg`,
    companies: `${IMAGE_BASE_PATH}logos/companies/`
  },
  
  // General images
  images: {
    profiles: `${IMAGE_BASE_PATH}images/profiles/`,
    backgrounds: `${IMAGE_BASE_PATH}images/backgrounds/`,
    icons: `${IMAGE_BASE_PATH}images/icons/`
  },
  
  // Document paths
  documents: {
    reports: `${ASSET_BASE_PATH}documents/reports/`,
    presentations: `${ASSET_BASE_PATH}documents/presentations/`
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