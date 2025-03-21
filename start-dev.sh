#!/bin/bash

# Enable debug output
set -x

echo "Starting cleanup..."
# Kill any existing processes on port 5000
pkill -f "node|bun" || true
echo "Waiting for processes to terminate..."
sleep 2

# Create .replit directory if it doesn't exist
mkdir -p .replit || echo "Failed to create .replit directory"

echo "Starting Bun development server..."
# Use Bun to run Next.js directly
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export PORT=5000

# Run bun without exec to see output
bun --bun run next dev -p 5000 --hostname 0.0.0.0 &
SERVER_PID=$!

# Wait for the port to be available
echo "Waiting for port 5000 to be ready..."
TIMEOUT=60
START_TIME=$(date +%s)

while ! nc -z localhost 5000; do
  CURRENT_TIME=$(date +%s)
  ELAPSED_TIME=$((CURRENT_TIME - START_TIME))

  if [ $ELAPSED_TIME -gt $TIMEOUT ]; then
    echo "Timeout waiting for port 5000"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
  fi

  echo "Waiting for server... (${ELAPSED_TIME}s)"
  sleep 1
done

echo "Port 5000 is ready and accepting connections"

# Export the ready port for the workflow
echo "export PORT_READY=5000" > .replit/.env
echo "Successfully wrote port configuration to .replit/.env"

# Keep the script running and forward signals to the server
trap "kill $SERVER_PID 2>/dev/null" EXIT
wait $SERVER_PID