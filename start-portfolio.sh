#!/bin/bash

# Clear any Next.js cache that might be causing issues
rm -rf .next/cache

# Kill any existing Next.js processes
pkill -f "next" || true

# Start the Next.js server with the correct host and port
echo "Starting Next.js server on port 3000..."
exec npx next dev -p 3000 -H 0.0.0.0