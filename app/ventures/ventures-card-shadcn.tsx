import { useState } from "react";
import { getVenturePath } from "../config/paths";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { ExternalLink } from "lucide-react";

interface VenturesCardProps {
  name: string;
  description: string;
  imagePath: string;
  link: string;
  priority?: boolean;
}

/**
 * Ventures Card component implemented with shadcn UI
 * - Uses Card component from shadcn/ui
 * - Provides fallback to initials when image fails to load
 * - Consistent styling with the rest of the application
 * - Supports loading priority hint for important images
 */
export default function VenturesCardShadcn({ name, description, imagePath, link, priority = false }: VenturesCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Extract initials for fallback
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  // Simplified image path handling
  const computeImagePath = () => {
    // If it's a full path already, use it as is
    if (imagePath.startsWith('/assets/')) {
      return imagePath;
    }
    
    // Get just the filename
    const filename = imagePath.includes('/') 
      ? imagePath.split('/').pop() || imagePath 
      : imagePath;
      
    // Use our helper to get the proper path
    return getVenturePath(filename);
  };
  
  const fullImagePath = computeImagePath();
  
  return (
    <Card className="h-full transition-all hover:shadow-md overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-grow">
          {/* Image with fallback - Enhanced styling */}
          {!imageError ? (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md bg-secondary/30">
              <div className="relative h-20 w-full px-3 flex items-center justify-center">
                <img
                  src={fullImagePath}
                  alt={name}
                  className="max-h-20 max-w-full object-contain object-center transition-all"
                  onError={() => {
                    console.warn(`[VenturesCardShadcn] Image error for ${name}: ${fullImagePath}`);
                    setImageError(true);
                  }}
                  loading={priority ? "eager" : "lazy"}
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-purple-800 to-purple-900">
              <div className="text-3xl font-bold text-white">
                {initials}
              </div>
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-2">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-4">
        <Button asChild variant="link" className="p-0 h-auto text-primary">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Visit Website <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}