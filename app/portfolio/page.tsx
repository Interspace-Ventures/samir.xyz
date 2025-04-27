'use client';

// Import components directly for initial render
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import MetricsSkeleton from '../components/metrics-skeleton';
import PortfolioGallerySkeleton from '../components/portfolio-gallery-skeleton';

// Use dynamic imports for data components with loading handled by parent
const PortfolioMetrics = dynamic(() => import('../components/portfolio-metrics'), {
  ssr: false,
  loading: () => null
});

const PortfolioGalleryModular = dynamic(() => import('../components/portfolio-gallery-modular'), {
  ssr: false,
  loading: () => null
});

export default function PortfolioPage() {
  // State to track loading status of each section
  const [metricsLoaded, setMetricsLoaded] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);

  // Use effect for cleanup on unmount
  useEffect(() => {
    return () => {
      // Reset loading states when component unmounts
      setMetricsLoaded(false);
      setGalleryLoaded(false);
    };
  }, []);

  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Portfolio</h1>
          
          {/* Investment Philosophy */}
          <p className="text-lg text-text-tertiary mb-8 max-w-3xl">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
          
          {/* Show skeleton immediately while loading metrics in background */}
          <div className="metrics-container">
            {/* Content loads in the background */}
            <div className="content-layer">
              <PortfolioMetrics />
            </div>
            
            {/* Skeleton shows immediately, hides when content loads */}
            <div className="skeleton-layer">
              <MetricsSkeleton />
            </div>
          </div>
          
          {/* Show gallery skeleton immediately while loading content in background */}
          <div className="portfolio-container">
            {/* Content loads in the background */}
            <div className="content-layer">
              <PortfolioGalleryModular />
            </div>
            
            {/* Skeleton shows immediately, hides when content loads */}
            <div className="skeleton-layer">
              <PortfolioGallerySkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}