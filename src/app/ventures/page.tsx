"use client";

// Version 22.0.0 - Gradient Card with Official Descriptions and Images
import RootLayout from "../../components/root-layout";
import { useState } from "react";

export default function Ventures() {
  // Error state for images
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  
  // Handle image loading errors
  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };
  
  // Venture data with official descriptions
  const ventures = [
    {
      id: "2de",
      name: "2 Days Early",
      description: "Current and former Chime operator community built by operators for operators",
      imagePath: "/attached_assets/2de-interspace.png",
      letter: "2",
      link: "https://2daysearly.com"
    },
    {
      id: "solo",
      name: "Solo",
      description: "The first design-forward climbing app",
      imagePath: "/attached_assets/solo-logo-2025.png",
      letter: "S",
      link: "https://soloclimbing.com"
    },
    {
      id: "predictive",
      name: "Predictive:film",
      description: "AI-powered film predictions",
      imagePath: "/attached_assets/predictive-film-icon.png",
      letter: "P",
      link: "https://predictive.film"
    },
    {
      id: "interspace",
      name: "Interspace",
      description: "Over-engineered fintech and stratfin perspectives",
      imagePath: "/attached_assets/interspace.png",
      letter: "I",
      link: "https://interspace.sh"
    },
    {
      id: "samir",
      name: "Hey I'm Samir",
      description: "I drive business impact in fintech.",
      imagePath: "/attached_assets/hey-im-samir.png",
      letter: "S",
      link: "https://heyimsamir.com"
    },
    {
      id: "perspectives",
      name: "Perspectives",
      description: "Fintech & stratfin deep dives",
      imagePath: "/attached_assets/perspectives.png",
      letter: "P",
      link: "https://perspectives.fyi"
    }
  ];
  
  return (
    <RootLayout>
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-400">
            Interspace Ventures
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Creating innovative digital products and concepts at the intersection of technology and creativity.
          </p>
        </div>
        
        {/* Gradient Card Implementation based on the 2DE card example */}
        <style jsx global>{`
          .ventures-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          @media (min-width: 640px) {
            .ventures-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .ventures-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          
          .ventures-card {
            aspect-ratio: 1 / 1;
            border-radius: 0.75rem;
            overflow: hidden;
            position: relative;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
          }
          
          .ventures-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
          }
          
          .card-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #4338ca, #9333ea);
            z-index: 1;
          }
          
          .card-content {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            padding: 1.5rem;
            text-align: center;
          }
          
          .card-letter {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: rgba(255, 255, 255, 0.6);
          }
          
          .card-title {
            font-size: 2.5rem;
            font-weight: 800;
            color: white;
            margin-bottom: 1rem;
            line-height: 1.2;
          }
          
          .card-description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.875rem;
            max-width: 100%;
          }
          
          .white-square {
            background-color: white;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            max-width: 80px;
            height: 80px;
          }
          
          .white-square img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        `}</style>
        
        <div className="ventures-grid">
          {ventures.map((venture) => (
            <a 
              key={venture.id}
              href={venture.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="ventures-card">
                <div className="card-bg"></div>
                <div className="card-content">
                  {!imageErrors[venture.id] ? (
                    <div className="white-square">
                      <img 
                        src={venture.imagePath} 
                        alt={venture.name} 
                        onError={() => handleImageError(venture.id)}
                      />
                    </div>
                  ) : (
                    <div className="card-letter">{venture.letter}</div>
                  )}
                  <div className="card-title">{venture.name.split(' ')[0]}</div>
                  <p className="card-description">{venture.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/profile" 
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium"
          >
            Back to Profile
          </a>
        </div>
      </div>
    </RootLayout>
  );
}