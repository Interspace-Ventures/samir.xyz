import React from 'react';
import Head from 'next/head';

interface VentureBrand {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

const venturesBrands: VentureBrand[] = [
  {
    name: "Interspace Ventures",
    description: "Studio for building tech products and services that help people work and live better.",
    imageUrl: "/ventures-brands/interspace-ventures.png",
    link: "https://interspace.ventures"
  },
  {
    name: "DataLens",
    description: "Analytics tool for understanding how products grow",
    imageUrl: "/ventures-brands/datalens.png",
    link: "/ventures/datalens"
  },
  {
    name: "FitTrack",
    description: "Apple Watch app for fitness tracking with smart insights",
    imageUrl: "/ventures-brands/fittrack.png",
    link: "/ventures/fittrack"
  },
  {
    name: "Pocket Chef",
    description: "AI recipe generator and meal planner",
    imageUrl: "/ventures-brands/pocket-chef.png",
    link: "/ventures/pocket-chef"
  }
];

export default function Ventures() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Ventures | Business Initiatives</title>
        <meta name="description" content="Explore my business ventures and startups" />
      </Head>

      <header className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Portfolio Site</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a></li>
              <li><a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">Portfolio</a></li>
              <li><a href="/ventures" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">Ventures</a></li>
              <li><a href="/debug" className="text-blue-600 dark:text-blue-400 hover:underline">Debug</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">Ventures</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Exploring new ideas and building products that make an impact.
        </p>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Ventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venturesBrands.map((brand) => (
              <div 
                key={brand.name}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  {/* We're using a placeholder div instead of an actual image */}
                  <div className="w-full h-full flex items-center justify-center bg-purple-100 dark:bg-purple-900">
                    <span className="text-xl font-bold text-purple-800 dark:text-purple-200">
                      {brand.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{brand.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {brand.description}
                  </p>
                  <a 
                    href={brand.link}
                    className="inline-block px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-6">About Interspace Ventures</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">
              Interspace Ventures is a product studio that I founded to explore ideas at the intersection of technology, 
              design, and business. We build products that help people work and live better.
            </p>
            <p className="mb-4">
              Our approach is to identify problems that we've personally experienced, validate them through research, 
              and then build solutions that we'd want to use ourselves.
            </p>
            <a 
              href="https://interspace.ventures"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Visit Interspace Ventures →
            </a>
          </div>
        </section>
      </main>

      <footer className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Portfolio Site</p>
        </div>
      </footer>
    </div>
  );
}