#!/bin/bash
# First kill any existing process on port 5000
echo "Checking for existing processes on port 5000..."
npx kill-port 5000 || true

# Wait a moment for the port to be fully released
sleep 2

# Function to check if port is available
check_port() {
  nc -z localhost 5000 2>/dev/null
  return $?
}

# Function to check if server is responsive
check_server() {
  curl -s http://localhost:5000 > /dev/null
  return $?
}

echo "Starting Next.js development server..."
NODE_ENV=development exec npx next dev -p 5000 --hostname 0.0.0.0 &

# Wait for the port to be listening (timeout after 30 seconds)
echo "Waiting for server to start..."
count=0
while ! check_port && [ $count -lt 30 ]; do
  sleep 1
  ((count++))
  echo "Waiting for port 5000 to be available... ($count/30)"
done

if [ $count -eq 30 ]; then
  echo "Timeout waiting for port to be available"
  exit 1
fi

# Additional check for server responsiveness
echo "Checking server responsiveness..."
count=0
while ! check_server && [ $count -lt 30 ]; do
  sleep 1
  ((count++))
  echo "Waiting for server to respond... ($count/30)"
done

if [ $count -eq 30 ]; then
  echo "Timeout waiting for server to respond"
  exit 1
fi

echo "Server is ready!"

# Keep the script running
wait