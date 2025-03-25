"use client"

import Link from "next/link"
import React, { useState, useEffect } from "react"
import Image from "next/image"

interface VenturesCardProps {
  name: string
  description: string
  imageUrl: string
  link: string
  priority?: boolean
}

// Helper function to check if a file path is an SVG
const isSvgPath = (path: string): boolean => {
  return path.toLowerCase().endsWith('.svg');
};

export function VenturesCard({ name, description, imageUrl, link, priority = false }: VenturesCardProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [svgContent, setSvgContent] = useState<string | null>(null)

  // Pre-load the image at mount time
  useEffect(() => {
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;
    
    // Reset states for a clean start
    setImageLoaded(false);
    setImageError(false);
    
    // If imageUrl is empty, force error state to use fallback
    if (!imageUrl || imageUrl.trim() === '') {
      setImageError(true);
      return;
    }
    
    // We're now going to try loading all images, and rely on proper error handling
    // instead of pre-emptively forcing errors for specific paths
    
    if (isSvgPath(imageUrl)) {
      // Handle SVG files by loading their content
      fetch(imageUrl)
        .then(response => {
          if (response.ok) {
            return response.text();
          }
          throw new Error(`Failed to load SVG: ${response.status}`);
        })
        .then(text => {
          setSvgContent(text);
          setImageLoaded(true);
        })
        .catch((err) => {
          console.error('SVG loading error:', err);
          setImageError(true);
        });
    } else {
      // For regular images, we'll use a simpler approach with state management
      // Ensure we're only running in browser context
      if (typeof window !== 'undefined') {
        // Create a temporary HTML image element to test loading
        const tempImg = document.createElement('img');
        tempImg.onload = () => {
          setImageLoaded(true);
          setImageError(false);
        };
        tempImg.onerror = () => {
          console.error('Image loading error:', imageUrl);
          setImageError(true);
        };
        tempImg.src = imageUrl;
      }
    }
  }, [name, imageUrl])

  // Assign consistent gradient colors with purple accents
  const getGradientColors = (name: string) => {
    // Map specific gradients for each venture
    if (name === '2 Days Early') {
      return ['from-purple-600', 'to-blue-700'];
    } else if (name === 'Solo') {
      return ['from-purple-500', 'to-indigo-600'];
    } else if (name === 'Predictive:film') {
      return ['from-purple-700', 'to-purple-900'];
    } else if (name === 'Interspace') {
      return ['from-indigo-600', 'to-purple-700'];
    } else if (name === 'Hey I\'m Samir') {
      return ['from-purple-600', 'to-fuchsia-700'];
    } else {
      return ['from-violet-600', 'to-purple-800'];
    }
  };
  
  const [fromColor, toColor] = getGradientColors(name);
  
  // Get initial letters for the placeholder
  const initials = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  return (
    <Link 
      href={link}
      target="_blank"
      className="block group relative overflow-hidden rounded-2xl
        hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] 
        transition-all duration-200 ease-in-out"
      style={{ 
        display: 'block', 
        height: '100%',
        position: 'relative'
      }}
    >      
      <div className="relative w-full h-full">
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor}`}></div>
        
        {/* Loading state */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-white/20 animate-pulse" />
          </div>
        )}

        {/* Content based on card type */}
        {imageError ? (
          // Fallback: Gradient background with initials
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-3/5 h-3/5 flex items-center justify-center">
              <span className="text-6xl font-bold text-white opacity-80">{initials}</span>
            </div>
            {/* Show name even in error state */}
            <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white text-lg font-medium mb-1">{name}</h3>
            </div>
          </div>
        ) : (
          // All cards have the same structure, but different content
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 flex items-center justify-center">
                {svgContent && isSvgPath(imageUrl) ? (
                  <div 
                    className={`w-full h-full transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className={`w-full h-full object-contain filter drop-shadow-lg transition-opacity duration-500 
                      max-h-24 max-w-[80%] mx-auto my-auto ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ) : null}
              </div>
            </div>
            
            {/* Always visible name overlay with hover description */}
            <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
              <h3 className="text-white text-lg font-medium mb-1">{name}</h3>
              {description && (
                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {description}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Link>
  )
}