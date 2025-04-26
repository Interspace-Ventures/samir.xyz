'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import InvestmentMetrics from '../components/investment-metrics';

// Define types for our data using kebab-case for DB fields
type Portfolio = {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  logoUrl: string; // Field name in TypeScript remains camelCase for consistent code
  website?: string | null;
  // Investment and financial data
  investment_date?: Date | null;
  initial_investment?: number | null;
  original_valuation?: number | null;
  current_valuation?: number | null;
  investment_status?: string | null;
  // Calculated fields
  calculated_multiple?: number | null;
  return_multiple?: number | null;
  annualized_return?: number | null;
  // Meta data
  createdAt: Date;
  updatedAt: Date;
};

export default function PortfolioMetricsPage() {
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Fetch all portfolio items
  const { 
    data: portfolioItems = [],
    isLoading,
    error 
  } = useQuery<Portfolio[]>({
    queryKey: ['portfolio'],
    queryFn: async () => {
      try {
        console.log('Fetching portfolio items for metrics page...');
        const res = await fetch('/api/portfolio');
        if (!res.ok) {
          console.error(`Failed to fetch portfolio items: ${res.status} ${res.statusText}`);
          throw new Error(`Failed to fetch portfolio items: ${res.status}`);
        }
        const data = await res.json();
        console.log(`Fetched ${data.length} portfolio items for metrics page`);
        return data;
      } catch (error) {
        console.error('Error fetching portfolio items for metrics page:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000
  });
  
  // Filter portfolio items by investment status
  const filteredItems = portfolioItems.filter(item => 
    // Only include items with investment data
    item.investment_date && 
    // Apply status filter if selected
    (statusFilter === null || item.investment_status === statusFilter)
  );
  
  // Calculate multiple for each item
  const itemsWithMultiple = filteredItems.map(item => {
    const multiple = (item.initial_investment && item.current_valuation)
      ? item.current_valuation / item.initial_investment
      : null;
    return {
      ...item,
      calculated_multiple: multiple,
      return_multiple: multiple, // For compatibility with existing code
      annualized_return: 0.15 // Placeholder value, would need actual calculation
    };
  });
  
  // Sort the filtered items
  const sortedItems = [...itemsWithMultiple].sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    
    if (sortBy === 'investment_date') {
      const dateA = a.investment_date ? new Date(a.investment_date).getTime() : 0;
      const dateB = b.investment_date ? new Date(b.investment_date).getTime() : 0;
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortBy === 'initial_investment') {
      const valA = a.initial_investment || 0;
      const valB = b.initial_investment || 0;
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    
    if (sortBy === 'multiple') {
      const valA = a.calculated_multiple || 0;
      const valB = b.calculated_multiple || 0;
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    
    if (sortBy === 'current_valuation') {
      const valA = a.current_valuation || 0;
      const valB = b.current_valuation || 0;
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    
    return 0;
  });
  
  // Calculate portfolio performance metrics
  const performanceMetrics = {
    total_investments: filteredItems.length,
    total_invested: filteredItems.reduce((sum, item) => sum + (item.initial_investment || 0), 0),
    total_current_value: filteredItems.reduce((sum, item) => sum + (item.current_valuation || 0), 0),
    average_multiple: filteredItems.reduce((sum, item) => {
      if (item.initial_investment && item.current_valuation) {
        return sum + (item.current_valuation / item.initial_investment);
      }
      return sum;
    }, 0) / (filteredItems.filter(item => item.initial_investment && item.current_valuation).length || 1),
    average_annualized_return: 0.15, // Placeholder value, would need actual calculation
    active_count: filteredItems.filter(item => 
      item.investment_status === 'Active'
    ).length,
    exited_count: filteredItems.filter(item => 
      item.investment_status?.includes('Exited')
    ).length,
    written_off_count: filteredItems.filter(item => 
      item.investment_status === 'Written Off'
    ).length
  };
  
  // Format currency with $ and commas
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };
  
  // Toggle sort order
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  // Get sort indicator (arrow)
  const getSortIndicator = (field: string) => {
    if (sortBy !== field) return null;
    return sortOrder === 'asc' ? '↑' : '↓';
  };
  
  // Get status filter options
  const statusOptions = Array.from(
    new Set(
      portfolioItems
        .filter(item => item.investment_status)
        .map(item => item.investment_status)
    )
  );
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading investment metrics...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    console.error('Portfolio metrics error:', error);
    
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center max-w-lg">
          <div className="bg-red-100 text-red-800 p-6 rounded-lg mb-4">
            <h3 className="font-bold text-lg mb-2">Error Loading Metrics Data</h3>
            <p className="mb-2">We were unable to load the investment metrics data.</p>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-primary hover:bg-purple-dark text-white px-6 py-2 rounded-md text-sm transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background pt-28 pb-20">
      <div className="container max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-16 text-white">Portfolio Metrics</h1>
        
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Total Portfolio</h3>
            <div className="text-3xl font-bold text-purple-primary">{formatCurrency(performanceMetrics.total_invested)}</div>
            <div className="text-sm text-gray-500 mt-1">{performanceMetrics.total_investments} investments</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Average Multiple</h3>
            <div className="text-3xl font-bold text-purple-primary">{performanceMetrics.average_multiple.toFixed(1)}x</div>
            <div className="text-sm text-gray-500 mt-1">Across all investments</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Current Value</h3>
            <div className="text-3xl font-bold text-purple-primary">{formatCurrency(performanceMetrics.total_current_value)}</div>
            <div className="text-sm text-gray-500 mt-1">Total portfolio value</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-2 text-gray-800">Status</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-md font-medium">
                {performanceMetrics.active_count} Active
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-md font-medium">
                {performanceMetrics.exited_count} Exited
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded-md font-medium">
                {performanceMetrics.written_off_count} Written Off
              </span>
            </div>
          </div>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
            <button
              className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
                statusFilter === null 
                  ? 'bg-purple-primary text-white' 
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
              onClick={() => setStatusFilter(null)}
            >
              All
            </button>
            
            {statusOptions.map((status, index) => (
              <button
                key={index}
                className={`px-8 py-3 rounded-md text-sm font-medium transition-all ${
                  statusFilter === status 
                    ? 'bg-purple-primary text-white' 
                    : 'bg-zinc-900 text-white hover:bg-zinc-800'
                }`}
                onClick={() => setStatusFilter(status as string)}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-white">
            Showing {filteredItems.length} of {portfolioItems.filter(i => i.investment_date).length} investments
          </div>
        </div>
        
        {/* Investment Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Name {getSortIndicator('name')}
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo URL
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('initial_investment')}
                >
                  Investment Amount {getSortIndicator('initial_investment')}
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('investment_date')}
                >
                  Investment Date {getSortIndicator('investment_date')}
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Original Valuation
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('current_valuation')}
                >
                  Current Valuation {getSortIndicator('current_valuation')}
                </th>
                <th scope="col" className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-500">
                    {item.id}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <Image
                          src={(item.logoUrl || '').startsWith('/') ? (item.logoUrl || '') : `/${item.logoUrl || ''}`}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-md bg-white p-1"
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-600 max-w-[150px] truncate">
                    {item.logoUrl || 'N/A'}
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-600 max-w-[200px]">
                    <div className="truncate">{item.description || 'N/A'}</div>
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-600">
                    {item.website ? (
                      <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-purple-primary hover:underline">
                        {item.website.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    ) : 'N/A'}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.initial_investment ? formatCurrency(item.initial_investment) : 'N/A'}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-600">
                    {item.investment_date ? new Date(item.investment_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.original_valuation ? formatCurrency(item.original_valuation) : 'N/A'}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.current_valuation ? formatCurrency(item.current_valuation) : 'N/A'}
                  </td>
                  <td className="px-4 py-5 whitespace-nowrap text-sm text-gray-600">
                    {new Date(item.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-10 flex justify-center">
          <Link href="/portfolio" className="text-white bg-purple-primary hover:bg-purple-dark px-8 py-3 rounded-md transition-colors">
            Return to Portfolio Grid
          </Link>
        </div>
      </div>
    </div>
  );
}