/**
 * Fix All Logos Script
 * 
 * This script ensures all companies have proper logo paths
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting logo path fixes...');
    
    // Get all portfolio items
    const portfolioItems = await prisma.portfolio.findMany();
    
    // Check public directory for available PNG files
    const logoDir = path.join(process.cwd(), 'attached_assets');
    const logoFiles = fs.readdirSync(logoDir)
      .filter(file => file.toLowerCase().endsWith('.png'))
      .map(file => file);
    
    console.log(`Found ${logoFiles.length} PNG files in the assets directory`);
    
    // Create map of company names to logo files (lowercase for case-insensitive matching)
    const logoMap = {};
    logoFiles.forEach(file => {
      // Remove .png and convert to lowercase for matching
      const nameWithoutExt = file.replace(/\.png$/i, '').toLowerCase();
      logoMap[nameWithoutExt] = file;
    });
    
    // Count of updates
    let updatedCount = 0;
    
    // Update each company
    for (const item of portfolioItems) {
      // Check if logo exists in assets
      const lowerCaseName = item.name.toLowerCase();
      const logoFile = logoMap[lowerCaseName];
      
      if (logoFile) {
        // Check if current logo path is different
        const correctPath = `attached_assets/${logoFile}`;
        if (item.logoUrl !== correctPath) {
          console.log(`Updating logo for ${item.name} to ${correctPath}`);
          await prisma.portfolio.update({
            where: {
              id: item.id
            },
            data: {
              logoUrl: correctPath
            }
          });
          updatedCount++;
        }
      } else {
        console.log(`No matching logo file found for ${item.name}`);
      }
    }
    
    console.log(`\nUpdated logo paths for ${updatedCount} companies`);
    
    // Verify logo paths
    const checkItems = await prisma.portfolio.findMany({
      select: {
        name: true,
        logoUrl: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    console.log('\nCurrent logo paths:');
    checkItems.forEach(item => {
      console.log(`- ${item.name}: ${item.logoUrl}`);
    });
    
    console.log('\nAll logo fixes complete!');
    
  } catch (error) {
    console.error('Error fixing logos:', error);
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