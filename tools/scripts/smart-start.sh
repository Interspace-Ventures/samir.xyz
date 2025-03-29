#!/bin/bash

echo "Smart start script - will use prebuilt site if available, otherwise generate simple site..."

# Check if the Next.js build has completed
if [ -d "out" ] && [ -f "out/index.html" ]; then
  echo "Found existing built site, using it..."
  cd out
  exec npx http-server -p 5000 --cors -a 0.0.0.0
else
  echo "No prebuilt site found, running build-next-site.sh..."
  # Build the Next.js site
  ./tools/scripts/build-next-site.sh
  
  echo "Starting simple HTTP server to serve the static files on port 5000..."
  cd out
  exec npx http-server -p 5000 --cors -a 0.0.0.0
fi