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

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-text-secondary">Loading ventures...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <div className="text-red-400">Error loading ventures. Please try again later.</div>
        </div>
      ) : (
        <div className="w-full mx-auto">
          {/* Fixed grid layout: 2x4 on desktop, 4x2 on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Show exactly 8 ventures in grid */}
            {[...ventures]
              .slice(0, 8)
              .map((venture, index) => (
                <div key={venture.id} className="aspect-square relative">
                  <VentureCard 
                    venture={venture} 
                    index={index} 
                  />
                </div>
              ))}
            {/* Add empty placeholders if less than 8 ventures to maintain grid layout */}
            {ventures.length < 8 && Array(8 - ventures.length).fill(0).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square bg-zinc-900/30"></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}