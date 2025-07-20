/**
 * Design tokens and constants for the portfolio website
 * Centralizes all design-related values for consistency
 */

export const COLORS = {
  // Primary brand colors
  purple: {
    primary: '#7f55dc',
    hover: '#6b46c1',
    light: '#8b5cf6',
  },
  
  // Background colors
  background: {
    primary: '#332452',
    secondary: '#2d0c6a',
    tertiary: '#2a313a',
    card: 'rgba(45, 12, 106, 0.3)',
    cardHover: 'rgba(45, 12, 106, 0.5)',
  },
  
  // Text colors
  text: {
    primary: '#ffffff',
    secondary: '#c084fc',
    tertiary: '#a1a1aa',
    muted: '#a1a1aa',
  },
  
  // Status colors
  status: {
    markup: '#8b5cf6',
    acquired: '#374151',
    active: '#7f55dc',
  },
  
  // Utility colors
  black: '#000000',
  white: '#ffffff',
  gray: {
    200: '#e5e5e5',
    500: '#6b7280',
    700: '#374151',
  },
} as const;

export const SHADOWS = {
  neobrutalist: '0 0 0 2px #000, 4px 4px 0px 0px #000',
  neobrutalismHover: '0 0 0 2px #000, 6px 6px 0px 0px #000',
  statusBadge: '2px 2px 0px 0px rgba(0,0,0,1)',
  card: '0 10px 20px -3px rgba(127, 85, 220, 0.4)',
} as const;

export const TRANSITIONS = {
  default: 'all 0.2s ease',
  hover: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 0.3s ease-out',
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  overlay: 20,
  modal: 30,
  toast: 40,
  tooltip: 50,
} as const;