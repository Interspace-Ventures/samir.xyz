// Version 10.0.0 - Static HTML Only Homepage - No Client JavaScript

export default function HomePage() {
  // Pre-generate the date at build time for static HTML
  const generatedDate = new Date().toLocaleDateString();
  
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1rem" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Hey, I'm Samir</h1>
        <p style={{ fontSize: "1.25rem", color: "#666" }}>
          I drive business impact at fintechs and create innovative digital products.
        </p>
      </header>
      
      <nav style={{ 
        display: "flex", 
        justifyContent: "center",
        marginBottom: "3rem",
        padding: "1rem",
        borderRadius: "0.5rem",
        backgroundColor: "#f9fafb",
        gap: "2rem"
      }}>
        <a href="/profile" style={{ color: "#6366f1", fontWeight: "500" }}>Profile</a>
        <a href="/portfolio" style={{ color: "#6366f1", fontWeight: "500" }}>Portfolio</a>
        <a href="/ventures" style={{ color: "#6366f1", fontWeight: "500" }}>Ventures</a>
        <a href="/test-simple" style={{ color: "#6366f1", fontWeight: "500" }}>Test</a>
      </nav>
      
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>About Me</h2>
        <p style={{ marginBottom: "1rem" }}>
          I'm currently leading Strategic Finance for the Financial Partnerships team at Cash App.
          With experience across multiple fintech companies, I focus on driving growth and financial strategy.
        </p>
        <p>
          <a href="/profile" style={{ color: "#6366f1" }}>Read more about my background →</a>
        </p>
      </section>
      
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>Featured Ventures</h2>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
          gap: "1.5rem" 
        }}>
          <div className="card" style={{ 
            padding: "1.5rem", 
            border: "1px solid #eaeaea", 
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#6366f1" }}>Interspace</h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>Digital product studio</p>
            <a href="/ventures" style={{ color: "#6366f1", fontSize: "0.9rem" }}>Learn more →</a>
          </div>
          
          <div className="card" style={{ 
            padding: "1.5rem", 
            border: "1px solid #eaeaea", 
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ margin: "0 0 0.5rem 0", color: "#6366f1" }}>2 Days Early</h3>
            <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>Get in on the next big thing</p>
            <a href="/ventures" style={{ color: "#6366f1", fontSize: "0.9rem" }}>Learn more →</a>
          </div>
        </div>
      </section>
      
      <footer style={{ textAlign: "center", color: "#666", fontSize: "0.9rem" }}>
        <p>Generated on {generatedDate}</p>
        <p style={{ marginTop: "0.5rem" }}>
          <a href="/ultra-minimal" style={{ color: "#6366f1", marginRight: "1rem" }}>Ultra Minimal</a>
          <a href="/basic" style={{ color: "#6366f1", marginRight: "1rem" }}>Basic Version</a>
          <a href="/test-simple" style={{ color: "#6366f1" }}>Simple Test</a>
        </p>
      </footer>
    </div>
  );
}