const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateSamirLogo() {
  try {
    // Update samir.xyz to use the specific samirxyz.png logo
    const result = await prisma.venture.updateMany({
      where: { name: 'samir.xyz' },
      data: { logoUrl: '/attached_assets/samirxyz.png' }
    });
    console.log(`Updated samir.xyz logo: ${result.count} records`);

    // Show the updated venture
    const samirVenture = await prisma.venture.findFirst({
      where: { name: 'samir.xyz' }
    });
    console.log('Updated venture:', samirVenture);

  } catch (error) {
    console.error('Error updating samir logo:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateSamirLogo();