"use client"

import { IMAGE_BASE_PATH, ASSET_PATHS } from "../../config/paths";

/**
 * Profile page component with direct CSS class usage
 * Uses Tailwind dark mode classes for dark/light mode styling
 */
export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mt-0 mb-4 font-inter">
        {/* Header text section without profile image */}
        <div>
          <h1 className="text-2xl font-bold mb-2 font-inter">
            Hey - I&apos;m Samir
          </h1>
          <h2 className="text-lg font-semibold font-inter text-gray-700 dark:text-gray-300">
            I drive business impact at fintechs
          </h2>
        </div>
      </div>
      
      {/* Content container with responsive margins */}
      <div className="max-w-3xl mx-auto mb-10 sm:mb-12 font-inter">
        {/* Using Tailwind's built-in dark mode variant for text color */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-inter">
          Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
            href="https://cash.app" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Cash App
          </a> where we're expanding financial access to help users do more with their money.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed font-inter">
          Prior to that, I drove financial partnerships at <a 
            href="https://unit.co" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Unit
          </a>, which embeds financial features into products.
          Before that, I built and led the Strategic Finance function at <a 
            href="https://chime.com" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chime
          </a>. Earlier, I was the first finance hire at <a 
            href="https://sift.com" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Sift
          </a>. I got my start in investment banking in the Financial Institutions Group at <a 
            href="https://jpmorgan.com" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            JP Morgan
          </a> covering market structure and asset management.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-inter">
          Outside of work, I write over-engineered fintech threads on <a 
            href="https://twitter.com" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a> and write fintech & stratfin posts at <a 
            href="https://interspace.sh" 
            className="link-underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Interspace
          </a>. I also create over-engineered apps and ideas at <a 
            href="/ventures" 
            className="link-underline"
          >
            Interspace Ventures
          </a>.
        </p>
      </div>
    </div>
  );
}
