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
      <Card variant="neobrutalism" interactive className="h-full group relative overflow-hidden">
        {/* Status Badge - positioned at top right */}
        {portfolio.investment_status && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-purple-500 text-white text-xs px-2 py-1 font-medium">
              {portfolio.investment_status}
            </span>
          </div>
        )}
        
        <CardContent className="p-6 h-full">
          {/* Logo Container - Full card, centered */}
          <div className="flex items-center justify-center h-full min-h-[120px] w-full">
            <Image
              src={portfolio.logoUrl}
              alt={`${portfolio.name} logo`}
              width={IMAGE_CONFIG.LOGO_SIZE.WIDTH}
              height={IMAGE_CONFIG.LOGO_SIZE.HEIGHT}
              className="object-contain max-w-full max-h-full"
              style={{ width: 'auto', height: 'auto' }}
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={false}
              placeholder={IMAGE_CONFIG.PLACEHOLDER}
            />
          </div>
          
          {/* Hover Content - Only visible on hover */}
          <div className="absolute inset-0 bg-white bg-opacity-95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 z-20">
            <div className="text-center space-y-3">
              {portfolio.description && (
                <p className="text-sm text-gray-700 max-w-xs leading-relaxed">
                  {portfolio.description}
                </p>
              )}
              
              {portfolio.website && (
                <Link
                  href={portfolio.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-500 hover:text-black transition-colors text-sm"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} className="mr-2" />
                  Visit Website
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}