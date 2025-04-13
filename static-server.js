const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from public directory
app.use(express.static('public'));

// Serve your mock data
const companies = [
  {
    name: "FinanceForward",
    logo: "/logos/companies/financeforward.svg",
    category: "Fintech",
    description: "Automated financial management platform for small businesses.",
    markup: true
  },
  {
    name: "MediTrack",
    logo: "/logos/companies/meditrack.svg",
    category: "Health",
    description: "Digital health tracking platform for patients and providers.",
    markup: true
  },
  {
    name: "RetailGenius",
    logo: "/logos/companies/retailgenius.svg",
    category: "Retail",
    description: "Retail management and POS solution for small to medium businesses.",
    acquired: true
  },
  {
    name: "DevOpsNinja",
    logo: "/logos/companies/devopsninja.svg",
    category: "SaaS",
    description: "Analytics solution for SaaS companies to track KPIs and growth metrics."
  },
  {
    name: "PayFlow",
    logo: "/logos/companies/payflow.svg",
    category: "Fintech",
    description: "Secure payment processing gateway for international transactions.",
    markup: true
  },
  {
    name: "HealthHub",
    logo: "/logos/companies/healthhub.svg",
    category: "Health",
    description: "AI-powered diagnostic assistant for healthcare providers.",
    markup: true
  }
];

// Create HTML template function
function createHtmlTemplate(title, content) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.5;
        color: #333;
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      
      nav {
        background-color: #f5f5f5;
        padding: 1rem;
        margin-bottom: 2rem;
        border-radius: 5px;
      }
      
      nav ul {
        display: flex;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 2rem;
      }
      
      nav a {
        text-decoration: none;
        color: #333;
        font-weight: 500;
      }
      
      nav a:hover {
        color: #5239cc;
      }
      
      .header {
        margin-bottom: 2rem;
      }
      
      .header h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      .header p {
        font-size: 1.125rem;
        color: #666;
        max-width: 800px;
      }
      
      .stats-section {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-bottom: 2rem;
        background-color: #f9fafb;
        border-radius: 8px;
        padding: 1.5rem;
        max-width: 800px;
      }
      
      .stat-item {
        padding: 1rem;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        text-align: center;
      }
      
      .stat-label {
        font-size: 0.875rem;
        color: #666;
        margin-bottom: 0.5rem;
      }
      
      .stat-value {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
      }
      
      .filter-section {
        margin-bottom: 2rem;
        max-width: 800px;
      }
      
      .filter-buttons {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      
      .filter-button {
        padding: 0.5rem 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: white;
        cursor: pointer;
        font-size: 0.875rem;
      }
      
      .filter-button.active {
        background-color: #5239cc;
        color: white;
        border-color: #5239cc;
      }
      
      .portfolio-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        max-width: 800px;
      }
      
      .portfolio-card {
        border: 1px solid #eee;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .portfolio-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }
      
      .card-image {
        height: 150px;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      
      .card-image img {
        max-width: 80%;
        max-height: 80%;
        object-fit: contain;
      }
      
      .card-content {
        padding: 1rem;
      }
      
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
      }
      
      .card-title {
        font-weight: 600;
        margin: 0;
      }
      
      .badge {
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 9999px;
        font-weight: 500;
      }
      
      .badge-markup {
        background-color: #e3fce9;
        color: #166534;
      }
      
      .badge-acquired {
        background-color: #f3e8ff;
        color: #6b21a8;
      }
      
      .card-description {
        font-size: 0.875rem;
        color: #666;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/ventures">Ventures</a></li>
      </ul>
    </nav>
    ${content}
  </body>
  </html>
  `;
}

// Generate portfolio page content
function generatePortfolioContent() {
  const cardsHtml = companies.map(company => {
    return `
      <div class="portfolio-card">
        <div class="card-image">
          <img src="${company.logo}" alt="${company.name} logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">${company.name}</h3>
            <div>
              ${company.markup ? '<span class="badge badge-markup">Markup</span>' : ''}
              ${company.acquired ? '<span class="badge badge-acquired">Acquired</span>' : ''}
            </div>
          </div>
          <p class="card-description">${company.description}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="header">
      <h1>Portfolio</h1>
      <p>I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.</p>
    </div>
    
    <div class="stats-section">
      <div class="stat-item">
        <div class="stat-label"># Investments</div>
        <p class="stat-value">32</p>
      </div>
      <div class="stat-item">
        <div class="stat-label"># Markups</div>
        <p class="stat-value">13</p>
      </div>
      <div class="stat-item">
        <div class="stat-label"># Acquisitions</div>
        <p class="stat-value">2</p>
      </div>
      <div class="stat-item">
        <div class="stat-label"># Busts</div>
        <p class="stat-value">4</p>
      </div>
    </div>
    
    <div class="filter-section">
      <h3>Filter by Category</h3>
      <div class="filter-buttons">
        <button class="filter-button active">All</button>
        <button class="filter-button">Fintech</button>
        <button class="filter-button">Health</button>
        <button class="filter-button">Retail</button>
        <button class="filter-button">SaaS</button>
      </div>
    </div>
    
    <div class="portfolio-grid">
      ${cardsHtml}
    </div>
  `;
}

// Define routes - using both with and without trailing slash
[
  { path: '/', title: 'Samir\'s Portfolio', contentFn: () => `
    <div class="header">
      <h1>Welcome to Samir's Portfolio</h1>
      <p>Explore my work, experience, and investments.</p>
      <a href="/portfolio" style="display: inline-block; margin-top: 1rem; padding: 0.75rem 1.5rem; background-color: #5239cc; color: white; text-decoration: none; border-radius: 4px; font-weight: 500;">View Portfolio</a>
    </div>
  `},
  { path: '/portfolio', title: 'Portfolio - Samir\'s Portfolio', contentFn: generatePortfolioContent },
  { path: '/portfolio/', title: 'Portfolio - Samir\'s Portfolio', contentFn: generatePortfolioContent },
  { path: '/profile', title: 'Profile - Samir\'s Portfolio', contentFn: () => `
    <div class="header">
      <h1>Profile</h1>
      <p>Professional information and background.</p>
    </div>
  `},
  { path: '/profile/', title: 'Profile - Samir\'s Portfolio', contentFn: () => `
    <div class="header">
      <h1>Profile</h1>
      <p>Professional information and background.</p>
    </div>
  `},
  { path: '/ventures', title: 'Ventures - Samir\'s Portfolio', contentFn: () => `
    <div class="header">
      <h1>Ventures</h1>
      <p>Current and future investment ventures.</p>
    </div>
  `},
  { path: '/ventures/', title: 'Ventures - Samir\'s Portfolio', contentFn: () => `
    <div class="header">
      <h1>Ventures</h1>
      <p>Current and future investment ventures.</p>
    </div>
  `}
].forEach(route => {
  app.get(route.path, (req, res) => {
    const content = route.contentFn();
    res.send(createHtmlTemplate(route.title, content));
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});