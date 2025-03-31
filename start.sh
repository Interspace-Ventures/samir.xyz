#!/bin/bash

echo "Starting Next.js development server... VERSION 4.1"

# Make scripts executable if needed
chmod +x *.sh
mkdir -p tools/scripts
chmod +x tools/scripts/organize-assets.sh 2>/dev/null || true
chmod +x tools/scripts/cleanup-test-dirs.sh 2>/dev/null || true

# Run asset organization script to ensure consistent file structure
echo "Organizing assets for consistency..."
./tools/scripts/organize-assets.sh

# Check for test directories and clean them up if found
if ls -d src/app/{basic,basic-diagnostic,basic-test,debug,debug-portfolio,grid-test,simple-ventures,test,test-simple,ultra-minimal} 2>/dev/null >/dev/null; then
  echo "Found test directories, cleaning up..."
  ./tools/scripts/cleanup-test-dirs.sh
fi

# Only clean up processes if they're causing issues
if pgrep -f "next" >/dev/null; then
  echo "Cleaning up existing Next.js processes..."
  pkill -f "next" || true
fi

# Define necessary environment variables
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
# Keep only essential environment variables
export PORT=5000
export HOSTNAME=0.0.0.0

# Set optimized Node options
export NODE_OPTIONS="--max-http-header-size=16384 --max-old-space-size=4096"

# Only create .next directory if it doesn't exist
mkdir -p .next 2>/dev/null || true

# Update webview compatibility
echo "window.__NEXT_WEBVIEW_COMPATIBILITY__ = true;" > public/webview-compat.js

# Start the Next.js development server
echo "Starting Next.js dev server on port 5000 (http://0.0.0.0:5000)..."
exec bun run next dev -p 5000 --hostname 0.0.0.0 --turbo