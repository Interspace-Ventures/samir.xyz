/**
 * Update Lunar Data Script
 * 
 * This script updates the website and description for the Lunar company
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating Lunar data...');
    
    // Get Lunar company
    const lunar = await prisma.portfolio.findFirst({
      where: {
        name: 'Lunar'
      }
    });
    
    if (lunar) {
      console.log('Current Lunar data:');
      console.log('- Description:', lunar.description);
      console.log('- Website:', lunar.website);
      
      // Update description and website
      await prisma.portfolio.update({
        where: {
          id: lunar.id
        },
        data: {
          description: 'Award-winning craft hard seltzer made with real fruit sourced from Asia.',
          website: 'https://drinklunar.com'
        }
      });
      
      // Verify update
      const updatedLunar = await prisma.portfolio.findFirst({
        where: {
          name: 'Lunar'
        }
      });
      
      console.log('\nUpdated Lunar data:');
      console.log('- Description:', updatedLunar.description);
      console.log('- Website:', updatedLunar.website);
      console.log('\nLunar data updated successfully!');
    } else {
      console.log('Lunar company not found in the database!');
    }
    
  } catch (error) {
    console.error('Error updating Lunar data:', error);
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