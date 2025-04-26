/**
 * Fix Harper Logo Script
 * 
 * This script ensures Harper uses the Harper.png logo
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Fixing Harper logo...');
    
    // Get all Harper entries
    const harpers = await prisma.portfolio.findMany({
      where: {
        name: 'Harper'
      }
    });
    
    console.log(`Found ${harpers.length} Harper entries`);
    
    for (const harper of harpers) {
      console.log(`Harper ID: ${harper.id}, Current Logo: ${harper.logoUrl}`);
      
      // Update to use Harper.png
      await prisma.portfolio.update({
        where: {
          id: harper.id
        },
        data: {
          logoUrl: 'attached_assets/Harper.png'
        }
      });
      
      console.log(`Updated Harper ID: ${harper.id} to use Harper.png logo`);
    }
    
    // Verify the changes
    const updatedHarpers = await prisma.portfolio.findMany({
      where: {
        name: 'Harper'
      }
    });
    
    console.log('\nVerifying updates:');
    for (const harper of updatedHarpers) {
      console.log(`Harper ID: ${harper.id}, Logo: ${harper.logoUrl}`);
    }
    
    // If there are duplicate Harpers, keep only one
    if (updatedHarpers.length > 1) {
      console.log('\nFound multiple Harper entries. Keeping only one...');
      
      // Keep the first one, delete the rest
      for (let i = 1; i < updatedHarpers.length; i++) {
        await prisma.portfolio.delete({
          where: {
            id: updatedHarpers[i].id
          }
        });
        console.log(`Deleted duplicate Harper with ID: ${updatedHarpers[i].id}`);
      }
      
      // Verify again
      const finalHarpers = await prisma.portfolio.findMany({
        where: {
          name: 'Harper'
        }
      });
      
      console.log(`\nNow have ${finalHarpers.length} Harper entries with logo: ${finalHarpers[0].logoUrl}`);
    }
    
  } catch (error) {
    console.error('Error fixing Harper logo:', error);
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