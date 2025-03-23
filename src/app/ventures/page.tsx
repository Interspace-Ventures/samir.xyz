"use client";

import React from "react";
import { ErrorBoundary } from "../../components/error-boundary";
import { VenturesCard } from "../../components/ventures-cards";

const projects = [
  {
    name: "2 Days Early",
    description: "Get in on the next big thing",
    imageUrl: "/2DE Interspace.png",
    link: "https://2daysearly.com",
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/Solo Wordmark 2025.png",
    link: "https://soloclimbing.com",
  },
  {
    name: "Predictive:film",
    description: "AI-powered script analysis",
    imageUrl: "/Predictive.film icon 2025.png",
    link: "https://predictive.film",
  },
  {
    name: "Interspace",
    description: "Digital product studio",
    imageUrl: "/Interspace Square - 2025.png",
    link: "https://interspace.sh",
  },
  {
    name: "Hey I'm Samir",
    description: "",
    imageUrl: "/Hey I'm Samir 2025.png",
    link: "https://heyimsamir.com",
  },
  {
    name: "Perspectives",
    description: "",
    imageUrl: "/Perspectives Favicon.png",
    link: "https://perspectives.fyi",
  },
];

export default function Ventures() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Interspace Ventures
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            Loading venture projects...
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square w-full">
              <div className={`h-full w-full rounded-2xl animate-pulse bg-gradient-to-br ${
                i % 2 === 0 ? 'from-blue-600 to-purple-500' : 'from-indigo-600 to-violet-500'
              }`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary name="VenturesPage">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Interspace Ventures
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            I create apps and concepts by coding at the speed of thought using
            Replit.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5 sm:gap-6 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <ErrorBoundary
              key={project.name}
              name={`VenturesCard-${project.name}`}
            >
              <div className="aspect-square w-full">
                <VenturesCard {...project} priority={index < 3} />
              </div>
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}