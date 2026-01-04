#!/bin/bash

# Portfolio Website Fast Startup Script
# This script starts the Next.js server efficiently

echo "Starting Portfolio Website..."

# Kill any existing Next.js processes
pkill -f "next" || true

# Start in development mode on port 5000
exec npx next dev -p 5000 -H 0.0.0.0