#!/bin/bash

# v3.0.0 - Enhanced startup script for Next.js with stability safeguards
echo "Starting Next.js application v3.0.0..."

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export PORT=5000
export HOSTNAME=0.0.0.0
export NEXT_PUBLIC_REPLIT_RUNNING=true

# Critical: Always use Bun runtime for this project
# This prevents the hydration issues that occurred with Node.js
export NEXT_RUNTIME="bun"

# Disable development overlay which causes source map errors
export NEXT_MINIMAL_TRACEPARENT=00-0000000000000000-0000000000000000-00

# Disable source maps to prevent client-side hydration errors
export NEXT_DISABLE_SOURCEMAPS=1
export NEXT_DISABLE_WEBPACK_SOURCEMAPS=1

# Cleanup to prevent cache issues
rm -rf .next
rm -rf node_modules/.cache
echo "Cleared old build files and cache"

# Check if the version is as expected in version.json
if [ -f "version.json" ]; then
  VERSION=$(grep -o '"version": "[^"]*' version.json | cut -d'"' -f4)
  echo "Portfolio Website Version: $VERSION"
fi

# Start Next.js dev server with optimal configuration for Replit
echo "Starting Next.js development server on port 5000 using Bun runtime..."
echo "==============================================================="

# Using the exec command ensures proper signal handling
exec bun run next dev -p 5000 --hostname 0.0.0.0 --turbo