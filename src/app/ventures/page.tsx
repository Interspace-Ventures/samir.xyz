// Version 14.0.0 - Optimized Ventures Page with table-based layout for consistent 3-column display
import { VenturesCard } from "../../components/ventures-cards";
import BasicLayout from "../../components/basic-layout";

export default function Ventures() {
  // Pre-defined static venture data with logo images
  const ventures = [
    {
      name: "2 Days Early",
      description: "Get in on the next big thing before everyone else. Early access to innovative products and services.",
      imageUrl: "/attached_assets/2DE Interspace.png",
      link: "https://2daysearly.com",
      priority: true
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app for tracking, sharing, and discovering climbing routes.",
      imageUrl: "/attached_assets/Solo Wordmark - Gradient 2025.png",
      link: "https://soloclimbing.com",
      priority: true
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis for screenwriters and production studios to evaluate market potential.",
      imageUrl: "/attached_assets/Predictive.film icon 2025.png",
      link: "https://predictive.film",
      priority: false
    },
    {
      name: "Interspace",
      description: "Digital product studio focused on creating innovative solutions for emerging technologies.",
      imageUrl: "/attached_assets/Interspace Square - 2025.png",
      link: "https://interspace.sh",
      priority: true
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website showcasing my professional expertise and portfolio of ventures.",
      imageUrl: "/attached_assets/Hey I'm Samir 2025.png",
      link: "https://heyimsamir.com",
      priority: true
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance through in-depth analysis and expert interviews.",
      imageUrl: "/attached_assets/Perspectives Favicon.png",
      link: "https://perspectives.fyi",
      priority: false
    }
  ];
  
  return (
    <BasicLayout>
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Interspace Ventures
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Creating innovative digital products and concepts at the intersection of technology and creativity.
          </p>
        </div>
        
        {/* Proper Tailwind grid implementation */}
        <div className="mb-16">
          {/* Grid container with explicit column definition and gap settings */}
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-10" 
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
          >
            {ventures.map((venture, index) => (
              <div key={index} className="h-60 min-h-60">
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