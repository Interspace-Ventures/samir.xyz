#!/bin/bash

# Function to cleanup processes
cleanup() {
  echo "Cleaning up processes..."
  # Kill any process using port 5000
  npx kill-port 5000 || true
  # Kill any Next.js dev processes
  pkill -f "next dev" || true
  # Wait to ensure processes are terminated
  sleep 2
}

# Clean up on script exit
trap cleanup EXIT

# Initial cleanup
cleanup

echo "Starting Next.js development server..."

# Start Next.js in the background
NODE_ENV=development npx next dev -p 5000 --hostname 0.0.0.0 &

# Store the background process PID
SERVER_PID=$!

# Wait for the port to be available
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