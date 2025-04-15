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
# Process Tailwind CSS
npx tailwindcss -i ./app/tailwind.css -o ./public/tailwind.css

echo "Starting Remix development server..."
# Kill any existing processes using port 5000
kill $(lsof -t -i:5000) 2>/dev/null || true

# Start Remix dev server with npx
echo "Executing: npx remix dev"
npx remix dev