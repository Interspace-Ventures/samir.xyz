/**
 * Update Database Structure Script
 * 
 * This script updates the database structure by:
 * 1. Moving any tag information to the investment_status field
 * 2. Making sure all portfolio items have the necessary fields
 * 3. Preparing for removal of Tags and Categories tables
 * 
 * Run with: `node scripts/database/update-database-structure.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting database structure update...');
  
  try {
    // 1. Get all portfolio items
    console.log('Fetching all portfolio items...');
    const portfolioItems = await prisma.portfolio.findMany({
      include: {
        tags: true, // Include tags while they still exist
      }
    });
    
    console.log(`Found ${portfolioItems.length} portfolio items`);
    
    // 2. Update each portfolio item if needed
    let updatedCount = 0;
    
    for (const item of portfolioItems) {
      let needsUpdate = false;
      let updateData = {};
      
      // Check for Markup tag and update investment_status if needed
      if (item.tags.some(tag => tag.name === 'Markup') && item.investment_status !== 'Markup') {
        updateData.investment_status = 'Markup';
        needsUpdate = true;
      }
      
      // Check for Acquired tag and update investment_status if needed
      if (item.tags.some(tag => tag.name === 'Acquired') && item.investment_status !== 'Acquired') {
        updateData.investment_status = 'Acquired';
        needsUpdate = true;
      }
      
      // If update is needed, perform it
      if (needsUpdate) {
        await prisma.portfolio.update({
          where: { id: item.id },
          data: updateData
        });
        updatedCount++;
        console.log(`Updated portfolio item: ${item.name} (ID: ${item.id})`);
      }
    }
    
    console.log(`Updated ${updatedCount} portfolio items with tag information`);
    
    // 3. Organize the portfolio item data in the requested order
    console.log('\nOrganizing data for the updated schema...');
    for (const item of portfolioItems) {
      // Just ensure all fields that should exist do exist
      // This is mostly informational at this stage
      const fields = [
        'id', 'name', 'category', 'logoUrl', 'website', 'description',
        'initial_investment', 'investment_date', 'original_valuation',
        'current_valuation', 'investment_status', 'createdAt', 'updatedAt'
      ];
      
      const missingFields = fields.filter(field => item[field] === undefined);
      if (missingFields.length > 0) {
        console.log(`Portfolio item ${item.name} (ID: ${item.id}) is missing fields: ${missingFields.join(', ')}`);
      }
    }
    
    console.log('\nDatabase structure update complete!');
    console.log('Next step: Run the Prisma migration to update the schema');
    console.log('Run: npx prisma migrate dev --name remove_tags_and_categories');
    
  } catch (error) {
    console.error('Error updating database structure:', error);
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