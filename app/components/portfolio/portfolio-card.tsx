import { Company } from "../../data/portfolio";

interface PortfolioCardProps {
  company: Company;
}

export default function PortfolioCard({ company }: PortfolioCardProps) {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              className="h-10 w-10 object-contain"
            />
          ) : (
            <div className="h-10 w-10 bg-purple-100 flex items-center justify-center rounded-full">
              <span className="text-purple-800 font-bold text-sm">
                {company.name.substring(0, 2)}
              </span>
            </div>
          )}
        </div>
        
        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-800 bg-purple-100 rounded-full">
            {company.category}
          </span>
          {company.markup && (
            <span className="inline-block ml-2 px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              Markup
            </span>
          )}
          {company.acquired && (
            <span className="inline-block ml-2 px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
              Acquired
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm">{company.description}</p>
      </div>
    </div>
  );
}