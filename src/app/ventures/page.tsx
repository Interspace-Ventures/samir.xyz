// Version 16.0.0 - Optimized Ventures Page with pure CSS Grid for responsive layout
import { VenturesCard } from "../../components/ventures-cards";
import RootLayout from "../../components/root-layout";

export default function Ventures() {
  // Pre-defined static venture data with minimal approach - simplified for reliability
  const ventures = [
    {
      name: "2 Days Early",
      description: "Get in on the next big thing before everyone else. Early access to innovative products and services.",
      imageUrl: "/attached_assets/2de-interspace.png",
      link: "https://2daysearly.com",
      priority: true
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app for tracking, sharing, and discovering climbing routes.",
      imageUrl: "/attached_assets/solo-logo-2025.png",
      link: "https://soloclimbing.com",
      priority: true
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis for screenwriters and production studios to evaluate market potential.",
      imageUrl: "/attached_assets/predictive-film-icon.png",
      link: "https://predictive.film",
      priority: false
    },
    {
      name: "Interspace",
      description: "Digital product studio focused on creating innovative solutions for emerging technologies.",
      imageUrl: "/attached_assets/interspace.png",
      link: "https://interspace.sh",
      priority: true
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website showcasing my professional expertise and portfolio of ventures.",
      imageUrl: "/attached_assets/hey-im-samir.png",
      link: "https://heyimsamir.com",
      priority: true
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance through in-depth analysis and expert interviews.",
      imageUrl: "/attached_assets/perspectives.png",
      link: "https://perspectives.fyi",
      priority: false
    }
  ];
  
  return (
    <RootLayout>
      <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Interspace Ventures
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Creating innovative digital products and concepts at the intersection of technology and creativity.
          </p>
        </div>
        
        {/* Ventures grid with CSS Grid layout - fixed spacing */}
        <div className="mb-16">
          <div className="grid gap-8" 
               style={{ 
                 display: 'grid', 
                 gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                 gridAutoRows: 'minmax(280px, auto)',
               }}>
            {ventures.map((venture, index) => (
              <div key={index} className="w-full h-full" style={{ minHeight: '280px' }}>
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
    </RootLayout>
  );
}