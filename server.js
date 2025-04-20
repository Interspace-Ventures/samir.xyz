import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import { broadcastDevReady } from '@remix-run/node';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the build directory exists
const buildDirectory = path.join(__dirname, 'build');
if (!fs.existsSync(buildDirectory)) {
  console.error(`Build directory doesn't exist: ${buildDirectory}`);
  process.exit(1);
}

// Create an express app
const app = express();

// Configure static file serving for public assets
app.use(express.static('public'));

// Import build
const BUILD_MODULE = await import('./build/index.js');

// Configure Remix handler for all routes
app.all(
  '*',
  createRequestHandler({
    build: BUILD_MODULE
  })
);

// Start the server on the PORT environment variable or a default (50000)
const port = process.env.PORT || 50000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
  
  // Notify Remix dev server we're ready
  if (process.env.NODE_ENV === 'development') {
    broadcastDevReady(BUILD_MODULE);
  }
});
