// Very basic Express server for deploying on Replit
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('DEPLOY SERVER STARTING IN COMPATIBILITY MODE');
console.log('Current directory:', __dirname);
console.log('Files in current directory:', fs.readdirSync(__dirname).join(', '));

// Try multiple possible public directories
const possibleDirs = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'build'),
  __dirname
];

let publicDir = null;

// Find the first directory that exists and has an index.html
for (const dir of possibleDirs) {
  if (fs.existsSync(dir)) {
    console.log(`Directory exists: ${dir}`);
    if (fs.existsSync(path.join(dir, 'index.html'))) {
      console.log(`Found index.html in ${dir}`);
      publicDir = dir;
      break;
    } else {
      console.log(`No index.html in ${dir}, files:`, fs.readdirSync(dir).join(', '));
    }
  } else {
    console.log(`Directory does not exist: ${dir}`);
  }
}

// If no valid directory was found, create and use a fallback
if (!publicDir) {
  console.log('No valid public directory found. Creating a minimal one.');
  const fallbackDir = path.join(__dirname, 'public');
  
  if (!fs.existsSync(fallbackDir)) {
    fs.mkdirSync(fallbackDir, { recursive: true });
  }
  
  // Create a minimal index.html
  const fallbackHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fallback Page</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <h1>Deployment Fallback Page</h1>
      <p>The site is still being set up. Please check back later.</p>
      <div>
        <h2>Deployment Debug Info:</h2>
        <p>Current directory: ${__dirname}</p>
        <p>Files in root: ${fs.readdirSync(__dirname).join(', ')}</p>
      </div>
    </body>
    </html>
  `;
  
  fs.writeFileSync(path.join(fallbackDir, 'index.html'), fallbackHtml);
  publicDir = fallbackDir;
}

console.log(`Using public directory: ${publicDir}`);

// Serve static files from the selected directory
app.use(express.static(publicDir));

// For all routes, serve the index.html file (for SPA routing)
app.get('*', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  console.log(`Serving index.html from ${indexPath} for route ${req.path}`);
  res.sendFile(indexPath);
});

// Try to handle the case where the port might already be in use
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use, trying port ${PORT + 1}`);
    app.listen(PORT + 1, () => {
      console.log(`Server running on port ${PORT + 1}`);
    });
  } else {
    console.error('Server error:', error);
  }
});