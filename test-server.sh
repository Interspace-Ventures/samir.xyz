#!/bin/bash

# Enable debug output
set -x

echo "Starting simple test server..."

# Export port
export PORT=5000

# Try running with Bun
if command -v bun > /dev/null; then
  echo "Using Bun to run server..."
  bun run simple-server.js
else
  # Try running with Node
  echo "Using Node to run server..."
  node simple-server.js
fi