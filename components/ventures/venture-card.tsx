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
      <Card variant="neobrutalism" interactive className="h-full group aspect-square">
        <CardContent className="p-4 h-full flex flex-col">
          {/* Logo Container */}
          <div className="flex items-center justify-center bg-gray-50 p-4 mb-4 flex-1">
            {venture.logoUrl && (
              <Image
                src={venture.logoUrl}
                alt={`${venture.name} logo`}
                width={IMAGE_CONFIG.VENTURE_LOGO_SIZE.WIDTH}
                height={IMAGE_CONFIG.VENTURE_LOGO_SIZE.HEIGHT}
                className="object-cover max-w-full max-h-full transition-transform duration-300 group-hover:scale-105"
                priority={isPriority}
                loading={isPriority ? 'eager' : 'lazy'}
                unoptimized={false}
                placeholder={IMAGE_CONFIG.PLACEHOLDER}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
            )}
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <CardTitle className="text-base group-hover:text-primary transition-colors">
                {venture.name}
              </CardTitle>
              {venture.website && (
                <Link
                  href={venture.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={14} />
                </Link>
              )}
            </div>
            
            {venture.status && (
              <div className="text-xs text-primary font-medium">
                {venture.status}
              </div>
            )}
            
            {venture.description && (
              <CardDescription lines={2} className="text-xs">
                {venture.description}
              </CardDescription>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}