'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import VenturesGridSkeleton from '../components/ventures-grid-skeleton';

// Import the components with dynamic loading but no fallback (we use our own skeleton)
const VenturesGridMinimal = dynamic(() => import('../components/ventures-grid-minimal'), {
  ssr: false,
  loading: () => null // No loading indicator since we're using our own skeleton
});

const DetailedVenturesSection = dynamic(() => import('../components/ventures-grid-detailed'), {
  ssr: false,
  loading: () => null // No loading indicator since we're using our own skeleton
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
    <div className="pt-20 pb-16">
      <section className="section">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ventures</h1>
          </div>
          <div className="content-card mb-10 font-medium">
            I create apps and concepts by coding at the speed of thought using Replit.
          </div>
          
          {/* Single ventures container with proper min-height to prevent layout shifts */}
          <div className="ventures-container" style={{ minHeight: '480px' }}>
            {/* Content layer - shows either minimal or detailed content */}
            <div className="content-layer">
              {showDetails ? <DetailedVenturesSection /> : <VenturesGridMinimal />}
            </div>
            
            {/* Single skeleton layer that's always the same regardless of content type */}
            <div className="skeleton-layer">
              <VenturesGridSkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}