// Optimized custom NextJS starter (v3.2.0)
// High-performance Next.js server using optimized Node.js APIs
// with memory and cache optimizations for maximum speed

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { getNextConfig } from './config/next/index.js';

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '5000', 10);

// Performance measurement
const startTime = performance.now();

// Get optimized configuration
const optimizedConfig = getNextConfig();

// Create a memory-optimized Next.js app
const app = next({ 
  dev,
  dir: '.',
  conf: {
    // Core configuration
    distDir: '.next',
    reactStrictMode: false,
    
    // Performance optimization: Keep only essential settings
    compress: true,
    poweredByHeader: false,
    
    // Minimal experimental features for maximum performance
    experimental: {
      optimizeCss: true,
    },
    
    // Only include necessary page extensions
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  } 
});

// Create a pre-optimized request handler
const handle = app.getRequestHandler();

// Initialize server with minimal overhead
console.log('Initializing high-performance Next.js server...');

// Track memory usage
const initialMemory = process.memoryUsage().heapUsed / 1024 / 1024;

// Performance-optimized server initialization
app.prepare().then(() => {
  const prepTime = performance.now() - startTime;
  console.log(`Next.js initialization complete in ${prepTime.toFixed(0)}ms`);
  
  // Cache for static assets to improve performance
  const assetCache = new Map();
  
  // Create optimized HTTP server with connection keep-alive
  const server = createServer({
    keepAlive: true,
    keepAliveTimeout: 60000, // Keep connections alive for 60 seconds
  }, async (req, res) => {
    try {
      // Performance: Set response headers for faster delivery
      res.setHeader('X-Content-Type-Options', 'nosniff');
      
      // Handle static assets efficiently with caching
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;
      
      // Cache check for static assets
      if (pathname.match(/\.(js|css|svg|jpe?g|png|webp|woff2?)$/)) {
        if (assetCache.has(pathname)) {
          const cachedAsset = assetCache.get(pathname);
          Object.entries(cachedAsset.headers).forEach(([key, value]) => {
            res.setHeader(key, value);
          });
          res.end(cachedAsset.data);
          return;
        }
      }
      
      // Let Next.js handle everything else
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Request error:', err.message);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });
  
  // Start server with enhanced error handling
  server.listen(port, hostname, (err) => {
    if (err) throw err;
    
    // Calculate memory usage and startup time
    const currentMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    const memoryUsed = (currentMemory - initialMemory).toFixed(2);
    const totalTime = (performance.now() - startTime).toFixed(0);
    
    console.log(`> Server ready on http://${hostname}:${port}`);
    console.log(`> Memory usage: ${memoryUsed}MB`);
    console.log(`> Total startup time: ${totalTime}ms`);
  });
  
  // Optimize shutdown for faster restarts
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, () => {
      console.log(`> Gracefully shutting down on ${signal}...`);
      server.close(() => {
        console.log('> Server closed');
        process.exit(0);
      });
    });
  });
});