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
        className="group h-[120px] bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-300 cursor-pointer relative overflow-hidden block"
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