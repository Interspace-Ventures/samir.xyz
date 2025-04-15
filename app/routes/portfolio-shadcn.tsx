import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { companies, categories } from "../data/portfolio";
import PortfolioGrid from "../portfolio/portfolio-grid-shadcn";
import FilterCategories from "../portfolio/filter-categories-shadcn";
import StatsSection from "../portfolio/stats-section";
import { Button } from "../components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Companies (Shadcn UI)" },
    { name: "description", content: "View our portfolio of companies and investments with Shadcn UI components" },
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

export default function PortfolioShadcn() {
  const { companies, categories } = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Company Portfolio</h1>
            <p className="text-muted-foreground">
              Explore our collection of invested companies across different sectors
            </p>
          </div>
          <Button variant="secondary">
            <a href="/portfolio">View Original Design</a>
          </Button>
        </div>
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