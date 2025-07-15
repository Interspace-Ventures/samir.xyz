/**
 * Custom Query Hooks
 * 
 * Centralized and optimized React Query hooks for data fetching.
 * Provides consistent error handling, caching, and loading states.
 */

import { useQuery as useReactQuery } from '@tanstack/react-query';
import { QUERY_CONFIG, API_CONFIG, ERROR_MESSAGES } from '../constants';
import type { Portfolio, Category, Venture, QueryConfig } from '../types';

// Default query configuration
const defaultQueryConfig: QueryConfig = {
  staleTime: QUERY_CONFIG.DEFAULT_STALE_TIME,
  gcTime: QUERY_CONFIG.DEFAULT_GC_TIME,
  retry: QUERY_CONFIG.DEFAULT_RETRY,
  refetchOnWindowFocus: QUERY_CONFIG.REFETCH_ON_WINDOW_FOCUS,
};

// Generic fetch function with error handling
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`${ERROR_MESSAGES.NETWORK_ERROR} (${response.status})`);
  }
  
  return response.json();
}

// Portfolio data hook
export function usePortfolioData() {
  return useReactQuery({
    queryKey: ['portfolio'],
    queryFn: () => fetchData<Portfolio[]>(API_CONFIG.ENDPOINTS.PORTFOLIO),
    ...defaultQueryConfig,
  });
}

// Categories data hook
export function useCategoriesData() {
  return useReactQuery({
    queryKey: ['categories'],
    queryFn: () => fetchData<Category[]>(API_CONFIG.ENDPOINTS.CATEGORIES),
    ...defaultQueryConfig,
  });
}

// Ventures data hook
export function useVenturesData() {
  return useReactQuery({
    queryKey: ['ventures-detailed'],
    queryFn: () => fetchData<Venture[]>(API_CONFIG.ENDPOINTS.VENTURES),
    ...defaultQueryConfig,
  });
}

// Minimal ventures data hook (for faster initial loads)
export function useMinimalVenturesData() {
  return useReactQuery({
    queryKey: ['ventures-minimal'],
    queryFn: () => fetchData<Venture[]>(API_CONFIG.ENDPOINTS.VENTURES_MINIMAL),
    ...defaultQueryConfig,
  });
}

// Generic query hook with custom configuration
export function useCustomQuery<T>(
  key: string[],
  url: string,
  config?: Partial<QueryConfig>
) {
  return useReactQuery({
    queryKey: key,
    queryFn: () => fetchData<T>(url),
    ...defaultQueryConfig,
    ...config,
  });
}