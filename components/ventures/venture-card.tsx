/**
 * Venture Card Component
 * 
 * Optimized venture card with consistent styling and behavior.
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
import type { Venture } from '../../lib/types';

interface VentureCardProps {
  venture: Venture;
  index: number;
  className?: string;
}

export function VentureCard({ venture, index, className }: VentureCardProps) {
  const isPriority = index < PERFORMANCE.PRIORITY_ITEMS;
  
  return (
    <motion.div
      variants={staggerItem}
      className={className}
    >
      <Link
        href={venture.website || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="group aspect-square bg-white relative overflow-hidden block cursor-pointer"
        style={{
          boxShadow: '0 0 0 2px #000, 4px 4px 0px 0px #000',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(-2px, -2px)';
          e.currentTarget.style.boxShadow = '0 0 0 2px #000, 6px 6px 0px 0px #000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0)';
          e.currentTarget.style.boxShadow = '0 0 0 2px #000, 4px 4px 0px 0px #000';
        }}
      >
        {/* Logo fills entire card */}
        {venture.logoUrl && (
          <Image
            src={venture.logoUrl}
            alt={`${venture.name} logo`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={isPriority}
            loading={isPriority ? 'eager' : 'lazy'}
            unoptimized={true}
          />
        )}
        
        {/* Optional overlay for name on hover */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/80 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
          <div className="text-white text-center p-4">
            <h3 className="font-bold text-lg mb-1">{venture.name}</h3>
            {venture.description && (
              <p className="text-sm text-white/90">{venture.description}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}