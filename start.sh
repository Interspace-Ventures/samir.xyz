#!/bin/bash

# v3.2.0 - Performance-optimized startup script with modular configuration
echo "Starting Next.js application v3.2.0..."

# Set critical environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export PORT=5000
export HOSTNAME=0.0.0.0
export NEXT_PUBLIC_REPLIT_RUNNING=true

# Performance tweaks:
# 1. Always use Bun runtime for better performance
export NEXT_RUNTIME="bun"

# 2. Disable development overlay and source maps for faster load times
export NEXT_MINIMAL_TRACEPARENT=00-0000000000000000-0000000000000000-00
export NEXT_DISABLE_SOURCEMAPS=1
export NEXT_DISABLE_WEBPACK_SOURCEMAPS=1

# 3. Memory optimizations for Bun 
# (removed due to compatibility issues with current Bun version)

# 4. Add runtime performance boost
export NODE_OPTIONS="--max-old-space-size=2048"

# Selective cleanup (only if needed) to prevent cache issues but speed up startup
if [ -f ".next/cache/invalid" ] || [ ! -d ".next" ]; then
  rm -rf .next
  rm -rf node_modules/.cache
  echo "Cleared build cache for fresh start"
else
  echo "Using existing build cache for faster startup"
fi

# Check version
if [ -f "version.json" ]; then
  VERSION=$(grep -o '"version": "[^"]*' version.json | cut -d'"' -f4)
  echo "Portfolio Website Version: $VERSION"
fi

# Start Next.js dev server with optimal configuration
echo "Starting Next.js development server on port 5000 using optimized Bun runtime..."
echo "==============================================================="

# Apply custom startup options via Node.js wrapper for better performance
if [ -f "custom-start.js" ]; then
  exec bun run custom-start.js
else
  # Fallback to standard startup
  exec bun run next dev -p 5000 --hostname 0.0.0.0 --turbo
fi