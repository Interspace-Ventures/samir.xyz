/**
 * Update Metadata Description Script
 * 
 * This script updates the description for the Metadata company in the portfolio table
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Update the description for Metadata in the portfolio table
    const updated = await prisma.portfolio.updateMany({
      where: {
        name: 'Metadata',
      },
      data: {
        description: 'AI-powered marketing data analytics platform',
      },
    });

    console.log(`Updated ${updated.count} records`);

    // Verify the update
    const metadata = await prisma.portfolio.findFirst({
      where: {
        name: 'Metadata',
      },
    });

    console.log('Updated Metadata data:', metadata);
  } catch (error) {
    console.error('Error updating Metadata description:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();