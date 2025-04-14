import { Card, CardContent } from "../layout/card";
import { Company } from "../config/data/portfolio";
import { COMMON_IMAGES, getCompanyLogoPath } from "../config/paths";

interface PortfolioCardProps {
  company: Company;
}

export default function PortfolioCard({ company }: PortfolioCardProps) {
  // Helper to get the proper logo path
  const getLogoPath = () => {
    if (!company.logo) {
      return `${COMMON_IMAGES}/placeholder-logo.svg`;
    }
    
    // If it's already a full path starting with /img/
    if (company.logo.startsWith('/img/')) {
      return company.logo;
    }
    
    // If it's just a filename
    if (!company.logo.includes('/')) {
      return getCompanyLogoPath(company.logo);
    }
    
    // If it's an old path, extract the filename and use our helper
    const filename = company.logo.split('/').pop();
    if (filename) {
      return getCompanyLogoPath(filename);
    }
    
    // Fallback to original
    return company.logo;
  };
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md">
      <div className="p-4 aspect-[3/2] flex items-center justify-center bg-gray-50">
        <img 
          src={getLogoPath()} 
          alt={`${company.name} logo`}
          className="max-w-[80%] max-h-[80%] object-contain"
        />
      </div>
      
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-base">{company.name}</h3>
          <div className="flex gap-1">
            {company.markup && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Markup
              </span>
            )}
            {company.acquired && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Acquired
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">{company.description}</p>
      </CardContent>
    </Card>
  );
}