'use client';

import { useState, useEffect } from 'react';
import VentureCard from './venture-card';

export type Venture = {
  id: number;
  name: string;
  description: string;
  logoUrl?: string | null;
  website?: string | null;
  industry?: string | null;
  founded?: number | null;
  featured: boolean;
  status?: string | null;
};

export default function VenturesGrid() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchVentures() {
      try {
        const response = await fetch('/api/ventures');
        if (!response.ok) {
          throw new Error('Failed to fetch ventures');
        }
        const data = await response.json();
        setVentures(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching ventures:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    }
    
    fetchVentures();
  }, []);

  // Use skeleton loader for both loading and error states
  if (isLoading || error) {
    // Log error to console if present, but don't show to user
    if (error) {
      console.error('Error loading ventures:', error);
    }
    
    return (
      <div className="w-full mx-auto">
        {/* Use the same grid layout for the skeleton as the actual content */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          {/* Generate 4 skeleton venture cards */}
          {Array(4).fill(0).map((_, index) => (
            <div
              key={`venture-skeleton-${index}`}
              className="aspect-square bg-white/5 rounded-md border border-purple-900/30 relative overflow-hidden"
            >
              {/* Empty container without mini circle placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Intentionally empty for consistent loading behavior */}
              </div>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full mx-auto">
      {/* Fixed grid layout: 2x2 on both mobile and desktop */}
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
        {/* Show exactly 4 ventures in grid */}
        {[...ventures]
          .slice(0, 4)
          .map((venture, index) => (
            <div key={venture.id} className="aspect-square relative">
              <VentureCard 
                venture={venture} 
                index={index} 
              />
            </div>
          ))}
        {/* Add empty placeholders if less than 4 ventures to maintain grid layout */}
        {ventures.length < 4 && Array(4 - ventures.length).fill(0).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square bg-zinc-900/30"></div>
        ))}
      </div>
    </div>
  );
}