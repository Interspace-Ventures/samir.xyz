"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'

interface ProjectCardProps {
  name: string
  description: string
  imageUrl: string
  link: string
}

export function ProjectCard({ name, description, imageUrl, link }: ProjectCardProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square rounded-lg overflow-hidden bg-white dark:bg-white/10 border border-border/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      role="listitem"
      aria-label={`${name} - ${description}`}
    >
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={`${name} project background`}
          fill
          className="object-contain p-2 opacity-0 transition-opacity duration-500"
          loading="eager"
          priority
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          onLoad={(e) => {
            e.currentTarget.classList.remove('opacity-0')
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />

      <div className="absolute inset-0 p-2 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-semibold mb-1 text-white">
          {name}
        </h3>
        <p className="text-xs text-gray-200 line-clamp-2">
          {description}
        </p>
      </div>
    </motion.a>
  )
}