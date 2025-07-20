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
      <Card variant="neobrutalism" interactive className="portfolio-card-hover group">
        <CardContent className="p-4 relative h-full flex flex-col">
          {/* Status Badge - Always visible */}
          {portfolio.investment_status && (
            <div className="absolute top-2 right-2 z-50">
              <span className={`text-white text-xs px-2 py-1 font-medium border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                portfolio.investment_status.toLowerCase() === 'markup' 
                  ? 'bg-purple-500' 
                  : portfolio.investment_status.toLowerCase() === 'acquired'
                  ? 'bg-gray-700'
                  : portfolio.investment_status.toLowerCase() === 'active'
                  ? 'bg-blue-500'
                  : 'bg-purple-500'
              }`}>
                {portfolio.investment_status}
              </span>
            </div>
          )}
          
          {/* Logo Container */}
          <div className="flex items-center justify-center flex-1">
            <Image
              src={portfolio.logoUrl}
              alt={`${portfolio.name} logo`}
              width={160}
              height={80}
              className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
              style={{ width: 'auto', height: 'auto', maxWidth: '160px', maxHeight: '80px' }}
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={true}
              placeholder="empty"
            />
          </div>
          
          {/* Hover Overlay Content */}
          <div className="absolute inset-0 bg-black bg-opacity-85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-10">
            <h3 className="text-white text-sm md:text-base lg:text-lg font-bold text-center mb-2">
              {portfolio.name}
            </h3>
            {portfolio.description && (
              <p className="text-white text-xs md:text-sm font-medium leading-relaxed text-center px-4">
                {portfolio.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}