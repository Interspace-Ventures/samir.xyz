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
      imagePath: "/attached_assets/Solo Wordmark - Gradient 2025.png",
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
      name: "Hey - I'm Samir",
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
            I create apps and concepts by coding at the speed of thought using Replit.
          </p>
        </div>
        
        {/* Gradient Card Implementation with hover effects and reduced size */}
        <style jsx global>{`
          .ventures-grid {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .ventures-card {
            aspect-ratio: 1 / 1;
            border-radius: 0.75rem;
            overflow: hidden;
            position: relative;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
            /* Reduce size by 50% */
            width: 160px;
            height: 160px;
            margin: 0 auto;
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
            height: 100%;
            width: 100%;
          }
          
          .card-letter {
            font-size: 2rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.8);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          
          .card-image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
          }
          
          .card-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          /* Special styling for the SOLO card to better display the gradient wordmark */
          .ventures-card[data-id="solo"] .card-bg {
            background: none; /* Remove the default gradient background */
          }
          
          .ventures-card[data-id="solo"] .card-image-container img {
            object-fit: contain;
            padding: 0;
          }
          
          /* Hide title and description by default */
          .card-info {
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s ease, transform 0.3s ease;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 0.75rem;
            background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.5), transparent);
            border-bottom-left-radius: 0.75rem;
            border-bottom-right-radius: 0.75rem;
            text-align: left;
            z-index: 10;
            box-sizing: border-box;
            overflow: hidden;
          }
          
          /* Show title and description on hover */
          .ventures-card:hover .card-info {
            opacity: 1;
            transform: translateY(0);
          }
          
          .card-title {
            font-size: 1rem;
            font-weight: 800;
            color: white;
            margin-bottom: 0.25rem;
            line-height: 1.2;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .card-description {
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.7rem;
            max-width: 100%;
            text-align: left;
            margin: 0;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            word-wrap: break-word;
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
              <div className="ventures-card" data-id={venture.id}>
                <div className="card-bg"></div>
                <div className="card-content">
                  {!imageErrors[venture.id] ? (
                    <div className="card-image-container">
                      <img 
                        src={venture.imagePath} 
                        alt={venture.name} 
                        onError={() => handleImageError(venture.id)}
                      />
                    </div>
                  ) : (
                    <div className="card-letter">{venture.letter}</div>
                  )}
                  <div className="card-info">
                    <div className="card-title">{venture.name}</div>
                    <p className="card-description">{venture.description}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Back to Profile button removed as requested */}
      </div>
    </RootLayout>
  );
}