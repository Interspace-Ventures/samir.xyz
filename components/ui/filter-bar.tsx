/**
 * Filter Bar Component
 * 
 * Reusable filter component for portfolio and venture pages.
 * Provides consistent filtering interface across the application.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { fadeInUp } from '../../lib/utils/animations';
import { Button } from '../ui/button';
import type { Category } from '../../lib/types';

interface FilterBarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  totalCount?: number;
  filteredCount?: number;
  className?: string;
}

export function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  totalCount,
  filteredCount,
  className,
}: FilterBarProps) {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <motion.div
      className={cn('mb-8', className)}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        <FilterButton
          active={selectedCategory === 'All'}
          onClick={() => onCategoryChange('All')}
        >
          All
        </FilterButton>
        {sortedCategories.map((category) => (
          <FilterButton
            key={category.id}
            active={selectedCategory === category.name}
            onClick={() => onCategoryChange(category.name)}
          >
            {category.name}
          </FilterButton>
        ))}
      </div>
      

    </motion.div>
  );
}

interface FilterButtonProps {
  children: React.ReactNode;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

export function FilterButton({
  children,
  active = false,
  onClick,
  className,
}: FilterButtonProps) {
  return (
    <Button
      variant={active ? "default" : "neutral"}
      size="sm"
      onClick={onClick}
      className={cn(
        'font-bold',
        active && 'bg-[#7f54dc] hover:bg-[#6339c7]',
        className
      )}
    >
      {children}
    </Button>
  );
}