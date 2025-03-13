"use client"

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ventures/ProjectCard'

const ventureProjects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/assets/ventures/2de-interspace.png",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/assets/ventures/solo-logo.png",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/assets/ventures/predictive-film.png",
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/assets/images/logos/interspace-square.png",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Perspectives",
    description: "Fintech & stratfin deep dives",
    imageUrl: "/assets/images/logos/perspectives.png",
    link: "https://perspectives.samir.xyz"
  }
]

export default function Ventures() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">Ventures</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            I create apps and concepts by coding at the speed of thought using Replit
          </p>
        </div>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
        role="list"
        aria-label="Venture projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {ventureProjects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </motion.div>
    </div>
  )
}