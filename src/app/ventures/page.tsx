"use client";

import React from "react";
import { ErrorBoundary } from "../../components/error-boundary";

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

// Simple venture card component
function SimpleVentureCard({ name, description, imageUrl, link }: {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}) {
  return (
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
            <span className="text-xl">{name.charAt(0)}</span>
          </div>
          <h3 className="font-bold">{name}</h3>
        </div>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </a>
  );
}

export default function Ventures() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    console.log('Ventures page mounted');
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interspace Ventures
          </h1>
          <p className="text-lg md:text-xl">
            Loading venture projects...
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary name="VenturesPage">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interspace Ventures
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200">
            I create apps and concepts by coding at the speed of thought using
            Replit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ErrorBoundary
              key={project.name}
              name={`VenturesCard-${project.name}`}
            >
              <SimpleVentureCard {...project} />
            </ErrorBoundary>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  );
}