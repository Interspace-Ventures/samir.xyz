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
        
        <CardContent className="p-6 h-full relative">
          {/* Logo Container - Always visible */}
          <div className="flex items-center justify-center h-full min-h-[120px] w-full">
            <Image
              src={portfolio.logoUrl}
              alt={`${portfolio.name} logo`}
              width={IMAGE_CONFIG.LOGO_SIZE.WIDTH}
              height={IMAGE_CONFIG.LOGO_SIZE.HEIGHT}
              className="object-contain max-w-full max-h-full transition-all duration-300"
              style={{ width: 'auto', height: 'auto' }}
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={false}
              placeholder={IMAGE_CONFIG.PLACEHOLDER}
            />
          </div>
          
          {/* Hover Overlay - Shows tagline at bottom */}
          <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 z-10">
            {/* Logo remains visible on hover */}
            <div className="flex items-center justify-center flex-1 mb-4">
              <Image
                src={portfolio.logoUrl}
                alt={`${portfolio.name} logo`}
                width={IMAGE_CONFIG.LOGO_SIZE.WIDTH}
                height={IMAGE_CONFIG.LOGO_SIZE.HEIGHT}
                className="object-contain max-w-full max-h-full filter brightness-0 invert"
                style={{ width: 'auto', height: 'auto' }}
                priority={isPriority}
                loading={isPriority ? 'eager' : 'lazy'}
                unoptimized={false}
                placeholder={IMAGE_CONFIG.PLACEHOLDER}
              />
            </div>
            
            {/* Tagline at bottom */}
            {portfolio.description && (
              <div className="text-center">
                <p className="text-white text-sm font-medium leading-relaxed max-w-xs">
                  {portfolio.description}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}