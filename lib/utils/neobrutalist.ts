/**
 * Neobrutalist design system utilities
 * Provides consistent styling helpers for the portfolio
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind merge to avoid conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Neobrutalist card base classes
 */
export const neobrutalCard = cn(
  'bg-white',
  'relative',
  'overflow-hidden',
  'neobrutalist-shadow',
  'transition-all',
  'duration-200',
  'hover:neobrutalist-shadow-hover',
  'hover:neobrutalist-transform-hover',
  'cursor-pointer'
);

/**
 * Status badge classes based on status type
 */
export const getStatusBadgeClass = (status: string) => {
  const baseClass = 'status-badge';
  const statusLower = status.toLowerCase();
  
  switch (statusLower) {
    case 'markup':
      return cn(baseClass, 'status-badge-markup');
    case 'acquired':
      return cn(baseClass, 'status-badge-acquired');
    default:
      return cn(baseClass, 'status-badge-markup');
  }
};

/**
 * Grid container classes with responsive breakpoints
 */
export const gridClasses = {
  ventures: 'grid grid-cols-3 md:grid-cols-4 gap-4 w-full',
  portfolio: 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6',
  metrics: 'grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl',
};

/**
 * Animation variants for consistent animations
 */
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  shimmer: 'animate-shimmer',
  pulse: 'animate-pulse',
};

/**
 * Typography classes for consistent text styling
 */
export const typography = {
  h1: 'text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl',
  h2: 'text-3xl font-bold tracking-tight sm:text-4xl',
  h3: 'text-2xl font-bold tracking-tight',
  body: 'text-base sm:text-lg',
  small: 'text-sm sm:text-base',
  tiny: 'text-xs sm:text-sm',
};