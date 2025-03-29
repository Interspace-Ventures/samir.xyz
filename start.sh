#!/bin/bash

echo "Starting Next.js development server with enhanced compatibility... VERSION 3.0"
echo "UPDATED PORTFOLIO CARDS - Clean white background cards with no border and pure purple badges"

# Make scripts executable
chmod +x *.sh
mkdir -p tools/scripts
chmod +x tools/scripts/*.sh || true

# Kill any existing Next.js processes
echo "Cleaning up any existing Next.js processes..."
pkill -f "next" || true

# Define compatibility environment variables directly in script
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
export NEXT_IGNORE_REACT_ERROR=1
export NEXT_PUBLIC_SUPPRESS_HYDRATION_WARNING=true
export NEXT_PUBLIC_ALLOW_ALL_ORIGINS=true
export NEXT_DISABLE_REACT_STRICT_MODE=true
export PORT=5000
export HOSTNAME=0.0.0.0

# Additional debugging help
export NEXT_DEBUG=true
export DEBUG=*

# Set optimized Node options with increased memory allocation for better performance
export NODE_OPTIONS="--max-http-header-size=16384 --no-warnings --max-old-space-size=4096"

# Create .next directory if it doesn't exist and ensure proper permissions
mkdir -p .next
chmod -R 777 .next || true

# Completely clean Next.js build and cache for fresh start
echo "Performing full Next.js cleanup for fresh start..."
rm -rf .next || true
rm -rf node_modules/.cache || true

# Special fix for Replit Webview compatibility issues with cross-origin requests
echo "window.__NEXT_WEBVIEW_COMPATIBILITY__ = true;" >> public/webview-compat.js

# Wait briefly to make sure environment is ready
echo "Preparing development environment..."
sleep 2

# Start the Next.js development server with proper configuration for Replit
echo "Starting Next.js dev server on port 5000 (http://0.0.0.0:5000)..."
exec bun run next dev -p 5000 --hostname 0.0.0.0 --turbo