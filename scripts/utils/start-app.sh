#!/bin/bash
echo "Starting Next.js application in development mode..."
echo "- Clearing Next.js cache..."
rm -rf .next
export NODE_ENV=development
echo "- Starting Next.js server on port 8080..."
npx next dev -p 8080 -H 0.0.0.0 &
echo $! > next.pid
echo "Next.js server started in the background"