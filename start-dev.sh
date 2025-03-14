#!/bin/bash
# First kill any existing process on port 5000
fuser -k 5000/tcp || true
# Wait a moment for the port to be fully released
sleep 2
# Start Next.js development server with proper configuration
NODE_ENV=development exec npx next dev -p 5000 --hostname 0.0.0.0