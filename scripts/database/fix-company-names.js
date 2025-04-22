/**
 * Fix Company Names Script
 * 
 * This script updates company names and categories with the correct information
 * based on user feedback.
 * 
 * Run with: `node fix-company-names.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company names and categories...');

  // Company corrections
  const companyCorrections = [
    { id: 49, name: 'Harper' }, // Making sure Hash is now Harper
    { id: 52, oldName: 'Naridea', newName: 'Maridea' }, // Naridea to Maridea
    { id: 37, oldName: 'Super Plastic', newName: 'SuperPlastic' }, // Super Plastic to SuperPlastic
    { id: 38, oldName: 'Swansea City AFC', newName: 'Swansea' }, // Swansea City AFC to Swansea
    { id: 45, oldName: 'H', newName: 'Hedgehog', category: 'Retail' }, // H to Hedgehog and Health to Retail
  ];

  // Update count
  let updatedCount = 0;
  let errorCount = 0;

  // Process each company correction
  for (const correction of companyCorrections) {
    try {
      let portfolioItem;
      
      if (correction.id) {
        portfolioItem = await prisma.portfolio.findUnique({
          where: { id: correction.id }
        });
      } else if (correction.oldName) {
        portfolioItem = await prisma.portfolio.findFirst({
          where: { 
            name: {
              equals: correction.oldName,
              mode: 'insensitive' // Case-insensitive matching
            }
          }
        });
      }

      if (portfolioItem) {
        // Prepare update data
        const updateData = {};
        
        // Update name if provided
        if (correction.newName) {
          updateData.name = correction.newName;
        }
        
        // Update category if provided
        if (correction.category) {
          updateData.category = correction.category;
        }
        
        // Update the portfolio item
        await prisma.portfolio.update({
          where: { id: portfolioItem.id },
          data: updateData
        });
        
        // Log what was updated
        const updates = [];
        if (correction.newName) updates.push(`name to "${correction.newName}"`);
        if (correction.category) updates.push(`category to "${correction.category}"`);
        
        console.log(`Updated ID ${portfolioItem.id}: ${portfolioItem.name} - ${updates.join(', ')}`);
        updatedCount++;
      } else {
        console.log(`No portfolio item found with ${correction.id ? 'ID ' + correction.id : 'name ' + correction.oldName}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error updating ${correction.id || correction.oldName}:`, error);
      errorCount++;
    }
  }

  console.log(`Company corrections complete.`);
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