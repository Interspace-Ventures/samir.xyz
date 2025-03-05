import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Set port to 5000 to match Replit's configuration
const PORT = parseInt(process.env.PORT || '5000', 10);

// Serve static files from the public directory
const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

// Default route to serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});