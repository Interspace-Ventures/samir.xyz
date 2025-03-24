#!/bin/bash

echo "Starting Next.js development server..."

# Make scripts executable
chmod +x *.sh

# Kill any existing Next.js processes
pkill -f "next" || true

# Start the Next.js development server directly
echo "Starting Next.js dev server on port 5000..."
PORT=5000 NODE_OPTIONS="--max-http-header-size=16384" HOST="0.0.0.0" exec bun run next dev