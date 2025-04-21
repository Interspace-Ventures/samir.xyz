const express = require('express');
const { createRequestHandler } = require('@remix-run/express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

// Configure the app
const app = express();
const PORT = process.env.PORT || 60000;
const BUILD_DIR = path.join(process.cwd(), "build");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// Log all requests
app.use(morgan('tiny'));

// Serve static files from the public directory
app.use(express.static(PUBLIC_DIR));

// Create Remix request handler only if build exists
if (!fs.existsSync(BUILD_DIR)) {
  app.use((req, res) => {
    res.status(404).send('Remix build not found! Please run `remix build` first.');
  });
} else {
  // Use the remix request handler
  app.all(
    "*",
    createRequestHandler({
      build: require(BUILD_DIR),
      // Return 404 for API requests that don't match Remix routes
      mode: process.env.NODE_ENV,
    })
  );
}

// Start the server
app.listen(PORT, () => {
  console.log(`Remix app server started at http://localhost:${PORT}`);
});
