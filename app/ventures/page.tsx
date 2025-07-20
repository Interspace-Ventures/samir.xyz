'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function VenturesPage() {
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('VenturesPage - Fetching data...');
    fetch('/api/ventures-detailed')
      .then(res => {
        console.log('Response status:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Ventures data received:', data);
        setVentures(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching ventures:', err);
        setError(err.message);
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
          
          {loading && <p className="text-white">Loading ventures...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {ventures.map((venture) => (
                <a
                  key={venture.id}
                  href={venture.website || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-[120px] bg-white relative overflow-hidden block cursor-pointer"
                  style={{
                    boxShadow: '0 0 0 2px #000, 4px 4px 0px 0px #000',
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
                </a>
              ))}
            </div>
          )}
          
          {ventures.length === 0 && !loading && (
            <p className="text-gray-500 text-center py-12">No ventures found.</p>
          )}
        </div>
      </section>
    </div>
  );
}