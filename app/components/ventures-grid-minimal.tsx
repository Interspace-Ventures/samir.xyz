'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

type MinimalVenture = {
  id: number;
  name: string;
  logoUrl: string;
  website: string;
  status?: string | null;
};

/**
 * Minimal Ventures Grid Component
 * 
 * This component loads only essential venture data for a faster
 * initial load time.
 */
export default function VenturesGridMinimal() {
  const [ventures, setVentures] = useState<MinimalVenture[]>([]);
  
  // Fetch minimal ventures data
  const { data, isLoading, error } = useQuery({
    queryKey: ['ventures-minimal'],
    queryFn: async () => {
      const response = await fetch('/api/ventures-minimal');
      if (!response.ok) {
        throw new Error('Failed to fetch ventures');
      }
      return response.json();
    },
    retry: 1,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 15, // 15 minutes
  });

  useEffect(() => {
    if (data) {
      setVentures(data);
    }
  }, [data]);

  // Just log error but return empty div - parent component handles loading states with skeleton
  if (isLoading || error) {
    // Log error to console if present, but don't show to user
    if (error) {
      console.error('Error loading ventures:', error);
    }
    
    // Return empty div - parent component will show skeleton
    return <></>;
  }

  return (
    <div className="w-full mx-auto mb-6">
      {/* Always use 4 columns on all desktop screens */}
      <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
        <AnimatePresence>
          {ventures.map((venture, index) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square"
            >
              <a 
                href={
                  ['moonshot', 'omni', 'predictive', 'solo'].includes(venture.name) 
                    ? '/launching-soon' 
                    : venture.website || '#'
                } 
                target={
                  ['moonshot', 'omni', 'predictive', 'solo'].includes(venture.name) 
                    ? '_self' 
                    : '_blank'
                }
                rel="noreferrer"
                className="block w-full h-full absolute inset-0 overflow-hidden group cursor-pointer neo-card hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
              >
                {/* Main visible content - logo fills entire space */}
                <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/40 transition-colors duration-300">
                  <div className="relative w-full h-full flex items-center justify-center p-6">
                    <div className="w-[120px] h-[120px] relative">
                      <Image
                        src={venture.logoUrl}
                        alt={`${venture.name} logo`}
                        fill
                        className="venture-logo object-contain filter group-hover:brightness-110"
                        sizes="120px"
                        priority={index < 8}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlmYWZiIi8+PC9zdmc+"
                        unoptimized={true}
                      />
                    </div>
                  </div>
                  
                  {/* Status tag - only for Pre-launch ventures */}
                  {venture.status === 'Pre-launch' && (
                    <div className="absolute top-2 left-2 z-30">
                      <span className="bg-purple-primary text-white text-xs px-3 py-1 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Hover overlay with gradient */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-purple-900/80 to-indigo-800/60" 
                />
              </a>
            </motion.div>
          ))}
          
          {/* Add placeholders if needed to maintain grid layout */}
          {ventures.length < 8 && 
            Array(8 - ventures.length)
              .fill(0)
              .map((_, index) => (
                <div 
                  key={`empty-${index}`} 
                  className="relative aspect-square bg-[#2d0c6a]/70 border border-white/10"
                ></div>
              ))
          }
        </AnimatePresence>
      </div>
    </div>
  );
}