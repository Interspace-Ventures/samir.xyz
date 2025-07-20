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
      <Card variant="neobrutalism" interactive className="portfolio-card-hover">
        {/* Status Badge - positioned at top right */}
        {portfolio.investment_status && (
          <div className="absolute top-3 right-3 z-20">
            <span className="bg-purple-500 text-white text-xs px-2 py-1 font-medium">
              {portfolio.investment_status}
            </span>
          </div>
        )}
        
        {/* Dark overlay with centered content - Only visible on hover */}
        <div className="hover-overlay">
          {/* Title - Only visible on hover */}
          <div className="text-center tagline-title mb-2">
            <h3 className="text-white text-sm md:text-base lg:text-lg font-bold">
              {portfolio.name}
            </h3>
          </div>
          
          {/* Tagline - Only visible on hover */}
          {portfolio.description && (
            <div className="text-center tagline">
              <p className="text-white text-xs md:text-sm font-medium leading-relaxed px-2">
                {portfolio.description}
              </p>
            </div>
          )}
        </div>
        
        <CardContent className="p-3 flex flex-col">
          {/* Logo Container - Main section */}
          <div className="flex items-center justify-center min-h-[100px] py-4">
            <Image
              src={portfolio.logoUrl}
              alt={`${portfolio.name} logo`}
              width={180}
              height={90}
              className="object-contain logo-normal"
              style={{ width: 'auto', height: 'auto', maxWidth: '180px', maxHeight: '90px' }}
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={true}
              placeholder="empty"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}