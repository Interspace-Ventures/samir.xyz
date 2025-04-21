"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { IMAGE_BASE_PATH, ASSET_PATHS } from "../../config/paths";

interface VenturesCardProps {
  name: string;
  description: string;
  imagePath: string;
  link: string;
  priority?: boolean;
}

/**
 * Consolidated VenturesCard component
 * - Uses Next.js Image component for optimized image loading
 * - Provides smooth fallback to initials when image fails to load
 * - Consistent styling with the rest of the application
 * - Supports priority loading for important images
 * - Added dark/light theme support
 */
export function VenturesCard({ name, description, imagePath, link, priority = false }: VenturesCardProps) {
  const [imageError, setImageError] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Handle client side mounting for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark';
  
  // Extract initials for fallback
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  // Enhanced image path handling with fallback options
  // This handles various image path formats and provides fallback options
  const computeImagePath = () => {
    // If path already starts with '/', use as is
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // For paths with filenames, ensure we use the standard location
    if (imagePath.includes('/')) {
      // Try to find the right path based on context clues in the path
      if (imagePath.includes('attached_assets/')) {
        return `${ASSET_PATHS.ATTACHED}${imagePath.split('attached_assets/')[1]}`;
      }
      
      // Default to just adding a leading slash
      return `/${imagePath}`;
    }
    
    // For simple filenames, use the ventures logos path
    // This assumes it's just a filename like "interspace.png"
    return `${ASSET_PATHS.VENTURES}${imagePath.toLowerCase().replace(/\s+/g, '-')}`;
  };
  
  const fullImagePath = computeImagePath();
    
  // For debugging image path issues
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[VenturesCard] Loading image for ${name}: ${fullImagePath}`);
    }
  }, [name, fullImagePath]);
  
  return (
    <a 
      href={link}
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <div className={`rounded-xl p-6 flex flex-col h-full transition-all 
                     hover:shadow-lg border
                     ${isDark 
                       ? 'bg-gray-800/50 hover:bg-gray-800/80 hover:shadow-purple-800/20 border-gray-700/50' 
                       : 'bg-white hover:bg-gray-50 hover:shadow-purple-500/10 border-gray-200'}`}>
        <div className="flex-grow">
          {/* Image with fallback - Enhanced styling */}
          {!imageError ? (
            <div className={`mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md
                          ${isDark ? 'bg-gray-900/30 border border-purple-900/30' : 'bg-gray-100/80'}`}>
              <div className="relative h-20 w-full px-3">
                <Image
                  src={fullImagePath}
                  alt={name}
                  fill={true}
                  className={`object-contain object-center font-inter transition-all duration-300 ${isDark ? 'filter-none' : ''}`}
                  onError={(e) => {
                    console.warn(`[VenturesCard] Image error for ${name}: ${fullImagePath}`);
                    
                    // Log a detailed error message for debugging
                    console.error(`[VenturesCard] Image failed to load for ${name}`, {
                      originalPath: fullImagePath,
                      possibleFallbackPath: fullImagePath.includes('/') 
                        ? `${ASSET_PATHS.VENTURES}${fullImagePath.split('/').pop()?.toLowerCase().replace(/\s+/g, '-')}` 
                        : `${ASSET_PATHS.VENTURES}${imagePath.toLowerCase().replace(/\s+/g, '-')}`
                    });
                    
                    // Set to error state to show initials
                    setImageError(true);
                  }}
                  priority={priority}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          ) : (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-purple-800 to-purple-900 border border-purple-700/30">
              <div className="text-3xl font-bold text-white font-inter">
                {initials}
              </div>
            </div>
          )}
          
          <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h3>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
        </div>
        
        <div className={`mt-4 pt-2 border-t ${isDark ? 'border-gray-700/30' : 'border-gray-200'}`}>
          <span className={`text-sm font-medium flex items-center
                         ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
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