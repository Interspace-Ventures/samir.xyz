/**
 * Portfolio Grid Component
 * 
 * Optimized portfolio grid with filtering, sorting, and animations.
 * Provides consistent portfolio display across the application.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Grid } from '../ui/grid';
import { FilterBar } from '../ui/filter-bar';
import { GridSkeleton, ErrorState } from '../ui/loading';
import { PortfolioCard } from './portfolio-card';
import { usePortfolioData, useCategoriesData } from '../../lib/hooks/useQuery';
import { useFilters } from '../../lib/hooks/useFilters';
import { fadeInUp, staggerContainer } from '../../lib/utils/animations';
import { ERROR_MESSAGES } from '../../lib/constants';

interface PortfolioGridProps {
  className?: string;
}

export function PortfolioGrid({ className }: PortfolioGridProps) {
  const { data: portfolioData = [], isLoading: isLoadingPortfolio, error: portfolioError } = usePortfolioData();
  const { data: categoriesData = [], isLoading: isLoadingCategories, error: categoriesError } = useCategoriesData();
  
  const {
    filters,
    filteredData,
    updateCategory,
    totalCount,
    filteredCount,
  } = useFilters({
    data: portfolioData,
    defaultCategory: 'All',
    defaultSort: 'name',
  });

  // Loading state
  if (isLoadingPortfolio || isLoadingCategories) {
    return (
      <div className={className}>
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-20 bg-gray-200 animate-pulse" />
            ))}
          </div>
        </div>
        <GridSkeleton itemCount={8} />
      </div>
    );
  }

  // Error state
  if (portfolioError || categoriesError) {
    return (
      <div className={className}>
        <ErrorState
          title="Failed to load portfolio"
          message={ERROR_MESSAGES.DATA_FETCH_ERROR}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <FilterBar
        categories={categoriesData}
        selectedCategory={filters.selectedCategory}
        onCategoryChange={updateCategory}
        totalCount={totalCount}
        filteredCount={filteredCount}
      />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <Grid
          columns={{
            mobile: 2,
            tablet: 3,
            desktop: 4,
          }}
          gap="1rem"
          animate={false}
        >
          {filteredData.map((portfolio, index) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              index={index}
            />
          ))}
        </Grid>
      </motion.div>
      
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No portfolio items found for the selected filter.</p>
        </div>
      )}
    </motion.div>
  );
}