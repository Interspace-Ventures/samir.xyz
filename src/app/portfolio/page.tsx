// Version 10.0.0 - Static HTML Only Portfolio Page - No Client JavaScript

export default function Portfolio() {
  // Pre-defined static data
  const companies = [
    { name: "Backpack", description: "Financial services platform", category: "Fintech" },
    { name: "Caliber X", description: "Health tech innovation", category: "Health" },
    { name: "Kartera", description: "Retail analytics platform", category: "Retail" },
    { name: "Techmate", description: "Enterprise SaaS solution", category: "SaaS" },
  ];
  
  return (
    <div>
      <h1>Portfolio Companies</h1>
      
      <div style={{ marginBottom: "2rem" }}>
        <p>Browse investments by category:</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
          <a href="#all">All</a>
          <a href="#fintech">Fintech</a>
          <a href="#health">Health</a>
          <a href="#retail">Retail</a>
          <a href="#saas">SaaS</a>
        </div>
      </div>
      
      <div style={{ 
        display: "grid", 
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" 
      }}>
        {companies.map((company, index) => (
          <div key={index} className="card" style={{
            padding: "1.5rem", 
            border: "1px solid #eaeaea", 
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ marginTop: 0, color: "#2563eb" }}>{company.name}</h3>
            <p style={{ marginBottom: "0.5rem" }}>{company.description}</p>
            <span style={{
              display: "inline-block",
              padding: "0.25rem 0.75rem",
              backgroundColor: "#f3f4f6",
              borderRadius: "9999px",
              fontSize: "0.875rem"
            }}>
              {company.category}
            </span>
          </div>
        ))}
      </div>
      
      <p style={{ marginTop: "2rem" }}>
        <a href="/">Back to Home</a>
      </p>
    </div>
  );
}