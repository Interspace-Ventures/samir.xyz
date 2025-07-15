/**
 * Loading Components
 * 
 * Centralized loading states and skeleton components.
 * Provides consistent loading experience across the application.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Grid, GridItem } from './grid';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={cn(
        'inline-block border-2 border-gray-200 border-t-primary rounded-full',
        sizeClasses[size],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );
}

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
  const baseClasses = 'bg-gray-200 rounded';
  
  if (animate) {
    return (
      <motion.div
        className={cn(baseClasses, className)}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  return <div className={cn(baseClasses, className)} />;
}

interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div className={cn('p-4 bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]', className)}>
      <div className="space-y-3">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

interface GridSkeletonProps {
  itemCount?: number;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  className?: string;
}

export function GridSkeleton({
  itemCount = 8,
  columns,
  className,
}: GridSkeletonProps) {
  return (
    <Grid columns={columns} animate={false} className={className}>
      {Array.from({ length: itemCount }).map((_, index) => (
        <GridItem key={index} aspectRatio="square" animate={false}>
          <CardSkeleton />
        </GridItem>
      ))}
    </Grid>
  );
}

interface LoadingStateProps {
  message?: string;
  showSpinner?: boolean;
  className?: string;
}

export function LoadingState({
  message = 'Loading...',
  showSpinner = true,
  className,
}: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      {showSpinner && <LoadingSpinner size="lg" className="mb-4" />}
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'Please try again later',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}