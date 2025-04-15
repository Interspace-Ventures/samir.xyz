#!/bin/bash
set -e # Exit on error

# Kill any running Node.js processes
echo "Force killing all Node.js processes..."
pkill -9 node 2>/dev/null || true
sleep 3

# Use a very unique port to avoid conflicts
SERVER_PORT=12345

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

# Clear the terminal
clear

# Set environment variables
export PORT=$SERVER_PORT
export NODE_ENV=development

echo "Starting Remix development server on port $SERVER_PORT..."
echo "----------------------------------------"
npx remix dev -p $SERVER_PORT