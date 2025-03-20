"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

// Import components with proper error handling
const StatsSection = dynamic(
  () => {
    console.log('Loading StatsSection component');
    return import('@/components/stats-section').then(mod => {
      console.log('StatsSection loaded:', mod);
      return mod.default;
    });
  },
  {
    loading: () => {
      console.log('StatsSection showing loading state');
      return <div className="w-full grid gap-3 rounded-xl p-3 bg-purple-100 dark:bg-purple-900/30 backdrop-blur-sm animate-pulse">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-4 bg-purple-100 dark:bg-purple-900/30 rounded w-16" />
              <div className="h-6 bg-purple-50 dark:bg-purple-900/20 rounded w-12" />
            </div>
          ))}
        </div>
      </div>;
    },
    ssr: false
  }
);

const PortfolioCards = dynamic(
  () => {
    console.log('Loading PortfolioCards component');
    return import('@/components/portfolio-cards').then(mod => {
      console.log('PortfolioCards loaded:', mod);
      return mod.default;
    });
  },
  {
    loading: () => {
      console.log('PortfolioCards showing loading state');
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="aspect-[3/2] bg-purple-100 dark:bg-purple-900/30 rounded-lg animate-pulse" />
          ))}
        </div>
      );
    },
    ssr: false
  }
);

export default function Portfolio() {
  console.log('Rendering Portfolio page');

  return (
    <div className="transform-gpu">
      <div className="flex flex-col gap-8 mb-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>

        <ErrorBoundary name="StatsSection">
          <Suspense fallback={
            <div className="w-full grid gap-3 rounded-xl p-3 bg-purple-100 dark:bg-purple-900/30 animate-pulse">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-4 bg-purple-50 dark:bg-purple-900/20 rounded w-16" />
                    <div className="h-6 bg-purple-50/50 dark:bg-purple-900/10 rounded w-12" />
                  </div>
                ))}
              </div>
            </div>
          }>
            <StatsSection />
          </Suspense>
        </ErrorBoundary>
      </div>

      <ErrorBoundary name="PortfolioCards">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="aspect-[3/2] bg-purple-100 dark:bg-purple-900/30 rounded-lg animate-pulse" />
            ))}
          </div>
        }>
          <PortfolioCards />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}