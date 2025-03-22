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
      className="block group relative aspect-square overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 border border-gray-800 bg-gradient-to-br from-purple-950/50 to-black"
    >
      <div className="relative w-full h-full">
        {!imageError ? (
          <>
            {/* Loading state */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-24 h-24 rounded-lg bg-purple-900/30 animate-pulse" />
              </div>
            )}

            {/* Image */}
            <div className="absolute inset-0 p-8">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className={`object-contain transition-opacity duration-300 ${
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
            <h3 className="text-xl font-semibold mb-3 text-white">{name}</h3>
            <p className="text-sm text-gray-300">{description}</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-lg font-semibold mb-2">{name}</h3>
            <p className="text-gray-300 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}