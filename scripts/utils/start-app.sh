#!/bin/bash

# Portfolio Website Fast Startup Script
# This script starts the Next.js server efficiently

echo "🚀 Starting Portfolio Website..."

# Kill any existing Next.js processes
pkill -f "next" || true

# Check if production build exists and is recent
if [ -f ".next/BUILD_ID" ]; then
  echo "✅ Production build found - starting in production mode for fast loading..."
  # Start in production mode (much faster - loads in 2-3 seconds)
  exec npx next start -p 3000 -H 0.0.0.0
else
  echo "📦 No production build found - building first..."
  npx next build
  if [ $? -eq 0 ]; then
    echo "✅ Build successful - starting in production mode..."
    exec npx next start -p 3000 -H 0.0.0.0
  else
    echo "⚠️ Build failed - starting in development mode..."
    exec npx next dev -p 3000 -H 0.0.0.0
  fi
fi