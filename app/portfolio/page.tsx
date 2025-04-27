'use client';

// Dynamically import components with loading states
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import MetricsSummaryStandalone from '../components/metrics-summary-standalone';

// Use dynamic import for portfolio gallery with lower priority
const PortfolioGallery = dynamic(() => import('../components/portfolio-gallery'), {
  loading: () => <div className="py-10 text-center">Loading portfolio gallery...</div>,
  ssr: false // Disable server-side rendering to prevent hydration issues
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
          
          {/* Load metrics summary immediately */}
          <MetricsSummaryStandalone />
          
          {/* Load portfolio gallery separately */}
          <Suspense fallback={<div className="py-6 text-center">Loading portfolio gallery...</div>}>
            <PortfolioGallery />
          </Suspense>
        </div>
      </section>
    </div>
  );
}