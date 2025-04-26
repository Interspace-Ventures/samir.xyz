/**
 * Fix Portfolio Issues Script
 * 
 * This script:
 * 1. Checks and updates categories in the Portfolio table
 * 2. Updates missing logo URLs
 * 3. Adds descriptions for companies missing them
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting portfolio fixes...');
    
    // 1. Check current categories
    const categories = await prisma.portfolio.findMany({
      select: {
        category: true
      },
      distinct: ['category']
    });
    
    console.log('\nCurrent categories in Portfolio table:');
    categories.forEach(cat => {
      console.log(`- ${cat.category}`);
    });
    
    // Update Food to Retail if it exists
    if (categories.some(cat => cat.category === 'Food')) {
      console.log('\nChanging "Food" category to "Retail"');
      await prisma.portfolio.updateMany({
        where: {
          category: 'Food'
        },
        data: {
          category: 'Retail'
        }
      });
    }
    
    // 2. Check for missing logos
    console.log('\nChecking for companies with missing logos...');
    
    // Get all portfolio items
    const portfolioItems = await prisma.portfolio.findMany();
    
    // Check public directory for available PNG files
    const logoDir = path.join(process.cwd(), 'attached_assets');
    const logoFiles = fs.readdirSync(logoDir)
      .filter(file => file.toLowerCase().endsWith('.png'))
      .map(file => file);
    
    console.log(`Found ${logoFiles.length} PNG files in the assets directory`);
    
    // Map of company names to their logo files
    const logoMap = {
      'Juneshine': 'Juneshine.png',
      'Superplastic': 'Superplastic.png', 
      'Hedgehog': 'Hedgehog.png',
      'Metadata': 'Metadata.png',
      'Lunar': 'Lunar.png',
      'Juno': 'Juno.png',
      'June Shine': 'Juneshine.png'
    };
    
    // Update logo URLs
    for (const item of portfolioItems) {
      // Check if this company needs a logo update
      if (logoMap[item.name]) {
        console.log(`Updating logo for ${item.name}`);
        await prisma.portfolio.update({
          where: {
            id: item.id
          },
          data: {
            logoUrl: `attached_assets/${logoMap[item.name]}`
          }
        });
      }
    }
    
    // 3. Add descriptions for companies missing them
    console.log('\nAdding descriptions for companies missing them...');
    
    const descriptions = {
      'Metadata': 'A pioneering AI data analytics platform that transforms complex datasets into actionable business intelligence through intuitive visualizations.',
      'Lunar': 'A digital banking and financial services platform offering innovative mobile-first solutions to modern consumers across Northern Europe.',
      'Juno': 'An electric vehicle charging infrastructure provider delivering sustainable and accessible charging solutions for urban environments.',
      'Juneshine': 'A hard kombucha beverage company crafting organic, probiotic-rich alcoholic alternatives with sustainable ingredients and practices.',
      'Superplastic': 'A character-based entertainment and lifestyle brand creating collectible designer toys, digital content, and immersive experiences.',
      'Hedgehog': 'A financial technology platform simplifying cryptocurrency portfolio management with automated tracking and tax optimization tools.'
    };
    
    for (const item of portfolioItems) {
      if (!item.description && descriptions[item.name]) {
        console.log(`Adding description for ${item.name}`);
        await prisma.portfolio.update({
          where: {
            id: item.id
          },
          data: {
            description: descriptions[item.name]
          }
        });
      }
    }
    
    // Verify changes
    const updatedCategories = await prisma.portfolio.findMany({
      select: {
        category: true
      },
      distinct: ['category']
    });
    
    console.log('\nUpdated categories in Portfolio table:');
    updatedCategories.forEach(cat => {
      console.log(`- ${cat.category}`);
    });
    
    console.log('\nAll portfolio fixes complete!');
    
  } catch (error) {
    console.error('Error fixing portfolio issues:', error);
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