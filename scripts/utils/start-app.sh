#!/bin/bash
echo "Starting Next.js application in development mode..."
echo "- Clearing Next.js cache..."
rm -rf .next
rm -f next.pid
export NODE_ENV=development
export PORT=3000
echo "- Starting Next.js server on port 3000 (default port)..."
exec npx next dev -p 3000 -H 0.0.0.0