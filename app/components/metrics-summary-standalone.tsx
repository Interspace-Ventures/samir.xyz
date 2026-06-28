'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MetricCard from './metric-card';
import { staticMetrics, previousMetrics, PortfolioSummary } from '@/lib/static-metrics';

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
        total_investments: metricsData.total_investments ?? staticMetrics.total_investments,
        markups: metricsData.markups ?? staticMetrics.markups,
        acquisitions: metricsData.acquisitions ?? staticMetrics.acquisitions,
        busts: metricsData.busts ?? staticMetrics.busts,
        tvpi: metricsData.tvpi ?? staticMetrics.tvpi,
        gross_multiple: metricsData.gross_multiple ?? staticMetrics.gross_multiple,
        net_multiple: metricsData.net_multiple ?? staticMetrics.net_multiple,
        irr: metricsData.irr ?? staticMetrics.irr
      });
    }
  }, [metricsData]);

  // Format multiple with x suffix (up to 2 decimals, no trailing zeros)
  const formatMultiple = (multiple: number) => {
    return `${parseFloat(multiple.toFixed(2))}x`;
  };
  
  // Format percentage with % symbol
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };

  // Build a year-over-year change descriptor for a metric. `lowerIsBetter`
  // flips the semantic color (e.g. fewer busts is a good thing). `mode`
  // controls whether the change reads as a relative percent or raw points
  // (IRR is itself a percentage, so we show points there).
  const buildChange = (
    now: number,
    prev: number,
    lowerIsBetter: boolean,
    mode: 'percent' | 'points' = 'percent'
  ) => {
    const diff = now - prev;
    let text: string;
    if (mode === 'points') {
      const pts = parseFloat(diff.toFixed(0));
      text = `${pts > 0 ? '+' : ''}${pts} pts`;
    } else {
      const pct = prev === 0 ? 0 : parseFloat(((diff / prev) * 100).toFixed(0));
      text = `${pct > 0 ? '+' : ''}${pct}%`;
    }

    const direction: 'up' | 'down' | 'flat' =
      diff > 0 ? 'up' : diff < 0 ? 'down' : 'flat';

    let changeType: 'positive' | 'negative' | 'neutral' = 'neutral';
    if (diff !== 0) {
      const improved = lowerIsBetter ? diff < 0 : diff > 0;
      changeType = improved ? 'positive' : 'negative';
    }

    return { change: text, direction, changeType };
  };
  
  if (error || !summary) {
    // Instead of error text, show skeleton loaders
    return (
      <div className="w-full mb-10 overflow-hidden">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Generate 8 skeleton metric cards with consistent style */}
          {Array(8).fill(0).map((_, index) => (
            <div 
              key={`metric-skeleton-${index}`}
              className="relative bg-white/5 p-4 border-2 border-black animate-pulse"
              style={{
                boxShadow: '0 0 0 2px #000, 4px 4px 0px 0px rgba(0,0,0,0.2)',
              }}
            >
              <div className="h-3 w-16 bg-white/10 mb-2"></div>
              <div className="h-7 w-20 bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-8 max-w-7xl mx-auto">
      {/* Metrics Grid - Ensuring 4 per row on medium screens for most viewports */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Total Investments */}
        <MetricCard
          label="Investments"
          value={summary.total_investments}
          index={0}
          {...buildChange(summary.total_investments, previousMetrics.total_investments, false)}
          tooltip="New checks written since the last snapshot (Campus in '26, plus '25 adds like Replit, Hadrius, Highbeam, Grace) with none dropped. I count JuneShine and Sanzo as two checks each."
        />

        {/* Markups */}
        <MetricCard
          label="Markups"
          value={summary.markups}
          index={1}
          {...buildChange(summary.markups, previousMetrics.markups, false)}
          tooltip="Six names that had been paper markups slid to write-downs or back to cost over the year."
        />

        {/* Acquisitions */}
        <MetricCard
          label="Acquired"
          value={summary.acquisitions}
          index={2}
          {...buildChange(summary.acquisitions, previousMetrics.acquisitions, false)}
          tooltip="Same two exits on the books (Sugar, Toucan). No new acquisitions this year."
        />

        {/* Busts */}
        <MetricCard
          label="Busts"
          value={summary.busts}
          index={3}
          {...buildChange(summary.busts, previousMetrics.busts, true)}
          tooltip="Three 2025 busts were offset by a few names I revived, plus I split the worst survivors into a separate 'dying' bucket rather than full bust."
        />

        {/* TVPI */}
        <MetricCard
          label="TVPI"
          value={formatMultiple(summary.tvpi)}
          index={4}
          {...buildChange(summary.tvpi, previousMetrics.tvpi, false)}
          tooltip="About $30k of 2025 write-downs outweighed the AI-name markups."
        />

        {/* Gross MOIC */}
        <MetricCard
          label="Gross MOIC"
          value={formatMultiple(summary.gross_multiple)}
          index={5}
          {...buildChange(summary.gross_multiple, previousMetrics.gross_multiple, false)}
          tooltip="Fell more than net because, with fewer gains left, there is less carry to add back, so gross and net converged."
        />

        {/* Net MOIC */}
        <MetricCard
          label="Net MOIC"
          value={formatMultiple(summary.net_multiple)}
          index={6}
          {...buildChange(summary.net_multiple, previousMetrics.net_multiple, false)}
          tooltip="Same as TVPI. They are equal because I have had no material distributions (DPI is about 0)."
        />

        {/* IRR */}
        <MetricCard
          label="IRR"
          value={formatPercentage(summary.irr)}
          index={7}
          {...buildChange(summary.irr, previousMetrics.irr, false, 'points')}
          tooltip="Write-downs hit recent value and a big slug of fresh 2025 capital sits at cost (1x), dragging the time-weighted return. The clock also advanced a year on flat positions."
        />
      </div>
    </div>
  );
}