'use client';

import { useEffect, useState } from 'react';

// Define investment metrics interface using kebab-case
interface InvestmentMetrics {
  investment_date?: Date | string | null;
  initial_investment?: number | null;
  original_valuation?: number | null;
  current_valuation?: number | null;
  investment_status?: string | null;
}

interface InvestmentMetricsProps {
  data: InvestmentMetrics;
  showDetailed?: boolean;
}

/**
 * Component to display investment metrics in a clean, minimal way
 */
export default function InvestmentMetrics({ data, showDetailed = true }: InvestmentMetricsProps) {
  const [metrics, setMetrics] = useState<InvestmentMetrics | null>(null);
  
  useEffect(() => {
    // Process data once mounted
    if (data) {
      setMetrics(data);
    }
  }, [data]);
  
  if (!metrics || !metrics.investment_date) {
    return null;
  }
  
  // Format date as Month Year
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };
  
  // Format currency with $ and commas
  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return 'N/A';
    return `$${amount.toLocaleString()}`;
  };
  
  // Format percentage with % symbol
  const formatPercentage = (value: number | null | undefined) => {
    if (value === null || value === undefined) return 'N/A';
    return `${(value * 100).toFixed(1)}%`;
  };
  
  // Format multiple with x suffix
  const formatMultiple = (multiple: number | null | undefined) => {
    if (multiple === null || multiple === undefined) return 'N/A';
    return `${multiple.toFixed(1)}x`;
  };
  
  // Determine color based on status
  const getStatusColor = (status: string | null | undefined) => {
    if (!status) return 'bg-bg-primary/50 text-text-secondary';
    
    switch (status) {
      case 'Active':
        return 'bg-purple-primary/20 text-text-secondary';
      case 'Exited Profitably':
        return 'bg-green-500/20 text-green-300';
      case 'Exited With Loss':
        return 'bg-orange-500/20 text-orange-300';
      case 'Written Off':
        return 'bg-red-500/20 text-red-300';
      default:
        return 'bg-bg-primary/50 text-text-secondary';
    }
  };

  // Render the compact version (just key metrics)
  if (!showDetailed) {
    return (
      <div className="text-sm">
        {/* Status Badge */}
        {metrics.investment_status && (
          <div className="mb-2">
            <span 
              className={`px-2 py-1 text-xs rounded-full ${getStatusColor(metrics.investment_status)}`}
            >
              {metrics.investment_status}
            </span>
          </div>
        )}
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
          {/* Investment Date */}
          <div className="text-text-tertiary">Invested:</div>
          <div className="text-right text-text-secondary">{formatDate(metrics.investment_date)}</div>
          
          {/* Calculate multiple if we have both values */}
          {metrics.initial_investment && metrics.current_valuation && (
            <>
              <div className="text-text-tertiary">Performance:</div>
              <div className="text-right font-medium text-text-primary">
                {formatMultiple(metrics.current_valuation / metrics.initial_investment)}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  
  // Render the detailed version
  return (
    <div className="text-sm">
      {/* Status Badge */}
      {metrics.investment_status && (
        <div className="mb-2">
          <span 
            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(metrics.investment_status)}`}
          >
            {metrics.investment_status}
          </span>
        </div>
      )}
      
      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        {/* Investment Date */}
        <div className="text-text-tertiary">Invested:</div>
        <div className="text-right text-text-secondary">{formatDate(metrics.investment_date)}</div>
        
        {/* Initial Investment */}
        {metrics.initial_investment && (
          <>
            <div className="text-text-tertiary">Initial:</div>
            <div className="text-right text-text-secondary">{formatCurrency(metrics.initial_investment)}</div>
          </>
        )}
        
        {/* Original Valuation */}
        {metrics.original_valuation && (
          <>
            <div className="text-text-tertiary">Original Value:</div>
            <div className="text-right text-text-secondary">{formatCurrency(metrics.original_valuation)}</div>
          </>
        )}
        
        {/* Current Valuation */}
        {metrics.current_valuation && (
          <>
            <div className="text-text-tertiary">Current Value:</div>
            <div className="text-right text-text-secondary">{formatCurrency(metrics.current_valuation)}</div>
          </>
        )}
        
        {/* Calculate multiple if we have both values */}
        {metrics.initial_investment && metrics.current_valuation && (
          <>
            <div className="text-text-tertiary">Multiple:</div>
            <div className="text-right font-medium text-text-primary">
              {formatMultiple(metrics.current_valuation / metrics.initial_investment)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}