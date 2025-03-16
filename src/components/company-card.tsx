"use client"

import Image from 'next/image'
import { useState, memo } from 'react'
import type { Company } from './types'

const CompanyCard = memo(({ company }: { company: Company }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <a
      href={`https://www.${company.name.toLowerCase()}.com`}
      target="_blank"
      rel="noopener noreferrer"
      className="h-full block"
    >
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-full hover:shadow-lg transition-all duration-200 bg-white dark:bg-gray-800 group">
        <div className="p-6 h-full p-4 flex items-center justify-center relative">
          {/* Markup/Acquired badge */}
          {(company.markup || company.acquired) && (
            <div className="absolute top-0 right-0 text-white text-xs px-2 py-1 bg-[#7343d0]">
              {company.acquired ? 'Acquired' : 'Markup'}
            </div>
          )}

          {/* Description overlay on hover */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-200 flex items-center justify-center z-20">
            <p className="text-white text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {company.description}
            </p>
          </div>

          {/* Logo container */}
          <div className="flex items-center justify-center w-full h-full">
            <div className="relative w-full h-full flex items-center justify-center ">
              <picture>
                <source srcSet={`${company.logo.replace('.png', '.webp')}`} type="image/webp" />
                <img
                  alt={`${company.name} logo`}
                  className={`
                    w-auto h-auto max-h-[100px] max-w-[280px] object-contain transition-all duration-500
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                  `}
                  src={company.logo}
                  onError={() => {
                    console.error(`Failed to load image for ${company.name}:`, company.logo);
                    setImageError(true);
                    setIsLoading(false);
                  }}
                  onLoad={() => {
                    console.log(`Successfully loaded image for ${company.name}`);
                    setIsLoading(false);
                  }}
                  data-company={company.name}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;