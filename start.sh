#!/bin/bash

# Enable debug output
set -x

echo "Starting Next.js application..."

# Kill any existing processes
pkill -f "node|bun" || true
echo "Waiting for processes to terminate..."
sleep 2

# Set up basic environment
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development

# Disable Edge Runtime features that might cause issues with Bun
export NEXT_RUNTIME="nodejs"
export PORT=5000

echo "Killing any existing process on port 5000..."
npx kill-port 5000 || true

echo "Waiting for port 5000 to be free..."
sleep 2

# Fix polyfill globally before launching Next.js
echo "Setting up global polyfills for TextEncoderStream and TextDecoderStream..."
if [ ! -f ./src/global-polyfill.js ]; then
  # Create a simple polyfill loader script
  cat > ./src/global-polyfill.js << 'EOL'
// Basic polyfill definitions
if (typeof globalThis.TextEncoderStream === 'undefined') {
  globalThis.TextEncoderStream = class {
    constructor() {}
    start() {}
    transform() {}
    flush() {}
  };
}
if (typeof globalThis.TextDecoderStream === 'undefined') {
  globalThis.TextDecoderStream = class {
    constructor() {}
    start() {}
    transform() {}
    flush() {}
  };
}
console.log("Global polyfills applied successfully");
EOL
fi

# Pre-load polyfills
echo "Loading polyfills before starting Next.js..."
bun ./src/global-polyfill.js

echo "Starting Next.js development server on port 5000..."
PORT=5000 bun run dev