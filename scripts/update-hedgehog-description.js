/**
 * Update Hedgehog Description Script
 * 
 * This script updates the description for the Hedgehog company
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Updating Hedgehog description...');
    
    // Get Hedgehog company
    const hedgehog = await prisma.portfolio.findFirst({
      where: {
        name: 'Hedgehog'
      }
    });
    
    if (hedgehog) {
      console.log('Current Hedgehog description:', hedgehog.description);
      
      // Update description
      await prisma.portfolio.update({
        where: {
          id: hedgehog.id
        },
        data: {
          description: 'eCom DTC roll-up acquiring growing retail brands'
        }
      });
      
      // Verify update
      const updatedHedgehog = await prisma.portfolio.findFirst({
        where: {
          name: 'Hedgehog'
        }
      });
      
      console.log('Updated Hedgehog description:', updatedHedgehog.description);
      console.log('Description updated successfully!');
    } else {
      console.log('Hedgehog company not found in the database!');
    }
    
  } catch (error) {
    console.error('Error updating Hedgehog description:', error);
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