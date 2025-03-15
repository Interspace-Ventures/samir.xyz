"use client"

import Image from 'next/image'

interface ProjectCardProps {
  name: string
  description: string
  imageUrl: string
  link: string
  priority?: boolean
}

export function ProjectCard({ name, description, imageUrl, link, priority = false }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative aspect-square rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      role="listitem"
      aria-label={`${name} - ${description}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={`${name} project preview`}
          fill
          className="object-contain transition-opacity duration-300"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+"
        />
        <div 
          className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div 
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="max-w-[85%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
            <h3 className="text-lg font-semibold mb-2 text-white">
              {name}
            </h3>
            <p className="text-sm text-gray-200 line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </a>
  )
}