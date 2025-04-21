/**
 * Simple portfolio page with project cards
 */
export default function PortfolioPage() {
  // Sample portfolio data
  const projects = [
    {
      id: 1,
      title: "Financial Dashboard",
      description: "Interactive dashboard for financial data visualization",
      category: "Finance"
    },
    {
      id: 2,
      title: "Payment Processing API",
      description: "Secure API for processing payments with multiple providers",
      category: "Fintech"
    },
    {
      id: 3,
      title: "Banking Interface",
      description: "User-friendly interface for banking applications",
      category: "Finance"
    },
    {
      id: 4,
      title: "Expense Tracker",
      description: "Mobile app for tracking personal and business expenses",
      category: "Mobile"
    },
    {
      id: 5,
      title: "Investment Platform",
      description: "Platform for managing investments and portfolio analysis",
      category: "Finance"
    },
    {
      id: 6,
      title: "Security Compliance Tool",
      description: "Tool for ensuring financial security compliance",
      category: "Security"
    }
  ];
  
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Portfolio
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
          Explore a selection of my fintech and financial projects.
        </p>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem'
      }}>
        {projects.map((project) => (
          <div key={project.id} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.5rem', 
            padding: '1.5rem',
            transition: 'transform 0.2s',
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ 
                display: 'inline-block',
                backgroundColor: '#5239cc',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem'
              }}>
                {project.category}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              {project.title}
            </h3>
            <p style={{ color: '#4a5568' }}>
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
