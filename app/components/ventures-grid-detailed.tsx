'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

type DetailedVenture = {
  id: number;
  name: string;
  description: string;
  logoUrl?: string | null;
  website?: string | null;
  featured: boolean;
};

/**
 * Detailed Ventures Grid Component
 * 
 * This component loads full venture data with descriptions
 * after the initial minimal grid has rendered.
 */
export default function VenturesGridDetailed() {
  const [ventures, setVentures] = useState<DetailedVenture[]>([]);
  
  // Fetch full ventures data
  const { data, isLoading, error } = useQuery({
    queryKey: ['ventures-detailed'],
    queryFn: async () => {
      const response = await fetch('/api/ventures-detailed');
      if (!response.ok) {
        throw new Error('Failed to fetch detailed ventures');
      }
      return response.json();
    },
    retry: 2
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
      console.error('Error loading detailed ventures:', error);
    }
    
    // Return empty div - parent component will show skeleton
    return <></>;
  }

  return (
    <div className="w-full mx-auto mb-6">
      {/* Always use 4 columns on all desktop screens */}
      <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
        <AnimatePresence>
          {ventures.slice(0, 8).map((venture, index) => (
            <motion.div
              key={venture.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square"
            >
              <a 
                href={venture.website || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full h-full absolute inset-0 overflow-hidden group cursor-pointer"
              >
                {/* Main visible content - logo fills entire space */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                  {venture.logoUrl && (
                    <div className="flex items-center justify-center w-full h-full transition-transform duration-300">
                      <Image 
                        src={venture.logoUrl} 
                        alt={`${venture.name} logo`}
                        width={200}
                        height={200}
                        className="object-contain w-full h-full"
                        unoptimized={true}
                      />
                    </div>
                  )}
                </div>
                
                {/* Hover overlay with name and description */}
                <div className="absolute inset-0 p-3 bg-gradient-to-br from-purple-600/90 to-blue-900/90 flex flex-col justify-start pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10 overflow-hidden">
                  <div className="text-white text-xs font-semibold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="font-bold">{venture.name}</div>
                    <div className="font-normal text-[10px] mt-1 line-clamp-6">{venture.description}</div>
                  </div>
                  <div className="w-8 h-0.5 bg-white/40 mb-1"></div>
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