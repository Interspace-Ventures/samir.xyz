const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateCategories() {
  try {
    // First, let's see what companies are in Health and Retail
    console.log('Companies in Health category:');
    const healthCompanies = await prisma.portfolio.findMany({
      where: { category: 'Health' },
      select: { name: true, category: true }
    });
    console.log(healthCompanies);

    console.log('\nCompanies in Retail category:');
    const retailCompanies = await prisma.portfolio.findMany({
      where: { category: 'Retail' },
      select: { name: true, category: true }
    });
    console.log(retailCompanies);

    // Move Aura and Playbook to SaaS
    console.log('\nMoving Aura and Playbook to SaaS...');
    const auraUpdate = await prisma.portfolio.updateMany({
      where: { name: 'Aura' },
      data: { category: 'SaaS' }
    });
    console.log(`Updated ${auraUpdate.count} records for Aura`);

    const playbookUpdate = await prisma.portfolio.updateMany({
      where: { name: 'Playbook' },
      data: { category: 'SaaS' }
    });
    console.log(`Updated ${playbookUpdate.count} records for Playbook`);

    // Update remaining Health companies to Commerce
    console.log('\nUpdating remaining Health companies to Commerce...');
    const healthToCommerce = await prisma.portfolio.updateMany({
      where: { 
        category: 'Health',
        NOT: {
          OR: [
            { name: 'Aura' },
            { name: 'Playbook' }
          ]
        }
      },
      data: { category: 'Commerce' }
    });
    console.log(`Updated ${healthToCommerce.count} Health records to Commerce`);

    // Update all Retail to Commerce
    console.log('\nUpdating Retail companies to Commerce...');
    const retailToCommerce = await prisma.portfolio.updateMany({
      where: { category: 'Retail' },
      data: { category: 'Commerce' }
    });
    console.log(`Updated ${retailToCommerce.count} Retail records to Commerce`);

    // Show final categories
    console.log('\nFinal categories in use:');
    const categories = await prisma.portfolio.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' }
    });
    console.log(categories.map(c => c.category));

  } catch (error) {
    console.error('Error updating categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateCategories();