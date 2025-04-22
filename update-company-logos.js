/**
 * Update Company Logos Script
 * 
 * This script updates the logoUrl field for portfolio items to use the 
 * actual PNG images instead of placeholder SVGs.
 * 
 * Run with: `node update-company-logos.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  console.log('Updating company logos...');

  // Get a list of all PNG files in the companies directory
  const companyLogos = fs.readdirSync('./public/companies/')
    .filter(file => file.endsWith('.png'));
  
  console.log(`Found ${companyLogos.length} PNG logo files`);

  // Create a mapping from company name to logo file
  const logoMap = {};
  
  companyLogos.forEach(logo => {
    // Remove file extension and convert to normalized name format
    const key = logo.replace('.png', '')
                    .replace(/\s+/g, ' ') // Normalize whitespace
                    .toLowerCase();
    logoMap[key] = `/companies/${logo}`;
  });

  // Get all portfolio items
  const portfolioItems = await prisma.portfolio.findMany();
  console.log(`Found ${portfolioItems.length} portfolio items to update`);

  // Update counts
  let updatedCount = 0;
  let skippedCount = 0;
  
  // Process each portfolio item
  for (const item of portfolioItems) {
    // Try different variations of the name to match with logo files
    const name = item.name.toLowerCase();
    const nameDashed = name.replace(/\s+/g, '-');
    const nameNoSpace = name.replace(/\s+/g, '');
    
    // Potential matches
    const logoOptions = [
      logoMap[name],                     // exact match (lowercase)
      logoMap[nameDashed],               // dashed version
      logoMap[nameNoSpace],              // no spaces version
      logoMap[item.name.toLowerCase()],  // original name (lowercase)
      logoMap[item.name]                 // exact original name
    ];
    
    // Find the first valid logo path
    const logoPath = logoOptions.find(path => path !== undefined);
    
    if (logoPath) {
      // Update the portfolio item with the new logo path
      await prisma.portfolio.update({
        where: { id: item.id },
        data: { logoUrl: logoPath }
      });
      
      console.log(`Updated ${item.name} logo to ${logoPath}`);
      updatedCount++;
    } else {
      console.log(`No matching logo found for ${item.name}`);
      skippedCount++;
    }
  }

  console.log(`Logo update complete. Updated: ${updatedCount}, Skipped: ${skippedCount}`);
}

main()
  .catch((e) => {
    console.error('Error updating company logos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });