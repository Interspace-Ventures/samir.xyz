"use client"

import Image from 'next/image'

interface ProjectCardProps {
  name: string
  description: string
  imageUrl: string
  link: string
}

// Performance monitoring
const logPerformance = (action: string, name: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[ProjectCard] ${action} for ${name}: ${performance.now()}ms`);
  }
};

export function ProjectCard({ name, description, imageUrl, link }: ProjectCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square rounded-lg overflow-hidden bg-white border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-300 hover:scale-[1.02] transition-transform"
      role="listitem"
      aria-label={`${name} - ${description}`}
      onTransitionStart={() => logPerformance('animation-start', name)}
      onTransitionEnd={() => logPerformance('animation-complete', name)}
    >
      <div className="relative w-full h-full p-6">
        <Image
          src={imageUrl}
          alt={`${name} project preview`}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={() => logPerformance('image-loaded', name)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-lg font-semibold text-white mb-2">
            {name}
          </h3>
          <p className="text-sm text-gray-200">
            {description}
          </p>
        </div>
      </div>
    </a>
  )
}