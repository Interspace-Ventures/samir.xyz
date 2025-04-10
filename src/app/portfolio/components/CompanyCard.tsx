"use client";

import React from 'react';
import Image from 'next/image';
import { Badge } from "../../../components/ui/badge";
import { Company } from '../../../components/types';

interface CompanyCardProps {
  company: Company;
  isDark: boolean;
}

export const CompanyCard = React.memo(({ company, isDark }: CompanyCardProps) => {
  const [imageError, setImageError] = React.useState(false);
  const shouldShowFallback = !company.logo || imageError;
  
  return (
    <div className="transition-all duration-200 hover:shadow-md w-full">
      <div className="rounded-lg bg-white shadow-sm border border-gray-100 overflow-hidden h-[180px] w-full">
        <a 
          href={company.website || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block h-full w-full relative hover:bg-gray-50 transition-colors"
        >
          {/* Status badges - Improved styling */}
          {company.markup && (
            <Badge 
              variant="default"
              className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-xs font-medium bg-purple-600 text-white shadow-sm"
            >
              Markup
            </Badge>
          )}
          
          {company.acquired && (
            <Badge 
              variant="secondary"
              className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-600 text-white shadow-sm"
            >
              Acquired
            </Badge>
          )}

          {/* Card content */}
          <div className="h-full flex flex-col items-center justify-center p-4">
            {shouldShowFallback ? (
              <div className="text-gray-400">No image</div>
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-[100px] max-w-[140px] object-contain"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              </div>
            )}
            {/* Company name below logo */}
            <div className="mt-auto pt-2 text-center">
              <p className="text-sm font-medium text-gray-800">{company.name}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
});
