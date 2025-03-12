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
      className="group relative flex flex-col h-[220px] rounded-xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm transition-all hover:bg-muted/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 30,
        opacity: { duration: 0.2 }
      }}
      role="listitem"
      aria-label={`${name} - ${description}`}
    >
      <div className="relative h-12 w-12 mb-4 overflow-hidden rounded-lg group-hover:shadow-lg transition-shadow">
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <Image
          src={imageUrl}
          alt={`${name} project logo`}
          fill
          className="object-contain transition-transform group-hover:scale-110 opacity-0"
          sizes="48px"
          priority
          onLoadingComplete={(img) => {
            img.classList.remove('opacity-0')
          }}
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = '/assets/images/portfolio-logos/placeholder.svg'
          }}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2 line-clamp-1 transition-colors group-hover:text-primary">
        {name}
      </h3>
      <p className="text-muted-foreground text-sm line-clamp-2 transition-colors group-hover:text-foreground">
        {description}
      </p>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-purple-700 rounded-b-xl opacity-0 transition-opacity"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
        aria-hidden="true"
      />
    </motion.a>
  )
}