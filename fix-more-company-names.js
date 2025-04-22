/**
 * Fix More Company Names Script
 * 
 * This script updates additional company names with the correct formatting
 * based on user feedback.
 * 
 * Run with: `node fix-more-company-names.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating additional company names...');

  // Company corrections
  const companyCorrections = [
    { oldName: 'June Shine', newName: 'Juneshine' },
    { oldName: 'The Coffee', newName: 'TheCoffee' },
  ];

  // Update count
  let updatedCount = 0;
  let errorCount = 0;

  // Process each company correction
  for (const correction of companyCorrections) {
    try {
      const portfolioItem = await prisma.portfolio.findFirst({
        where: { 
          name: {
            equals: correction.oldName,
            mode: 'insensitive' // Case-insensitive matching
          }
        }
      });

      if (portfolioItem) {
        // Update the portfolio item
        await prisma.portfolio.update({
          where: { id: portfolioItem.id },
          data: { name: correction.newName }
        });
        
        console.log(`Updated ID ${portfolioItem.id}: Changed "${portfolioItem.name}" to "${correction.newName}"`);
        updatedCount++;
      } else {
        console.log(`No portfolio item found with name "${correction.oldName}"`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error updating ${correction.oldName}:`, error);
      errorCount++;
    }
  }

  console.log(`Additional company name corrections complete.`);
  console.log(`  Updated: ${updatedCount} companies`);
  console.log(`  Errors: ${errorCount} companies`);
}

main()
  .catch((e) => {
    console.error('Error updating company names:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });