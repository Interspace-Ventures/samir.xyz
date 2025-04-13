import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Portfolio - Samir's Projects" },
    { name: "description", content: "Explore a curated selection of financial and technology projects by Samir." },
  ];
};

export default function Portfolio() {
  return (
    <div>
      <h1>Portfolio</h1>
      <p>Explore a selection of my fintech and financial projects.</p>
      
      <div className="project-grid">
        <div className="project-card">
          <div><span className="category-badge">Finance</span></div>
          <h3>Financial Dashboard</h3>
          <p>Interactive dashboard for financial data visualization</p>
        </div>
        
        <div className="project-card">
          <div><span className="category-badge">Fintech</span></div>
          <h3>Payment Processing API</h3>
          <p>Secure API for processing payments with multiple providers</p>
        </div>
        
        <div className="project-card">
          <div><span className="category-badge">Finance</span></div>
          <h3>Banking Interface</h3>
          <p>User-friendly interface for banking applications</p>
        </div>
        
        <div className="project-card">
          <div><span className="category-badge">Mobile</span></div>
          <h3>Expense Tracker</h3>
          <p>Mobile app for tracking personal and business expenses</p>
        </div>
        
        <div className="project-card">
          <div><span className="category-badge">Finance</span></div>
          <h3>Investment Platform</h3>
          <p>Platform for managing investments and portfolio analysis</p>
        </div>
        
        <div className="project-card">
          <div><span className="category-badge">Security</span></div>
          <h3>Security Compliance Tool</h3>
          <p>Tool for ensuring financial security compliance</p>
        </div>
      </div>
    </div>
  );
}