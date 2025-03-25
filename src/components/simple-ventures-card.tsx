"use client";

import { useState } from "react";

interface SimpleVenturesCardProps {
  name: string;
  description: string;
  imagePath: string;
  link: string;
}

export function SimpleVenturesCard({ name, description, imagePath, link }: SimpleVenturesCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // Extract initials for fallback
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <a 
      href={link}
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full w-full"
    >
      <div className="bg-gray-800/50 rounded-xl p-6 flex flex-col h-full transition-all hover:bg-gray-800/80 hover:shadow-lg hover:shadow-purple-800/20 border border-gray-700/50">
        <div className="flex-grow">
          {/* Ultra-simplified image handling with standard img tag */}
          {!imageError ? (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md bg-gray-900/50">
              <img
                src={imagePath}
                alt={name}
                className="max-h-20 w-auto object-contain"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="mb-4 h-24 w-full flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-purple-800 to-purple-900">
              <div className="text-3xl font-bold text-white">
                {initials}
              </div>
            </div>
          )}
          
          <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
          <p className="text-gray-300 text-sm">{description}</p>
        </div>
        
        <div className="mt-4 pt-2 border-t border-gray-700/30">
          <span className="text-purple-400 text-sm font-medium flex items-center">
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