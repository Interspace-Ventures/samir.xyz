#!/bin/bash

# Kill any existing Next.js processes
killall node 2>/dev/null || true

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next/cache

# Start the Next.js development server
echo "Starting Next.js on port 3000..."
exec npx next dev -p 3000 -H 0.0.0.0