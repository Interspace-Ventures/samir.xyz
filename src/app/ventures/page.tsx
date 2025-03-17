"use client"

import { ProjectCard } from '@/components/project-card'
import { useState, useEffect } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

// Added version logging
console.log('Ventures page version: 2025-03-17-B');

const projects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/ventures-brands/2de-interspace.png",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/ventures-brands/solo-logo-2025.png",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/ventures-brands/predictive-film-icon.png",
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/ventures-brands/interspace.png",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Hey I'm Samir",
    description: "I drive business impact in fintech.",
    imageUrl: "/ventures-brands/hey-im-samir-2025.png",
    link: "https://samir.xyz"
  },
  {
    name: "Perspectives",
    description: "Fintech & stratfin deep dives",
    imageUrl: "/ventures-brands/perspectives-favicon.png",
    link: "https://perspectives.samir.xyz"
  }
]

export default function Ventures() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    console.log('Ventures component mounted');
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Interspace Ventures
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          I create apps and concepts by coding at the speed of thought using Replit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ErrorBoundary key={project.name}>
            <ProjectCard {...project} priority={true} />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  )
}