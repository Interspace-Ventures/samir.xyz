const path = require('path');
const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const compression = require('compression');

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

// Add Remix request handler
app.all(
  '*',
  createRequestHandler({
    build: require(path.resolve('./build')),
    mode: process.env.NODE_ENV
  })
);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});