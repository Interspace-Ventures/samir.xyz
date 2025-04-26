/**
 * Fix Company Data Script
 * 
 * This script fixes various company data issues:
 * 1. Updates Superplastic's category to "Retail"
 * 2. Updates "H" to "Harper" with correct website
 * 3. Adds missing website URLs for companies
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting company data fixes...');
    
    // 1. Fix Superplastic category
    const superplastic = await prisma.portfolio.updateMany({
      where: {
        name: 'Superplastic'
      },
      data: {
        category: 'Retail'
      }
    });
    
    console.log(`Updated Superplastic category: ${superplastic.count} rows affected`);
    
    // Also update Super Plastic if it exists
    const superPlasticSpace = await prisma.portfolio.updateMany({
      where: {
        name: 'Super Plastic'
      },
      data: {
        category: 'Retail',
        name: 'Superplastic' // Fix name to remove space
      }
    });
    
    console.log(`Updated Super Plastic name and category: ${superPlasticSpace.count} rows affected`);
    
    // 2. Fix "H" to "Harper"
    const harper = await prisma.portfolio.updateMany({
      where: {
        name: 'H'
      },
      data: {
        name: 'Harper',
        website: 'https://joinharper.com'
      }
    });
    
    console.log(`Updated H to Harper: ${harper.count} rows affected`);
    
    // 3. Update missing website URLs
    const websiteUpdates = [
      { name: 'AON3D', website: 'https://aon3d.com' },
      { name: 'Afar', website: 'https://afarhealthcare.com' },
      { name: 'Goodmylk', website: 'https://goodmylk.co' },
      { name: 'Hedgehog', website: 'https://hedgehog.app' },
      { name: 'June Shine', website: 'https://juneshine.com', newName: 'Juneshine' },
      { name: 'Juneshine', website: 'https://juneshine.com' },
      { name: 'Restream', website: 'https://restream.io' },
      { name: 'Sugar', website: 'https://sugar.com' },
      { name: 'Superplastic', website: 'https://superplastic.co' },
      { name: 'Swansea City AFC', website: 'https://swanseacity.com' },
      { name: 'Techmate', website: 'https://techmate.com' },
      { name: 'The Coffee', website: 'https://thecoffee.com' },
      { name: 'The Food Company', website: 'https://thefoodcompany.com' }
    ];
    
    console.log('\nUpdating missing website URLs...');
    
    for (const update of websiteUpdates) {
      const updateData = {
        website: update.website
      };
      
      // If there's a name correction
      if (update.newName) {
        updateData.name = update.newName;
      }
      
      const result = await prisma.portfolio.updateMany({
        where: {
          name: update.name
        },
        data: updateData
      });
      
      console.log(`Updated ${update.name}: ${result.count} rows affected`);
    }
    
    console.log('\nAll company data updates complete!');
    
  } catch (error) {
    console.error('Error fixing company data:', error);
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