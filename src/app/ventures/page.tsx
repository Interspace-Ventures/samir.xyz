"use client"

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ProjectCard'

const projects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/images/portfolio-logos/placeholder.svg",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/images/portfolio-logos/placeholder.svg",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/images/portfolio-logos/placeholder.svg",
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/images/portfolio-logos/placeholder.svg",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Perspectives",
    description: "Fintech & stratfin deep dives",
    imageUrl: "/images/portfolio-logos/placeholder.svg",
    link: "https://perspectives.samir.xyz"
  }
]

export default function Ventures() {
  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Interspace Ventures</h1>
          <p className="text-lg md:text-xl max-w-2xl">
            I create apps and concepts by coding at the speed of thought using Replit
          </p>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-1.5"
        role="list"
        aria-label="Venture projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </motion.div>
    </div>
  )
}