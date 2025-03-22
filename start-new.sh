#!/bin/bash

# Simple startup script
echo "Starting Next.js application..."

# Set environment variables
export NEXT_TELEMETRY_DISABLED=1
export NODE_ENV=development
export NEXT_RUNTIME="nodejs"
export PORT=5000

# Create combined temporary patched script
cat > temp-start.js << 'EOF'
// Import our consolidated polyfills
import './src/lib/polyfills.js';

// Start Next.js with the polyfills loaded in the same context
import { spawn } from 'child_process';

console.log("Starting Next.js with polyfills preloaded...");
const nextProcess = spawn('bun', ['run', 'next', 'dev', '-p', '5000', '--hostname', '0.0.0.0'], {
  stdio: 'inherit',
  env: { 
    ...process.env,
    // Force using NodeJS runtime, not Edge
    NEXT_RUNTIME: "nodejs"
  }
});

// Forward signals
process.on('SIGINT', () => nextProcess.kill('SIGINT'));
process.on('SIGTERM', () => nextProcess.kill('SIGTERM'));

// Wait for process to exit
nextProcess.on('exit', (code) => {
  process.exit(code);
});
EOF

# Start Next.js using our temp launcher
echo "Starting Next.js development server on port 5000..."
exec bun temp-start.js