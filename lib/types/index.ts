/**
 * Core Domain Types
 * 
 * Centralized type definitions for the portfolio application.
 * This ensures consistency across all components and prevents type drift.
 */

// Core Portfolio Types
export interface Portfolio {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  logoUrl: string;
  website?: string | null;
  investment_date?: Date | null;
  initial_investment?: number | null;
  original_valuation?: number | null;
  current_valuation?: number | null;
  investment_status?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  order: number;
}

export interface Venture {
  id: number;
  name: string;
  description: string;
  logoUrl?: string | null;
  website?: string | null;
  featured: boolean;
  status?: string | null;
  category?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// UI Component Types
export interface FilterState {
  selectedCategory: string;
  searchTerm: string;
  sortBy: 'name' | 'date' | 'category';
  sortOrder: 'asc' | 'desc';
}

export interface GridItemProps {
  item: Portfolio | Venture;
  index: number;
  onClick?: (item: Portfolio | Venture) => void;
  priority?: boolean;
}

// Animation Types
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    x?: number;
    scale?: number;
    transition?: {
      duration: number;
      ease: string;
      delay?: number;
    };
  };
}

// Query Types
export interface QueryConfig {
  staleTime: number;
  gcTime: number;
  retry: number;
  refetchOnWindowFocus: boolean;
}

export type QueryKey = [string, ...unknown[]];