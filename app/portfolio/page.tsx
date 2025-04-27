'use client';

// Dynamically import CompanySection with loading state
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Use dynamic import to fix chunk loading error
const CompanySection = dynamic(() => import('../components/company-section'), {
  loading: () => <div className="py-10 text-center">Loading portfolio data...</div>,
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
          
          <Suspense fallback={<div className="py-10 text-center">Loading portfolio data...</div>}>
            <CompanySection />
          </Suspense>
        </div>
      </section>
    </div>
  );
}