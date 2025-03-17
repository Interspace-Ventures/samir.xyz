"use client"

import Image from 'next/image'
import { ProjectCard } from '@/components/project-card'

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
    imageUrl: "/images/ventures-brands/hey-im-samir-2025.png",
    link: "https://samir.xyz"
  },
  {
    name: "Perspectives",
    description: "Fintech & stratfin deep dives",
    imageUrl: "/images/ventures-brands/perspectives-favicon.png",
    link: "https://perspectives.samir.xyz"
  }
]

export default function Ventures() {
  return (
    <div className="min-h-screen px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-8 mb-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              Interspace Ventures
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
              I create apps and concepts by coding at the speed of thought using Replit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          {projects.map((project) => (
            <div key={project.name}>
              <ProjectCard {...project} priority={true} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}