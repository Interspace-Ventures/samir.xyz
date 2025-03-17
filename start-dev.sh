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

# Start Next.js development server
echo "Starting Next.js development server..."
export PORT_READY=5000
NODE_ENV=development exec npx next dev -p 5000 --hostname 0.0.0.0