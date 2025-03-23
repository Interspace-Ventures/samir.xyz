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

  // Load and handle the image or SVG - simple effect for React 19 compatibility
  useEffect(() => {
    console.log(`VenturesCard mounted for ${name} with imageUrl: ${imageUrl}`)
    
    // Safety check for server-side rendering
    if (typeof window === 'undefined') return;
    
    // Mark as not loaded initially
    setImageLoaded(false);
    
    if (isSvgPath(imageUrl)) {
      // For SVG files, fetch the content and render inline for better control
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
          setImageError(false);
        })
        .catch(error => {
          console.error(`Failed to load SVG for ${name}:`, error);
          setImageError(true);
        });
    }
  }, [name, imageUrl])

  // Assign consistent gradient colors based on the card position
  const getGradientColors = (name: string) => {
    // Map specific gradients to match the example image exactly
    if (name === '2 Days Early') {
      return ['from-blue-600', 'to-purple-500'];
    } else if (name === 'Solo') {
      return ['from-blue-600', 'to-purple-500'];
    } else if (name === 'Predictive:film') {
      return ['from-blue-600', 'to-purple-500'];
    } else if (name === 'Interspace') {
      return ['from-blue-600', 'to-purple-500'];
    } else if (name === 'Hey I\'m Samir') {
      return ['from-blue-600', 'to-purple-500'];
    } else {
      return ['from-blue-600', 'to-purple-500'];
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
    console.error(`Failed to load image for ${name}: ${imageUrl}`)
    setImageError(true)
  }

  const handleImageLoad = () => {
    console.log(`Image loaded successfully for ${name}: ${imageUrl}`)
    setImageLoaded(true)
    setImageError(false)
  }

  return (
    <Link 
      href={link}
      target="_blank"
      className="block group relative overflow-hidden rounded-2xl
        hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] 
        transition-all duration-200 ease-in-out
        w-full h-full"
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
          </div>
        ) : (
          // All cards have the same structure, but different content
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4/5 h-4/5 flex items-center justify-center">
                {name === 'Solo' ? (
                  <img
                    src="/logos/ventures/Solo Wordmark - Gradient 2025.png"
                    alt={name}
                    className={`w-full h-full object-contain filter drop-shadow-lg transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                ) : svgContent && isSvgPath(imageUrl) ? (
                  <div 
                    className={`w-full h-full transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt={name}
                    className={`w-full h-full object-contain filter drop-shadow-lg transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>
            
            {/* Hover overlay with name and description */}
            <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white text-lg font-medium mb-1">{name}</h3>
              {description && (
                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">{description}</p>
              )}
            </div>
          </>
        )}
      </div>
    </Link>
  )
}