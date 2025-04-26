/**
 * Update Kartera Data Script
 * 
 * This script updates the website and description for the Kartera company
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating Kartera data...');
    
    // Get Kartera company
    const kartera = await prisma.portfolio.findFirst({
      where: {
        name: 'Kartera'
      }
    });
    
    if (kartera) {
      console.log('Current Kartera data:');
      console.log('- Description:', kartera.description);
      console.log('- Website:', kartera.website);
      
      // Update description and website
      await prisma.portfolio.update({
        where: {
          id: kartera.id
        },
        data: {
          description: 'Modern payment experience designed to be a comprehensive alternative to payment and customer rewards solutions.',
          website: 'https://kartera.com'
        }
      });
      
      // Verify update
      const updatedKartera = await prisma.portfolio.findFirst({
        where: {
          name: 'Kartera'
        }
      });
      
      console.log('\nUpdated Kartera data:');
      console.log('- Description:', updatedKartera.description);
      console.log('- Website:', updatedKartera.website);
      console.log('\nKartera data updated successfully!');
    } else {
      console.log('Kartera company not found in the database!');
    }
    
  } catch (error) {
    console.error('Error updating Kartera data:', error);
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