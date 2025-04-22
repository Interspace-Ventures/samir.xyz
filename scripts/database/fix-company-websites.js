/**
 * Fix Company Websites Script
 * 
 * This script updates company websites with the correct URLs
 * based on user feedback.
 * 
 * Run with: `node fix-company-websites.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company websites with correct URLs...');

  // Company website corrections
  const websiteCorrections = [
    { id: 49, name: 'Harper', website: 'https://joinharper.com' },
    { id: 55, name: 'Swan', website: 'https://www.swanbitcoin.com' },
    { id: 0, name: 'Aura', website: 'https://www.aurahealth.io/aura' },
    { id: 0, name: 'Playbook', website: 'https://www.joinplaybook.com' },
    { id: 0, name: 'RPM', website: 'https://rpmtraining.com' },
    { id: 0, name: 'Margin', website: 'https://viewmargin.com' },
    { id: 0, name: 'Soot', website: 'https://play.soot.com' },
    { id: 45, name: 'H', website: 'https://www.thehedgehogcompany.com' },
    { id: 0, name: 'Backpack', website: 'https://www.backpackpay.com' },
    { id: 0, name: 'Keep', website: 'https://www.trykeep.com' },
    { id: 0, name: 'Rely', website: 'https://tryrely.ai' },
    { id: 0, name: 'Waldo', website: 'https://www.waldo.ai' },
  ];

  // Update count
  let updatedCount = 0;
  let errorCount = 0;

  // Process each website correction
  for (const correction of websiteCorrections) {
    try {
      // Find by ID if provided, otherwise find by name
      let portfolioItem;
      
      if (correction.id > 0) {
        portfolioItem = await prisma.portfolio.findUnique({
          where: { id: correction.id }
        });
      } else {
        portfolioItem = await prisma.portfolio.findFirst({
          where: { 
            name: {
              equals: correction.name,
              mode: 'insensitive' // Case-insensitive matching
            }
          }
        });
      }

      if (portfolioItem) {
        // If the item with id 49 has name "Hash", update it to "Harper"
        if (correction.id === 49 && portfolioItem.name === 'Hash') {
          await prisma.portfolio.update({
            where: { id: portfolioItem.id },
            data: { 
              name: 'Harper',
              website: correction.website
            }
          });
          console.log(`Updated ID ${portfolioItem.id}: Changed name from "Hash" to "Harper" and updated website`);
        } else {
          // Just update the website
          await prisma.portfolio.update({
            where: { id: portfolioItem.id },
            data: { website: correction.website }
          });
          console.log(`Updated ${portfolioItem.name} (ID: ${portfolioItem.id}) with website: ${correction.website}`);
        }
        updatedCount++;
      } else {
        console.log(`No portfolio item found with ${correction.id > 0 ? 'ID ' + correction.id : 'name ' + correction.name}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error updating ${correction.name}:`, error);
      errorCount++;
    }
  }

  console.log(`Company website corrections complete.`);
  console.log(`  Updated: ${updatedCount} companies`);
  console.log(`  Errors: ${errorCount} companies`);
}

main()
  .catch((e) => {
    console.error('Error updating company websites:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });