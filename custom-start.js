// Minimal custom NextJS starter
// This script creates a minimal Next.js server using Node.js APIs directly

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = 5000;

// Initialize Next.js with the most basic configuration possible
const app = next({ 
  dev,
  dir: '.',
  conf: {
    distDir: '.next',
    reactStrictMode: false,
    experimental: {},
    // Disable ALL experimental features and only keep what's needed
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  } 
});

const handle = app.getRequestHandler();

// Boot message
console.log('Starting a minimal Next.js server...');

app.prepare().then(() => {
  console.log('Next.js initialization complete');
  
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      
      // Let Next.js handle the request
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});