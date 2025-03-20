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
    console.log(`Successfully loaded image for ${name}`)
    setImageLoaded(true)
  }

  return (
    <Link 
      href={link}
      target="_blank"
      className="block group relative aspect-square overflow-hidden rounded-xl bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
    >
      <div className="relative w-full h-full">
        {!imageError ? (
          <>
            {/* Loading state */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-24 h-24 rounded-lg bg-purple-100 dark:bg-purple-900/30 animate-pulse" />
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
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-purple-50 dark:bg-purple-900/10">
            <h3 className="text-xl font-semibold mb-3">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-white text-lg font-semibold mb-2">{name}</h3>
            <p className="text-white/90 text-sm line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}