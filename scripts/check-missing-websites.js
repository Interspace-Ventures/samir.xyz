/**
 * Check Missing Websites Script
 * 
 * This script lists all portfolio companies that don't have website data
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Find companies with null or empty website
    const companies = await prisma.portfolio.findMany({
      where: {
        OR: [
          { website: null },
          { website: '' }
        ]
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    console.log(`Found ${companies.length} companies without website data:`);
    
    companies.forEach((company, index) => {
      console.log(`${index + 1}. ${company.name} (${company.category})`);
    });
    
  } catch (error) {
    console.error('Error checking missing websites:', error);
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