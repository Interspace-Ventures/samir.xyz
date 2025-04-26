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
    
    // Check unique categories from portfolio items
    const portfolioItems = await prisma.portfolio.findMany();
    const uniqueCategories = [...new Set(portfolioItems.map(item => item.category))];
    
    console.log(`\nUnique Categories (${uniqueCategories.length}):`);
    console.table(uniqueCategories);
    
    // Check portfolio items
    console.log(`\nPortfolio items count: ${portfolioItems.length}`);
    
    if (portfolioItems.length > 0) {
      // Get a sample of portfolio items
      const sampleItems = portfolioItems.slice(0, 3);
      
      console.log('\nSample portfolio items:');
      sampleItems.forEach(item => {
        console.log(`- ${item.name} (${item.category})`);
        console.log(`  Logo: ${item.logoUrl}`);
        console.log(`  Website: ${item.website || 'none'}`);
        if (item.description) {
          console.log(`  Description: ${item.description}`);
        }
        if (item.investment_status) {
          console.log(`  Status: ${item.investment_status}`);
        }
        console.log('');
      });
    }
    
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