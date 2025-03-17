"use client"

import Image from 'next/image'
import { ProjectCard } from '@/components/project-card'
import { useState, useEffect } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

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

const LoadingGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="aspect-square bg-card/50 rounded-lg animate-pulse" />
    ))}
  </div>
)

export default function Ventures() {
  const [mounted, setMounted] = useState(false)
  const [isWebview, setIsWebview] = useState(false)

  useEffect(() => {
    try {
      console.log('Mounting Ventures component...');
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isWebviewEnv = userAgent.includes('wv') || 
                          userAgent.includes('webview') ||
                          (userAgent.includes('safari') && !userAgent.includes('chrome'));

      setIsWebview(isWebviewEnv);
      setMounted(true);

      console.log('Environment:', {
        userAgent,
        window: typeof window !== 'undefined',
        document: typeof document !== 'undefined',
        navigator: typeof navigator !== 'undefined',
        isWebview: isWebviewEnv,
        browserFeatures: {
          supportsCSSGrid: CSS.supports('display: grid'),
          supportsFlexbox: CSS.supports('display: flex'),
          supportsTransform: CSS.supports('transform'),
          supportsTransition: CSS.supports('transition'),
          supportsAnimation: CSS.supports('animation')
        }
      });
    } catch (error) {
      console.error('Error during mount:', error)
    }
  }, [])

  return (
    <div className="transform-gpu">
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

      <ErrorBoundary>
        {!mounted ? (
          <LoadingGrid />
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isWebview ? 'transform-none' : ''}`}>
            {projects.map((project) => (
              <ErrorBoundary key={project.name}>
                <ProjectCard {...project} priority={true} />
              </ErrorBoundary>
            ))}
          </div>
        )}
      </ErrorBoundary>
    </div>
  )
}