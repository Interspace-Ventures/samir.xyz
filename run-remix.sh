#!/bin/bash
set -e # Exit on error

# Kill any running Node.js processes
echo "Killing all Node.js processes..."
pkill -9 node 2>/dev/null || true
sleep 5

# Try multiple ports in sequence
for PORT_TO_TRY in 3090 3091 3092 3093 3094 3095
do
  echo "Attempting to use port $PORT_TO_TRY..."
  
  # Try to use this port
  TARGET_PORT=$PORT_TO_TRY
  export PORT=$TARGET_PORT
  export NODE_ENV=development

  echo "Using port $TARGET_PORT for Remix server"

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

  # Remove any existing build files to start fresh
  rm -rf build/* public/build/* || true
  
  echo "Starting Remix development server..."
  # Start Remix dev server with the port
  # Execute in the background and check for success
  npx remix dev -p $TARGET_PORT &
  SERVER_PID=$!
  
  # Wait a bit for server to start
  sleep 10
  
  # Check if server is still running
  if kill -0 $SERVER_PID 2>/dev/null; then
    echo "Server started successfully on port $TARGET_PORT"
    # Keep the server running in the foreground
    wait $SERVER_PID
    exit 0
  else
    echo "Server failed to start on port $TARGET_PORT, trying next port..."
    kill $SERVER_PID 2>/dev/null || true
    continue
  fi
done

echo "All port attempts failed. Please check for port conflicts or try different ports."
exit 1
