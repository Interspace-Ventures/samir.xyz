import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Venture = {
  id: number;
  name: string;
  description: string;
  logoUrl?: string | null;
  website?: string | null;
  industry?: string | null;
  founded?: number | null;
  featured: boolean;
};

// Color pairs for gradient backgrounds
const colorPairs = [
  ['from-blue-600', 'to-purple-600'],
  ['from-purple-600', 'to-pink-600'],
  ['from-blue-500', 'to-purple-500'],
  ['from-purple-500', 'to-blue-600'],
  ['from-purple-600', 'to-blue-500'],
  ['from-blue-600', 'to-pink-500'],
  ['from-pink-500', 'to-purple-600'],
  ['from-purple-500', 'to-pink-500'],
];

const fetchVentures = async (): Promise<Venture[]> => {
  const response = await fetch('/api/ventures');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

// VentureCard component to reduce complexity in the main component
function VentureCard({ venture, index }: { venture: Venture; index: number }) {
  const colorIndex = index % colorPairs.length;
  const [fromColor, toColor] = colorPairs[colorIndex];
  
  return (
    <motion.div
      key={venture.id}
      className={`card-venture bg-gradient-to-br ${fromColor} ${toColor} rounded-xl overflow-hidden relative`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center mb-3">
          {venture.logoUrl && (
            <div className="venture-logo w-14 h-14 mr-3 rounded-md overflow-hidden bg-white/10 flex items-center justify-center p-1">
              <Image 
                src={venture.logoUrl} 
                alt={`${venture.name} logo`}
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          )}
          <h3 className="text-xl font-medium text-white leading-tight">{venture.name}</h3>
        </div>
        
        {venture.industry && (
          <div className="mb-3">
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-white/80">
              {venture.industry}
            </span>
          </div>
        )}
        
        <p className="text-white/70 text-sm mb-4 flex-grow">{venture.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-white/10">
          {venture.founded && (
            <span className="text-xs text-white/50">Est. {venture.founded}</span>
          )}
          
          {venture.website && (
            <a
              href={venture.website}
              target="_blank"
              rel="noreferrer"
              className="text-white text-sm hover:text-white/80 transition-colors inline-flex items-center"
            >
              Visit
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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
            A collection of innovative ventures, side projects, and creative initiatives.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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