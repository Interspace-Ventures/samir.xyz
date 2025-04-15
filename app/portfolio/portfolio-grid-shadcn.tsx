import { Company } from "../data/portfolio";
import PortfolioCard from "./portfolio-card-shadcn";

interface PortfolioGridProps {
  companies: Company[];
  category: string;
}

export default function PortfolioGrid({ companies, category }: PortfolioGridProps) {
  // Filter companies by selected category
  const filteredCompanies = category === "All" 
    ? companies 
    : companies.filter(company => company.category === category);

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
      data-testid="portfolio-grid"
    >
      {filteredCompanies.map((company) => (
        <PortfolioCard key={company.name} company={company} />
      ))}
      
      {filteredCompanies.length === 0 && (
        <div className="col-span-full py-8 text-center text-gray-500">
          No companies found in this category.
        </div>
      )}
    </div>
  );
}