'use client';

import { useEffect, useState } from 'react';

// Define investment metrics interface using kebab-case
interface InvestmentMetrics {
  investment_date?: Date | string | null;
  initial_investment?: number | null;
  current_valuation?: number | null;
  return_multiple?: number | null;
  annualized_return?: number | null;
  exit_date?: Date | string | null;
  exit_amount?: number | null;
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
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Exited Profitably':
        return 'bg-green-100 text-green-800';
      case 'Exited With Loss':
        return 'bg-orange-100 text-orange-800';
      case 'Written Off':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
          <div className="text-gray-500">Invested:</div>
          <div className="text-right">{formatDate(metrics.investment_date)}</div>
          
          {/* Return Multiple (if available) */}
          {metrics.return_multiple && metrics.return_multiple > 0 && (
            <>
              <div className="text-gray-500">Multiple:</div>
              <div className="text-right font-medium">{formatMultiple(metrics.return_multiple)}</div>
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
        <div className="text-gray-500">Invested:</div>
        <div className="text-right">{formatDate(metrics.investment_date)}</div>
        
        {/* Initial Investment */}
        {metrics.initial_investment && (
          <>
            <div className="text-gray-500">Initial:</div>
            <div className="text-right">{formatCurrency(metrics.initial_investment)}</div>
          </>
        )}
        
        {/* Current Valuation */}
        {metrics.current_valuation && (
          <>
            <div className="text-gray-500">Valuation:</div>
            <div className="text-right">{formatCurrency(metrics.current_valuation)}</div>
          </>
        )}
        
        {/* Return Multiple */}
        {metrics.return_multiple && (
          <>
            <div className="text-gray-500">Multiple:</div>
            <div className="text-right font-medium">{formatMultiple(metrics.return_multiple)}</div>
          </>
        )}
        
        {/* Annualized Return */}
        {metrics.annualized_return && metrics.annualized_return > 0 && (
          <>
            <div className="text-gray-500">Ann. Return:</div>
            <div className="text-right font-medium">{formatPercentage(metrics.annualized_return)}</div>
          </>
        )}
        
        {/* Exit Information */}
        {metrics.exit_date && (
          <>
            <div className="text-gray-500">Exit Date:</div>
            <div className="text-right">{formatDate(metrics.exit_date)}</div>
          </>
        )}
        
        {metrics.exit_amount && (
          <>
            <div className="text-gray-500">Exit Amount:</div>
            <div className="text-right">{formatCurrency(metrics.exit_amount)}</div>
          </>
        )}
      </div>
    </div>
  );
}