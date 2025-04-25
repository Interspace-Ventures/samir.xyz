/**
 * Database Debug Script
 * 
 * This script directly accesses the database using Prisma client
 * to check for any issues with the tables or data
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Debugging database connections and data...');
  
  try {
    // Test database connection
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('Database connection successful!\n');
    
    // Check categories
    console.log('Checking categories table...');
    const categoriesCount = await prisma.category.count();
    console.log(`Found ${categoriesCount} categories`);
    
    if (categoriesCount > 0) {
      const sampleCategories = await prisma.category.findMany({
        take: 5
      });
      console.log('Sample categories:');
      console.table(sampleCategories);
    }
    
    // Check portfolio items
    console.log('\nChecking portfolio table...');
    const portfolioCount = await prisma.portfolio.count();
    console.log(`Found ${portfolioCount} portfolio items`);
    
    if (portfolioCount > 0) {
      const samplePortfolio = await prisma.portfolio.findMany({
        take: 5,
        include: {
          tags: true
        }
      });
      console.log('Sample portfolio items:');
      console.log(JSON.stringify(samplePortfolio, null, 2));
    } else {
      console.log('No portfolio items found. This could be the source of the error.');
    }
    
    // Check tag relations
    console.log('\nChecking tag relations...');
    const tagsCount = await prisma.tag.count();
    console.log(`Found ${tagsCount} tags`);
    
    if (tagsCount > 0) {
      const tagsWithItems = await prisma.tag.findMany({
        include: {
          portfolios: true
        }
      });
      
      console.log('Tags with portfolio items:');
      for (const tag of tagsWithItems) {
        console.log(`- ${tag.name}: ${tag.portfolios.length} related items`);
      }
    }
    
  } catch (error) {
    console.error('Error in database debugging:', error);
  } finally {
    await prisma.$disconnect();
    console.log('\nDatabase debugging completed.');
  }
}

main();