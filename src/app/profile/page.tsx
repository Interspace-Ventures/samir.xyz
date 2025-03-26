"use client"

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { IMAGE_BASE_PATH } from "../../config/paths";

export default function Profile() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Handle client side mounting for theme detection
  useEffect(() => {
    setMounted(true);
  }, []);

  // Detect if we're in dark mode for proper styling
  const isDark = mounted && resolvedTheme === 'dark';
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8 gap-4">
        <div className="w-16 h-16 relative">
          <Image 
            src={`${IMAGE_BASE_PATH}samir-profile-photo.webp`}
            alt="Samir's profile"
            width={64}
            height={64}
            className="rounded-full border-2 border-purple-500/30 object-cover"
            priority
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Hey - I&apos;m <span className="text-purple-500">Samir</span>
        </h1>
      </div>
      
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
          I drive business impact at fintechs
        </h2>
        
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
          Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
            href="https://cash.app" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Cash App
          </a> where we're expanding financial access to help users do more with their money.
        </p>
        
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4 leading-relaxed`}>
          Prior to that, I drove financial partnerships at <a 
            href="https://unit.co" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Unit
          </a>, which embeds financial features into products.
          Before that, I built and led the Strategic Finance function at <a 
            href="https://chime.com" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chime
          </a>. Earlier, I was the first finance hire at <a 
            href="https://sift.com" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Sift
          </a>. I got my start in investment banking in the Financial Institutions Group at <a 
            href="https://jpmorgan.com" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            JP Morgan
          </a> covering market structure and asset management.
        </p>
        
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
          Outside of work, I write over-engineered fintech threads on <a 
            href="https://twitter.com" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a>, share perspectives on <a 
            href="https://substack.com" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Substack
          </a> and write fintech & stratfin posts at <a 
            href="https://interspace.sh" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Interspace
          </a>. I also create over-engineered apps and ideas at <a 
            href="/ventures" 
            className={`${isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'} underline`}
          >
            Interspace Ventures
          </a>.
        </p>
      </div>
    </div>
  );
}
