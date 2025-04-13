import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { companies } from "../data/portfolio";
import FilterButtons from "../components/portfolio/filter-buttons";
import PortfolioGrid from "../components/portfolio/portfolio-grid";
import StatsSection from "../components/portfolio/stats-section";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Samir's Projects" },
    { name: "description", content: "Explore a curated selection of financial and technology projects by Samir." },
  ];
};

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-screen-lg mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Investment Portfolio</h1>
          <p className="text-lg text-gray-600">
            A collection of companies I've invested in across various sectors.
          </p>
        </header>
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Filter Buttons */}
        <FilterButtons 
          selectedCategory={selectedCategory} 
          onChange={setSelectedCategory}
        />
        
        {/* Portfolio Grid */}
        <PortfolioGrid 
          companies={companies} 
          category={selectedCategory}
        />
      </div>
    </div>
  );
}