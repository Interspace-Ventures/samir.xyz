/**
 * Rename Logo Files to Kebab Case Script
 * 
 * This script:
 * 1. Copies logo files from attached_assets to public/logos with kebab-case naming
 * 2. Updates the database to reference the new kebab-case file paths
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Function to convert a filename to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .toLowerCase(); // Convert to lowercase
}

async function main() {
  try {
    console.log('Starting logo renaming process...');
    
    // Create the public/logos directory if it doesn't exist
    const logoDir = path.join(process.cwd(), 'public', 'logos');
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
      console.log('Created public/logos directory');
    }

    // Get all portfolio items from the database
    const portfolioItems = await prisma.portfolio.findMany();
    console.log(`Found ${portfolioItems.length} portfolio items to process`);

    // Process each portfolio item
    for (const item of portfolioItems) {
      // Only process items that have a logo URL
      if (item.logoUrl) {
        // Extract just the filename from the path
        const oldFileName = item.logoUrl.split('/').pop();
        const fileExtension = path.extname(oldFileName);
        const fileNameWithoutExt = path.basename(oldFileName, fileExtension);
        
        // Convert to kebab-case
        const kebabCaseName = toKebabCase(fileNameWithoutExt);
        const newFileName = `${kebabCaseName}${fileExtension}`;
        const newLogoPath = `/logos/${newFileName}`;
        
        // Source file path - handle both with and without 'attached_assets/' prefix
        let sourceFilePath = item.logoUrl;
        if (!sourceFilePath.startsWith('/')) {
          sourceFilePath = path.join(process.cwd(), sourceFilePath);
        } else {
          sourceFilePath = path.join(process.cwd(), sourceFilePath.substring(1));
        }

        // If using the attached_assets folder
        if (item.logoUrl.includes('attached_assets/')) {
          sourceFilePath = path.join(process.cwd(), item.logoUrl);
        }
        
        // Destination file path
        const destFilePath = path.join(logoDir, newFileName);
        
        console.log(`Processing: ${item.name}`);
        console.log(`  Old path: ${item.logoUrl}`);
        console.log(`  New path: ${newLogoPath}`);
        
        try {
          // Copy the file
          if (fs.existsSync(sourceFilePath)) {
            fs.copyFileSync(sourceFilePath, destFilePath);
            console.log(`  Copied from ${sourceFilePath} to ${destFilePath}`);
            
            // Update the database
            await prisma.portfolio.update({
              where: { id: item.id },
              data: { logoUrl: newLogoPath }
            });
            console.log(`  Updated database record`);
          } else {
            console.log(`  WARNING: Source file not found at ${sourceFilePath}`);
          }
        } catch (err) {
          console.error(`  ERROR processing ${item.name}:`, err);
        }
      }
    }
    
    console.log('Logo renaming process complete!');
  } catch (error) {
    console.error('Error in logo renaming process:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });