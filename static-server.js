// Static file server with ES modules
import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting static file server...');

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

// Create HTTP server
const server = createServer(async (req, res) => {
  console.log(`Request received: ${req.url}`);
  
  try {
    // Get the path from the URL
    let path = req.url === '/' ? '/static.html' : req.url;
    
    // Try to serve from public directory if not found in root
    let filePath = join(__dirname, path);
    
    // Get file extension and MIME type
    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';
    
    // Read and serve the file
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
    
  } catch (err) {
    console.error('Error serving file:', err);
    
    // If file not found, try serving static.html
    try {
      const data = await readFile(join(__dirname, 'static.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    } catch (fallbackErr) {
      // If all else fails, send a basic error message
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>Server Error</h1><p>Unable to serve content.</p></body></html>');
    }
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Static server running at http://0.0.0.0:${PORT}/`);
});