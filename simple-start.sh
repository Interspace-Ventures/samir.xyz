#!/bin/bash

echo "Starting simplified server..."

# Make our server file executable
chmod +x simple-server.js

# Run the static site generator if needed
if [ ! -d "out" ] || [ ! -f "out/index.html" ]; then
  echo "Generating static site..."
  ./generate-simple-site.sh
fi

# Directly execute the server script
echo "Starting server on port 5000..."
exec ./simple-server.js