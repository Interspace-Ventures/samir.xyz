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
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 font-bold text-sm transition-all duration-200',
        'border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
        'hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]',
        'hover:translate-x-[-2px] hover:translate-y-[-2px]',
        active ? 'bg-[#7f54dc] text-white hover:bg-[#6339c7]' : 'bg-white text-black hover:bg-gray-50',
        className
      )}
    >
      {children}
    </button>
  );
}