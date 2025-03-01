import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Add environment variables debug info
console.log('Environment variables:');
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${process.env.PORT}`);

// Check if the public directory exists
const publicDir = path.join(__dirname, 'public');
console.log(`Checking for public directory at: ${publicDir}`);

if (fs.existsSync(publicDir)) {
  console.log(`Public directory found at: ${publicDir}`);
  
  // List files in public directory for debugging
  const files = fs.readdirSync(publicDir);
  console.log(`Files in public directory: ${files.join(', ')}`);
} else {
  console.log(`Public directory NOT found at: ${publicDir}`);
  console.log(`Current directory: ${__dirname}`);
  console.log(`Directory contents: ${fs.readdirSync(__dirname).join(', ')}`);
  
  // Try to create public directory if it doesn't exist
  try {
    fs.mkdirSync(publicDir, { recursive: true });
    console.log(`Created public directory at: ${publicDir}`);
  } catch (error) {
    console.error(`Error creating public directory: ${error.message}`);
  }
}

// Serve static files from the public directory
app.use(express.static(publicDir));

// Serve index.html or test.html at the root
app.get('/', (req, res) => {
  // First try index.html
  const indexHtml = path.join(publicDir, 'index.html');
  const testHtml = path.join(publicDir, 'test.html');
  
  if (fs.existsSync(indexHtml)) {
    console.log('Serving index.html');
    res.sendFile(indexHtml);
  } else if (fs.existsSync(testHtml)) {
    console.log('Serving test.html');
    res.sendFile(testHtml);
  } else {
    res.send('<h1>Welcome</h1><p>Server is running but no index.html or test.html found in public directory.</p>');
  }
});

// For SPA routing, serve index.html for unknown routes
app.get('*', (req, res) => {
  const filePath = path.join(publicDir, req.path);
  const indexHtml = path.join(publicDir, 'index.html');
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    console.log(`Serving: ${req.path}`);
    res.sendFile(filePath);
  } else if (fs.existsSync(indexHtml)) {
    // For SPA, serve the index.html file
    console.log(`Route ${req.path} not found, serving index.html for SPA routing`);
    res.sendFile(indexHtml);
  } else {
    res.status(404).send(`<h1>404 Not Found</h1><p>Could not find: ${req.path}</p>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});