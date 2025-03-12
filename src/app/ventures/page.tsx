"use client"

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ventures/ProjectCard'
import Head from 'next/head'

const ventureProjects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/assets/images/portfolio-logos/2DaysEarly.svg",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/assets/images/portfolio-logos/Solo.svg",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/assets/images/portfolio-logos/Predictive.svg",
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/assets/images/brand/interspace-square.png",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Hey I'm Samir",
    description: "I drive business impact in fintechs",
    imageUrl: "/assets/images/brand/samir.png",
    link: "https://samir.xyz"
  },
  {
    name: "Interspace Ventures",
    description: "Over-engineered apps and concepts",
    imageUrl: "/assets/images/brand/interspace-square.png",
    link: "https://interspace.ventures"
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
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl" role="doc-subtitle">
          I create apps and concepts by coding at the speed of thought using Replit
        </p>
      </motion.section>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
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