// Ultra-simple ventures page with zero complex styling or components
import React from 'react';
import { IMAGE_BASE_PATH } from '../../config/paths';
import RootLayout from '../../components/root-layout';

export default function SimpleVentures() {
  // Venture data (kept simple)
  const ventures = [
    {
      name: "2 Days Early",
      description: "Early access to innovative products and services.",
      image: "2de-interspace.png",
      link: "https://2daysearly.com"
    },
    {
      name: "Solo",
      description: "Design-forward climbing app for tracking and sharing routes.",
      image: "solo-logo-2025.png",
      link: "https://soloclimbing.com"
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis for screenwriters and studios.",
      image: "predictive-film-icon.png",
      link: "https://predictive.film"
    },
    {
      name: "Interspace",
      description: "Digital product studio focused on innovative solutions.",
      image: "interspace.png",
      link: "https://interspace.sh"
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website showcasing professional expertise.",
      image: "hey-im-samir.png",
      link: "https://heyimsamir.com"
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance through analysis and interviews.",
      image: "perspectives.png",
      link: "https://perspectives.fyi"
    }
  ];

  return (
    <RootLayout>
      <div className="py-12 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-400">
            Interspace Ventures
          </h1>
          <p className="text-gray-300 text-lg">
            Creating innovative digital products at the intersection of technology and creativity.
          </p>
        </div>

        {/* Ultra-basic grid with pure CSS and minimal styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventures.map((venture, index) => (
            <a
              key={index}
              href={venture.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-lg p-5 flex flex-col h-64 
                         border border-gray-700 hover:border-purple-500 
                         hover:shadow-md transition-all"
            >
              {/* Logo/Image container with fixed height */}
              <div className="h-20 mb-4 flex items-center justify-center">
                <img
                  src={`${IMAGE_BASE_PATH}${venture.image}`}
                  alt={venture.name}
                  className="max-h-16 max-w-full object-contain"
                  onError={(e) => {
                    // If image fails to load, replace with text
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement;
                    if (parent) {
                      // Create fallback element with initials
                      const initials = venture.name
                        .split(' ')
                        .map(word => word[0])
                        .join('')
                        .toUpperCase()
                        .substring(0, 2);
                      
                      // Hide the image
                      target.style.display = 'none';
                      
                      // Add initials text
                      const fallback = document.createElement('div');
                      fallback.className = 'bg-purple-800 text-white text-2xl font-bold h-16 w-16 rounded-lg flex items-center justify-center';
                      fallback.textContent = initials;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold text-white mb-2">{venture.name}</h3>
                <p className="text-gray-300 text-sm">{venture.description}</p>
              </div>
              
              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-700">
                <span className="text-purple-400 text-sm flex items-center">
                  Visit Website
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/profile" 
            className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-medium 
                     hover:bg-purple-700 transition-all duration-200"
          >
            Back to Profile
          </a>
        </div>
      </div>
    </RootLayout>
  );
}