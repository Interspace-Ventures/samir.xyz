"use client";

import React from 'react';
import Image from 'next/image';
import { Badge } from "../../../components/ui/badge";
import { Company } from '../../../components/types';
import styles from '../styles.module.css';

interface CompanyCardProps {
  company: Company;
  isDark: boolean;
}

export const CompanyCard = React.memo(({ company, isDark }: CompanyCardProps) => {
  const [imageError, setImageError] = React.useState(false);
  const shouldShowFallback = !company.logo || imageError;
  
  return (
    <div className={styles.companyCard}>
      <a 
        href={company.website || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block h-full relative"
      >
        {/* Status badges */}
        {company.markup && (
          <Badge 
            variant="default"
            className={styles.markupBadge}
          >
            Markup
          </Badge>
        )}
        
        {company.acquired && (
          <Badge 
            variant="secondary"
            className={styles.acquiredBadge}
          >
            Acquired
          </Badge>
        )}

        {/* Card content */}
        <div className={styles.cardContent}>
          {shouldShowFallback ? (
            <div className="fallback-text">No image</div>
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-white rounded-md">
              <img
                src={company.logo}
                alt={company.name}
                className={styles.cardImage}
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
