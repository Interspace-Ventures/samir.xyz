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
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ventures
          </h1>
          
          <div className="content-card mb-10 font-medium">
            I develop apps and design concepts by building at the speed of thought using AI.
          </div>
          
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full">
              {ventures && ventures.length > 0 && ventures.map((venture) => (
                <div
                  key={venture.id}
                  onClick={(e) => {
                    if (venture.status === 'Pre-launch') {
                      e.preventDefault();
                      setSelectedVenture(venture.name);
                      setShowComingSoon(true);
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
      
      {/* Coming Soon Drawer */}
      <AnimatePresence>
        {showComingSoon && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowComingSoon(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ 
                type: 'spring',
                damping: 30,
                stiffness: 300
              }}
              className="fixed bottom-0 left-0 right-0 z-50"
              style={{ backgroundColor: '#2a313a' }}
            >
              <div 
                className="w-full border-4 border-black relative"
                style={{
                  backgroundColor: '#332452',
                  boxShadow: '0 -4px 0px 0px rgba(0,0,0,1)',
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-[#7f54dc] hover:bg-[#6a3fd4] border-2 border-black transition-colors"
                  style={{
                    boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
                  }}
                  aria-label="Close"
                >
                  <span className="text-white font-bold text-xl">×</span>
                </button>
                
                {/* Content */}
                <div className="px-8 py-8 max-w-2xl mx-auto">
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {selectedVenture}
                  </h2>
                  <div className="bg-[#2a313a] border-2 border-black p-4" 
                    style={{
                      boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                    }}
                  >
                    <p className="text-lg font-semibold text-white">
                      Launching Soon
                    </p>
                    <p className="text-sm mt-2 text-white/80">
                      We're putting the finishing touches on something extraordinary. Stay tuned for the big reveal!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}