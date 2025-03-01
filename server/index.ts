import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fs from 'fs';

// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Define the static files directory - use public directory only
const publicDir = path.resolve(__dirname, '../public');

console.log('Current directory:', process.cwd());
console.log('Server directory:', __dirname);
console.log('Public directory path:', publicDir);

// Check if public directory exists
if (fs.existsSync(publicDir)) {
  console.log('Public directory exists. Contents:');
  fs.readdirSync(publicDir).forEach(file => {
    console.log(' - ' + file);
  });
} else {
  console.error('ERROR: Public directory does not exist!');
}

// Serve static files
app.use(express.static(publicDir));

// Log requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

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
  console.log(`Server running on port ${PORT}`);
});