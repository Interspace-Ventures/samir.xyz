#!/bin/bash
echo "Checking database connection..."

# Make sure Prisma can connect to the database
npx prisma db pull

if [ $? -eq 0 ]; then
  echo "✅ Database connection successful"
else
  echo "❌ Database connection failed"
  echo "DATABASE_URL: $DATABASE_URL"
fi

# Verify Prisma client can connect
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Connecting to database...');
    const result = await prisma.\$queryRaw\`SELECT 1 AS result\`;
    console.log('Connection successful:', result);
    process.exit(0);
  } catch (error) {
    console.error('Connection failed:', error);
    process.exit(1);
  } finally {
    await prisma.\$disconnect();
  }
}

testConnection();
"

if [ $? -eq 0 ]; then
  echo "✅ Prisma client connection successful"
else
  echo "❌ Prisma client connection failed"
fi