#!/bin/bash

# This script is used to start the Next.js application in development mode
# on port 3000 with host 0.0.0.0 (accessible from outside the container)

# Kill any existing Node.js processes (if any)
pkill -f node || true

# Navigate to the project root directory
cd "$(dirname "$0")/../.." || exit

echo "Starting Next.js application..."
echo "  - PORT: ${PORT:-3000}"
echo "  - HOST: ${HOST:-0.0.0.0}"

# Run the Next.js development server
npx next dev -p ${PORT:-3000} -H ${HOST:-0.0.0.0}

# This command will block until the process is killed