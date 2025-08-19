/**
 * Replit Runner Script
 * 
 * This script serves as an entry point for Replit's Run button.
 * It starts the Next.js server in production mode for optimal performance.
 */

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Next.js Portfolio Website...');

// Check if we should use production mode
const useProduction = !process.env.FORCE_DEV_MODE;
const startScript = useProduction ? './start-production.sh' : './start.sh';

console.log(`📌 Mode: ${useProduction ? 'Production' : 'Development'}`);

try {
  // Execute the appropriate script based on mode
  execSync(startScript, {
    stdio: 'inherit',
    env: {
      ...process.env,
      PORT: '3000',
      NODE_ENV: useProduction ? 'production' : 'development'
    }
  });
} catch (error) {
  console.error('❌ Failed to start Next.js server:', error.message);
  process.exit(1);
}