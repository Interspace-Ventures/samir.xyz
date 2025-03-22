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
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageError = () => {
    console.error(`Failed to load image for ${name}: ${imageUrl}`)
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
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
        {!imageError ? (
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
        ) : (
          // Fallback state when image fails to load
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">{name}</h3>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
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