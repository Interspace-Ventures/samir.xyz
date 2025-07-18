/**
 * Responsive Grid Component
 * 
 * A flexible, responsive grid component that adapts to different screen sizes.
 * Provides consistent grid behavior across portfolio and venture displays.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { GRID_CONFIG } from '../../lib/constants';
import { staggerContainer } from '../../lib/utils/animations';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  animate?: boolean;
}

export function Grid({
  children,
  className,
  columns = {
    mobile: GRID_CONFIG.MOBILE_COLUMNS,
    tablet: 3,
    desktop: GRID_CONFIG.DESKTOP_COLUMNS,
  },
  gap = '1.5rem',
  animate = true,
}: GridProps) {
  const gridClasses = cn(
    'grid w-full',
    `grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop}`,
    className
  );

  const gridStyles = {
    gap,
  };

  if (animate) {
    return (
      <motion.div
        className={gridClasses}
        style={gridStyles}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={gridClasses} style={gridStyles}>
      {children}
    </div>
  );
}

interface GridItemProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  animate?: boolean;
}

export function GridItem({
  children,
  className,
  aspectRatio = 'auto',
  animate = true,
}: GridItemProps) {
  const itemClasses = cn(
    'relative',
    {
      'aspect-square': aspectRatio === 'square',
      'aspect-video': aspectRatio === 'video',
    },
    className
  );

  if (animate) {
    return (
      <motion.div
        className={itemClasses}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={itemClasses}>{children}</div>;
}