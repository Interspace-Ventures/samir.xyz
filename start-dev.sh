#!/bin/bash
# First kill any existing process on port 5000
kill -9 $(lsof -t -i:5000) 2>/dev/null || true
# Start Next.js development server with proper configuration
NODE_ENV=development exec npx next dev -p 5000 --hostname 0.0.0.0