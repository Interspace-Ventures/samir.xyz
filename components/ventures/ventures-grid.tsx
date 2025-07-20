/**
 * Ventures Grid Component
 * 
 * Optimized ventures grid with consistent styling and performance.
 * Provides the main ventures display interface.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Grid } from '../ui/grid';
import { GridSkeleton, ErrorState } from '../ui/loading';
import { VentureCard } from './venture-card';
import { useVenturesData } from '../../lib/hooks/useQuery';
import { fadeInUp, staggerContainer } from '../../lib/utils/animations';
import { ERROR_MESSAGES } from '../../lib/constants';

interface VenturesGridProps {
  className?: string;
}

export function VenturesGrid({ className }: VenturesGridProps) {
  const { data: venturesData = [], isLoading, error } = useVenturesData();

  // Debug logging
  console.log('VenturesGrid - isLoading:', isLoading);
  console.log('VenturesGrid - error:', error);
  console.log('VenturesGrid - venturesData:', venturesData);

  // Loading state
  if (isLoading) {
    return (
      <div className={className}>
        <GridSkeleton
          itemCount={8}
          columns={{
            mobile: 2,
            tablet: 3,
            desktop: 4,
          }}
        />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={className}>
        <ErrorState
          title="Failed to load ventures"
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
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {venturesData.map((venture, index) => (
            <VentureCard
              key={venture.id}
              venture={venture}
              index={index}
            />
          ))}
        </div>
      </motion.div>
      
      {venturesData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No ventures found.</p>
        </div>
      )}
    </motion.div>
  );
}