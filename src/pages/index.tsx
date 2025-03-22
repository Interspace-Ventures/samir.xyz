import React from 'react';
import Head from 'next/head';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Head>
        <title>Portfolio Site</title>
        <meta name="description" content="Personal portfolio website showcasing professional achievements" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <header className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Portfolio Site</h1>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a></li>
              <li><a href="/portfolio" className="text-blue-600 dark:text-blue-400 hover:underline">Portfolio</a></li>
              <li><a href="/ventures" className="text-blue-600 dark:text-blue-400 hover:underline">Ventures</a></li>
              <li><a href="/debug" className="text-blue-600 dark:text-blue-400 hover:underline">Debug</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 w-full py-8">
        <div className="max-w-4xl mx-auto py-8">
          <section className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Hey - I'm Samir.</h1>
            <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-4">
              I drive business impact at fintechs.
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-200">
              <p>
                Today, I am leading Strategic Finance for the Financial Partnerships team at 
                <a href="https://cash.app" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline"> Cash App </a> 
                where we're expanding financial access to help users do more with their money.
              </p>

              <p>
                Prior to that, I drove financial partnerships at 
                <a href="https://unit.co" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline"> Unit</a>, 
                which embeds financial features into products. Before that, I built and led the Strategic Finance function at 
                <a href="https://chime.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline"> Chime</a>. 
                Earlier, I was the first finance hire at 
                <a href="https://sift.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline"> Sift</a>. 
              </p>
            </div>
          </section>
          
          <section className="mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Explore More</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-sm">
                  <h3 className="font-bold mb-2">Portfolio</h3>
                  <p className="text-sm">View showcase of professional projects</p>
                  <a href="/portfolio" className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline">
                    Browse Portfolio →
                  </a>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-sm">
                  <h3 className="font-bold mb-2">Ventures</h3>
                  <p className="text-sm">Explore business ventures and investments</p>
                  <a href="/ventures" className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline">
                    See Ventures →
                  </a>
                </div>
                <div className="bg-white dark:bg-gray-700 p-4 rounded shadow-sm">
                  <h3 className="font-bold mb-2">Debug</h3>
                  <p className="text-sm">View technical diagnostics about the site</p>
                  <a href="/debug" className="mt-4 inline-block text-purple-600 dark:text-purple-400 hover:underline">
                    Debug Page →
                  </a>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-2">Connect</h2>
              <p className="mb-4">
                I write fintech threads on 
                <a href="https://x.com/heyinterspace" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline"> Twitter</a>, 
                share perspectives on 
                <a href="https://perspectives.samir.xyz" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline"> Substack</a>, 
                and create over-engineered apps and ideas at 
                <a href="/ventures" className="text-purple-600 dark:text-purple-400 hover:underline"> Interspace Ventures</a>.
              </p>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} Portfolio Site</p>
        </div>
      </footer>
    </div>
  );
}