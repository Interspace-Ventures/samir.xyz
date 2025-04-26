/**
 * Check Ventures Script
 * 
 * This script checks if there are any ventures in the database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking ventures in the database...');
  
  try {
    // First check if the Venture model exists
    const modelNames = Object.keys(prisma);
    console.log('Available Prisma models:', modelNames);
    
    // Try to get all ventures
    const ventures = await prisma.Venture.findMany();
    console.log(`Found ${ventures.length} ventures`);
    
    if (ventures.length > 0) {
      console.log('First venture:', ventures[0]);
    } else {
      console.log('No ventures found in the database');
    }
  } catch (error) {
    console.error('Error checking ventures:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();