/**
 * Update Moku Description Script
 * 
 * This script updates the description for the Moku company
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating Moku description...');
    
    // Get Moku company
    const moku = await prisma.portfolio.findFirst({
      where: {
        name: 'Moku'
      }
    });
    
    if (moku) {
      console.log('Current Moku description:', moku.description);
      
      // Update description
      await prisma.portfolio.update({
        where: {
          id: moku.id
        },
        data: {
          description: 'Plant-based mushroom jerky with natural meat taste'
        }
      });
      
      // Verify update
      const updatedMoku = await prisma.portfolio.findFirst({
        where: {
          name: 'Moku'
        }
      });
      
      console.log('Updated Moku description:', updatedMoku.description);
      console.log('Description updated successfully!');
    } else {
      console.log('Moku company not found in the database!');
    }
    
  } catch (error) {
    console.error('Error updating Moku description:', error);
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