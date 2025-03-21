#!/bin/bash

# Function to check if port is in use
check_port() {
  nc -z localhost 5000 2>/dev/null
  return $?
}

# Clean up port using lsof
echo "Cleaning up port 5000..."
if check_port; then
  PID=$(lsof -t -i:5000)
  if [ ! -z "$PID" ]; then
    kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
  fi
fi

# Handle .replit directory creation
if [ -f ".replit" ]; then
  echo "Converting .replit file to directory..."
  mv .replit .replit.bak
fi

# Create .replit directory if it doesn't exist
mkdir -p .replit

# Start Bun development server and wait for port to be ready
echo "Starting Bun development server..."
NEXT_RUNTIME="nodejs" \
NODE_ENV=development \
exec bun --bun run server.js & 

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

  echo "Waiting for server... (${ELAPSED_TIME}s)"
  sleep 1
done

echo "Port 5000 is ready and accepting connections"

# Export the ready port for the workflow
echo "export PORT_READY=5000" > .replit/.env
echo "Successfully wrote port configuration to .replit/.env"

# Keep the script running
wait