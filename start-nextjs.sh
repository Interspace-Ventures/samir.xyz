#!/bin/bash
echo "Starting the Next.js Portfolio Website application..."

# Clean any existing Next.js cache and build files
echo "Cleaning previous build artifacts..."
rm -rf .next
rm -f next.pid

# Set environment variables for Replit
export NODE_ENV=development
export PORT=8080

# Start the Next.js development server
echo "Starting Next.js on port 8080..."
exec npx next dev -p 8080 -H 0.0.0.0