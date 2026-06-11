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
      <a 
        href={portfolio.website || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group h-[120px] bg-white relative overflow-hidden block cursor-pointer neobrutalist-shadow transition-all duration-200 hover:neobrutalist-shadow-hover hover:neobrutalist-transform-hover overflow-hidden"
      >
        <div className="p-4 h-full flex flex-col relative">
          {/* Status Badge - Only show Markup and Acquired */}
          {portfolio.investment_status && portfolio.investment_status.toLowerCase() !== 'active' && (
            <div 
              className="absolute top-0 z-10 pointer-events-none"
              style={{ left: '3px' }}
            >
              <span 
                className="text-white text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 font-bold border sm:border-2 border-black"
                style={{
                  backgroundColor: portfolio.investment_status.toLowerCase() === 'markup' ? '#7f54dc' : '#6b7280',
                  color: '#ffffff',
                  boxShadow: '1px 1px 0px 0px rgba(0,0,0,1)',
                  display: 'inline-block'
                }}
              >
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
              className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert relative w-auto h-auto max-w-[160px] max-h-[80px] z-[5]"
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={true}
              placeholder="empty"
            />
          </div>
          
          {/* Hover Overlay Content */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20 pointer-events-none overflow-hidden"
            style={{
              background: 'linear-gradient(to bottom right, rgba(45, 12, 106, 0.9), rgba(56, 20, 144, 0.9))'
            }}
          >
            <h3 className="text-white text-xs sm:text-sm font-bold text-center mb-1 px-2 line-clamp-2">
              {portfolio.name}
            </h3>
            {portfolio.description && (
              <p className="text-white text-[10px] sm:text-xs font-medium leading-tight text-center px-3 line-clamp-3">
                {portfolio.description}
              </p>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}