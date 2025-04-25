/**
 * Check Database Script
 * 
 * This script checks the contents of the database to help diagnose issues
 * with API routes.
 * 
 * Run with: `node scripts/check-database.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Checking database contents...');
    
    // Check categories
    const categories = await prisma.category.findMany();
    console.log(`\nCategories (${categories.length}):`);
    console.table(categories);
    
    // Check portfolio items
    const portfolioCount = await prisma.portfolio.count();
    console.log(`\nPortfolio items count: ${portfolioCount}`);
    
    if (portfolioCount > 0) {
      // Get a sample of portfolio items
      const sampleItems = await prisma.portfolio.findMany({
        take: 3,
        include: {
          tags: true,
        }
      });
      
      console.log('\nSample portfolio items:');
      sampleItems.forEach(item => {
        console.log(`- ${item.name} (${item.category})`);
        console.log(`  Logo: ${item.logoUrl}`);
        console.log(`  Tags: ${item.tags.map(t => t.name).join(', ') || 'none'}`);
        console.log(`  Website: ${item.website || 'none'}`);
        console.log('');
      });
    }
    
    // Check tags
    const tags = await prisma.tag.findMany();
    console.log(`\nTags (${tags.length}):`);
    console.table(tags);
    
    console.log('\nDatabase check completed.');
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });