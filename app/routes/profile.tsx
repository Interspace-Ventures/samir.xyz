import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Samir's Profile" },
    { name: "description", content: "Learn about Samir's professional experience and expertise in finance and technology." },
  ];
};

export default function Profile() {
  return (
    <div className="profile-container">
      <div style={{ marginBottom: "1rem" }}>
        <h1>Hey - I'm Samir</h1>
        <h2>I drive business impact at fintechs</h2>
      </div>
      
      <div className="profile-content">
        <p>
          Today, I am leading Strategic Finance for the Financial Partnerships team at <a 
            href="https://cash.app" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Cash App
          </a> where we're expanding financial access to help users do more with their money.
        </p>
        
        <p>
          Prior to that, I drove financial partnerships at <a 
            href="https://unit.co" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Unit
          </a>, which embeds financial features into products.
          Before that, I built and led the Strategic Finance function at <a 
            href="https://chime.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Chime
          </a>.
        </p>
        
        <p>
          Outside of work, I write over-engineered fintech threads on <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Twitter
          </a> and write fintech & stratfin posts at <a 
            href="https://interspace.sh" 
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