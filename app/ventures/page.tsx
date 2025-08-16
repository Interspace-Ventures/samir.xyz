'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Venture {
  id: number;
  name: string;
  description: string;
  logoUrl?: string | null;
  website?: string | null;
  featured: boolean;
  status?: string | null;
}

export default function VenturesPage() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedVenture, setSelectedVenture] = useState<string>('');

  useEffect(() => {
    fetch('/api/ventures-detailed')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          setVentures(data);
        } else {
          console.error('Expected array but got:', data);
          setVentures([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching ventures:', err);
        setError(err.message);
        setVentures([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-20 pb-16">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ventures
          </h1>
          
          <div className="content-card mb-10 font-medium">
            I develop apps and design concepts by building at the speed of thought using AI.
          </div>
          
          {loading && (
            <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl mx-auto">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-white border-2 border-black relative overflow-hidden"
                  style={{
                    boxShadow: '0 0 0 2px #000, 4px 4px 0px 0px #000',
                  }}
                >
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          )}
          
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl mx-auto">
              {ventures && ventures.length > 0 && ventures.map((venture) => (
                <div
                  key={venture.id}
                  onClick={(e) => {
                    if (venture.status === 'Pre-launch') {
                      e.preventDefault();
                      setSelectedVenture(venture.name);
                      setShowComingSoon(true);
                      setTimeout(() => setShowComingSoon(false), 3000); // Auto hide after 3 seconds
                    } else if (venture.website) {
                      window.open(venture.website, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="group aspect-square bg-white relative overflow-hidden block cursor-pointer"
                  style={{
                    boxShadow: '0 0 0 2px #000, 4px 4px 0px 0px #000',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px #000, 6px 6px 0px 0px #000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px #000, 4px 4px 0px 0px #000';
                  }}
                >
                  {venture.logoUrl && (
                    <Image
                      src={venture.logoUrl}
                      alt={`${venture.name} logo`}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/80 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="text-white text-center p-4">
                      <h3 className="font-bold text-lg mb-1">{venture.name}</h3>
                      {venture.description && (
                        <p className="text-sm text-white/90">{venture.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {(!ventures || ventures.length === 0) && !loading && !error && (
            <p className="text-gray-500 text-center py-12">No ventures found.</p>
          )}
        </div>
      </section>
      
      {/* Coming Soon Popup */}
      <AnimatePresence>
        {showComingSoon && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div 
              className="bg-white text-black px-8 py-4 border-4 border-black font-bold"
              style={{
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
              }}
            >
              <p className="text-lg">
                {selectedVenture} - Launching Soon! 🚀
              </p>
              <p className="text-sm font-medium mt-1">
                Something exciting is coming...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}