"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { IMAGE_BASE_PATH } from "../../config/paths";

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
  
  // Ensure image path is correctly formatted for Next.js Image component
  // If path already contains 'attached_assets', use it directly
  // Otherwise, prepend the IMAGE_BASE_PATH
  const fullImagePath = imagePath.includes('attached_assets')
    ? (imagePath.startsWith('/') ? imagePath : `/${imagePath}`)
    : `${IMAGE_BASE_PATH}${imagePath}`;
  
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
          {/* Image with fallback */}
          {!imageError ? (
            <div className={`mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md
                          ${isDark ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
              <div className="relative h-20 w-full">
                <Image
                  src={fullImagePath}
                  alt={name}
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  onError={() => setImageError(true)}
                  priority={priority}
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