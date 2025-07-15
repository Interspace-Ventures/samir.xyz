/**
 * Portfolio Card Component
 * 
 * Optimized portfolio company card with consistent styling and behavior.
 * Follows neobrutalism design principles with performance optimizations.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { IMAGE_CONFIG, PERFORMANCE } from '../../lib/constants';
import { staggerItem } from '../../lib/utils/animations';
import type { Portfolio } from '../../lib/types';

interface PortfolioCardProps {
  portfolio: Portfolio;
  index: number;
  className?: string;
}

export function PortfolioCard({ portfolio, index, className }: PortfolioCardProps) {
  const isPriority = index < PERFORMANCE.PRIORITY_ITEMS;
  
  return (
    <motion.div
      variants={staggerItem}
      className={className}
    >
      <Card variant="neobrutalism" interactive className="h-full group">
        <CardContent className="p-4">
          {/* Logo Container */}
          <div className="flex items-center justify-center bg-gray-50 p-4 mb-4 h-20">
            <Image
              src={portfolio.logoUrl}
              alt={`${portfolio.name} logo`}
              width={IMAGE_CONFIG.LOGO_SIZE.WIDTH}
              height={IMAGE_CONFIG.LOGO_SIZE.HEIGHT}
              className="object-contain max-w-full max-h-full"
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={false}
              placeholder={IMAGE_CONFIG.PLACEHOLDER}
            />
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {portfolio.name}
              </CardTitle>
              {portfolio.website && (
                <Link
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </Link>
              )}
            </div>
            
            <div className="text-sm text-primary font-medium">
              {portfolio.category}
            </div>
            
            {portfolio.description && (
              <CardDescription lines={3}>
                {portfolio.description}
              </CardDescription>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}