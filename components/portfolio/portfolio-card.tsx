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
      <div className="group portfolio-card-hover bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 cursor-pointer relative overflow-hidden">
        <div className="p-4 h-full flex flex-col relative">
          {/* Status Badge - Only show Markup and Acquired */}
          {portfolio.investment_status && portfolio.investment_status.toLowerCase() !== 'active' && (
            <div 
              className="absolute top-2 right-2"
              style={{ 
                zIndex: 10,
                position: 'absolute',
                top: '8px',
                right: '8px',
                pointerEvents: 'none'
              }}
            >
              <span 
                className="text-white text-xs px-2 py-1 font-medium border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  backgroundColor: portfolio.investment_status.toLowerCase() === 'markup' 
                    ? '#8b5cf6' 
                    : portfolio.investment_status.toLowerCase() === 'acquired'
                    ? '#374151'
                    : '#8b5cf6',
                  color: 'white',
                  fontSize: '12px',
                  fontWeight: 500,
                  padding: '4px 8px',
                  border: '1px solid black',
                  boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
                  display: 'block',
                  zIndex: 10,
                  pointerEvents: 'none'
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
              className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert relative"
              style={{ width: 'auto', height: 'auto', maxWidth: '160px', maxHeight: '80px', zIndex: 15 }}
              priority={isPriority}
              loading={isPriority ? 'eager' : 'lazy'}
              unoptimized={true}
              placeholder="empty"
            />
          </div>
          
          {/* Hover Overlay Content */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-30 pointer-events-none"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(2px)'
            }}
          >
            <h3 className="text-white text-sm md:text-base lg:text-lg font-bold text-center mb-2">
              {portfolio.name}
            </h3>
            {portfolio.description && (
              <p className="text-white text-xs md:text-sm font-medium leading-relaxed text-center px-4">
                {portfolio.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}