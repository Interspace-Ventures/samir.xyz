/**
 * Update Company Logos Script (Exact Matches)
 * 
 * This script updates the logoUrl field for portfolio items to use the 
 * actual PNG images instead of placeholder SVGs, using exact name matches.
 * 
 * Run with: `node update-company-logos-exact.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company logos with exact matches...');

  // Logo mappings - directly relating company names to their logo files
  const logoMappings = [
    { name: 'AON3D', logoUrl: '/companies/AON3D.png' },
    { name: 'Margin', logoUrl: '/companies/margin.png' },
    { name: 'Restream', logoUrl: '/companies/Restream.png' },
    { name: 'Soot', logoUrl: '/companies/Soot.png' },
    { name: 'Sugar', logoUrl: '/companies/Sugar.png' },
    { name: 'Techmate', logoUrl: '/companies/Techmate.png' },
    { name: 'June Shine', logoUrl: '/companies/Juneshine.png' },
    { name: 'Sanzo', logoUrl: '/companies/Sanzo.png' },
    { name: 'Super Plastic', logoUrl: '/companies/Superplastic.png' },
    { name: 'Swansea City AFC', logoUrl: '/companies/Swansea City AFC.png' },
    { name: 'The Coffee', logoUrl: '/companies/The Coffee.png' },
    { name: 'The Food Company', logoUrl: '/companies/The Food Company.png' },
    { name: 'Afar', logoUrl: '/companies/Afar.png' },
    { name: 'Aura', logoUrl: '/companies/Aura.png' },
    { name: 'GEM', logoUrl: '/companies/GEM.png' },
    { name: 'Goodmylk', logoUrl: '/companies/Goodmylk.png' },
    { name: 'H', logoUrl: '/companies/Hedgehog.png' }, // Assuming H is actually Hedgehog
    { name: 'Playbook', logoUrl: '/companies/Playbook.png' },
    { name: 'RPM', logoUrl: '/companies/RPM.png' },
    { name: 'Backpack', logoUrl: '/companies/Backpack.png' },
    { name: 'Hash', logoUrl: '/companies/Harper.png' }, // Assuming Hash is actually Harper
    { name: 'Kartera', logoUrl: '/companies/Kartera.png' },
    { name: 'Keep', logoUrl: '/companies/Keep.png' },
    { name: 'Naridea', logoUrl: '/companies/Maridea.png' }, // Assuming Naridea is actually Maridea
    { name: 'Rely', logoUrl: '/companies/Rely.png' },
    { name: 'Sundae', logoUrl: '/companies/Sundae.png' },
    { name: 'Swan', logoUrl: '/companies/Swan.png' },
    { name: 'Waldo', logoUrl: '/companies/Waldo.png' },
    // Additional companies from the PNG files
    { name: 'Juno', logoUrl: '/companies/Juno.png' },
    { name: 'Launchpad', logoUrl: '/companies/Launchpad.png' },
    { name: 'Lunar', logoUrl: '/companies/Lunar.png' },
    { name: 'Metadata', logoUrl: '/companies/Metadata.png' },
    { name: 'Moku', logoUrl: '/companies/Moku.png' },
    { name: 'CaliberX', logoUrl: '/companies/CaliberX.png' }
  ];

  // Update counts
  let updatedCount = 0;
  let skippedCount = 0;
  let notFoundCount = 0;

  // Process each logo mapping
  for (const mapping of logoMappings) {
    // Find the portfolio item with the matching name
    const portfolioItem = await prisma.portfolio.findFirst({
      where: { 
        name: {
          equals: mapping.name,
          mode: 'insensitive' // Case-insensitive matching
        }
      }
    });

    if (portfolioItem) {
      // Update the portfolio item with the new logo path
      await prisma.portfolio.update({
        where: { id: portfolioItem.id },
        data: { logoUrl: mapping.logoUrl }
      });
      
      console.log(`Updated ${portfolioItem.name} logo to ${mapping.logoUrl}`);
      updatedCount++;
    } else {
      console.log(`No portfolio item found with name ${mapping.name}`);
      notFoundCount++;
    }
  }

  // Get all portfolio items that still have SVG logos
  const remainingItems = await prisma.portfolio.findMany({
    where: {
      logoUrl: {
        endsWith: '.svg'
      }
    }
  });
  
  skippedCount = remainingItems.length;
  if (skippedCount > 0) {
    console.log('The following portfolio items still have SVG logos:');
    remainingItems.forEach(item => {
      console.log(`- ${item.name}: ${item.logoUrl}`);
    });
  }

  console.log(`Logo update complete.`);
  console.log(`  Updated: ${updatedCount} items`);
  console.log(`  Skipped: ${skippedCount} items (still using SVG logos)`);
  console.log(`  Not found: ${notFoundCount} companies in mappings list`);
}

main()
  .catch((e) => {
    console.error('Error updating company logos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });