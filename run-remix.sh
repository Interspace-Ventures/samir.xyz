#!/bin/bash
set -e # Exit on error

echo "Setting up a simple Express server for testing..."

# Kill all node processes
echo "Cleaning up processes..."
pkill -9 node 2>/dev/null || true
sleep 3

# Use port 60000
export PORT=60000

echo "Setting up directories..."
mkdir -p public
mkdir -p public/build
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

echo "Copying Tailwind CSS..."
cp ./app/tailwind.css ./public/tailwind.css || echo "Warning: Could not copy tailwind.css"

echo "Starting simple Express server on port $PORT..."
node simple-server.cjs
