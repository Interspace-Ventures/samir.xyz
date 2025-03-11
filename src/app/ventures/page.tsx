"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ProjectCard } from '@/components/ventures/ProjectCard'

const ventureProjects = [
  {
    name: "Interspace",
    description: "Technology and venture capital insights platform",
    imageUrl: "/images/ventures/interspace.svg",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "AI Research Lab",
    description: "Advanced artificial intelligence research and development",
    imageUrl: "/images/ventures/ai-research.svg",
    link: "https://ai-research.lab"
  },
  {
    name: "Green Tech Fund",
    description: "Sustainable technology investment initiative",
    imageUrl: "/images/ventures/green-tech.svg",
    link: "https://green.tech.fund"
  }
]

export default function Ventures() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <section className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Ventures
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Exploring and investing in innovative technology companies
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {ventureProjects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>

      <div className="text-center mt-12">
        <Link href="/" className="text-primary hover:text-primary/80 inline-flex items-center">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}