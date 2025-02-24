import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Add logging middleware to debug static file serving
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, '../build')));

// SPA fallback - this should be after static file middleware
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
  console.log(`Static files being served from: ${path.join(__dirname, '../build')}`);
});