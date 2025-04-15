import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { companies, categories } from "../data/portfolio";
import PortfolioGrid from "../portfolio/portfolio-grid";
import FilterCategories from "../portfolio/filter-categories";
import StatsSection from "../portfolio/stats-section";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Companies" },
    { name: "description", content: "View our portfolio of companies and investments" },
  ];
};

// Loader function to load data for this route
export async function loader() {
  // For now we're using the static data from our config file
  // This could be enhanced to fetch from an API or database
  return json({
    companies,
    categories
  });
}

export default function Portfolio() {
  const { companies, categories } = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 md:mb-12">
        <h1 className="text-3xl font-bold mb-2">Company Portfolio</h1>
        <p className="text-gray-600">
          Explore our collection of invested companies across different sectors
        </p>
      </header>

      {/* Stats section - visible on desktop */}
      <div className="hidden md:block mb-10">
        <StatsSection />
      </div>

      {/* Category filter */}
      <FilterCategories 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Portfolio grid */}
      <PortfolioGrid 
        companies={companies}
        category={selectedCategory}
      />
    </div>
  );
}