#!/bin/bash
set -e # Exit on error

# Kill any running Node.js processes that might be related to our Remix app
echo "Checking for existing Node.js processes..."
if pgrep -f "remix dev" > /dev/null; then
  echo "Found Remix processes, terminating them..."
  pkill -f "remix dev" || true
  sleep 2
fi

# Use a very unique port to avoid conflicts
SERVER_PORT=3333

# Check if our port is available
if lsof -i:$SERVER_PORT > /dev/null 2>&1; then
  echo "Port $SERVER_PORT is already in use. Killing process..."
  kill -9 $(lsof -t -i:$SERVER_PORT) 2>/dev/null || true
  sleep 2
fi

echo "Setting up directories..."
mkdir -p public/build
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

# Copy the Tailwind CSS file to the public directory
echo "Building Tailwind CSS..."
cp ./app/tailwind.css ./public/tailwind.css

# Skip building if SKIP_BUILD is set
if [ "$SKIP_BUILD" != "true" ]; then
  echo "Building Remix application..."
  npx remix build
else
  echo "Skipping build step..."
fi

# Clear the terminal
clear

# Set environment variables
export PORT=$SERVER_PORT
export NODE_ENV=development

echo "Starting Remix development server on port $SERVER_PORT..."
echo "----------------------------------------"
# Instead of using remix-serve, use the dev server which doesn't need a build directory
npx remix dev -p $SERVER_PORT