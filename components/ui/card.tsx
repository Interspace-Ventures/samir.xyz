/**
 * Card Component System
 * 
 * Reusable card components with consistent neobrutalism styling.
 * Provides a foundation for portfolio and venture cards.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { THEME } from '../../lib/constants';
import { hoverLift } from '../../lib/utils/animations';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'neobrutalism' | 'minimal';
  interactive?: boolean;
  onClick?: () => void;
  animate?: boolean;
}

export function Card({
  children,
  className,
  variant = 'neobrutalism',
  interactive = false,
  onClick,
  animate = true,
}: CardProps) {
  const baseClasses = 'relative overflow-hidden transition-all duration-300 w-full h-full';
  
  const variantClasses = {
    default: 'bg-white border border-gray-200 rounded-lg shadow-sm',
    neobrutalism: `bg-white border-2 border-black shadow-[${THEME.SHADOWS.CARD}]`,
    minimal: 'bg-white border border-gray-100',
  };
  
  const interactiveClasses = interactive 
    ? 'cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]' 
    : '';

  const cardClasses = cn(
    baseClasses,
    variantClasses[variant],
    interactiveClasses,
    className
  );

  if (animate) {
    return (
      <motion.div
        className={cardClasses}
        onClick={onClick}
        whileHover={interactive ? hoverLift : undefined}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('p-4 pb-2', className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('p-4 pt-0', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn('p-4 pt-2 border-t border-gray-100', className)}>
      {children}
    </div>
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
  priority?: boolean;
}

export function CardImage({
  src,
  alt,
  className,
  aspectRatio = 'auto',
  priority = false,
}: CardImageProps) {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  return (
    <div className={cn('relative overflow-hidden', aspectClasses[aspectRatio], className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function CardTitle({ children, className, level = 3 }: CardTitleProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag className={cn('font-semibold text-gray-900', className)}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
  lines?: number;
}

export function CardDescription({ children, className, lines }: CardDescriptionProps) {
  const lineClampClasses = lines ? `line-clamp-${lines}` : '';
  
  return (
    <p className={cn('text-gray-600 text-sm', lineClampClasses, className)}>
      {children}
    </p>
  );
}