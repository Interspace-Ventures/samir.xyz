import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import fs from 'fs';
import path from 'path';
import { serveStatic } from '@hono/node-server/serve-static';

// Create the Hono app
const app = new Hono();

// Serve static files from the public directory
app.use('/build/*', serveStatic({ root: './' }));
app.use('/logos/*', serveStatic({ root: './public' }));
app.use('/*.css', serveStatic({ root: './public' }));
app.use('/*.js', serveStatic({ root: './public' }));

// Simple portfolio HTML generator with the TestPortfolio structure
function generatePortfolioHTML() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio - Samir's Portfolio</title>
  <link rel="stylesheet" href="/styles/global.css">
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
    }
    
    .portfolio-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      background-color: white;
    }
    
    .header-section {
      margin-bottom: 2rem;
      text-align: left;
    }
    
    .header-section h1 {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
      color: black;
    }
    
    .header-section p {
      font-size: 1.125rem;
      max-width: 48rem;
      color: #4b5563;
      margin-bottom: 1.5rem;
    }
    
    .stats-section {
      width: 100%;
      max-width: 800px;
      margin-bottom: 2rem;
      background-color: white;
      border: 1px solid #f0f0f0;
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
    }
    
    .stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .stat-item {
      padding: 0.75rem;
      border-radius: 0.375rem;
      background-color: #f9fafb;
      transition: all 0.2s;
      text-align: center;
    }
    
    .stat-item:hover {
      background-color: #f3f4f6;
      transform: translateY(-2px);
    }
    
    .stat-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }
    
    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: black;
      margin: 0;
    }
    
    .filter-section {
      width: 100%;
      max-width: 800px;
      margin-bottom: 1.5rem;
    }
    
    .filter-title {
      font-size: 1.125rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
      color: #111827;
    }
    
    .filter-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      padding: 0.5rem 0;
    }
    
    .filter-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1.25rem;
      border-radius: 0.375rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      background-color: white;
      border: 1px solid #e5e7eb;
      color: #374151;
    }
    
    .filter-button.selected {
      background-color: #5239cc;
      color: white;
      border-color: #5239cc;
    }
    
    .filter-button:hover:not(.selected) {
      border-color: #5239cc;
      color: #5239cc;
    }
    
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      width: 100%;
      max-width: 800px;
      margin-bottom: 3rem;
    }
    
    .portfolio-card {
      border-radius: 0.5rem;
      overflow: hidden;
      background-color: white;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .portfolio-card:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
    
    .card-image {
      padding: 1rem;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f9fafb;
    }
    
    .card-image img {
      max-height: 80%;
      max-width: 80%;
      object-fit: contain;
    }
    
    .card-content {
      padding: 1rem;
      flex-grow: 1;
    }
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }
    
    .card-title {
      font-weight: 500;
      font-size: 1rem;
    }
    
    .card-badges {
      display: flex;
      gap: 0.25rem;
    }
    
    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .badge-markup {
      background-color: #dcfce7;
      color: #166534;
    }
    
    .badge-acquired {
      background-color: #f3e8ff;
      color: #6b21a8;
    }
    
    .card-description {
      font-size: 0.875rem;
      color: #6b7280;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div class="portfolio-container">
    <!-- Header section -->
    <div class="header-section">
      <h1>Portfolio</h1>
      <p>
        I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
      </p>
    </div>
    
    <!-- Stats Section -->
    <div class="stats-section">
      <div class="stats-row">
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
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-label">TVPI</div>
          <p class="stat-value">1.44x</p>
        </div>
        <div class="stat-item">
          <div class="stat-label">Gross Multiple</div>
          <p class="stat-value">1.22x</p>
        </div>
        <div class="stat-item">
          <div class="stat-label">Net Multiple</div>
          <p class="stat-value">1.12x</p>
        </div>
        <div class="stat-item">
          <div class="stat-label">IRR</div>
          <p class="stat-value">10%</p>
        </div>
      </div>
    </div>
    
    <!-- Filter section -->
    <div class="filter-section">
      <h2 class="filter-title">Filter by Category</h2>
      <div class="filter-buttons">
        <button class="filter-button selected">All</button>
        <button class="filter-button">Fintech</button>
        <button class="filter-button">Health</button>
        <button class="filter-button">Retail</button>
        <button class="filter-button">SaaS</button>
      </div>
    </div>
    
    <!-- Portfolio Grid -->
    <div class="portfolio-grid">
      <!-- Card 1 -->
      <div class="portfolio-card">
        <div class="card-image">
          <img src="/logos/companies/financeforward.svg" alt="FinanceForward logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">FinanceForward</h3>
            <div class="card-badges">
              <span class="badge badge-markup">Markup</span>
            </div>
          </div>
          <p class="card-description">Automated financial management platform for small businesses.</p>
        </div>
      </div>
      
      <!-- Card 2 -->
      <div class="portfolio-card">
        <div class="card-image">
          <img src="/logos/companies/meditrack.svg" alt="MediTrack logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">MediTrack</h3>
            <div class="card-badges">
              <span class="badge badge-markup">Markup</span>
            </div>
          </div>
          <p class="card-description">Digital health tracking platform for patients and providers.</p>
        </div>
      </div>
      
      <!-- Card 3 -->
      <div class="portfolio-card">
        <div class="card-image">
          <img src="/logos/companies/retailgenius.svg" alt="RetailGenius logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">RetailGenius</h3>
            <div class="card-badges">
              <span class="badge badge-acquired">Acquired</span>
            </div>
          </div>
          <p class="card-description">Retail management and POS solution for small to medium businesses.</p>
        </div>
      </div>
      
      <!-- Card 4 -->
      <div class="portfolio-card">
        <div class="card-image">
          <img src="/logos/companies/devopsninja.svg" alt="DevOpsNinja logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">DevOpsNinja</h3>
          </div>
          <p class="card-description">Analytics solution for SaaS companies to track KPIs and growth metrics.</p>
        </div>
      </div>
      
      <!-- Card 5 -->
      <div class="portfolio-card">
        <div class="card-image">
          <img src="/logos/companies/payflow.svg" alt="PayFlow logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">PayFlow</h3>
            <div class="card-badges">
              <span class="badge badge-markup">Markup</span>
            </div>
          </div>
          <p class="card-description">Secure payment processing gateway for international transactions.</p>
        </div>
      </div>
      
      <!-- Card 6 -->
      <div class="portfolio-card">
        <div class="card-image">
          <img src="/logos/companies/healthhub.svg" alt="HealthHub logo">
        </div>
        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">HealthHub</h3>
            <div class="card-badges">
              <span class="badge badge-markup">Markup</span>
            </div>
          </div>
          <p class="card-description">AI-powered diagnostic assistant for healthcare providers.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

// Route handlers
app.get('/portfolio', (c) => {
  return c.html(generatePortfolioHTML());
});

// Static HTML for other pages
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Samir's Portfolio</title>
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/ventures">Ventures</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Welcome to Samir's Portfolio</h1>
    <p>Explore my work, experience, and investments</p>
    <a href="/portfolio">View Portfolio</a>
  </main>
</body>
</html>`);
});

app.get('/profile', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile - Samir's Portfolio</title>
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/ventures">Ventures</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Profile</h1>
    <p>Professional information and background</p>
  </main>
</body>
</html>`);
});

app.get('/ventures', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ventures - Samir's Portfolio</title>
  <link rel="stylesheet" href="/styles/global.css">
</head>
<body>
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/portfolio">Portfolio</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/ventures">Ventures</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <h1>Ventures</h1>
    <p>Current and future investment ventures</p>
  </main>
</body>
</html>`);
});

// Configure the server
const port = process.env.PORT || 3000;
console.log(`Server running at http://localhost:${port}`);

// Start the server
serve({
  fetch: app.fetch,
  port: port
});