#!/bin/bash

# Portfolio Website Starter Script
# This script starts the Next.js development server with proper configuration for Replit

# Kill any existing Next.js processes
pkill -f "next" || true

# Clear Next.js cache to prevent stale builds
echo "Clearing Next.js cache..."
rm -rf .next/cache

# Ensure database connection is available
echo "Checking database connection..."
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function checkDB() {
  try {
    const result = await prisma.\$queryRaw\`SELECT 1 as result\`;
    console.log('✅ Database connection successful');
    await prisma.\$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}
checkDB();
"

# Start the Next.js development server
echo "Starting Next.js application on port 3000..."
exec npx next dev -p 3000 -H 0.0.0.0