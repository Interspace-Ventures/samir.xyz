import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { companies } from "../data/portfolio";
import FilterButtons from "../portfolio/filter-buttons";
import PortfolioGrid from "../portfolio/portfolio-grid";
import StatsSection from "../portfolio/stats-section";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Samir's Portfolio" },
    { name: "description", content: "Explore a curated selection of companies I've invested in since 2019." },
  ];
};

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
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
  );
}