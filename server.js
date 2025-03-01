import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Check if the public directory exists
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  console.log(`Public directory found at: ${publicDir}`);
} else {
  console.log(`Public directory NOT found at: ${publicDir}`);
  // Create it if it doesn't exist
  fs.mkdirSync(publicDir, { recursive: true });
  console.log(`Created public directory at: ${publicDir}`);
}

// Serve static files from the public directory
app.use(express.static(publicDir));

// Serve test.html at the root
app.get('/', (req, res) => {
  const testHtml = path.join(publicDir, 'test.html');
  if (fs.existsSync(testHtml)) {
    res.sendFile(testHtml);
  } else {
    res.send('<h1>Test page</h1><p>Public directory exists but test.html not found.</p>');
  }
});

// For all other routes, check if the file exists in public
app.get('*', (req, res) => {
  const filePath = path.join(publicDir, req.path);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    res.sendFile(filePath);
  } else {
    res.send(`<h1>File not found</h1><p>Could not find: ${req.path}</p>`);
  }
});

app.listen(PORT, () => {
  console.log(`Simple test server running on port ${PORT}`);
});