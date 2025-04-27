/**
 * Replit Runner Script
 * 
 * This script serves as an entry point for Replit's Run button.
 * It starts the Next.js development server using our consolidated start script.
 */

const { execSync } = require('child_process');

console.log('🚀 Starting Next.js Portfolio Website...');

try {
  // Execute the consolidated bash script to start the Next.js server
  execSync('./start.sh', {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: '3000',
      NODE_ENV: 'development'
    }
  });
} catch (error) {
  console.error('❌ Failed to start Next.js server:', error.message);
  process.exit(1);
}