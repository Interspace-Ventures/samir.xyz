'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MetricCard from './metric-card';
import { staticMetrics, PortfolioSummary } from '@/lib/static-metrics';

/**
 * Standalone Portfolio Metrics Summary Component
 * 
 * This component displays portfolio metrics from static data immediately
 * and then updates with fresh data from the API once loaded.
 * This approach eliminates the initial loading state for metrics.
 */
export default function MetricsSummaryStandalone() {
  // Initialize with static metrics for immediate rendering
  const [summary, setSummary] = useState<PortfolioSummary>(staticMetrics);
  
  // Fetch fresh metrics data with a smaller payload
  const { data: metricsData, error } = useQuery<PortfolioSummary>({
    queryKey: ['portfolio-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/metrics');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio metrics');
      }
      const data = await response.json();
      return data as PortfolioSummary;
    },
    retry: 2,
    // Only refetch when component mounts but not on other events
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000 // Consider data fresh for 5 minutes
  });
  
  useEffect(() => {
    if (metricsData) {
      // Update with fresh data from API
      setSummary({
        total_investments: metricsData.total_investments || staticMetrics.total_investments,
        markups: metricsData.markups || staticMetrics.markups,
        acquisitions: metricsData.acquisitions || staticMetrics.acquisitions,
        busts: metricsData.busts || staticMetrics.busts,
        tvpi: metricsData.tvpi || staticMetrics.tvpi,
        gross_multiple: metricsData.gross_multiple || staticMetrics.gross_multiple,
        net_multiple: metricsData.net_multiple || staticMetrics.net_multiple,
        irr: metricsData.irr || staticMetrics.irr
      });
    }
  }, [metricsData]);

  // Format multiple with x suffix
  const formatMultiple = (multiple: number) => {
    return `${multiple.toFixed(1)}x`;
  };
  
  // Format percentage with % symbol
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };
  
  if (error || !summary) {
    // Instead of error text, show skeleton loaders
    return (
      <div className="w-full mb-10 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
          {/* Generate 8 skeleton metric cards */}
          {Array(8).fill(0).map((_, index) => (
            <div 
              key={`skeleton-error-${index}`}
              className="relative bg-white/5 p-4 rounded-lg border border-purple-900/30 animate-pulse"
            >
              <div className="h-3 w-16 bg-purple-300/20 rounded mb-2"></div>
              <div className="h-7 w-20 bg-purple-300/30 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8 max-w-7xl mx-auto">
      {/* Metrics Grid - Ensuring 4 per row on medium screens for most viewports */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
        {/* Total Investments */}
        <MetricCard label="# Investments" value={summary.total_investments} index={0} />
        
        {/* Markups */}
        <MetricCard label="# Markups" value={summary.markups} index={1} />
        
        {/* Acquisitions */}
        <MetricCard label="# Acquisitions" value={summary.acquisitions} index={2} />
        
        {/* Busts */}
        <MetricCard label="# Busts" value={summary.busts} index={3} />
        
        {/* TVPI */}
        <MetricCard label="TVPI" value={formatMultiple(summary.tvpi)} index={4} />
        
        {/* Gross Multiple */}
        <MetricCard label="Gross Multiple" value={formatMultiple(summary.gross_multiple)} index={5} />
        
        {/* Net Multiple */}
        <MetricCard label="Net Multiple" value={formatMultiple(summary.net_multiple)} index={6} />
        
        {/* IRR */}
        <MetricCard label="IRR" value={formatPercentage(summary.irr)} index={7} />
      </div>
    </div>
  );
}