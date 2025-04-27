/**
 * Update Omni Description Script
 * 
 * This script updates the description for the Omni venture
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Update the description for Omni
    const updated = await prisma.venture.updateMany({
      where: {
        name: 'omni',
      },
      data: {
        description: 'read anything, anywhere, all at once',
      },
    });

    console.log(`Updated ${updated.count} records`);

    // Verify the update
    const omni = await prisma.venture.findFirst({
      where: {
        name: 'omni',
      },
    });

    console.log('Updated Omni data:', omni);
  } catch (error) {
    console.error('Error updating Omni description:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();