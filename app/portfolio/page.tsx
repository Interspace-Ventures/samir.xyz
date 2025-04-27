'use client';

// Import components directly for initial render
import dynamic from 'next/dynamic';
import MetricsSkeleton from '../components/metrics-skeleton';
import PortfolioGallerySkeleton from '../components/portfolio-gallery-skeleton';

// Use dynamic imports for data components with no loading indicator (using Suspense instead)
const MetricsSummaryStandalone = dynamic(() => import('../components/metrics-summary-standalone'), {
  ssr: false,
  loading: () => null // No loading indicator since we're using Suspense
});

const PortfolioGallery = dynamic(() => import('../components/portfolio-gallery'), {
  ssr: false,
  loading: () => null // No loading indicator since we're using Suspense
});

export default function PortfolioPage() {
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
            <div className="content-layer">
              <MetricsSummaryStandalone />
            </div>
            
            <div className="skeleton-layer">
              <MetricsSkeleton />
            </div>
          </div>
          
          {/* Show gallery skeleton immediately while loading content in background */}
          <div className="portfolio-container">
            <div className="content-layer">
              <PortfolioGallery />
            </div>
            
            <div className="skeleton-layer">
              <PortfolioGallerySkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}