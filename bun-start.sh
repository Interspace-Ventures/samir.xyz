#!/bin/bash

echo "Starting with Bun-optimized static site server..."

# Create output directory if it doesn't exist
mkdir -p out
mkdir -p public
mkdir -p attached_assets

echo "Ensuring public folder has access to attached_assets content..."
# Create symlink to attached_assets if it doesn't exist
if [ ! -L "public/attached_assets" ]; then
  ln -sf ../attached_assets public/attached_assets
fi

# Generate the simple static site if it doesn't exist
if [ ! -f "out/index.html" ]; then
  echo "Generating static site content..."
  ./generate-simple-site.sh
fi

echo "Starting Bun HTTP server to serve the static files on port 5000..."
exec bun run bun-simple-server.js