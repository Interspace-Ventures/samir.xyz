// Ultra simple Express server for deployment on Replit
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Use public directory at the root level
const publicDir = path.join(__dirname, 'public');
console.log(`Serving static files from: ${publicDir}`);

// Serve static files from the public directory
app.use(express.static(publicDir));

// Serve index.html for all other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Try to handle the case where the port might already be in use
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use, trying port ${PORT + 1}`);
    app.listen(PORT + 1, () => {
      console.log(`Server running on port ${PORT + 1}`);
    });
  } else {
    console.error('Server error:', error);
  }
});