#!/bin/bash

echo "Starting simplified server directly..."

# Make scripts executable
chmod +x *.sh simple-server.js

# Run the static site generator if needed
if [ ! -d "out" ] || [ ! -f "out/index.html" ]; then
  echo "Generating static site files..."
  ./generate-simple-site.sh
fi

# Directly start the server
echo "Starting Bun server on port 5000..."
exec ./simple-server.js