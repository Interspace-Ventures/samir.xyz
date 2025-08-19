#!/bin/bash

# Portfolio Website Production Starter Script
# This script builds and starts the Next.js server in production mode for better performance

echo "🚀 Starting Next.js Portfolio Website in Production Mode..."

# Kill any existing Next.js processes
pkill -f "next" || true

# Check if a production build exists
if [ ! -d ".next" ] || [ ! -f ".next/BUILD_ID" ]; then
  echo "📦 No production build found. Building application..."
  npx next build
  if [ $? -ne 0 ]; then
    echo "❌ Build failed. Falling back to development mode..."
    exec npx next dev -p 3000 -H 0.0.0.0
  fi
else
  echo "✅ Production build found."
fi

# Start the Next.js production server
echo "🎯 Starting Next.js in production mode on port 3000..."
exec npx next start -p 3000 -H 0.0.0.0