#!/bin/bash
set -e # Exit on error

# Kill any running Node.js processes
echo "Killing all Node.js processes..."
pkill -9 node 2>/dev/null || true
sleep 3

# Use port 4040 to avoid conflicts
TARGET_PORT=4040
export PORT=$TARGET_PORT
export NODE_ENV=development

echo "Using fixed port $TARGET_PORT for Remix server"

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
