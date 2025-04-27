#!/bin/bash
echo "Starting Next.js application..."
export NEXT_TELEMETRY_DISABLED=1
# Kill any existing Next.js processes
pkill -f "next dev" || true
# Start Next.js on the port Replit uses (8080)
npx next dev -p 8080 --hostname 0.0.0.0
