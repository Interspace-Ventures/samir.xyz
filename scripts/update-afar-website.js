const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateAfarWebsite() {
  try {
    console.log('🔄 Finding Afar in portfolio...');
    
    // First find Afar to get its ID
    const afar = await prisma.portfolio.findFirst({
      where: {
        name: 'Afar'
      }
    });
    
    if (!afar) {
      console.log('❌ Afar not found in portfolio');
      return;
    }
    
    console.log('✅ Found Afar with ID:', afar.id);
    
    // Update using the ID
    const result = await prisma.portfolio.update({
      where: {
        id: afar.id
      },
      data: {
        website: 'https://www.afarfoods.com/'
      }
    });
    
    console.log('✅ Successfully updated Afar website:', result.website);
    
  } catch (error) {
    console.error('❌ Error updating Afar website:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAfarWebsite();