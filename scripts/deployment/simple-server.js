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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});