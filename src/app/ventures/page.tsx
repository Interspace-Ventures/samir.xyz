"use client";

import React from "react";
import { ErrorBoundary } from "../../components/error-boundary";
import { VenturesCard } from "../../components/ventures-cards";

const projects = [
  {
    name: "2 Days Early",
    description:
      "Current and former Chime operator community built by operators for operators",
    imageUrl: "/ventures-brands/2de-interspace.png",
    link: "https://2daysearly.com",
  },
  {
    name: "Solo",
    description: "The first design-forward climbing app",
    imageUrl: "/ventures-brands/solo-logo-2025.png",
    link: "https://gosolo.nyc",
  },
  {
    name: "Predictive:film",
    description: "AI-powered film predictions",
    imageUrl: "/ventures-brands/predictive-film-icon.png",
    link: "https://predictive.film",
  },
  {
    name: "Interspace",
    description: "Over-engineered fintech and stratfin perspectives",
    imageUrl: "/ventures-brands/interspace.png",
    link: "https://posts.interspace.ventures",
  },
  {
    name: "Hey I'm Samir",
    description: "I drive business impact in fintech.",
    imageUrl: "/ventures-brands/hey-im-samir.png",
    link: "https://samir.xyz",
  },
  {
    name: "Perspectives",
    description: "Fintech & stratfin deep dives",
    imageUrl: "/ventures-brands/samir-favicon.png",
    link: "https://perspectives.samir.xyz",
  },
];

export default function Ventures() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interspace Ventures
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Loading venture projects...
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-black/20 border border-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary name="VenturesPage">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interspace Ventures
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            I create apps and concepts by coding at the speed of thought using
            Replit.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ErrorBoundary
              key={project.name}
              name={`VenturesCard-${project.name}`}
            >
              <VenturesCard {...project} priority={index < 3} />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}