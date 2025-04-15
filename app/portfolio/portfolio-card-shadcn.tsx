import { 
  Card, 
  CardContent 
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Company } from "../data/portfolio";
import { IMAGES_PATH, getCompanyPath } from "../config/paths";

interface PortfolioCardProps {
  company: Company;
}

export default function PortfolioCard({ company }: PortfolioCardProps) {
  // Helper to get the proper logo path
  const getLogoPath = () => {
    if (!company.logo) {
      return `${IMAGES_PATH}/placeholder-logo.svg`;
    }
    
    // If it's already a full path starting with /assets/
    if (company.logo.startsWith('/assets/')) {
      return company.logo;
    }
    
    // If it's just a filename
    if (!company.logo.includes('/')) {
      return getCompanyPath(company.logo);
    }
    
    // If it's an old path, extract the filename and use our helper
    const filename = company.logo.split('/').pop();
    if (filename) {
      return getCompanyPath(filename);
    }
    
    // Fallback to original
    return company.logo;
  };
  
  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-md">
      <div className="p-4 aspect-[3/2] flex items-center justify-center bg-secondary/30">
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
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                Markup
              </Badge>
            )}
            {company.acquired && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                Acquired
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{company.description}</p>
      </CardContent>
    </Card>
  );
}