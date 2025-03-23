import Link from "next/link"
import { useState, useEffect } from "react"

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

  // Load and handle the image or SVG
  useEffect(() => {
    console.log(`VenturesCard mounted for ${name} with imageUrl: ${imageUrl}`)
    
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
    } else {
      // For non-SVG images, we'll rely on the img onLoad/onError handlers
      // But let's also preload to verify it exists
      const testImg = new Image();
      testImg.src = imageUrl;
      
      testImg.onload = () => {
        // Image exists, but we'll wait for the actual img tag to trigger setImageLoaded
        console.log(`Image verified for ${name}: ${imageUrl}`);
      };
      
      testImg.onerror = () => {
        console.error(`Image verification failed for ${name}: ${imageUrl}`);
        setImageError(true);
      };
    }
  }, [name, imageUrl])

  // Generate consistent gradient colors based on the name of the venture
  const getGradientColors = (name: string) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    
    // List of gradient pairs that work well with our dark theme
    const gradients = [
      ['from-purple-700', 'to-indigo-900'],
      ['from-blue-700', 'to-purple-900'],
      ['from-indigo-700', 'to-purple-900'],
      ['from-violet-700', 'to-indigo-900'],
      ['from-fuchsia-700', 'to-purple-900'],
      ['from-purple-800', 'to-indigo-700']
    ];
    
    return gradients[hash % gradients.length];
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
      className="block group relative aspect-square overflow-hidden rounded-xl 
        hover:shadow-md hover:shadow-purple-900/20 hover:-translate-y-1 
        transition-all duration-300 
        border border-gray-800 hover:border-purple-700/40 
        bg-gradient-to-br from-black to-gray-900"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 group-hover:duration-300"></div>
      
      <div className="relative w-full h-full">
        {imageError ? (
          // Gradient background with initials
          <div className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor} p-4 flex flex-col items-center justify-center`}>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2">
              <span className="text-xl font-bold text-white">{initials}</span>
            </div>
            <h3 className="text-base font-semibold mb-1 text-white text-center">{name}</h3>
            <p className="text-xs text-gray-200 text-center line-clamp-2">{description}</p>
          </div>
        ) : (
          <>
            {/* Loading state */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-16 h-16 rounded-lg bg-purple-900/20 animate-pulse backdrop-blur-sm" />
              </div>
            )}

            {/* Image or SVG content */}
            <div className="absolute inset-0 p-4">
              <div className="relative w-full h-full">
                {svgContent && isSvgPath(imageUrl) ? (
                  // If we have SVG content, use it directly for better rendering
                  <div 
                    className={`w-full h-full transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    dangerouslySetInnerHTML={{ __html: svgContent }}
                  />
                ) : (
                  // Otherwise use regular image tag
                  <img
                    src={imageUrl}
                    alt={name}
                    className={`w-full h-full object-contain transition-opacity duration-500 filter drop-shadow-md ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>
          </>
        )}

        {/* Hover overlay with improved gradient and animations */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/95 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm group-hover:backdrop-blur-none">
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white text-base font-semibold mb-1 group-hover:text-purple-200 transition-colors">
              {name}
              <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
            </h3>
            <p className="text-gray-300 text-xs line-clamp-2 group-hover:text-white/90 transition-colors">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}