"use client";

import React from "react";

// Static HTML version of the ventures page (no client components for maximum compatibility)
export default function Ventures() {
  return (
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {/* 2 Days Early */}
        <div className="aspect-square w-full">
          <a href="https://2daysearly.com" target="_blank" rel="noopener noreferrer" 
            className="block group relative overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] transition-all duration-200 ease-in-out w-full h-full">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 flex items-center justify-center">
                  <img
                    src="/attached_assets/2DE Interspace.png"
                    alt="2 Days Early"
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-lg font-medium mb-1">2 Days Early</h3>
                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">Get in on the next big thing</p>
              </div>
            </div>
          </a>
        </div>

        {/* Solo */}
        <div className="aspect-square w-full">
          <a href="https://soloclimbing.com" target="_blank" rel="noopener noreferrer" 
            className="block group relative overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] transition-all duration-200 ease-in-out w-full h-full">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 flex items-center justify-center">
                  <img
                    src="/attached_assets/Solo Wordmark - Gradient 2025.png"
                    alt="Solo"
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-lg font-medium mb-1">Solo</h3>
                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">The first design-forward climbing app</p>
              </div>
            </div>
          </a>
        </div>

        {/* Predictive:film */}
        <div className="aspect-square w-full">
          <a href="https://predictive.film" target="_blank" rel="noopener noreferrer" 
            className="block group relative overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] transition-all duration-200 ease-in-out w-full h-full">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 flex items-center justify-center">
                  <img
                    src="/attached_assets/Predictive.film icon 2025.png"
                    alt="Predictive:film"
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-lg font-medium mb-1">Predictive:film</h3>
                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">AI-powered script analysis</p>
              </div>
            </div>
          </a>
        </div>

        {/* Interspace */}
        <div className="aspect-square w-full">
          <a href="https://interspace.sh" target="_blank" rel="noopener noreferrer" 
            className="block group relative overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] transition-all duration-200 ease-in-out w-full h-full">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 flex items-center justify-center">
                  <img
                    src="/attached_assets/Interspace Square - 2025.png"
                    alt="Interspace"
                    className="w-full h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-lg font-medium mb-1">Interspace</h3>
                <p className="text-white/80 text-sm line-clamp-2 leading-relaxed">Digital product studio</p>
              </div>
            </div>
          </a>
        </div>
          
        {/* Small cards section (last column) */}
        <div className="flex flex-col gap-6">
          {/* Hey I'm Samir */}
          <div className="aspect-square w-full sm:aspect-auto sm:h-[calc(50%-0.75rem)]">
            <a href="https://heyimsamir.com" target="_blank" rel="noopener noreferrer" 
              className="block group relative overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] transition-all duration-200 ease-in-out w-full h-full">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 flex items-center justify-center">
                    <img
                      src="/attached_assets/Hey I'm Samir 2025.png"
                      alt="Hey I'm Samir"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-lg font-medium mb-1">Hey I'm Samir</h3>
                </div>
              </div>
            </a>
          </div>
          
          {/* Perspectives */}
          <div className="aspect-square w-full sm:aspect-auto sm:h-[calc(50%-0.75rem)]">
            <a href="https://perspectives.fyi" target="_blank" rel="noopener noreferrer" 
              className="block group relative overflow-hidden rounded-2xl hover:shadow-lg hover:shadow-purple-800/30 hover:translate-y-[-3px] transition-all duration-200 ease-in-out w-full h-full">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 flex items-center justify-center">
                    <img
                      src="/attached_assets/Perspectives Favicon.png"
                      alt="Perspectives"
                      className="w-full h-full object-contain filter drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-lg font-medium mb-1">Perspectives</h3>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}