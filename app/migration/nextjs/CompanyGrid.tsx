"use client"

import React from 'react';
import { companies } from '../../components/data/portfolio';
import { CompanyCard } from './components/CompanyCard';
import { useTheme } from 'next-themes';

interface CompanyGridProps {
  selectedCategory: string;
}

export default function CompanyGrid({ selectedCategory }: CompanyGridProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  
  // Filter companies based on selected category
  const filteredCompanies = selectedCategory === 'All' 
    ? companies 
    : companies.filter(company => company.category === selectedCategory);

  return (
    <div id="white-container" className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-[800px] mx-auto mb-12">
      <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <CompanyCard key={company.name} company={company} isDark={isDark} />
        ))}
      </div>
    </div>
  );
}