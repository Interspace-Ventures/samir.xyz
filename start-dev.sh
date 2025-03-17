#!/bin/bash

# Kill any process using port 5000
echo "Cleaning up port 5000..."
npx kill-port 5000 || true

echo "Starting Next.js development server..."
NODE_ENV=development exec npx next dev -p 5000 --hostname 0.0.0.0 &

# Store the background process PID
SERVER_PID=$!

# Wait for the port to be available using wait-port
echo "Waiting for server to start..."
npx wait-port -t 30000 localhost:5000

if [ $? -eq 0 ]; then
  echo "Server is ready! Running on http://localhost:5000"
  
  # Keep the script running and forward signals to the server process
  wait $SERVER_PID
else
  echo "Failed to start server within timeout period"
  kill $SERVER_PID 2>/dev/null
  exit 1
fi
