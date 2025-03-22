#!/bin/bash

# Simple startup script for Next.js
echo "Starting Next.js application..."

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NEXT_RUNTIME="nodejs"  # Force using NodeJS runtime, not Edge
export PORT=5000

# Start Next.js development server
echo "Starting Next.js development server on port 5000..."
exec bun run next dev -p 5000 --hostname 0.0.0.0