/**
 * Verify Database Changes Script
 * 
 * This script verifies that the database changes have been applied
 * and that the application is working correctly with the new schema.
 * 
 * Run with: `node scripts/verify-database-changes.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Verifying database changes...');
    
    // Check tables directly from the database
    console.log('\nChecking PostgreSQL tables...');
    const tableQuery = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_catalog.pg_tables
      WHERE schemaname = 'public'
    `;
    console.log('Database tables:');
    tableQuery.forEach(table => {
      console.log(`- ${table.tablename}`);
    });
    
    // Check Portfolio table structure
    console.log('\nChecking Portfolio table structure...');
    const portfolioStruct = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Portfolio'
      ORDER BY ordinal_position
    `;
    console.log('Portfolio table columns:');
    portfolioStruct.forEach(column => {
      console.log(`- ${column.column_name} (${column.data_type})`);
    });
    
    // Count portfolio items
    const portfolioCount = await prisma.portfolio.count();
    console.log(`\nTotal portfolio items: ${portfolioCount}`);
    
    // Check some portfolio items
    const sampleItems = await prisma.portfolio.findMany({
      take: 5
    });
    console.log('\nSample portfolio items:');
    sampleItems.forEach(item => {
      console.log(`- ${item.id}: ${item.name} (${item.category})`);
      console.log(`  Status: ${item.investment_status || 'N/A'}`);
      console.log(`  Investment: ${item.initial_investment || 'N/A'}`);
    });
    
    // Get distinct categories
    const categories = await prisma.portfolio.findMany({
      select: {
        category: true
      },
      distinct: ['category']
    });
    console.log('\nDistinct categories:');
    categories.forEach(cat => {
      console.log(`- ${cat.category}`);
    });
    
    console.log('\nVerification complete!');
    
  } catch (error) {
    console.error('Error during verification:', error);
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