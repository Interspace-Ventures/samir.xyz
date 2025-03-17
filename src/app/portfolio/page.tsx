"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

// Lazy load components with better error handling
const StatsSection = dynamic(() => import('@/components/stats-section').catch(err => {
  console.error('Failed to load StatsSection:', err);
  return () => <div className="w-full grid gap-3 rounded-xl p-3 bg-card/50" />;
}), {
  loading: () => <div className="w-full grid gap-3 rounded-xl p-3 bg-card/50" />,
  ssr: false // Disable SSR for this component to prevent hydration issues
});

const PortfolioLogos = dynamic(() => import('@/components/portfolio-logos').catch(err => {
  console.error('Failed to load PortfolioLogos:', err);
  return () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="aspect-[3/2] bg-card/50 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}), {
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="aspect-[3/2] bg-card/50 rounded-lg animate-pulse" />
      ))}
    </div>
  ),
  ssr: false // Disable SSR for this component to prevent hydration issues
});

export default function Portfolio() {
  return (
    <div className="transform-gpu">
      <div className="flex flex-col gap-8 mb-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>

        <ErrorBoundary>
          <Suspense fallback={<div className="w-full grid gap-3 rounded-xl p-3 bg-card/50" />}>
            <StatsSection />
          </Suspense>
        </ErrorBoundary>
      </div>

      <ErrorBoundary>
        <Suspense fallback={
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[3/2] bg-card/50 rounded-lg animate-pulse" />
            ))}
          </div>
        }>
          <PortfolioLogos />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}