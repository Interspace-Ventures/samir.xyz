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

# Create .replit directory if it doesn't exist
mkdir -p .replit

# Start Bun development server and wait for port to be ready
echo "Starting Bun development server..."
NEXT_RUNTIME="nodejs" \
NODE_ENV=development \
exec bun --bun run dev --port 5000 --hostname 0.0.0.0 & 

# Wait for the port to be available (timeout after 60 seconds)
echo "Waiting for port 5000 to be ready..."
TIMEOUT=60
START_TIME=$(date +%s)

while ! nc -z localhost 5000; do
  CURRENT_TIME=$(date +%s)
  ELAPSED_TIME=$((CURRENT_TIME - START_TIME))

  if [ $ELAPSED_TIME -gt $TIMEOUT ]; then
    echo "Timeout waiting for port 5000"
    exit 1
  fi

  echo "Waiting for Next.js server... (${ELAPSED_TIME}s)"
  sleep 1
done

echo "Port 5000 is ready and accepting connections"

# Export the ready port for the workflow
echo "export PORT_READY=5000" > .replit/.env
echo "Successfully wrote port configuration to .replit/.env"

# Keep the script running
wait