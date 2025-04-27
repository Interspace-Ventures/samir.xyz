'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type Venture = {
  id: number;
  name: string;
  description: string;
  logoUrl?: string | null;
  website?: string | null;
  featured: boolean;
};

export default function VenturesNewPage() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError('Failed to load ventures');
        setIsLoading(false);
      }
    }

    fetchVentures();
  }, []);

  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white">Interspace Ventures</h1>
          </div>
          <p className="text-lg text-text-tertiary mb-10 max-w-3xl">
            I create apps and concepts by coding at the speed of thought using Replit.
          </p>

          {/* Single ventures container with consistent height to prevent layout shifts */}
          <div className="ventures-container" style={{ minHeight: '480px' }}>
            {/* Content layer - shows actual content when loaded */}
            <div className="content-layer">
              {!isLoading && !error && (
                <div className="w-full mx-auto">
                  {/* Using grid layout that matches the skeleton exactly */}
                  <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
                    {ventures.slice(0, 8).map((venture, index) => (
                      <div key={venture.id} className="relative aspect-square">
                        <a 
                          href={venture.website || '#'} 
                          target="_blank" 
                          rel="noreferrer"
                          className="block w-full h-full absolute inset-0 overflow-hidden group cursor-pointer"
                        >
                          {/* Main visible content - logo fills entire space */}
                          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                            {venture.logoUrl && (
                              <div className="venture-logo flex items-center justify-center w-full h-full">
                                <Image 
                                  src={venture.logoUrl} 
                                  alt={`${venture.name} logo`}
                                  width={200}
                                  height={200}
                                  className="object-contain w-full h-full"
                                  priority
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
                      </div>
                    ))}

                    {/* Add placeholders if needed to maintain grid layout */}
                    {ventures.length < 8 && 
                      Array(8 - ventures.length)
                        .fill(0)
                        .map((_, index) => (
                          <div 
                            key={`empty-${index}`} 
                            className="relative aspect-square bg-zinc-900/30"
                          ></div>
                        ))
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Skeleton layer - always shows the same skeleton */}
            <div className="skeleton-layer">
              <div className="w-full mx-auto mb-12">
                <div className="grid grid-cols-4 gap-6 max-sm:grid-cols-2">
                  {Array(8).fill(0).map((_, index) => (
                    <div
                      key={`venture-skeleton-${index}`}
                      className="relative aspect-square"
                    >
                      <div className="absolute inset-0 bg-black/20 border border-purple-900/20 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {/* No mini circle placeholder for consistent experience */}
                        </div>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}