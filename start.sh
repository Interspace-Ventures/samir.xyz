#!/bin/bash

# Portfolio Website Starter Script
# This script starts the Next.js development server with proper configuration for Replit

# Kill any existing Next.js processes
pkill -f "next" || true

# Skip cache clearing - only clear if explicitly needed
# This was causing slow startup times

# Start the Next.js development server
echo "Starting Next.js application on port 3000..."
exec npx next dev -p 3000 -H 0.0.0.0