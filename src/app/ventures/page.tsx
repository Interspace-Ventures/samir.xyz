"use client"

import { VenturesCard } from '@/components/ventures-cards'
import { useState, useEffect } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

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
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
          <div className="h-6 w-2/3 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Interspace Ventures
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          I create apps and concepts by coding at the speed of thought using Replit.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ErrorBoundary key={project.name} name={`VenturesCard-${project.name}`}>
            <VenturesCard {...project} priority={true} />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  )
}