import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface VenturesCardProps {
  name: string
  description: string
  imageUrl: string
  link: string
  priority?: boolean
}

export function VenturesCard({ name, description, imageUrl, link, priority = false }: VenturesCardProps) {
  const [imageError, setImageError] = useState(false) // Start with error false to attempt loading images
  const [imageLoaded, setImageLoaded] = useState(false)

  // Debug: Log the component mounting and image URL
  React.useEffect(() => {
    console.log(`VenturesCard mounted for ${name} with imageUrl: ${imageUrl}`)
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
        hover:shadow-lg hover:shadow-purple-900/20 hover:-translate-y-1 
        transition-all duration-300 
        border border-gray-800 hover:border-purple-700/40 
        bg-gradient-to-br from-black to-gray-900"
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 group-hover:duration-300"></div>
      
      <div className="relative w-full h-full">
        {imageError ? (
          // Gradient background with initials
          <div className={`absolute inset-0 bg-gradient-to-br ${fromColor} ${toColor} p-6 flex flex-col items-center justify-center`}>
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">{initials}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white text-center">{name}</h3>
            <p className="text-sm text-gray-200 text-center">{description}</p>
          </div>
        ) : (
          <>
            {/* Loading state */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-24 h-24 rounded-lg bg-purple-900/20 animate-pulse backdrop-blur-sm" />
              </div>
            )}

            {/* Image */}
            <div className="absolute inset-0 p-6">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className={`object-contain transition-opacity duration-500 filter drop-shadow-md ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={priority}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            </div>
          </>
        )}

        {/* Hover overlay with improved gradient and animations */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/95 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm group-hover:backdrop-blur-none">
          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-purple-200 transition-colors">
              {name}
              <span className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">→</span>
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2 group-hover:text-white/90 transition-colors">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}