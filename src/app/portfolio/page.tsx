"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load components with simpler loading states
const StatsSection = dynamic(() => import('@/components/StatsSection'), {
  loading: () => <div className="w-full lg:w-auto grid gap-3 rounded-xl p-3 bg-card/50" />
});

const PortfolioLogos = dynamic(() => import('@/components/PortfolioLogos'), {
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="aspect-[3/2] bg-card/50 rounded-lg animate-pulse" />
      ))}
    </div>
  )
});

export default function Portfolio() {
  return (
    <div className="transform-gpu">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>

        <Suspense fallback={<div className="w-full lg:w-auto grid gap-3 rounded-xl p-3 bg-card/50" />}>
          <StatsSection />
        </Suspense>
      </div>

      <Suspense>
        <PortfolioLogos />
      </Suspense>
    </div>
  )
}