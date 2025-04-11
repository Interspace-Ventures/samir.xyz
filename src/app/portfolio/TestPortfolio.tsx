"use client"

import { useState } from 'react'
import { Button } from '../../components/ui/button'

export default function TestPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const categories = ['All', 'Fintech', 'Health', 'Retail', 'SaaS']
  
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
      <div className="w-full max-w-[800px] mb-8 bg-white rounded-lg border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col gap-4">
          {/* Top Row - 4 KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "# Investments", value: "32" },
              { label: "# Markups", value: "13" },
              { label: "# Acquisitions", value: "2" },
              { label: "# Busts", value: "4" }
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                         flex flex-col items-center text-center transform hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-black m-0">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
          
          {/* Bottom Row - 4 KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "TVPI", value: "1.44x" },
              { label: "Gross Multiple", value: "1.22x" },
              { label: "Net Multiple", value: "1.12x" },
              { label: "IRR", value: "10%" }
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-200 
                         flex flex-col items-center text-center transform hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-medium text-gray-600 mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                  {stat.label}
                </h3>
                <p className="text-2xl font-bold text-black m-0">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Filter Categories */}
      <div className="max-w-[800px] w-full mb-6">
        <h2 className="text-lg font-medium mb-3 text-gray-900">Filter by Category</h2>
        <div className="flex flex-wrap gap-3 py-2" data-testid="portfolio-filter-categories">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-button-${category}`}
                variant="filter"
                size="filter"
                data-state={isSelected ? "selected" : "default"}
                className="rounded-md"
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>
      
      {/* Placeholder for company grid */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 w-full max-w-[800px] mx-auto mb-12">
        <p className="text-center text-gray-600">Selected category: {selectedCategory}</p>
      </div>
    </div>
  )
}