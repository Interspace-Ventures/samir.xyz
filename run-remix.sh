#!/bin/bash
set -e # Exit on error

export PORT=5000
export NODE_ENV=development

echo "Setting up directories..."
# Make sure the public/build directory exists for assets
mkdir -p public/build

# Ensure we have the standard asset directories
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

echo "Building Tailwind CSS..."
# Simple direct copy approach for CSS
cp ./app/tailwind.css ./public/tailwind.css

echo "Cleaning up server processes..."
# Kill all Node.js processes (this is aggressive but effective in Replit)
echo "Killing all Node.js processes..."
pkill -9 node 2>/dev/null || true

# Also specifically target port 5000
echo "Checking for processes on port 5000..."
for pid in $(lsof -t -i:5000 2>/dev/null); do
  echo "Killing process $pid that was using port 5000"
  kill -9 $pid 2>/dev/null || true
done

# Also look for any Remix-related processes
for pid in $(ps aux | grep "remix\|vite" | grep -v grep | awk '{print $2}'); do
  echo "Killing Remix/Vite process $pid"
  kill -9 $pid 2>/dev/null || true
done

# Wait longer for processes to terminate completely
echo "Waiting for processes to terminate..."
sleep 3

echo "Starting Remix development server..."
# Start Remix dev server with npx
echo "Executing: npx remix dev -p 5000"
npx remix dev -p 5000