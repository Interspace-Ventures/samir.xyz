// Version 12.0.2 - Enhanced Ventures Page with logo images and VenturesCard component
import { VenturesCard } from "../../components/ventures-cards";

export default function Ventures() {
  // Pre-defined static venture data with logo images
  const ventures = [
    {
      name: "2 Days Early",
      description: "Get in on the next big thing before everyone else. Early access to innovative products and services.",
      imageUrl: "/logos/ventures/2de-interspace.png",
      link: "https://2daysearly.com",
      priority: true
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app for tracking, sharing, and discovering climbing routes.",
      imageUrl: "/logos/ventures/Solo Wordmark - Gradient 2025.png",
      link: "https://soloclimbing.com",
      priority: true
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis for screenwriters and production studios to evaluate market potential.",
      imageUrl: "/logos/ventures/predictive-film-icon.png",
      link: "https://predictive.film",
      priority: false
    },
    {
      name: "Interspace",
      description: "Digital product studio focused on creating innovative solutions for emerging technologies.",
      imageUrl: "/logos/ventures/interspace-square.png",
      link: "https://interspace.sh",
      priority: true
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website showcasing my professional expertise and portfolio of ventures.",
      imageUrl: "/logos/ventures/hey-im-samir.png",
      link: "https://heyimsamir.com",
      priority: true
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance through in-depth analysis and expert interviews.",
      imageUrl: "/logos/ventures/perspectives.png",
      link: "https://perspectives.fyi",
      priority: false
    }
  ];
  
  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Interspace <span className="text-purple-500">Ventures</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Creating innovative digital products and concepts at the intersection of technology and creativity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {ventures.map((venture, index) => (
          <div key={index} className="aspect-square">
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
      
      <div className="text-center mt-16">
        <a href="/profile" className="btn-primary">
          Back to Profile
        </a>
      </div>
    </div>
  );
}