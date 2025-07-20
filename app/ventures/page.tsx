'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function VenturesPage() {
  const [ventures, setVentures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {Array.from({ length: 8 }).map((_, index) => (
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
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full">
              {ventures && ventures.length > 0 && ventures.map((venture) => (
                <a
                  key={venture.id}
                  href={venture.status === 'Pre-launch' ? '/launching-soon' : (venture.website || '#')}
                  target={venture.status === 'Pre-launch' ? '_self' : '_blank'}
                  rel={venture.status === 'Pre-launch' ? '' : 'noopener noreferrer'}
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
                </a>
              ))}
            </div>
          )}
          
          {(!ventures || ventures.length === 0) && !loading && !error && (
            <p className="text-gray-500 text-center py-12">No ventures found.</p>
          )}
        </div>
      </section>
    </div>
  );
}