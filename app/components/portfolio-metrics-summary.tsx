'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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

export default function PortfolioMetricsSummary() {
  const [summary, setSummary] = useState<PortfolioSummary | null>(null);
  
  // Fetch all portfolio data
  const { data: portfolioData, isLoading, error } = useQuery({
    queryKey: ['portfolio-all'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio?includeMetrics=true');
      if (!response.ok) {
        throw new Error('Failed to fetch portfolio data');
      }
      return response.json();
    },
    retry: 3
  });
  
  useEffect(() => {
    if (portfolioData?.items && portfolioData.items.length > 0) {
      // Calculate summary metrics
      const items = portfolioData.items;
      
      // Count statuses
      let markupCount = 0;
      let acquisitionCount = 0;
      
      items.forEach((item: any) => {
        // Count based on investment_status field
        if (item.investment_status === 'Markup') {
          markupCount++;
        }
        if (item.investment_status === 'Acquired' || item.investment_status === 'Exited') {
          acquisitionCount++;
        }
      });
      
      // Set hardcoded and calculated metrics
      // These values are from the requested metrics
      setSummary({
        total_investments: items.length + 4, // Add 4 for "busts" as requested
        markups: markupCount,
        acquisitions: acquisitionCount,
        busts: 4, // Hardcoded value as requested
        tvpi: 1.44, // Hardcoded value as requested
        gross_multiple: 1.22, // Hardcoded value as requested
        net_multiple: 1.12, // Hardcoded value as requested
        irr: 10 // Hardcoded value as requested
      });
    }
  }, [portfolioData]);

  // Format currency with $ and commas
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };
  
  // Format multiple with x suffix
  const formatMultiple = (multiple: number) => {
    return `${multiple.toFixed(1)}x`;
  };
  
  if (isLoading) {
    return (
      <div className="w-full py-10 text-center text-text-secondary">
        <p>Loading portfolio metrics...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w-full py-10 text-center text-red-500">
        <p>Failed to load portfolio metrics</p>
      </div>
    );
  }
  
  if (!summary) {
    return (
      <div className="w-full py-10 text-center text-text-secondary">
        <p>No portfolio metrics available</p>
      </div>
    );
  }
  
  // Format percentage with % symbol
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };
  
  return (
    <div className="mb-8">
      {/* Metrics Grid - 4 per row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Total Investments */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1"># Investments</div>
          <div className="text-2xl font-medium text-text-primary">{summary.total_investments}</div>
        </div>
        
        {/* Markups */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1"># Markups</div>
          <div className="text-2xl font-medium text-text-primary">{summary.markups}</div>
        </div>
        
        {/* Acquisitions */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1"># Acquisitions</div>
          <div className="text-2xl font-medium text-text-primary">{summary.acquisitions}</div>
        </div>
        
        {/* Busts */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1"># Busts</div>
          <div className="text-2xl font-medium text-text-primary">{summary.busts}</div>
        </div>
        
        {/* TVPI */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1">TVPI</div>
          <div className="text-2xl font-medium text-text-primary">{formatMultiple(summary.tvpi)}</div>
        </div>
        
        {/* Gross Multiple */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1">Gross Multiple</div>
          <div className="text-2xl font-medium text-text-primary">{formatMultiple(summary.gross_multiple)}</div>
        </div>
        
        {/* Net Multiple */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1">Net Multiple</div>
          <div className="text-2xl font-medium text-text-primary">{formatMultiple(summary.net_multiple)}</div>
        </div>
        
        {/* IRR */}
        <div className="bg-purple-dark p-4 rounded-lg border border-purple-primary/20">
          <div className="text-sm text-text-tertiary mb-1">IRR</div>
          <div className="text-2xl font-medium text-text-primary">{formatPercentage(summary.irr)}</div>
        </div>
      </div>
    </div>
  );
}