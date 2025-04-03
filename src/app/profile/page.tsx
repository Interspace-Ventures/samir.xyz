"use client"

import { IMAGE_BASE_PATH, ASSET_PATHS } from "../../config/paths";

/**
 * Profile page component with direct CSS class usage
 * Uses Tailwind dark mode classes for dark/light mode styling
 */
export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div style={{ position: 'relative', height: '130px', marginTop: '24px', marginBottom: '32px' }}>
        {/* Left image with absolute positioning */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '80px',
          height: '80px',
          zIndex: 10
        }}>
          <img 
            src={`${IMAGE_BASE_PATH}${ASSET_PATHS.IMAGES}samir-profile-photo.webp`}
            alt="Samir's profile"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '8px',
              border: '2px solid rgba(139, 92, 246, 0.4)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              objectFit: 'cover'
            }}
          />
        </div>
        
        {/* Right text section with left padding */}
        <div style={{
          position: 'absolute',
          left: '100px',
          top: '0'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            Hey - I&apos;m <span style={{color: '#8b5cf6'}}>Samir</span>
          </h1>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '600',
            background: 'linear-gradient(to right, #a78bfa, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            I drive business impact at fintechs
          </h2>
        </div>
      </div>
      
      {/* Content container with responsive margins */}
      <div className="max-w-3xl mx-auto mb-10 sm:mb-12 px-0 sm:px-2">
        {/* Using Tailwind's built-in dark mode variant for text color */}
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
            href="https://cash.app" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Cash App
          </a> where we're expanding financial access to help users do more with their money.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Prior to that, I drove financial partnerships at <a 
            href="https://unit.co" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Unit
          </a>, which embeds financial features into products.
          Before that, I built and led the Strategic Finance function at <a 
            href="https://chime.com" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chime
          </a>. Earlier, I was the first finance hire at <a 
            href="https://sift.com" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Sift
          </a>. I got my start in investment banking in the Financial Institutions Group at <a 
            href="https://jpmorgan.com" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            JP Morgan
          </a> covering market structure and asset management.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Outside of work, I write over-engineered fintech threads on <a 
            href="https://twitter.com" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a>, share perspectives on <a 
            href="https://substack.com" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Substack
          </a> and write fintech & stratfin posts at <a 
            href="https://interspace.sh" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Interspace
          </a>. I also create over-engineered apps and ideas at <a 
            href="/ventures" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline"
          >
            Interspace Ventures
          </a>.
        </p>
      </div>
    </div>
  );
}
