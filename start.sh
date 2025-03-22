#!/bin/bash

# Simple startup script for Next.js
echo "Starting Next.js application..."

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NEXT_RUNTIME="nodejs"
export PORT=5000
export HOSTNAME=0.0.0.0
export NEXT_PUBLIC_REPLIT_RUNNING=true
export NEXT_PUBLIC_RUNTIME_JS_DEBUG=1
export NEXT_MINIMAL_TRACEPARENT=00-0000000000000000-0000000000000000-00

# Ensure any old builds are cleaned
rm -rf .next
echo "Cleared old build files"

# Start Next.js dev server directly with minimal config
echo "Starting Next.js development server on port 5000..."
exec bun run next dev -p 5000 --hostname 0.0.0.0 --turbo