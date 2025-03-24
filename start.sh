#!/bin/bash

echo "Starting Next.js development server..."

# Make scripts executable
chmod +x *.sh

# Kill any existing Next.js processes
pkill -f "next" || true

# Set development environment and optimize memory
export NODE_ENV=development
export NEXT_TELEMETRY_DISABLED=1
export NEXT_IGNORE_REACT_ERROR=1 # Experimental feature to suppress React hydration warnings

# Set performance options
export NODE_OPTIONS="--max-http-header-size=16384 --no-warnings --max-old-space-size=4096"

# Client-side optimization - suppress React warnings in browser
echo "window.__NEXT_HYDRATION_WARNING_SUPPRESSION__ = true;" > .env

# Start the Next.js development server
echo "Starting Next.js dev server on port 5000..."
# Wait briefly to make sure environment is ready
sleep 2
# Start server and make it wait for port 5000
exec bun run next dev -p 5000 --hostname 0.0.0.0