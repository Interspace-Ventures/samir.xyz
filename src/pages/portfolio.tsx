import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from '@/components/error-boundary';

// Simplified loading states
const LoadingStats = () => (
  <div className="w-full grid gap-3 rounded-xl p-3 bg-purple-100 dark:bg-purple-900/30 backdrop-blur-sm">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 bg-purple-50 dark:bg-purple-900/20 rounded animate-pulse" />
      ))}
    </div>
  </div>
);

const LoadingCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <div key={i} className="aspect-[3/2] bg-purple-100 dark:bg-purple-900/30 rounded-lg animate-pulse" />
    ))}
  </div>
);

// Dynamically import components with error handling
const StatsSection = dynamic(
  () => import('@/components/stats-section').catch(err => {
    console.error('Failed to load StatsSection:', err);
    return () => <div>Failed to load stats</div>;
  }),
  {
    loading: () => <LoadingStats />,
    ssr: false
  }
);

const PortfolioCards = dynamic(
  () => import('@/components/portfolio-cards').catch(err => {
    console.error('Failed to load PortfolioCards:', err);
    return () => <div>Failed to load portfolio</div>;
  }),
  {
    loading: () => <LoadingCards />,
    ssr: false
  }
);

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Portfolio | Professional Projects</title>
        <meta name="description" content="Showcase of professional projects and investments" />
      </Head>

      <header className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Portfolio Site</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a></li>
              <li><a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Portfolio</a></li>
              <li><a href="/ventures" className="text-blue-600 dark:text-blue-400 hover:underline">Ventures</a></li>
              <li><a href="/debug" className="text-blue-600 dark:text-blue-400 hover:underline">Debug</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
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
      </main>

      <footer className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Portfolio Site</p>
        </div>
      </footer>
    </div>
  );
}