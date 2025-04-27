'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import VenturesGridMinimal from '../components/ventures-grid-minimal';

// Load the full ventures view with detailed descriptions later
const DetailedVenturesSection = dynamic(() => import('../components/ventures-grid-detailed'), {
  loading: () => <div className="text-center py-3 text-text-secondary text-sm">Loading detailed view...</div>,
  ssr: false,
});

export default function VenturesPage() {
  const [showDetails, setShowDetails] = useState(false);

  // After main content loads, begin loading detailed view in background
  useEffect(() => {
    // Set a small timeout to prioritize the initial minimal view rendering
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16 pb-16 bg-[#2d0c6a]">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white">Interspace Ventures</h1>
          </div>
          <p className="text-lg text-text-tertiary mb-10 max-w-3xl">
            I create apps and concepts by coding at the speed of thought using Replit.
          </p>
          
          {/* Show minimal grid immediately */}
          <div style={{ display: showDetails ? 'none' : 'block' }}>
            <VenturesGridMinimal />
          </div>
          
          {/* Load detailed grid after initial render */}
          {showDetails && (
            <Suspense fallback={<div className="text-center mt-2">Loading detailed view...</div>}>
              <DetailedVenturesSection />
            </Suspense>
          )}
        </div>
      </section>
    </div>
  );
}