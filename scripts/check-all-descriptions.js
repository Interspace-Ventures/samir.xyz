/**
 * Check All Descriptions Script
 * 
 * This script checks which companies have descriptions and which ones don't
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking company descriptions...');
    
    // Get all portfolio items
    const portfolioItems = await prisma.portfolio.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        category: true,
        description: true
      }
    });
    
    console.log(`\nTotal companies: ${portfolioItems.length}`);
    
    // Companies with descriptions
    const withDesc = portfolioItems.filter(item => item.description);
    console.log(`\nCompanies WITH descriptions: ${withDesc.length}`);
    
    // Companies without descriptions
    const withoutDesc = portfolioItems.filter(item => !item.description);
    console.log(`\nCompanies WITHOUT descriptions: ${withoutDesc.length}`);
    
    if (withoutDesc.length > 0) {
      console.log('\nList of companies missing descriptions:');
      withoutDesc.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} (${item.category}) - ID: ${item.id}`);
      });
    }
    
    // Sample of companies with descriptions (first 5)
    if (withDesc.length > 0) {
      console.log('\nSample of companies WITH descriptions (first 5):');
      withDesc.slice(0, 5).forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} (${item.category})`);
        console.log(`   ${item.description?.substring(0, 100)}...`);
      });
    }
    
  } catch (error) {
    console.error('Error checking descriptions:', error);
  }
}

main()
  .catch(e => {
    console.error('Error executing script:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });