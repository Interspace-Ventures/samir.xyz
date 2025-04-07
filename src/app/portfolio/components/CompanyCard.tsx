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
    <div className="transition-opacity duration-100 w-full h-full">
      <div className="rounded-xl bg-white shadow-sm overflow-hidden h-[150px] w-full">
        <a 
          href={company.website || '#'} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block h-full w-full relative"
        >
          {/* Status badges */}
          {company.markup && (
            <Badge 
              variant="default"
              className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors border-transparent bg-purple-700 text-white absolute top-2 right-2 z-10"
            >
              Markup
            </Badge>
          )}
          
          {company.acquired && (
            <Badge 
              variant="secondary"
              className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors border-transparent bg-gray-700 text-white absolute top-2 right-2 z-10"
            >
              Acquired
            </Badge>
          )}

          {/* Card content */}
          <div className="h-full flex items-center justify-center p-4">
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
          </div>
        </a>
      </div>
    </div>
  );
});
