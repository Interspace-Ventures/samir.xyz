import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure paths
const BUILD_DIR = path.join(process.cwd(), "build");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Create express app
const app = express();
const PORT = process.env.PORT || 60000;

// Log all requests
app.use(morgan('tiny'));

// Serve static files from the public directory
app.use(express.static(PUBLIC_DIR));

// Function to start the server
async function startServer() {
  try {
    if (!fs.existsSync(BUILD_DIR)) {
      console.error('Build directory does not exist:', BUILD_DIR);
      process.exit(1);
    }

    // Import the build dynamically
    const BUILD_MODULE = await import('./build/index.js');

    // Configure Remix handler for all other routes
    app.all(
      '*',
      createRequestHandler({
        build: BUILD_MODULE,
        mode: process.env.NODE_ENV
      })
    );

    // Start the server
    app.listen(PORT, () => {
      console.log(`Remix app server started at http://localhost:${PORT}`);
      
      // Don't try to broadcast dev ready in simple server mode
      // This avoids the "Dev server origin not set" error
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();
