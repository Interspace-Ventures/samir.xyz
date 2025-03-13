"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'

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
      className="group relative flex flex-col h-[280px] rounded-xl overflow-hidden"
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90 opacity-100" />

      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-xl font-semibold mb-2 text-white">
          {name}
        </h3>
        <p className="text-sm text-gray-200 line-clamp-2">
          {description}
        </p>
      </div>
    </motion.a>
  )
}