"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Head from 'next/head'

// Lazy load components
const StatsSection = dynamic(() => import('@/components/StatsSection'), {
  ssr: true // Enable SSR for stats as it's static content
});

const PortfolioLogos = dynamic(() => import('@/components/PortfolioLogos'), {
  loading: () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="relative bg-white dark:bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="aspect-[3/2] relative p-4">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
          </div>
        </div>
      ))}
    </div>
  ),
  ssr: false // Disable SSR for this component to reduce initial load time
})

export default function Portfolio() {
  return (
    <>
      <Head>
        {/* Preload critical assets */}
        <link rel="preload" href="/images/portfolio-logos/Afar.png" as="image" />
        <link rel="preload" href="/images/portfolio-logos/AON3D.png" as="image" />
        <link rel="preload" href="/fonts/inter-var-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Add prefetch hints for other routes */}
        <link rel="prefetch" href="/ventures" />
        <link rel="prefetch" href="/" />
      </Head>
      <div className="transform-gpu">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
              I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
            </p>
          </div>

          <Suspense fallback={<div className="w-full lg:w-auto grid gap-3 rounded-xl p-3 bg-card/50 backdrop-blur-sm animate-pulse" />}>
            <StatsSection />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <PortfolioLogos />
        </Suspense>
      </div>
    </>
  )
}