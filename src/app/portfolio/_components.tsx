"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Company } from '@/data/companies';
import '../portfolio/page.css';

interface CompanyCardProps {
  company: Company;
  isDark: boolean;
}

export const CompanyCard = React.memo(({ company, isDark }: CompanyCardProps) => {
  const [imageError, setImageError] = React.useState(false);
  const shouldShowFallback = !company.logo || imageError;
  
  return (
    <div className="company-card">
      <a 
        href={company.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        {/* Status badges */}
        {company.markup && (
          <Badge 
            variant="default"
            className="markup-badge"
          >
            Markup
          </Badge>
        )}
        
        {company.acquired && (
          <Badge 
            variant="secondary"
            className="acquired-badge"
          >
            Acquired
          </Badge>
        )}

        {/* Card content */}
        <div className="card-content">
          {shouldShowFallback ? (
            <div className="fallback-text">No image</div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <img
                src={company.logo}
                alt={company.name}
                className="card-image"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </a>
    </div>
  );
});
