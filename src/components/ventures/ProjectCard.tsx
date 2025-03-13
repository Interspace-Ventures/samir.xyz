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
      className="group relative aspect-square rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      role="listitem"
      aria-label={`${name} - ${description}`}
    >
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={`${name} project background`}
          fill
          className="object-cover opacity-0 transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          onLoad={(e) => {
            e.currentTarget.classList.remove('opacity-0')
          }}
        />
      </div>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300" />

      <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-semibold mb-1 text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">
          {description}
        </p>
      </div>
    </motion.a>
  )
}