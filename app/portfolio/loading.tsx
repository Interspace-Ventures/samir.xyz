'use client';

import { staticMetrics, PortfolioSummary } from '@/lib/static-metrics';
import MetricCard from '../components/metric-card';

/**
 * Portfolio Page Loading Component
 * 
 * Shows static metrics data immediately while loading the portfolio content
 * Uses elegant skeleton loaders without loading text
 */
export default function Loading() {
  // Format multiple with x suffix - same as in metrics component
  const formatMultiple = (multiple: number) => {
    return `${multiple.toFixed(1)}x`;
  };
  
  // Format percentage with % symbol - same as in metrics component
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };
  
  return (
    <div className="pt-16 pb-16">
      <section className="section">
        <div className="container max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Portfolio</h1>
          
          {/* Investment Philosophy */}
          <p className="text-lg text-text-tertiary mb-8 max-w-3xl">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
          
          {/* Static Metrics - Show immediately without loading */}
          <div className="mb-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
              {/* Display static metrics */}
              <MetricCard label="# Investments" value={staticMetrics.total_investments} />
              <MetricCard label="# Markups" value={staticMetrics.markups} />
              <MetricCard label="# Acquisitions" value={staticMetrics.acquisitions} />
              <MetricCard label="# Busts" value={staticMetrics.busts} />
              <MetricCard label="TVPI" value={formatMultiple(staticMetrics.tvpi)} />
              <MetricCard label="Gross Multiple" value={formatMultiple(staticMetrics.gross_multiple)} />
              <MetricCard label="Net Multiple" value={formatMultiple(staticMetrics.net_multiple)} />
              <MetricCard label="IRR" value={formatPercentage(staticMetrics.irr)} />
            </div>
          </div>
          
          {/* Portfolio Gallery Skeleton */}
          <div className="mt-8">
            {/* Category tabs skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
              {Array(5).fill(0).map((_, index) => (
                <div 
                  key={`category-skeleton-${index}`}
                  className="h-8 w-24 bg-white/5 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
            
            {/* Portfolio grid skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array(12).fill(0).map((_, index) => (
                <div
                  key={`portfolio-skeleton-${index}`}
                  className="bg-white/5 border border-purple-900/30 rounded-lg overflow-hidden animate-pulse"
                >
                  {/* Company logo placeholder */}
                  <div className="aspect-video p-6 flex items-center justify-center">
                    <div className="w-20 h-12 rounded-md bg-white/10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}