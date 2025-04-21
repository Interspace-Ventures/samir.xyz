"use client"

import { useState } from 'react'
import { companies, Company } from '../../components/data/portfolio'
import FilterButtons from '../../components/portfolio/filter-buttons'
import PortfolioGrid from '../../components/portfolio/portfolio-grid'
import StatsSection from '../../components/portfolio/stats-section'

export default function TestPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  
  return (
    <div className="w-full max-w-[1400px] mx-auto p-8 bg-white">
      {/* Header section */}
      <div className="mb-8 text-left">
        <h1 className="text-4xl font-bold mb-4 text-black">Portfolio</h1>
        <p className="text-lg max-w-3xl text-gray-700 mb-6">
          I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
        </p>
      </div>
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Filter Buttons */}
      <FilterButtons 
        selectedCategory={selectedCategory} 
        onChange={setSelectedCategory} 
      />
      
      {/* Portfolio Grid */}
      <div className="w-full max-w-[800px] mb-12">
        <PortfolioGrid 
          companies={companies}
          category={selectedCategory}
        />
      </div>
    </div>
  )
}