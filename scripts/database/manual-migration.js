/**
 * Manual Database Migration Script
 * 
 * This script manually updates the database structure by:
 * 1. Ensuring portfolio items have the right investment_status
 * 2. Dropping the Tag, Category, and _PortfolioToTag tables
 * 
 * Run with: `node scripts/database/manual-migration.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting manual database migration...');
    
    // 1. First, ensure any important data from tags is moved to investment_status
    console.log('\nMoving tag information to investment_status...');
    
    // Get all portfolio items with their tags
    const portfolioItems = await prisma.$queryRaw`
      SELECT p.id, p.name, p.investment_status, t.name as tag_name
      FROM "Portfolio" p
      LEFT JOIN "_PortfolioToTag" pt ON p.id = pt."A"
      LEFT JOIN "Tag" t ON pt."B" = t.id
    `;
    
    // Group by portfolio item
    const itemsGrouped = {};
    for (const item of portfolioItems) {
      if (!itemsGrouped[item.id]) {
        itemsGrouped[item.id] = {
          id: item.id,
          name: item.name,
          investment_status: item.investment_status,
          tags: []
        };
      }
      if (item.tag_name) {
        itemsGrouped[item.id].tags.push(item.tag_name);
      }
    }
    
    // Update investment_status if needed
    let updatedCount = 0;
    for (const id in itemsGrouped) {
      const item = itemsGrouped[id];
      let newStatus = item.investment_status;
      
      // Check for special tags
      if (!newStatus && item.tags.includes('Markup')) {
        newStatus = 'Markup';
      }
      if (!newStatus && item.tags.includes('Acquired')) {
        newStatus = 'Acquired';
      }
      
      // Update if status changed
      if (newStatus && newStatus !== item.investment_status) {
        await prisma.$executeRaw`
          UPDATE "Portfolio" 
          SET investment_status = ${newStatus}
          WHERE id = ${parseInt(id)}
        `;
        console.log(`Updated ${item.name} status to ${newStatus}`);
        updatedCount++;
      }
    }
    console.log(`Updated ${updatedCount} portfolio items with tag information`);
    
    // 2. Now, drop the unused tables safely
    console.log('\nDropping unused tables...');
    
    try {
      // Drop the relationship table first
      console.log('Dropping _PortfolioToTag table...');
      await prisma.$executeRaw`DROP TABLE IF EXISTS "_PortfolioToTag"`;
      
      // Drop Tag table
      console.log('Dropping Tag table...');
      await prisma.$executeRaw`DROP TABLE IF EXISTS "Tag"`;
      
      // Drop Category table
      console.log('Dropping Category table...');
      await prisma.$executeRaw`DROP TABLE IF EXISTS "Category"`;
      
      console.log('Tables successfully dropped');
    } catch (error) {
      console.error('Error dropping tables:', error);
    }
    
    // 3. Verify the changes
    const tables = await prisma.$queryRaw`
      SELECT tablename 
      FROM pg_catalog.pg_tables
      WHERE schemaname = 'public'
    `;
    
    console.log('\nRemaining tables:');
    tables.forEach(table => {
      console.log(`- ${table.tablename}`);
    });
    
    console.log('\nManual migration complete!');
    console.log('Remember to run `npx prisma generate` to update the Prisma client');
    
  } catch (error) {
    console.error('Error during migration:', error);
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