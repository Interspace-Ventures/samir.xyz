#!/bin/bash
set -e # Exit on error

# Kill any running Node.js processes and wait for ports to be released
echo "Killing all Node.js processes..."
pkill -9 node 2>/dev/null || true

# Try multiple ports in sequence
for PORT_TO_TRY in 8080 8081 8082 8083 8084 8085
do
  echo "Attempting to use port $PORT_TO_TRY..."
  
  # Check if port is in use
  if netstat -tuln | grep ":$PORT_TO_TRY " >/dev/null; then
    echo "Port $PORT_TO_TRY is already in use, trying next port..."
    continue
  fi
  
  # Port is available, use it
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

  echo "Starting Remix development server..."
  # Start Remix dev server using npx with the dynamically chosen port
  npx remix dev -p $TARGET_PORT
  
  # If we reach here, the server started successfully
  break
done
