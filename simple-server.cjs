const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 60000;

// Serve static files from the public directory
app.use(express.static('public'));

// Serve static files from the build directory
app.use('/build', express.static('public/build'));

// Simple test route
app.get('/test', (req, res) => {
  res.send('Server is working!');
});

// For all other routes, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
