"use client"

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ventures/ProjectCard'

const ventureProjects = [
  {
    name: "2 Days Early",
    description: "Track and optimize your development velocity",
    imageUrl: "/placeholder-logo.svg", // Will be replaced with actual logo
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The modern platform for indie creators",
    imageUrl: "/placeholder-logo.svg", // Will be replaced with actual logo
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive",
    description: "AI-powered film production insights",
    imageUrl: "/placeholder-logo.svg", // Will be replaced with actual logo
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Tech and venture capital insights platform",
    imageUrl: "/attached_assets/Interspace Square - 2025.png",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Hey I'm Samir",
    description: "Personal brand and portfolio",
    imageUrl: "/attached_assets/Hey I'm Samir 2025.png",
    link: "https://samir.xyz"
  },
  {
    name: "Interspace Ventures",
    description: "Innovation and venture studio",
    imageUrl: "/attached_assets/Perspectives Favicon.png",
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
        className="space-y-4 mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
          Interspace Ventures
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          I create apps and concepts by coding at the speed of thought using Replit
        </p>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {ventureProjects.map((project, index) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </motion.section>
    </div>
  )
}