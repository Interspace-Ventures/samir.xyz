#!/bin/bash

# Navigate to the project directory
cd portfolio-site

# Install dependencies if node_modules doesn't exist or is empty
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the development server
echo "Starting Next.js development server..."
npm run dev