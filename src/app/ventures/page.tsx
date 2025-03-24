// Version 12.0.1 - Enhanced Ventures Page with purple accents and dark theme

export default function Ventures() {
  // Pre-defined static venture data
  const ventures = [
    {
      name: "2 Days Early",
      description: "Get in on the next big thing before everyone else. Early access to innovative products and services.",
      url: "https://2daysearly.com",
      status: "Active"
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app for tracking, sharing, and discovering climbing routes.",
      url: "https://soloclimbing.com",
      status: "Active"
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis for screenwriters and production studios to evaluate market potential.",
      url: "https://predictive.film",
      status: "Beta"
    },
    {
      name: "Interspace",
      description: "Digital product studio focused on creating innovative solutions for emerging technologies.",
      url: "https://interspace.sh",
      status: "Active"
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website showcasing my professional expertise and portfolio of ventures.",
      url: "https://heyimsamir.com",
      status: "Active"
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance through in-depth analysis and expert interviews.",
      url: "https://perspectives.fyi",
      status: "Coming Soon"
    }
  ];
  
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Interspace <span className="text-purple-500">Ventures</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Creating innovative digital products and concepts at the intersection of technology and creativity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ventures.map((venture, index) => (
          <div key={index} className="card group hover:border-purple-600 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-purple-400">{venture.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                venture.status === 'Active' 
                  ? 'bg-purple-900/40 text-purple-300' 
                  : venture.status === 'Beta'
                    ? 'bg-blue-900/40 text-blue-300'
                    : 'bg-gray-800 text-gray-400'
              }`}>
                {venture.status}
              </span>
            </div>
            <p className="text-gray-300 mb-4">{venture.description}</p>
            <a 
              href={venture.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 group-hover:underline"
            >
              <span>Visit website</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <a href="/" className="btn-primary">
          Back to Home
        </a>
      </div>
    </div>
  );
}