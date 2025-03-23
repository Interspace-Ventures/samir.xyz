#!/bin/bash
# Ultra-simplified start script for Next.js

# Create directories
mkdir -p attached_assets
mkdir -p public
mkdir -p .next

# Create symbolic links from attached_assets to public
ln -sf $(pwd)/attached_assets/* $(pwd)/public/ 2>/dev/null || true

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NODE_OPTIONS="--no-warnings"

# Start the server in the background
echo "Starting Next.js server..."
exec bun run next dev -p 5000 --hostname 0.0.0.0