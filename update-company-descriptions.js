/**
 * Update Company Descriptions Script
 * 
 * This script updates descriptions for companies with corrected names
 * 
 * Run with: `node update-company-descriptions.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company descriptions...');

  // Company descriptions to update
  const descriptionUpdates = [
    {
      id: 45,
      name: 'H',
      description: 'Hedgehog develops innovative financial management tools that help users track cryptocurrency investments, monitor market trends, and optimize their digital asset portfolios through a secure, user-friendly platform.'
    },
    {
      id: 49,
      name: 'Harper',
      description: 'Harper provides financial infrastructure solutions that help businesses streamline payment processing, compliance, and banking operations through modern API-based platforms designed for the digital economy.'
    }
  ];

  // Update count
  let updatedCount = 0;
  let errorCount = 0;

  // Process each description update
  for (const update of descriptionUpdates) {
    try {
      // Find by ID
      const portfolioItem = await prisma.portfolio.findUnique({
        where: { id: update.id }
      });

      if (portfolioItem) {
        // Update the description
        await prisma.portfolio.update({
          where: { id: portfolioItem.id },
          data: { description: update.description }
        });
        
        console.log(`Updated ${portfolioItem.name} (ID: ${portfolioItem.id}) with new description`);
        updatedCount++;
      } else {
        console.log(`No portfolio item found with ID ${update.id}`);
        errorCount++;
      }
    } catch (error) {
      console.error(`Error updating ${update.name}:`, error);
      errorCount++;
    }
  }

  console.log(`Company description updates complete.`);
  console.log(`  Updated: ${updatedCount} companies`);
  console.log(`  Errors: ${errorCount} companies`);
}

main()
  .catch((e) => {
    console.error('Error updating company descriptions:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });