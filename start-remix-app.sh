#!/bin/bash

# Kill any running processes on port 3333
echo "Checking for processes on port 3333..."
lsof -t -i:3333 2>/dev/null | xargs kill -9 2>/dev/null || true

# Start Remix dev server
echo "Starting Remix dev server on port 3333..."
npx remix dev -p 3333