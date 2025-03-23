// Version 10.0.0 - Static HTML Only Profile Page - No Client JavaScript

export default function Profile() {
  return (
    <div>
      <h1>Hey - I'm Samir</h1>
      <h2 style={{ color: "#8b5cf6", marginBottom: "1.5rem" }}>I drive business impact at fintechs</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p>
          Today, I am leading Strategic Finance for the Financial Partnerships team at 
          <a href="https://cash.app" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6", margin: "0 0.25rem" }}>
            Cash App
          </a> 
          where we're expanding financial access to help users do more with their money.
        </p>

        <p>
          Prior to that, I drove financial partnerships at
          <a href="https://unit.co" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6", margin: "0 0.25rem" }}>
            Unit
          </a>
          and built and led the Strategic Finance function at
          <a href="https://chime.com" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6", margin: "0 0.25rem" }}>
            Chime
          </a>.
        </p>

        <p>
          Outside of work, I write about fintech on
          <a href="https://x.com/heyinterspace" target="_blank" rel="noopener noreferrer" style={{ color: "#8b5cf6", margin: "0 0.25rem" }}>
            Twitter
          </a>
          and create apps and ideas at
          <a href="/ventures" style={{ color: "#8b5cf6", margin: "0 0.25rem" }}>
            Interspace Ventures
          </a>.
        </p>
      </div>
      
      <p style={{ marginTop: "2rem" }}>
        <a href="/">Back to Home</a> | 
        <a href="/portfolio" style={{ marginLeft: "0.5rem" }}>View Portfolio</a>
      </p>
    </div>
  );
}
