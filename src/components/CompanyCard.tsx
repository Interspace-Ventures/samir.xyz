"use client"

import Image from 'next/image'
import { useState, memo, useEffect } from 'react'
import { Company } from './types'

interface Props {
  company: Company;
}

// Export the component for lazy loading
const CompanyCard = memo(({ company }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    console.log(`CompanyCard ${company.name} mounted`);
  }, [company.name]);

  return (
    <div
      className="relative bg-white dark:bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[3/2] relative p-4">
        {!imageLoaded && !imageError && (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
        )}
        {!imageError && (
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            fill
            className={`
              object-contain transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={company.markup || company.acquired}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {imageError && (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Failed to load image</span>
          </div>
        )}
      </div>

      {/* Hover overlay with description */}
      <div
        className={`
          absolute inset-0 bg-black/80 flex items-center justify-center p-4
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <p className="text-white text-sm text-center">{company.description}</p>
      </div>

      {/* Badge for markup/acquired status */}
      {(company.markup || company.acquired) && (
        <div className="absolute top-2 right-2 z-10">
          <span className={`
            px-2 py-1 text-xs rounded font-medium
            ${company.acquired
              ? 'bg-blue-100 text-blue-600'
              : 'bg-purple-100 text-purple-600'
            }
          `}>
            {company.acquired ? 'Acquired' : 'Markup'}
          </span>
        </div>
      )}
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;
