// server.cjs - Custom server adapter for Remix (CommonJS)
const path = require('path');
const express = require('express');
const compression = require('compression');
const { createRequestHandler } = require('@remix-run/express');
const { installGlobals } = require('@remix-run/node');

// Install Remix globals
installGlobals();

// Initialize express app
const app = express();

// Use compression middleware
app.use(compression());

// Serve public files
app.use(express.static('public', { maxAge: '1h' }));

// Serve build assets with longer cache
app.use(express.static('public/build', { immutable: true, maxAge: '1y' }));

// Create Remix request handler
// Use dynamic import for ESM modules
(async () => {
  const { default: build } = await import('./build/index.js');
  
  app.all(
    '*',
    createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    })
  );
})();

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});