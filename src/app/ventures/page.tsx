"use client"

import { ProjectCard } from '@/components/ProjectCard'

const projects = [
  {
    name: "2 Days Early",
    description: "Current and former Chime operator community built by operators for operators",
    imageUrl: "/images/ventures-brands/2de-interspace.png",
    link: "https://2daysearly.com"
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/images/ventures-brands/solo-logo-2025.png",
    link: "https://gosolo.nyc"
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/images/ventures-brands/predictive-film-icon.png",
    link: "https://predictive.film"
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/images/ventures-brands/interspace.png",
    link: "https://posts.interspace.ventures"
  },
  {
    name: "Perspectives",
    description: "Fintech & stratfin deep dives",
    imageUrl: "/images/brand/perspectives.png",
    link: "https://perspectives.samir.xyz"
  }
]

export default function Ventures() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1 space-y-4">
          <h1 
            className="text-4xl md:text-5xl font-bold animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            Interspace Ventures
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 animate-in fade-in slide-in-from-bottom-4 duration-300 delay-150"
          >
            I create apps and concepts by coding at the speed of thought using Replit
          </p>
        </div>
      </div>

      <div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
        role="list"
        aria-label="Venture projects"
      >
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="animate-in fade-in slide-in-from-bottom-4 duration-300"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'forwards' 
            }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  )
}