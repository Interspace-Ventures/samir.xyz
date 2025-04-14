// dev.js - ESM compatible dev script
import { spawn } from 'child_process';
import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { installGlobals } from '@remix-run/node';

// Install Remix globals
installGlobals();

// Start Remix dev compiler in the background
const remixDev = spawn('node', [
  './node_modules/@remix-run/dev/dist/cli.js',
  'build',
  '--watch'
], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'development' }
});

// Initialize express app
const app = express();

// Serve public files
app.use(express.static('public'));
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }));

// Create Remix request handler with dynamic import to handle rebuilds
app.all(
  '*',
  async (req, res, next) => {
    try {
      // Clear require cache to get the latest build
      Object.keys(require.cache).forEach(key => {
        if (key.includes('/build/')) {
          delete require.cache[key];
        }
      });
      
      // Dynamic import of the latest build
      const build = await import('./build/index.js?t=' + Date.now());
      
      return createRequestHandler({
        build,
        mode: process.env.NODE_ENV
      })(req, res, next);
    } catch (error) {
      console.error('Error handling request:', error);
      res.status(500).send('Internal Server Error: ' + error.message);
    }
  }
);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down');
  remixDev.kill();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down');
  remixDev.kill();
  process.exit(0);
});