// Note: Standalone server that doesn't rely on Remix's ESM/CommonJS compatibility
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Simple MIME type mapping
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};

// Create a simple HTTP server
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Parse the URL
  let url = req.url;
  
  // Handle root route
  if (url === '/') {
    url = '/index.html';
  }
  
  // Resolve the file path
  const filePath = path.join(PUBLIC_DIR, url);
  
  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If the file doesn't exist, serve the index.html (for SPA routing)
      console.log(`File ${filePath} not found, serving index.html instead`);
      serveFile(res, path.join(PUBLIC_DIR, 'index.html'));
      return;
    }
    
    // If it's a directory, try to serve index.html within it
    fs.stat(filePath, (err, stats) => {
      if (err) {
        res.statusCode = 500;
        res.end(`Error: ${err.message}`);
        return;
      }
      
      if (stats.isDirectory()) {
        serveFile(res, path.join(filePath, 'index.html'));
      } else {
        serveFile(res, filePath);
      }
    });
  });
});

// Helper function to serve a file
function serveFile(res, filePath) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log(`File ${filePath} not found`);
        res.statusCode = 404;
        res.end('404 Not Found');
      } else {
        console.error(`Error reading file ${filePath}:`, err);
        res.statusCode = 500;
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }
    
    // Set the content type based on the file extension
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.setHeader('Content-Type', contentType);
    res.end(content);
  });
}

// Start the server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});