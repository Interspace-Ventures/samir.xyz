/**
 * Check Categories Script
 * 
 * This script checks the categories in the database
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking available categories...');
  
  // Get all categories
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log('Available categories:', categories);
  
  // Get distinct categories from portfolio items
  const portfolioItems = await prisma.portfolio.findMany({
    select: {
      category: true
    },
    distinct: ['category']
  });
  
  const uniqueCategories = portfolioItems.map(item => item.category);
  console.log('Unique categories in portfolio items:', uniqueCategories);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });