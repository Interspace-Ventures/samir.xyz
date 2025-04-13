/**
 * Ventures page with simple styling
 */
export default function VenturesPage() {
  // Sample ventures data
  const ventures = [
    {
      id: 1,
      name: "Fintech Innovation Lab",
      description: "Incubating next-generation financial technology startups.",
      stage: "Early Stage"
    },
    {
      id: 2,
      name: "Digital Banking Platform",
      description: "Building accessible digital banking tools for everyone.",
      stage: "Growth"
    },
    {
      id: 3,
      name: "Blockchain Solutions",
      description: "Exploring blockchain applications for financial services.",
      stage: "Research"
    }
  ];
  
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Interspace Ventures
        </h1>
        <p style={{ color: '#4a5568', marginBottom: '1.5rem' }}>
          Investing in and building the future of fintech and financial services.
        </p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {ventures.map((venture) => (
          <div key={venture.id} style={{ 
            border: '1px solid #e2e8f0', 
            borderRadius: '0.5rem', 
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {venture.name}
              </h2>
              <span style={{ 
                backgroundColor: '#5239cc',
                color: 'white',
                padding: '0.375rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem'
              }}>
                {venture.stage}
              </span>
            </div>
            <p style={{ color: '#4a5568', fontSize: '1.125rem' }}>
              {venture.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}