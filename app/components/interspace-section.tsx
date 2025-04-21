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
  ['from-violet-500', 'to-purple-700'],
  ['from-amber-400', 'to-orange-600'],
  ['from-teal-400', 'to-emerald-600'],
  ['from-sky-400', 'to-blue-600'],
  ['from-pink-400', 'to-rose-600'],
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
    <section id="interspace" className="section">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading-2 mb-4">Interspace</h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            A creative playground where technology meets art and imagination.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-pulse">Loading ventures...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <div className="text-red-500">Error loading ventures. Please try again later.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {displayVentures.map((venture, index) => {
              // Get a color pair based on the index
              const colorIndex = index % colorPairs.length;
              const [fromColor, toColor] = colorPairs[colorIndex];
              
              return (
                <motion.div
                  key={venture.id}
                  className={`aspect-square bg-gradient-to-br ${fromColor} ${toColor} rounded-2xl flex items-center justify-center overflow-hidden relative`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6">
                    <h3 className="heading-3 mb-2">{venture.name}</h3>
                    <p className="text-center mb-4">{venture.description}</p>
                    {venture.website && (
                      <a
                        href={venture.website}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default InterspaceSection;