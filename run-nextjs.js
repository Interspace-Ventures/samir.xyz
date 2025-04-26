/**
 * Simple Next.js Server Runner
 * 
 * This script starts the Next.js development server on a specified port
 * using the cross-platform child_process module.
 */

const { spawn } = require('child_process');
const { execSync } = require('child_process');

// Kill any existing Next.js processes
try {
  console.log('Stopping any existing Next.js servers...');
  execSync('pkill -f "next dev" || true');
  console.log('Done.');
} catch (error) {
  // Ignore errors if no processes are found
}

// Define port
const PORT = 3000;

console.log(`Starting Next.js server on port ${PORT}...`);

// Start Next.js server with specific port and host
const nextServer = spawn('npx', ['next', 'dev', '-p', PORT, '-H', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, NODE_ENV: 'development' }
});

// Handle process events
nextServer.on('error', (error) => {
  console.error('Failed to start Next.js server:', error);
});

// Keep the script running
process.on('SIGINT', () => {
  console.log('Stopping Next.js server...');
  nextServer.kill('SIGINT');
  process.exit(0);
});