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
      className="group relative rounded-xl border border-border/40 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-muted/20"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-12 w-12 mb-4 overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${name} logo`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 48px, 48px"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.a>
  )
}