// scripts/start.js - Unified server start script
import { spawn } from 'child_process';
import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';

// Install Remix globals
installGlobals();

// Default to production mode unless specified
const isProduction = process.env.NODE_ENV !== 'development';
console.log(`Starting server in ${isProduction ? 'production' : 'development'} mode`);

// In development mode, start the Remix compiler
let remixDev = null;
if (!isProduction) {
  remixDev = spawn('node', [
    './node_modules/@remix-run/dev/dist/cli.js',
    'build',
    '--watch'
  ], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' }
  });
  
  console.log('Remix development compiler started');
}

// Initialize express app
const app = express();

// Enable compression for better performance
app.use((req, res, next) => {
  // Simple compression middleware - can be replaced with compression package
  res.setHeader('X-Powered-By', 'Remix');
  next();
});

// Serve static files
app.use(express.static('public'));
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }));

// Create Remix request handler
app.all(
  '*',
  isProduction
    ? createRequestHandler({
        build: require('../build'),
        mode: 'production'
      })
    : async (req, res, next) => {
        try {
          // Clear require cache to get the latest build
          Object.keys(require.cache).forEach(key => {
            if (key.includes('/build/')) {
              delete require.cache[key];
            }
          });
          
          // Dynamic import of the latest build
          const build = await import('../build/index.js?t=' + Date.now());
          
          return createRequestHandler({
            build,
            mode: 'development'
          })(req, res, next);
        } catch (error) {
          console.error('Error handling request:', error);
          res.status(500).send('Internal Server Error: ' + error.message);
        }
      }
);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Express server listening on port ${port}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  if (remixDev) remixDev.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down');
  if (remixDev) remixDev.kill();
  process.exit(0);
});