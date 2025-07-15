/**
 * Filter Logic Hook
 * 
 * Centralized filtering and sorting logic for portfolio items.
 * Provides consistent filtering behavior across components.
 */

import { useState, useMemo, useCallback } from 'react';
import type { Portfolio, Venture, FilterState } from '../types';

interface UseFiltersProps<T> {
  data: T[];
  defaultCategory?: string;
  defaultSort?: FilterState['sortBy'];
}

export function useFilters<T extends Portfolio | Venture>({
  data,
  defaultCategory = 'All',
  defaultSort = 'name',
}: UseFiltersProps<T>) {
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: defaultCategory,
    searchTerm: '',
    sortBy: defaultSort,
    sortOrder: 'asc',
  });

  // Update category filter
  const updateCategory = useCallback((category: string) => {
    setFilters(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  // Update search term
  const updateSearchTerm = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  }, []);

  // Update sort configuration
  const updateSort = useCallback((sortBy: FilterState['sortBy'], sortOrder: FilterState['sortOrder'] = 'asc') => {
    setFilters(prev => ({ ...prev, sortBy, sortOrder }));
  }, []);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply category filter
    if (filters.selectedCategory !== 'All') {
      filtered = filtered.filter(item => 
        'category' in item && item.category === filters.selectedCategory
      );
    }

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchLower) ||
        (item.description && item.description.toLowerCase().includes(searchLower))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          if ('createdAt' in a && 'createdAt' in b) {
            comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          }
          break;
        case 'category':
          if ('category' in a && 'category' in b) {
            comparison = (a.category || '').localeCompare(b.category || '');
          }
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [data, filters]);

  return {
    filters,
    filteredData,
    updateCategory,
    updateSearchTerm,
    updateSort,
    totalCount: data.length,
    filteredCount: filteredData.length,
  };
}