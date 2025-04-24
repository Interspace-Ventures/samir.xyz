/**
 * Database Connection Test Script
 * 
 * This script tests the connection to the PostgreSQL database
 * and verifies the configuration is working properly.
 * 
 * Run with: `node scripts/test-db-connection.js`
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing database connection...');
    
    // Test database connection by running a simple query
    const result = await prisma.$queryRaw`SELECT 1 as "connection_test"`;
    
    console.log('Database connection successful!');
    console.log('Query result:', result);
    
    // Count number of portfolio items
    const portfolioCount = await prisma.portfolio.count();
    console.log(`Total portfolio items in database: ${portfolioCount}`);
    
    // Count number of categories
    const categoryCount = await prisma.category.count();
    console.log(`Total categories in database: ${categoryCount}`);
    
    // Count number of tags
    const tagCount = await prisma.tag.count();
    console.log(`Total tags in database: ${tagCount}`);
    
  } catch (error) {
    console.error('Error connecting to database:');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();