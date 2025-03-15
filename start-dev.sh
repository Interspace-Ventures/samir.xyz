#!/bin/bash
# First kill any existing process on port 5000
npx kill-port 5000 || true

# Wait a moment for the port to be fully released
sleep 2

# Function to check if port is available
check_port() {
  nc -z localhost 5000 2>/dev/null
  return $?
}

# Start Next.js development server with proper configuration
NODE_ENV=development exec npx next dev -p 5000 --hostname 0.0.0.0 &

# Wait for the server to start (timeout after 30 seconds)
count=0
while ! check_port && [ $count -lt 30 ]; do
  sleep 1
  ((count++))
done

if [ $count -eq 30 ]; then
  echo "Timeout waiting for server to start"
  exit 1
fi

# Keep the script running
wait