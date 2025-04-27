'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MetricCard from './metric-card';

type PortfolioSummary = {
  total_investments: number;
  markups: number;
  acquisitions: number;
  busts: number;
  tvpi: number;
  gross_multiple: number;
  net_multiple: number;
  irr: number;
};

/**
 * Portfolio Metrics Component
 * 
 * This component manages its own data loading and displays the portfolio metrics
 */
export default function PortfolioMetrics() {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  
  // Fetch metrics data with a smaller payload
  const { data: metricsData, isLoading, error } = useQuery({
    queryKey: ['portfolio-metrics'],
    queryFn: async () => {
      const response = await fetch('/api/metrics');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio metrics');
      }
      return response.json();
    },
    retry: 2
  });
  
  useEffect(() => {
    if (metricsData) {
      setSummary({
        total_investments: metricsData.total_investments,
        markups: metricsData.markups,
        acquisitions: metricsData.acquisitions,
        busts: metricsData.busts,
        tvpi: metricsData.tvpi,
        gross_multiple: metricsData.gross_multiple,
        net_multiple: metricsData.net_multiple,
        irr: metricsData.irr
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
  
  if (isLoading || !summary) {
    // Return an empty div instead of a loading state
    // The skeleton loader will be displayed by the parent component
    return null;
  }
  
  if (error) {
    // Also return null on error, let the parent component handle the skeleton display
    console.error('Error loading portfolio metrics:', error);
    return null;
  }
  
  return (
    <div className="mb-8 max-w-7xl mx-auto">
      {/* Metrics Grid - Ensuring 4 per row on medium screens for most viewports */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6">
        {/* Total Investments */}
        <MetricCard label="# Investments" value={summary.total_investments} />
        
        {/* Markups */}
        <MetricCard label="# Markups" value={summary.markups} />
        
        {/* Acquisitions */}
        <MetricCard label="# Acquisitions" value={summary.acquisitions} />
        
        {/* Busts */}
        <MetricCard label="# Busts" value={summary.busts} />
        
        {/* TVPI */}
        <MetricCard label="TVPI" value={formatMultiple(summary.tvpi)} />
        
        {/* Gross Multiple */}
        <MetricCard label="Gross Multiple" value={formatMultiple(summary.gross_multiple)} />
        
        {/* Net Multiple */}
        <MetricCard label="Net Multiple" value={formatMultiple(summary.net_multiple)} />
        
        {/* IRR */}
        <MetricCard label="IRR" value={formatPercentage(summary.irr)} />
      </div>
    </div>
  );
}