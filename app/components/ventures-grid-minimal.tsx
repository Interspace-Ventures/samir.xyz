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
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
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
                className="relative group block w-full h-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 overflow-hidden"
              >
                {/* Company Logo Container */}
                <div className="h-full flex items-center justify-center p-6 bg-white">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    <Image
                      src={venture.logoUrl}
                      alt={`${venture.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, 96px"
                      priority={index < 4}
                      loading={index < 4 ? "eager" : "lazy"}
                      unoptimized={false}
                    />
                  </div>
                </div>
                
                {/* Status tag - only for Pre-launch ventures */}
                {venture.status === 'Pre-launch' && (
                  <div className="absolute top-2 right-2 z-20">
                    <span className="bg-[#7f54dc] text-white text-xs px-2 py-1 font-bold rounded border border-black">
                      Coming Soon
                    </span>
                  </div>
                )}
                
                {/* Hover overlay with description */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#2d0c6a]/90 to-[#381490]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 text-center">
                  {venture.description ? (
                    <div>
                      <h4 className="text-white text-sm font-bold mb-1">{venture.name}</h4>
                      <p className="text-gray-200 text-xs">{venture.description}</p>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-white text-sm font-bold mb-1">{venture.name}</h4>
                      <p className="text-gray-300 text-xs">{venture.category || 'Venture'}</p>
                    </div>
                  )}
                </div>
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