const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateVentureLogos() {
  try {
    // Map of venture names to their actual logo filenames
    const logoMappings = {
      '2 Days Early': '/attached_assets/2DE Interspace.png',
      'interspace': '/attached_assets/Interspace Square - 2025.png',
      'moonshot': '/attached_assets/moonshot.png',
      'omni': '/attached_assets/omni wordmark 2025.png',
      'predictive': '/attached_assets/Predictive.film icon 2025.png',
      'samir.xyz': '/attached_assets/Samir 2025.png',
      'solo': '/attached_assets/Solo Wordmark - Gradient 2025.png',
      'tbh': '/attached_assets/tbh purple.png'
    };

    console.log('Updating venture logo URLs...');
    
    for (const [ventureName, logoPath] of Object.entries(logoMappings)) {
      const result = await prisma.venture.updateMany({
        where: { name: ventureName },
        data: { logoUrl: logoPath }
      });
      console.log(`Updated ${ventureName}: ${result.count} records`);
    }

    // Show final results
    console.log('\nFinal venture logos:');
    const ventures = await prisma.venture.findMany({
      select: { name: true, logoUrl: true },
      orderBy: { name: 'asc' }
    });
    ventures.forEach(v => console.log(`${v.name}: ${v.logoUrl}`));

  } catch (error) {
    console.error('Error updating venture logos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateVentureLogos();