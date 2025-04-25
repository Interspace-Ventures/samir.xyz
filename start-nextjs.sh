
#!/bin/bash
echo "Starting Next.js application in development mode..."

# First, check if Next.js process is running
NEXT_PROCESS=$(ps aux | grep "next dev" | grep -v grep | grep -v "bash" || echo "")

if [ -n "$NEXT_PROCESS" ]; then
  echo "- Next.js is already running. Using existing server."
  echo "- To stop the server and start a new one, run: pkill -f 'next dev'"
  echo "- Server is available at your Replit URL"
  
  # Print the active server details
  PID=$(echo "$NEXT_PROCESS" | awk '{print $2}')
  echo "- Running with PID: $PID"
  
  # Keep the script running to maintain workflow status
  echo "- Press Ctrl+C to exit this script (server will continue running)"
  tail -f /dev/null
else
  # Kill any node process that might be using port 8080
  echo "- Checking for processes using port 8080..."
  PID=$(ps aux | grep node | grep 8080 | grep -v grep | awk '{print $2}' || echo "")
  
  if [ -n "$PID" ]; then
    echo "- Stopping process with PID $PID that's using port 8080"
    kill -9 $PID
    sleep 2
  fi
  
  # Start a new Next.js server
  echo "- Clearing Next.js cache..."
  rm -rf .next
  export NODE_ENV=development
  echo "- Starting Next.js server on port 8080..."
  exec npx next dev -p 8080 -H 0.0.0.0
fi
