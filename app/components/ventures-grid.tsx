import { useQuery } from '@tanstack/react-query';
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

const fetchVentures = async (): Promise<Venture[]> => {
  const response = await fetch('/api/ventures');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function VenturesGrid() {
  const [mounted, setMounted] = useState(false);
  
  // Use useEffect to set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { data: ventures = [], isLoading, error } = useQuery<Venture[]>({
    queryKey: ['ventures'],
    queryFn: fetchVentures,
    retry: 1,
    enabled: mounted, // Only run the query after component is mounted
  });

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
          {/* 2 rows of 4 columns grid (on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Show exactly 8 ventures in a 2x4 grid */}
            {[...ventures].slice(0, 8).map((venture, index) => (
              <div key={venture.id} className="grid-square-item">
                <VentureCard 
                  venture={venture} 
                  index={index} 
                />
              </div>
            ))}
            {/* Add empty placeholders if less than 8 ventures to maintain 2x4 grid */}
            {ventures.length < 8 && Array(8 - ventures.length).fill(0).map((_, index) => (
              <div key={`empty-${index}`} className="grid-square-item bg-zinc-900/30"></div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}