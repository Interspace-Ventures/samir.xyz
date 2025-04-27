/**
 * List Ventures Script
 * 
 * This script lists all ventures in the database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Find all ventures
    const ventures = await prisma.venture.findMany();

    console.log('Ventures in database:');
    ventures.forEach(v => {
      console.log(`- ${v.name} (${v.description || 'No description'})`);
    });
    
    console.log(`\nTotal: ${ventures.length} ventures`);
  } catch (error) {
    console.error('Error listing ventures:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();