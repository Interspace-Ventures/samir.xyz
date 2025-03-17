#!/bin/bash

# Function to check if port is in use
check_port() {
  nc -z localhost 5000 2>/dev/null
  return $?
}

# Kill any process using port 5000 with retries
MAX_RETRIES=5
RETRY_COUNT=0
echo "Cleaning up port 5000..."

while check_port && [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
  echo "Attempt $((RETRY_COUNT + 1)) to free port 5000..."
  npx kill-port 5000 || true
  sleep 2
  RETRY_COUNT=$((RETRY_COUNT + 1))
done

if check_port; then
  echo "Failed to free port 5000 after $MAX_RETRIES attempts"
  exit 1
fi

echo "Port 5000 is now free"

# Ensure public directory exists
mkdir -p public/images public/icons public/portfolio-logos public/profile public/ventures-brands

# Start Next.js development server in background
echo "Starting Next.js development server..."
NODE_ENV=development npx next dev -p 5000 --hostname 0.0.0.0 &

# Store the background process PID
SERVER_PID=$!

# Wait for the port to be available using wait-port
echo "Waiting for server to start..."
npx wait-port -t 30000 localhost:5000

if [ $? -eq 0 ]; then
  echo "Server is ready! Running on http://localhost:5000"
  # Export the port ready signal for the workflow
  export PORT_READY=5000
  echo "PORT_READY=5000"

  # Keep the script running and forward signals to the server process
  wait $SERVER_PID
else
  echo "Failed to start server within timeout period"
  kill $SERVER_PID 2>/dev/null
  exit 1
fi