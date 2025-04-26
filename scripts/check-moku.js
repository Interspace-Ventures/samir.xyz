/**
 * Check Moku Data Script
 * 
 * This script checks the data for Moku company
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking Moku data...');
    
    // Get Moku company
    const moku = await prisma.portfolio.findFirst({
      where: {
        name: 'Moku'
      }
    });
    
    console.log('Moku data:');
    console.log(JSON.stringify(moku, null, 2));
    
    // If Moku exists but has no description, update it
    if (moku && !moku.description) {
      console.log('\nMoku is missing a description. Adding it now...');
      
      await prisma.portfolio.update({
        where: {
          id: moku.id
        },
        data: {
          description: 'A SaaS platform for digital content creators that streamlines the workflow from ideation to publication through AI-powered editing and analytics tools.'
        }
      });
      
      console.log('Moku description updated!');
    }
    
  } catch (error) {
    console.error('Error checking Moku data:', error);
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