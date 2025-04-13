"use client"

import React from 'react'
import { Company } from '../data/portfolio'
import PortfolioCard from './portfolio-card'

interface PortfolioGridProps {
  companies: Company[]
  category: string
}

export default function PortfolioGrid({ companies, category }: PortfolioGridProps) {
  // Filter companies by category (or show all if 'All' is selected)
  const filteredCompanies = category === 'All' 
    ? companies 
    : companies.filter(company => company.category === category)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCompanies.map((company) => (
        <PortfolioCard key={company.name} company={company} />
      ))}
      
      {filteredCompanies.length === 0 && (
        <div className="col-span-full p-8 text-center">
          <p className="text-gray-500">No companies found in this category.</p>
        </div>
      )}
    </div>
  )
}