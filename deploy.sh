#!/bin/bash

echo "Starting deployment process..."

# Build the project
echo "Building the project..."
npx vite build

# Ensure public directory exists
mkdir -p public

# Copy build files to public directory
echo "Copying build files to public directory..."
cp -r build/* public/

# Create a simple Express server for serving static files
echo "Creating a simple Express server for deployment..."
cat > deployment-server.js << 'EOF'
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// For all other routes, serve the index.html file (for SPA routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOF

echo "Deployment preparation completed!"
echo "You can now click the 'Deploy' button in Replit to deploy your website."
echo "For deployment, Replit will use the Express server to serve the static files."