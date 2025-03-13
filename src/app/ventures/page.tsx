"use client"

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ventures/ProjectCard'
import Head from 'next/head'

const ventureProjects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/assets/images/ventures/2de-interspace.png",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/assets/images/ventures/solo-logo-2025.png",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/assets/images/ventures/predictive-film.png",
    link: "https://predictive.film"
  }
]

// Animation variants for staggered children
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export default function Ventures() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold">Ventures</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            I create apps and concepts by coding at the speed of thought using Replit
          </p>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        role="list"
        aria-label="Venture projects"
      >
        {ventureProjects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </motion.div>
    </div>
  )
}