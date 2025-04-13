import path from 'path';
import express from 'express';
import { createRequestHandler } from '@remix-run/express';
import compression from 'compression';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Add compression middleware
app.use(compression());

// Serve static files from the public directory
app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' })
);
app.use(express.static('public', { maxAge: '1h' }));

// For Remix build
const BUILD_DIR = path.join(process.cwd(), "build");

// Add Remix request handler
app.all(
  '*',
  createRequestHandler({
    build: await import(BUILD_DIR),
    mode: process.env.NODE_ENV
  })
);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});