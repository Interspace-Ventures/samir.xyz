/**
 * Application Constants
 * 
 * Centralized configuration and constants for the portfolio application.
 * This ensures consistency and makes configuration changes easier.
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: '/api',
  ENDPOINTS: {
    PORTFOLIO: '/api/portfolio',
    CATEGORIES: '/api/categories',
    VENTURES: '/api/ventures-detailed',
    VENTURES_MINIMAL: '/api/ventures-minimal',
  },
  TIMEOUT: 10000,
} as const;

// React Query Configuration
export const QUERY_CONFIG = {
  DEFAULT_STALE_TIME: 1000 * 60 * 5, // 5 minutes
  DEFAULT_GC_TIME: 1000 * 60 * 10, // 10 minutes
  DEFAULT_RETRY: 3,
  DEFAULT_RETRY_DELAY: 1000,
  REFETCH_ON_WINDOW_FOCUS: false,
} as const;

// Animation Constants
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

export const ANIMATION_EASING = {
  EASE_OUT: 'easeOut',
  EASE_IN_OUT: 'easeInOut',
  SPRING: 'spring',
} as const;

// Grid Configuration
export const GRID_CONFIG = {
  MOBILE_COLUMNS: 2,
  DESKTOP_COLUMNS: 4,
  MOBILE_BREAKPOINT: 640,
  TABLET_BREAKPOINT: 768,
  DESKTOP_BREAKPOINT: 1024,
} as const;

// Image Configuration
export const IMAGE_CONFIG = {
  LOGO_SIZE: {
    WIDTH: 120,
    HEIGHT: 60,
  },
  VENTURE_LOGO_SIZE: {
    WIDTH: 120,
    HEIGHT: 120,
  },
  PLACEHOLDER: 'empty',
  SIZES: {
    MOBILE: '50vw',
    TABLET: '33vw',
    DESKTOP: '25vw',
  },
} as const;

// Styling Constants
export const THEME = {
  COLORS: {
    PRIMARY: '#8c5cf6',
    PRIMARY_RGB: '140, 92, 246',
    SECONDARY: '#3D365C',
    BACKGROUND: '#ffffff',
    TEXT: '#1f2937',
    BORDER: '#e5e7eb',
  },
  SHADOWS: {
    CARD: '6px 6px 0px 0px rgba(0,0,0,1)',
    CARD_HOVER: '0 10px 20px -3px rgba(140, 92, 246, 0.4)',
  },
  SPACING: {
    CARD_GAP: '1.5rem',
    SECTION_PADDING: '3rem',
  },
} as const;

// Layout Constants
export const LAYOUT = {
  MAX_WIDTH: '1280px',
  CONTAINER_PADDING: {
    MOBILE: '1rem',
    TABLET: '1.5rem',
    DESKTOP: '2rem',
  },
  HEADER_HEIGHT: '80px',
  FOOTER_HEIGHT: '64px',
} as const;

// Performance Constants
export const PERFORMANCE = {
  PRIORITY_ITEMS: 4, // Number of items to load with priority
  LAZY_LOADING_THRESHOLD: 4, // Items after this use lazy loading
  DEBOUNCE_DELAY: 300, // ms for search debouncing
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  DATA_FETCH_ERROR: 'Failed to load data. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully',
  OPERATION_COMPLETE: 'Operation completed successfully',
} as const;