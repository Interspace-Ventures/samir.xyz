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
app.use('/styles/*', serveStatic({ root: './public' }));
app.use('/*.css', serveStatic({ root: './public' }));
app.use('/*.js', serveStatic({ root: './public' }));

// Portfolio page generator
function generatePortfolioHTML() {
  const portfolioContent = `
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Portfolio</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Companies I've Built & Advised
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            I have advised and invested in ambitious teams building innovative products who focus on unit economics optimized business models since 2019.
          </p>
        </div>

        <!-- Stats Section -->
        <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-4 lg:max-w-none">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                # Investments
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                32
              </dd>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                # Markups
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                13
              </dd>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                # Acquisitions
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                2
              </dd>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <dt class="text-sm font-medium text-gray-500 truncate">
                TVPI
              </dt>
              <dd class="mt-1 text-3xl font-semibold text-gray-900">
                1.44x
              </dd>
            </div>
          </div>
        </div>

        <!-- Filter section -->
        <div class="mt-12">
          <div class="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mr-4 mb-4 sm:mb-0">Filter by category:</h3>
            <div class="flex flex-wrap gap-2">
              <button class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none">
                All
              </button>
              <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Fintech
              </button>
              <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Health
              </button>
              <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Retail
              </button>
              <button class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                SaaS
              </button>
            </div>
          </div>
        </div>

        <!-- Portfolio Grid -->
        <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          <!-- Card 1 -->
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 p-4">
              <img class="h-24 w-auto" src="/logos/companies/financeforward.svg" alt="FinanceForward logo">
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-semibold text-gray-900">FinanceForward</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Markup
                  </span>
                </div>
                <p class="mt-3 text-base text-gray-500">
                  Automated financial management platform for small businesses.
                </p>
              </div>
              <div class="mt-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Fintech
                </span>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 p-4">
              <img class="h-24 w-auto" src="/logos/companies/meditrack.svg" alt="MediTrack logo">
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-semibold text-gray-900">MediTrack</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Markup
                  </span>
                </div>
                <p class="mt-3 text-base text-gray-500">
                  Digital health tracking platform for patients and providers.
                </p>
              </div>
              <div class="mt-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Health
                </span>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 p-4">
              <img class="h-24 w-auto" src="/logos/companies/retailgenius.svg" alt="RetailGenius logo">
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-semibold text-gray-900">RetailGenius</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Acquired
                  </span>
                </div>
                <p class="mt-3 text-base text-gray-500">
                  Retail management and POS solution for small to medium businesses.
                </p>
              </div>
              <div class="mt-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Retail
                </span>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 p-4">
              <img class="h-24 w-auto" src="/logos/companies/devopsninja.svg" alt="DevOpsNinja logo">
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-semibold text-gray-900">DevOpsNinja</h3>
                </div>
                <p class="mt-3 text-base text-gray-500">
                  Analytics solution for SaaS companies to track KPIs and growth metrics.
                </p>
              </div>
              <div class="mt-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  SaaS
                </span>
              </div>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 p-4">
              <img class="h-24 w-auto" src="/logos/companies/payflow.svg" alt="PayFlow logo">
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-semibold text-gray-900">PayFlow</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Markup
                  </span>
                </div>
                <p class="mt-3 text-base text-gray-500">
                  Secure payment processing gateway for international transactions.
                </p>
              </div>
              <div class="mt-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Fintech
                </span>
              </div>
            </div>
          </div>

          <!-- Card 6 -->
          <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
            <div class="flex-shrink-0 bg-gray-50 flex items-center justify-center h-48 p-4">
              <img class="h-24 w-auto" src="/logos/companies/healthhub.svg" alt="HealthHub logo">
            </div>
            <div class="flex-1 bg-white p-6 flex flex-col justify-between">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-xl font-semibold text-gray-900">HealthHub</h3>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Markup
                  </span>
                </div>
                <p class="mt-3 text-base text-gray-500">
                  AI-powered diagnostic assistant for healthcare providers.
                </p>
              </div>
              <div class="mt-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Health
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  return createPageTemplate('Portfolio', portfolioContent, 'portfolio');
};
}

// Route handlers
app.get('/portfolio', (c) => {
  return c.html(generatePortfolioHTML());
});

// Create page layout template
function createPageTemplate(title, content, activePage) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Samir's Portfolio</title>
  <link rel="stylesheet" href="/styles/global.css">
  <link rel="stylesheet" href="/tailwind.css">
</head>
<body class="bg-gray-50 min-h-screen">
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="flex justify-between h-16 items-center">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-2xl font-bold text-gray-900">Samir</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          <a href="/" class="${activePage === 'home' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Home
          </a>
          <a href="/portfolio" class="${activePage === 'portfolio' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Portfolio
          </a>
          <a href="/ventures" class="${activePage === 'ventures' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Ventures
          </a>
          <a href="/profile" class="${activePage === 'profile' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
            Profile
          </a>
        </div>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main>
    ${content}
  </main>

  <!-- Footer -->
  <footer class="bg-white mt-12 py-12 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex justify-center md:order-2 space-x-6">
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">Twitter</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">LinkedIn</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">GitHub</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
        <div class="mt-8 md:mt-0 md:order-1">
          <p class="text-center text-base text-gray-400">
            &copy; ${new Date().getFullYear()} Samir. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

// Route handlers for other pages
app.get('/', (c) => {
  const content = `
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-base font-semibold text-indigo-600 tracking-wide uppercase">Samir's Portfolio</h1>
          <p class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Finance & Technology Expert
          </p>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Building solutions at the intersection of finance and technology
          </p>
          <div class="mt-8 flex justify-center">
            <div class="rounded-md shadow">
              <a href="/portfolio" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                View Portfolio
              </a>
            </div>
            <div class="ml-3 rounded-md shadow">
              <a href="/profile" class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                About Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return c.html(createPageTemplate('Home', content, 'home'));
});

app.get('/profile', (c) => {
  const content = `
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Me</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Samir
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Entrepreneur, investor, and advisor with a focus on financial technology
          </p>
        </div>

        <div class="mt-10">
          <div class="prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              With over 15 years of experience in finance and technology, I've dedicated my career to building innovative solutions that solve real-world problems. I've founded three successful companies and advised dozens more, with a particular focus on fintech, health tech, and enterprise SaaS.
            </p>
            <p>
              My background spans investment banking, venture capital, and entrepreneurship, giving me a unique perspective on creating value in early and growth-stage businesses.
            </p>
            <h3>Education</h3>
            <ul>
              <li>MBA, Harvard Business School</li>
              <li>BS Computer Science, Stanford University</li>
            </ul>
            <h3>Experience</h3>
            <ul>
              <li>Founder & CEO, GlobalTech Solutions (acquired 2019)</li>
              <li>Partner, Horizon Ventures</li>
              <li>Investment Banking Associate, Goldman Sachs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  return c.html(createPageTemplate('Profile', content, 'profile'));
});

app.get('/ventures', (c) => {
  const content = `
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Ventures</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Investment Philosophy
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Supporting entrepreneurs who are building the future of finance, healthcare, and enterprise software
          </p>
        </div>

        <div class="mt-10">
          <div class="prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>
              Through my venture fund, I invest in early-stage companies with exceptional founders who have unique insights into their markets. I focus on these key areas:
            </p>
            
            <h3>Investment Focus</h3>
            <ul>
              <li><strong>Fintech:</strong> Infrastructure, embedded finance, and financial inclusion</li>
              <li><strong>Health Tech:</strong> Digital health, remote monitoring, and care coordination</li>
              <li><strong>Enterprise SaaS:</strong> Workflow automation, data analytics, and vertical SaaS</li>
            </ul>
            
            <h3>How I Help</h3>
            <ul>
              <li>Strategic guidance based on 15+ years of operating experience</li>
              <li>Access to an extensive network of operators, investors, and advisors</li>
              <li>Support with fundraising, team building, and go-to-market strategy</li>
            </ul>
            
            <p>
              If you're building something innovative in these areas, I'd love to hear from you.
            </p>
            
            <div class="mt-6 bg-indigo-50 p-6 rounded-lg">
              <h3>Get in Touch</h3>
              <p>
                Contact me at <a href="mailto:ventures@samir.com" class="text-indigo-600 hover:text-indigo-500">ventures@samir.com</a> with a brief overview of your company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  return c.html(createPageTemplate('Ventures', content, 'ventures'));
});

// Configure the server
const port = process.env.PORT || 3000;
console.log(`Server running at http://localhost:${port}`);

// Start the server
serve({
  fetch: app.fetch,
  port: port
});