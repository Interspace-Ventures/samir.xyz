#!/bin/bash
set -e # Exit on error

export PORT=5000
export NODE_ENV=development

echo "Cleaning up any existing Node processes..."
# Kill any existing Node processes (this is necessary in Replit)
pkill -9 node 2>/dev/null || true

# Also specifically target port 5000
for pid in $(lsof -t -i:5000 2>/dev/null); do
  echo "Killing process $pid on port 5000"
  kill -9 $pid 2>/dev/null || true
done

# Wait for processes to terminate
sleep 2

echo "Setting up directories..."
# Make sure the public directory exists for assets
mkdir -p public/build
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

echo "Building Tailwind CSS..."
# Simple direct copy approach for CSS
cp ./app/tailwind.css ./public/tailwind.css

echo "Starting Remix development server..."
# Start Remix dev server using npx
npx remix dev -p 5000