"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { Client } from "react-hydration-provider"

const LoadingStats = () => (
  <div className="w-full grid gap-3 rounded-xl p-3 bg-purple-100 dark:bg-purple-900/30 backdrop-blur-sm animate-pulse">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-1">
          <div className="h-4 bg-purple-50 dark:bg-purple-900/20 rounded w-16" />
          <div className="h-6 bg-purple-50/50 dark:bg-purple-900/10 rounded w-12" />
        </div>
      ))}
    </div>
  </div>
);

const LoadingCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 10 }, (_, i) => (
      <div key={i} className="aspect-[3/2] bg-purple-100 dark:bg-purple-900/30 rounded-lg animate-pulse" />
    ))}
  </div>
);

const StatsSection = dynamic(() => import('@/components/stats-section'), {
  loading: () => <LoadingStats />,
  ssr: false
});

const PortfolioCards = dynamic(() => import('@/components/portfolio-cards'), {
  loading: () => <LoadingCards />,
  ssr: false
});

export default function Portfolio() {
  return (
    <Client>
      <div className="transform-gpu">
        <div className="flex flex-col gap-8 mb-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
              I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
            </p>
          </div>

          <ErrorBoundary name="StatsSection">
            <Suspense fallback={<LoadingStats />}>
              <StatsSection />
            </Suspense>
          </ErrorBoundary>
        </div>

        <ErrorBoundary name="PortfolioCards">
          <Suspense fallback={<LoadingCards />}>
            <PortfolioCards />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Client>
  )
}