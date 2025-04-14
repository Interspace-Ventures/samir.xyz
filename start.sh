#!/bin/bash
export PORT=5000
export NODE_ENV=development

# Make sure the public/build directory exists for assets
mkdir -p public/build

# Ensure we have the standard asset directories
mkdir -p public/assets/companies
mkdir -p public/assets/images
mkdir -p public/assets/profiles
mkdir -p public/assets/ventures

# Build the Tailwind CSS file
echo "Building Tailwind CSS using Remix..."
mkdir -p public/build

echo "Starting Remix development server..."
# Kill any existing processes using port 5000
kill $(lsof -t -i:5000) 2>/dev/null || true
# Start Remix dev server
npx remix dev
