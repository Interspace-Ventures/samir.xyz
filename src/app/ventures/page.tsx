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
    name: "Hey I'm Samir",
    description: "I drive business impact in fintech.",
    imageUrl: "/images/profile/hero-main.png",
    link: "https://samir.xyz"
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
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1 space-y-4">
          <h1 
            className="text-4xl md:text-5xl font-bold"
          >
            Interspace Ventures
          </h1>
          <p 
            className="text-lg md:text-xl text-gray-700 dark:text-gray-200"
          >
            I create apps and concepts by coding at the speed of thought using Replit.
          </p>
        </div>
      </div>

      <div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
        role="list"
        aria-label="Venture projects"
      >
        {projects.map((project, index) => (
          <div
            key={project.name}
            className="animate-in fade-in duration-300"
            style={{ 
              animationDelay: `${index * 50}ms`, 
              animationFillMode: 'forwards' 
            }}
          >
            <ProjectCard {...project} priority={index < 3} /> 
          </div>
        ))}
      </div>
    </div>
  )
}