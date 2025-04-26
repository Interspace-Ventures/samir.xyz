/**
 * Update Juno Data Script
 * 
 * This script updates the website and description for the Juno company
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating Juno data...');
    
    // Get Juno company
    const juno = await prisma.portfolio.findFirst({
      where: {
        name: 'Juno'
      }
    });
    
    if (juno) {
      console.log('Current Juno data:');
      console.log('- Description:', juno.description);
      console.log('- Website:', juno.website);
      
      // Update description and website
      await prisma.portfolio.update({
        where: {
          id: juno.id
        },
        data: {
          description: 'One app for cash and crypto',
          website: 'https://juno.finance'
        }
      });
      
      // Verify update
      const updatedJuno = await prisma.portfolio.findFirst({
        where: {
          name: 'Juno'
        }
      });
      
      console.log('\nUpdated Juno data:');
      console.log('- Description:', updatedJuno.description);
      console.log('- Website:', updatedJuno.website);
      console.log('\nJuno data updated successfully!');
    } else {
      console.log('Juno company not found in the database!');
    }
    
  } catch (error) {
    console.error('Error updating Juno data:', error);
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