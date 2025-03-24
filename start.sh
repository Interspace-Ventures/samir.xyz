#!/bin/bash

echo "Starting simplified server directly..."

# Make scripts executable
chmod +x *.sh simple-server.js

# Check if the out directory exists with content
if [ ! -d "out" ] || [ ! -f "out/index.html" ]; then
  # If the out directory doesn't exist or is empty, generate static site
  echo "No existing static site found. Using simple site generator..."
  ./generate-simple-site.sh
else
  echo "Using existing static site files in out directory..."
fi

# Start the Next.js build in background to update files while server is running
echo "Starting Next.js build in background..."
./build-next-site.sh &

# Directly start the server
echo "Starting Bun server on port 5000..."
exec ./simple-server.js