// Version 15.0.0 - Optimized Ventures Page with pure CSS Grid for responsive layout
import { VenturesCard } from "../../components/ventures-cards";
import BasicLayout from "../../components/basic-layout";
import Head from "next/head";

export default function Ventures() {
  // Add responsive CSS styles via style tag
  const responsiveGridStyles = `
    @media (min-width: 640px) {
      .ventures-grid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    
    @media (min-width: 1024px) {
      .ventures-grid {
        grid-template-columns: repeat(3, 1fr) !important;
      }
    }
  `;
  // Pre-defined static venture data with minimal approach - simplified for reliability
  const ventures = [
    {
      name: "2 Days Early",
      description: "Get in on the next big thing before everyone else. Early access to innovative products and services.",
      imageUrl: "", // Using fallback mode for all cards to ensure consistency
      link: "https://2daysearly.com",
      priority: true
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app for tracking, sharing, and discovering climbing routes.",
      imageUrl: "", 
      link: "https://soloclimbing.com",
      priority: true
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis for screenwriters and production studios to evaluate market potential.",
      imageUrl: "", 
      link: "https://predictive.film",
      priority: false
    },
    {
      name: "Interspace",
      description: "Digital product studio focused on creating innovative solutions for emerging technologies.",
      imageUrl: "",
      link: "https://interspace.sh",
      priority: true
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website showcasing my professional expertise and portfolio of ventures.",
      imageUrl: "", 
      link: "https://heyimsamir.com",
      priority: true
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance through in-depth analysis and expert interviews.",
      imageUrl: "", 
      link: "https://perspectives.fyi",
      priority: false
    }
  ];
  
  return (
    <BasicLayout>
      {/* Add responsive grid styles */}
      <style dangerouslySetInnerHTML={{ __html: responsiveGridStyles }} />
      
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Interspace Ventures
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Creating innovative digital products and concepts at the intersection of technology and creativity.
          </p>
        </div>
        
        {/* Ventures grid with CSS Grid layout */}
        <div className="mb-16">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
              gap: '1.5rem',
              gridRowGap: '2.5rem'
            }}
            className="ventures-grid"
          >
            {ventures.map((venture, index) => (
              <div key={index} style={{ height: '260px', width: '100%' }}>
                <VenturesCard
                  name={venture.name}
                  description={venture.description}
                  imageUrl={venture.imageUrl}
                  link={venture.link}
                  priority={venture.priority}
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="/profile" 
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium 
                      hover:from-purple-500 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-purple-800/30"
          >
            Back to Profile
          </a>
        </div>
      </div>
    </BasicLayout>
  );
}