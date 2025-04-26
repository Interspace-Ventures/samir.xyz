/**
 * Remove CaliberX Script
 * 
 * This script removes the CaliberX company from the database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Removing CaliberX from the database...');
    
    // Find CaliberX to confirm it exists
    const caliberX = await prisma.portfolio.findFirst({
      where: {
        name: 'CaliberX'
      }
    });
    
    if (caliberX) {
      console.log('Found CaliberX with ID:', caliberX.id);
      
      // Delete the company
      await prisma.portfolio.delete({
        where: {
          id: caliberX.id
        }
      });
      
      console.log('CaliberX has been removed from the database.');
      
      // Verify deletion
      const checkCaliberX = await prisma.portfolio.findFirst({
        where: {
          name: 'CaliberX'
        }
      });
      
      if (!checkCaliberX) {
        console.log('Verified: CaliberX is no longer in the database.');
      } else {
        console.log('Error: CaliberX still exists in the database.');
      }
    } else {
      console.log('CaliberX company not found in the database.');
    }
    
  } catch (error) {
    console.error('Error removing CaliberX:', error);
  }
}

main()
  .catch(e => {
    console.error('Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });