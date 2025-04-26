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
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <p className="text-text-secondary max-w-2xl">
            I create apps and concepts by coding at the speed of thought using Replit.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-pulse text-text-secondary">Loading ventures...</div>
        </div>
      ) : error ? (
        <div className="flex justify-center py-10">
          <div className="text-red-400">Error loading ventures. Please try again later.</div>
        </div>
      ) : (
        // Modified grid - 3x3 on desktop, 2 columns on tablet, 1 column on mobile
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ventures.map((venture, index) => (
            <VentureCard 
              key={venture.id} 
              venture={venture} 
              index={index} 
            />
          ))}
        </div>
      )}
    </>
  );
}