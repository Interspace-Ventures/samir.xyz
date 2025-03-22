#!/bin/bash

# Enable debug output
set -x

echo "Starting cleanup..."
# Kill any existing processes on port 5000
pkill -f "node|bun" || true
echo "Waiting for processes to terminate..."
sleep 2

# Create .replit directory if it doesn't exist
mkdir -p .replit || echo "Failed to create .replit directory"

echo "Starting Bun development server..."
# Use Bun to run Next.js directly
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export PORT=5000

# Run bun directly without exec to see output
bun run next dev -p 5000 --hostname 0.0.0.0