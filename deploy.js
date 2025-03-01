import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define directories
const publicDir = path.join(__dirname, 'public');
const buildDir = path.join(__dirname, 'build');

// Check if public directory exists and has index.html
if (!fs.existsSync(path.join(publicDir, 'index.html'))) {
  console.log('Public directory missing or incomplete. Checking build directory...');
  
  // If build exists, copy to public
  if (fs.existsSync(path.join(buildDir, 'index.html'))) {
    console.log('Copying build files to public directory...');
    
    // Ensure public directory exists
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Copy build files to public
    fs.cpSync(buildDir, publicDir, { recursive: true });
    console.log('Build files copied successfully.');
  } else {
    console.error('Error: Both public and build directories are missing index.html!');
    console.log('Please run npm run build first.');
    process.exit(1);
  }
}

// Serve static files
app.use(express.static(publicDir));

// For all other routes, serve the index.html file (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Deployment server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});