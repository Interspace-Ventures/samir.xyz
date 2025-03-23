// Version 8.0.0 - Server-Side Only Ventures Page

export default function Ventures() {
  // Sample static venture data
  const ventures = [
    {
      name: "2 Days Early",
      description: "Get in on the next big thing",
      url: "https://2daysearly.com"
    },
    {
      name: "Solo",
      description: "The first design-forward climbing app",
      url: "https://soloclimbing.com"
    },
    {
      name: "Predictive:film",
      description: "AI-powered script analysis",
      url: "https://predictive.film"
    },
    {
      name: "Interspace",
      description: "Digital product studio",
      url: "https://interspace.sh"
    },
    {
      name: "Hey I'm Samir",
      description: "Personal website",
      url: "https://heyimsamir.com"
    },
    {
      name: "Perspectives",
      description: "Insights on tech and finance",
      url: "https://perspectives.fyi"
    }
  ];
  
  return (
    <div>
      <h1 style={{ marginBottom: "0.5rem" }}>Interspace Ventures</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        I create apps and concepts by coding at the speed of thought using Replit.
      </p>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
        gap: "1.5rem",
        marginBottom: "2rem"
      }}>
        {ventures.map((venture, index) => (
          <div key={index} className="card" style={{
            borderRadius: "0.75rem",
            padding: "1.5rem"
          }}>
            <h3 style={{ margin: "0 0 0.75rem 0", color: "#6366f1" }}>{venture.name}</h3>
            <p style={{ marginBottom: "1rem", fontSize: "0.9rem" }}>{venture.description}</p>
            <a 
              href={venture.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ 
                color: "#6366f1", 
                textDecoration: "none",
                fontWeight: "500",
                fontSize: "0.9rem" 
              }}
            >
              Visit website →
            </a>
          </div>
        ))}
      </div>
      
      <p>
        <a href="/" style={{ marginRight: "1rem" }}>Back to Home</a>
        <a href="/portfolio">View Portfolio</a>
      </p>
    </div>
  );
}