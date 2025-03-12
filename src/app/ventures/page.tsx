"use client"

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ventures/ProjectCard'

const ventureProjects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/assets/images/portfolio-logos/placeholder.svg",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/assets/images/portfolio-logos/placeholder.svg",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/assets/images/portfolio-logos/placeholder.svg",
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/assets/images/portfolio-logos/placeholder.svg",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Hey I'm Samir",
    description: "I drive business impact in fintechs",
    imageUrl: "/assets/images/portfolio-logos/placeholder.svg",
    link: "https://samir.xyz"
  },
  {
    name: "Interspace Ventures",
    description: "Over-engineered apps and concepts",
    imageUrl: "/assets/images/portfolio-logos/placeholder.svg",
    link: "https://interspace.ventures"
  }
]

export default function Ventures() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-4rem)]">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
          Interspace Ventures
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          I create apps and concepts by coding at the speed of thought using Replit
        </p>
      </motion.section>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        {ventureProjects.map((project, index) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </motion.div>
    </div>
  )
}