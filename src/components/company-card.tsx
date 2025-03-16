"use client"

import Image from 'next/image'
import { useState, memo } from 'react'
import type { Company } from './types'

const CompanyCard = memo(({ company }: { company: Company }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`
        relative bg-white dark:bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden 
        transition-all duration-300 ease-out
        ${isHovered ? 'scale-[1.02] shadow-lg' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[5/4] relative p-2">
        {isLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="w-8 h-8 border-2 border-purple-600 rounded-full animate-spin border-t-transparent" />
          </div>
        )}
        <Image
          src={company.logo}
          alt={`${company.name} logo`}
          fill
          className={`
            object-contain p-2
            transition-all duration-300
            ${imageError ? 'opacity-0' : 'opacity-100'}
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          priority={company.markup || company.acquired}
          onError={() => {
            console.error(`Failed to load image for ${company.name}:`, company.logo);
            setImageError(true);
            setIsLoading(false);
          }}
          onLoad={() => {
            console.log(`Successfully loaded image for ${company.name}`);
            setIsLoading(false);
          }}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="text-gray-400 font-medium">{company.name}</div>
              <div className="text-gray-400 text-sm mt-1">Logo unavailable</div>
            </div>
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