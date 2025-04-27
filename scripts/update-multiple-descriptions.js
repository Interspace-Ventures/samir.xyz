/**
 * Update Multiple Descriptions Script
 * 
 * This script updates descriptions for multiple portfolio companies:
 * - Superplastic
 * - Harper
 * - Juneshine
 * - Kartera
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Define the updates for each company
    const updates = [
      {
        name: 'Superplastic',
        description: 'character-driven digital entertainment and lifestyle brand'
      },
      {
        name: 'Harper',
        description: 'AI-powered insurance platform'
      },
      {
        name: 'Juneshine',
        description: 'organic, high-quality best-in-class kombucha, spirits and beer brand'
      },
      {
        name: 'Kartera',
        description: 'modern pay-by-bank payment experiences for merchants'
      }
    ];

    // Process each update
    console.log('Updating company descriptions...');
    
    for (const update of updates) {
      // Update the description in the portfolio table
      const result = await prisma.portfolio.updateMany({
        where: {
          name: update.name
        },
        data: {
          description: update.description
        }
      });

      console.log(`Updated ${update.name}: ${result.count} records`);
      
      // Verify the update was successful
      const updated = await prisma.portfolio.findFirst({
        where: {
          name: update.name
        }
      });
      
      if (updated) {
        console.log(`- ${update.name} now has description: "${updated.description}"`);
      } else {
        console.log(`- Warning: Could not find ${update.name} after update`);
      }
    }

    console.log('\nAll updates completed');
  } catch (error) {
    console.error('Error updating descriptions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();