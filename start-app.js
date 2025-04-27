/**
 * Next.js Portfolio Starter Script
 * 
 * This script checks database connectivity before starting the Next.js application.
 */

const { execSync, spawn } = require('child_process');
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('🔍 Checking database connection...');
  
  try {
    // Test database connection
    const prisma = new PrismaClient();
    const result = await prisma.$queryRaw`SELECT 1 as result`;
    await prisma.$disconnect();
    
    console.log('✅ Database connection successful');
    
    // Start Next.js
    console.log('🚀 Starting Next.js application on port 3000...');
    
    const nextProcess = spawn('npx', ['next', 'dev', '-p', '3000', '-H', '0.0.0.0'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development'
      }
    });
    
    // Handle process events
    nextProcess.on('error', (err) => {
      console.error('❌ Failed to start Next.js:', err);
    });
    
    // This part is important for keeping the script running
    process.on('SIGINT', () => {
      nextProcess.kill('SIGINT');
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Unexpected error:', err);
  process.exit(1);
});