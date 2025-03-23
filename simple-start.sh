#!/bin/bash

echo "Starting with simplified static site..."

# Create output directory
mkdir -p public
mkdir -p attached_assets

echo "Ensuring public folder has access to attached_assets content..."
# Create symlink to attached_assets if it doesn't exist
if [ ! -L "public/attached_assets" ]; then
  ln -sf ../attached_assets public/attached_assets
fi

# Generate the simple static site
./generate-simple-site.sh

echo "Starting simple HTTP server to serve the static files on port 5000..."
cd out
exec npx http-server -p 5000 --cors -a 0.0.0.0