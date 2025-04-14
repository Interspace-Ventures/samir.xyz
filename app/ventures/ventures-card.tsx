import { useState } from "react";
import { getVentureImagePath } from "../config/paths";

interface VenturesCardProps {
  name: string;
  description: string;
  imagePath: string;
  link: string;
  priority?: boolean;
}

/**
 * Simplified VenturesCard component for Remix
 * - Uses standard img element for better compatibility
 * - Provides fallback to initials when image fails to load
 * - Consistent styling with the rest of the application
 * - Supports loading priority hint for important images
 */
export default function VenturesCard({ name, description, imagePath, link, priority = false }: VenturesCardProps) {
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
    if (imagePath.startsWith('/img/')) {
      return imagePath;
    }
    
    // Get just the filename
    const filename = imagePath.includes('/') 
      ? imagePath.split('/').pop() || imagePath 
      : imagePath;
      
    // Use our helper to get the proper path
    return getVentureImagePath(filename);
  };
  
  const fullImagePath = computeImagePath();
  
  return (
    <a 
      href={link}
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <div className="rounded-xl p-6 flex flex-col h-full transition-all 
                     hover:shadow-lg border
                     bg-white hover:bg-gray-50 hover:shadow-purple-500/10 border-gray-200">
        <div className="flex-grow">
          {/* Image with fallback - Enhanced styling */}
          {!imageError ? (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md
                          bg-gray-100/80">
              <div className="relative h-20 w-full px-3 flex items-center justify-center">
                <img
                  src={fullImagePath}
                  alt={name}
                  className="max-h-20 max-w-full object-contain object-center transition-all duration-300"
                  onError={() => {
                    console.warn(`[VenturesCard] Image error for ${name}: ${fullImagePath}`);
                    setImageError(true);
                  }}
                  loading={priority ? "eager" : "lazy"}
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-purple-800 to-purple-900 border border-purple-700/30">
              <div className="text-3xl font-bold text-white">
                {initials}
              </div>
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-2 text-gray-900">
            {name}
          </h3>
          <p className="text-sm text-gray-600">
            {description}
          </p>
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-200">
          <span className="text-sm font-medium flex items-center text-purple-600">
            Visit Website
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}