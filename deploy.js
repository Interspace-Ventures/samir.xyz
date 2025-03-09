// [DEPRECATED] This deployment script was used for Vite and is no longer needed
// Next.js handles deployment through its own build process
// Please use next start for production deployment instead

import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

// This file is kept for reference but should not be used
// Next.js deployment is handled through next start command

// Previous Vite deployment code below
// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Define the static files directory
const publicDir = path.resolve(__dirname, './public');

console.log('Deployment server starting...');
console.log('Current directory:', process.cwd());
console.log('Public directory path:', publicDir);

// Check if public directory exists
if (fs.existsSync(publicDir)) {
  console.log('Public directory exists. Contents:');
  fs.readdirSync(publicDir).forEach(file => {
    console.log(' - ' + file);
  });
} else {
  console.error('ERROR: Public directory does not exist!');
  // Try creating it as a last resort
  try {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log('Created missing public directory');
  } catch (err) {
    console.error('Failed to create public directory:', err);
  }
}

// Serve static files
app.use(express.static(publicDir));

// For all other routes, serve the index.html file (SPA routing)
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('ERROR: index.html not found at', indexPath);
    res.status(404).send('index.html not found');
  }
});

// Start the server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Deployment server running on port ${PORT}`);
});