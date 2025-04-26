/**
 * Direct Ventures API Script
 * 
 * This script implements the ventures API directly as a script to test
 * if there are any issues with the Next.js API route implementation
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function main() {
  console.log('Running direct ventures API script...');
  
  const prisma = new PrismaClient();
  
  try {
    // Query all ventures from the database
    const ventures = await prisma.venture.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    console.log(`Successfully fetched ${ventures.length} ventures`);
    
    // Write the ventures to a file to simulate the API response
    fs.writeFileSync('./scripts/ventures-response.json', JSON.stringify(ventures, null, 2));
    console.log('Ventures written to ./scripts/ventures-response.json');
    
  } catch (error) {
    console.error('Error fetching ventures:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();