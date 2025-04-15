/**
 * Profile page component with simplified styling
 */
export default function Profile() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Hey - I'm Samir
        </h1>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#4a5568' }}>
          I drive business impact at fintechs
        </h2>
      </div>
      
      <div style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '3rem' }}>
        <p style={{ color: '#4a5568', marginBottom: '1rem', lineHeight: '1.6' }}>
          Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
            href="https://cash.app" 
            style={{ color: '#5239cc', textDecoration: 'underline' }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Cash App
          </a> where we're expanding financial access to help users do more with their money.
        </p>
        
        <p style={{ color: '#4a5568', marginBottom: '1rem', lineHeight: '1.6' }}>
          Prior to that, I drove financial partnerships at <a 
            href="https://unit.co" 
            style={{ color: '#5239cc', textDecoration: 'underline' }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Unit
          </a>, which embeds financial features into products.
          Before that, I built and led the Strategic Finance function at <a 
            href="https://chime.com" 
            style={{ color: '#5239cc', textDecoration: 'underline' }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chime
          </a>.
        </p>
        
        <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
          Outside of work, I write over-engineered fintech threads on <a 
            href="https://twitter.com" 
            style={{ color: '#5239cc', textDecoration: 'underline' }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a> and write fintech & stratfin posts at <a 
            href="https://interspace.sh" 
            style={{ color: '#5239cc', textDecoration: 'underline' }}
            target="_blank" 
            rel="noopener noreferrer"
          >
            Interspace
          </a>.
        </p>
      </div>
    </div>
  );
}
