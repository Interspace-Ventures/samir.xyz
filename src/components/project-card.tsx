import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  name: string
  description: string
  imageUrl: string
  link: string
  priority?: boolean
}

export function ProjectCard({ name, description, imageUrl, link, priority = false }: ProjectCardProps) {
  return (
    <Link 
      href={link}
      target="_blank"
      className="block group relative aspect-square overflow-hidden rounded-xl bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative w-full h-full p-8">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-contain transform group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-lg font-semibold mb-2">{name}</h3>
          <p className="text-white/90 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </Link>
  )
}