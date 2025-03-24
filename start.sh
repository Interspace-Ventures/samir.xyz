#!/bin/bash

echo "Starting Next.js development server..."

# Make scripts executable
chmod +x *.sh

# Kill any existing Next.js processes
pkill -f "next" || true

# Start the Next.js development server directly
echo "Starting Next.js dev server on port 5000..."
PORT=5000 exec bun run next dev