"use client"

import Image from 'next/image'
import { ProjectCard } from '@/components/project-card'

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
  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Interspace Ventures
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
            I create apps and concepts by coding at the speed of thought using Replit.
          </p>
        </div>
      </div>

      <div 
        className="grid grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto animate-in fade-in duration-500"
        role="list"
        aria-label="Venture projects"
      >
        {projects.map((project) => (
          <div key={project.name} className="w-full">
            <ProjectCard {...project} priority={true} />
          </div>
        ))}
      </div>
    </div>
  )
}