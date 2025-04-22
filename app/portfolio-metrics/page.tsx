'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import InvestmentMetrics from '../components/investment-metrics';

// Define types for our data using kebab-case
type Tag = {
  id: number;
  name: string;
};

type Portfolio = {
  id: number;
  name: string;
  category: string;
  description?: string | null;
  logoUrl: string;
  website?: string | null;
  tags: Tag[];
  // Investment and financial data
  investment_date?: Date | null;
  initial_investment?: number | null;
  original_valuation?: number | null;
  current_valuation?: number | null;
  investment_status?: string | null;
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
      const res = await fetch('/api/portfolio');
      if (!res.ok) {
        throw new Error('Failed to fetch portfolio items');
      }
      return res.json();
    }
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
      calculated_multiple: multiple
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
    return <div className="min-h-screen flex items-center justify-center">Loading investment data...</div>;
  }
  
  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error loading investment data</div>;
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Portfolio Metrics</h1>
            <Link href="/" className="text-white hover:text-gray-300">
              Back to Home
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Total Portfolio</h3>
            <div className="text-2xl font-bold">{formatCurrency(performanceMetrics.total_invested)}</div>
            <div className="text-sm text-gray-500">{performanceMetrics.total_investments} investments</div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Average Multiple</h3>
            <div className="text-2xl font-bold">{performanceMetrics.average_multiple.toFixed(1)}x</div>
            <div className="text-sm text-gray-500">Across all investments</div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">IRR</h3>
            <div className="text-2xl font-bold">{(performanceMetrics.average_annualized_return * 100).toFixed(1)}%</div>
            <div className="text-sm text-gray-500">Annualized return</div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Status</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {performanceMetrics.active_count} Active
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {performanceMetrics.exited_count} Exited
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                {performanceMetrics.written_off_count} Written Off
              </span>
            </div>
          </div>
        </div>
        
        {/* Filters and Controls */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            <button
              className={`px-4 py-2 rounded-lg text-sm ${
                statusFilter === null 
                  ? 'bg-black text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
              onClick={() => setStatusFilter(null)}
            >
              All
            </button>
            
            {statusOptions.map((status, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm ${
                  statusFilter === status 
                    ? 'bg-black text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
                onClick={() => setStatusFilter(status as string)}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-gray-500">
            Showing {filteredItems.length} of {portfolioItems.filter(i => i.investment_date).length} investments
          </div>
        </div>
        
        {/* Investment Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Company {getSortIndicator('name')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('investment_date')}
                >
                  Date {getSortIndicator('investment_date')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('initial_investment')}
                >
                  Investment {getSortIndicator('initial_investment')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('return_multiple')}
                >
                  Multiple {getSortIndicator('return_multiple')}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('annualized_return')}
                >
                  IRR {getSortIndicator('annualized_return')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 mr-3">
                        <Image
                          src={item.logoUrl}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-full bg-white p-1"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.investment_date ? new Date(item.investment_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.initial_investment ? formatCurrency(item.initial_investment) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.return_multiple ? (
                      <span className={`font-medium ${
                        item.return_multiple > 1 ? 'text-green-600' : 
                        item.return_multiple < 1 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {item.return_multiple.toFixed(1)}x
                      </span>
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.annualized_return ? (
                      <span className={`font-medium ${
                        item.annualized_return > 0 ? 'text-green-600' : 
                        item.annualized_return < 0 ? 'text-red-600' : 'text-gray-900'
                      }`}>
                        {(item.annualized_return * 100).toFixed(1)}%
                      </span>
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.investment_status && (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.investment_status === 'Active' 
                          ? 'bg-blue-100 text-blue-800' 
                          : item.investment_status === 'Exited Profitably'
                          ? 'bg-green-100 text-green-800'
                          : item.investment_status === 'Exited With Loss'
                          ? 'bg-orange-100 text-orange-800'
                          : item.investment_status === 'Written Off'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.investment_status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No investment data matches your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}