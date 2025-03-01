import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

// Setup dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Define the static files directory - use public directory only
const publicDir = path.resolve(__dirname, '../public');

console.log('Running simplified server with static files from public directory');

// Serve static files
app.use(express.static(publicDir));

// For all other routes, serve the index.html file (SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Start the server on all interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});