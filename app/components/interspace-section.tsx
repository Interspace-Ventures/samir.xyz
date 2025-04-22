'use client';

import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

// Define types
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

// Fallback ventures if the database is empty
const fallbackVentures: Venture[] = [
  {
    id: 1,
    name: 'Digital Art Studio',
    description: 'Exploring the boundaries of digital creativity',
    logoUrl: null,
    website: null,
    industry: 'Art & Design',
    founded: 2022,
    featured: true,
  },
  {
    id: 2,
    name: 'Interactive Lab',
    description: 'Pushing the boundaries of web interactivity',
    logoUrl: null,
    website: null,
    industry: 'Technology',
    founded: 2023,
    featured: true,
  },
  {
    id: 3,
    name: 'Concept Factory',
    description: 'Ideas and concepts for future projects',
    logoUrl: null,
    website: null,
    industry: 'Design',
    founded: 2024,
    featured: true,
  },
];

// Color pairs for gradient backgrounds
const colorPairs = [
  ['from-purple-dark', 'to-purple-primary'],
  ['from-purple-primary/80', 'to-purple-light'],
  ['from-purple-dark/90', 'to-purple-primary/80'],
  ['from-purple-primary/70', 'to-purple-dark'],
  ['from-purple-light/90', 'to-purple-primary'],
];

const fetchVentures = async (): Promise<Venture[]> => {
  const response = await fetch('/api/ventures');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const InterspaceSection = () => {
  const { data: ventures, isLoading, error } = useQuery<Venture[]>({
    queryKey: ['ventures'],
    queryFn: fetchVentures,
    retry: 1,
    initialData: [],
  });

  // Show either fetched ventures or fallback ventures if none are available
  const displayVentures = ventures && ventures.length > 0 ? ventures : fallbackVentures;

  return (
    <>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <p className="text-text-secondary max-w-2xl">
            Creative initiatives, early-stage prototypes, and R&D projects from our studio.
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
          {displayVentures.map((venture, index) => {
            // Get a color pair based on the index
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
                  <h3 className="text-xl font-medium text-text-primary mb-2">{venture.name}</h3>
                  
                  {venture.industry && (
                    <div className="mb-2">
                      <span className="text-xs px-2 py-1 bg-purple-primary/30 rounded-full text-text-secondary">
                        {venture.industry}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-text-secondary text-sm mb-4 flex-grow">{venture.description}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    {venture.founded && (
                      <span className="text-xs text-text-tertiary">Est. {venture.founded}</span>
                    )}
                    
                    {venture.website && (
                      <a
                        href={venture.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-primary text-sm hover:text-text-secondary transition-colors inline-flex items-center"
                      >
                        View Project
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
          })}
        </div>
      )}
    </>
  );
};

export default InterspaceSection;