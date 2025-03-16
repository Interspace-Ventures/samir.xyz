"use client"

import { memo } from 'react'
import type { Company } from './types'

// Generate a placeholder SVG outside the component
const createPlaceholderSVG = (name: string) => `data:image/svg+xml,${encodeURIComponent(`
  <svg width="200" height="60" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="none"/>
    <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#666"
      text-anchor="middle" dominant-baseline="middle">${name}</text>
  </svg>
`)}`;

const CompanyCard = memo(({ company }: { company: Company }) => {
  // Properly encode the logo URL to handle spaces and special characters
  const logoUrl = company.logo ? encodeURI(company.logo) : createPlaceholderSVG(company.name);

  return (
    <div className="relative h-full">
      <a
        href={`https://${company.name.toLowerCase().replace(/\s+/g, '')}.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="rounded-lg border bg-white dark:bg-gray-800 h-[160px] 
          transform transition-all duration-300 ease-out hover:-translate-y-1
          hover:shadow-lg dark:shadow-purple-500/20">
          <div className="p-6 h-full flex items-center justify-center relative">
            {(company.markup || company.acquired) && (
              <div className="absolute top-2 right-2 text-xs px-2 py-1 rounded-full
                bg-purple-600 text-white transform transition-transform duration-300
                hover:scale-110">
                {company.acquired ? 'Acquired' : 'Markup'}
              </div>
            )}

            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-600 rounded-full animate-spin border-t-transparent absolute" />
              <img
                src={logoUrl}
                alt={`${company.name} logo`}
                className="max-h-[80px] max-w-[200px] object-contain opacity-0 transition-opacity duration-300"
                onLoad={(event) => {
                  try {
                    const target = event.currentTarget;
                    if (target instanceof HTMLImageElement) {
                      target.classList?.remove?.('opacity-0');
                      target.classList?.add?.('opacity-100');
                      const spinner = target.previousElementSibling;
                      if (spinner instanceof HTMLElement) {
                        spinner.style.display = 'none';
                      }
                    }
                  } catch (error) {
                    console.error('Error handling image load:', error);
                  }
                }}
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center rounded-lg
              bg-black/0 hover:bg-black/75 transition-all duration-300">
              <p className="text-white text-sm text-center px-4 py-2
                opacity-0 hover:opacity-100 transition-opacity duration-300
                transform translate-y-2 hover:translate-y-0">
                {company.description}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
});

CompanyCard.displayName = 'CompanyCard';

export default CompanyCard;