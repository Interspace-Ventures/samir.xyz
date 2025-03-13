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
      className="group relative flex flex-col h-[280px] rounded-xl border border-border/40 bg-background/50 overflow-hidden"
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative h-full w-full p-6">
        <div className="relative h-16 w-16 mb-4">
          <Image
            src={imageUrl}
            alt={`${name} project logo`}
            fill
            className="object-contain"
            sizes="64px"
            priority
            onError={(e) => {
              e.currentTarget.src = '/assets/images/portfolio-logos/placeholder.svg'
            }}
          />
        </div>

        <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-200">
          <h3 className="text-xl font-semibold mb-2 text-white">
            {name}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </motion.a>
  )
}