/**
 * Update Company Logos Script
 * 
 * This script updates company logos to use only PNG images and ensures all companies
 * from the original list are added to the database.
 * 
 * Run with: `node update-company-logos.js`
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company logos to use PNG files only...');

  // Get all PNG files from the companies directory
  const companiesDir = path.join(process.cwd(), '..', '..', 'public', 'companies');
  console.log('Looking for PNG files in:', companiesDir);
  const pngFiles = fs.readdirSync(companiesDir)
    .filter(file => file.toLowerCase().endsWith('.png'))
    .map(file => `/companies/${file}`);

  console.log(`Found ${pngFiles.length} PNG files in the companies directory`);

  // Get all portfolio items
  const portfolioItems = await prisma.portfolio.findMany();
  console.log(`Found ${portfolioItems.length} portfolio items in the database`);

  // Update existing portfolio items to use PNG logos
  const updatedCount = {
    logoUrlUpdated: 0,
    skip: 0
  };

  // Create tags for company status if they don't exist
  const markupTag = await getOrCreateTag('Markup');
  const acquiredTag = await getOrCreateTag('Acquired');

  // First update existing items
  for (const item of portfolioItems) {
    const currentLogoUrl = item.logoUrl;
    
    // Skip if already using a PNG file
    if (currentLogoUrl.toLowerCase().endsWith('.png')) {
      console.log(`Skipping ${item.name} - already using PNG logo: ${currentLogoUrl}`);
      updatedCount.skip++;
      continue;
    }
    
    // Find a matching PNG file for this company
    const companyNameLower = item.name.toLowerCase().replace(/\s+/g, '');
    const matchingPng = pngFiles.find(png => {
      const pngName = path.basename(png, '.png').toLowerCase().replace(/\s+/g, '');
      return pngName === companyNameLower || 
             pngName.includes(companyNameLower) || 
             companyNameLower.includes(pngName);
    });
    
    if (matchingPng) {
      // Update the logo URL to use the PNG file
      await prisma.portfolio.update({
        where: { id: item.id },
        data: { logoUrl: matchingPng }
      });
      
      console.log(`Updated ${item.name} logo: ${currentLogoUrl} → ${matchingPng}`);
      updatedCount.logoUrlUpdated++;
    } else {
      console.log(`No matching PNG file found for ${item.name}`);
    }
  }

  // Now ensure all PNG files have a corresponding portfolio item
  const missingCompanies = [];
  const categories = ['SaaS', 'Retail', 'Health', 'Fintech'];
  
  for (const pngFile of pngFiles) {
    const fileName = path.basename(pngFile, '.png');
    
    // Skip special files or screenshots
    if (fileName.includes('CleanShot') || fileName.toLowerCase().includes('screenshot')) {
      continue;
    }
    
    // Check if a portfolio item exists for this PNG
    const companyExists = portfolioItems.some(item => {
      const itemName = item.name.toLowerCase().replace(/\s+/g, '');
      const pngName = fileName.toLowerCase().replace(/\s+/g, '');
      return itemName === pngName || 
             itemName.includes(pngName) || 
             pngName.includes(itemName);
    });
    
    if (!companyExists) {
      missingCompanies.push({
        name: fileName,
        logoUrl: pngFile,
        category: assignCategory(fileName, categories)
      });
    }
  }

  // Add missing companies to the database
  if (missingCompanies.length > 0) {
    console.log(`Adding ${missingCompanies.length} missing companies to the database`);
    
    for (const company of missingCompanies) {
      await createCompany({
        name: company.name,
        category: company.category,
        logoUrl: company.logoUrl,
        tags: []
      });
      
      console.log(`Added new company: ${company.name} (${company.category})`);
    }
  } else {
    console.log('All PNG files already have corresponding portfolio items');
  }

  // Update company websites with the correct URLs
  const websiteUpdates = [
    { name: 'Harper', website: 'https://joinharper.com' },
    { name: 'Swan', website: 'https://www.swanbitcoin.com' },
    { name: 'Aura', website: 'https://www.aurahealth.io/aura' },
    { name: 'Playbook', website: 'https://www.joinplaybook.com' },
    { name: 'RPM', website: 'https://rpmtraining.com' },
    { name: 'Margin', website: 'https://viewmargin.com' },
    { name: 'Soot', website: 'https://play.soot.com' },
    { name: 'Hedgehog', website: 'https://www.thehedgehogcompany.com' },
    { name: 'Backpack', website: 'https://www.backpackpay.com' },
    { name: 'Keep', website: 'https://www.trykeep.com' },
    { name: 'Rely', website: 'https://tryrely.ai' },
    { name: 'Waldo', website: 'https://www.waldo.ai' },
    { name: 'Juneshine', website: 'https://juneshine.com' },
    { name: 'Sanzo', website: 'https://drinksanzo.com' },
    { name: 'Sundae', website: 'https://sundae.com' },
    { name: 'Superplastic', website: 'https://superplastic.co' },
    { name: 'GEM', website: 'https://dailygem.co' },
    { name: 'Maridea', website: 'https://www.maridea.co' },
    { name: 'Kartera', website: 'https://kartera.io' },
    { name: 'Lunar', website: 'https://lunardigitalsim.com' },
    { name: 'Launchpad', website: 'https://launchpadapp.com' },
    { name: 'Metadata', website: 'https://www.metadata.io' },
    { name: 'Moku', website: 'https://moku.ai' },
    { name: 'Juno', website: 'https://juno.finance' },
    { name: 'CaliberX', website: 'https://caliberx.com' },
  ];

  let websiteUpdateCount = 0;
  for (const update of websiteUpdates) {
    try {
      const item = await prisma.portfolio.findFirst({
        where: {
          name: {
            contains: update.name,
            mode: 'insensitive'
          }
        }
      });
      
      if (item) {
        await prisma.portfolio.update({
          where: { id: item.id },
          data: { website: update.website }
        });
        
        console.log(`Updated website for ${item.name}: ${update.website}`);
        websiteUpdateCount++;
      }
    } catch (error) {
      console.error(`Error updating website for ${update.name}:`, error);
    }
  }

  console.log('Update summary:');
  console.log(`- Logo URLs updated: ${updatedCount.logoUrlUpdated}`);
  console.log(`- Logos already using PNG: ${updatedCount.skip}`);
  console.log(`- Missing companies added: ${missingCompanies.length}`);
  console.log(`- Website URLs updated: ${websiteUpdateCount}`);
}

// Helper function to get or create a tag
async function getOrCreateTag(name) {
  let tag = await prisma.tag.findUnique({
    where: { name }
  });
  
  if (!tag) {
    tag = await prisma.tag.create({
      data: { name }
    });
  }
  
  return tag;
}

// Helper function to create a company
async function createCompany({ name, category, logoUrl, tags = [] }) {
  return await prisma.portfolio.create({
    data: {
      name,
      category,
      logoUrl,
      tags: tags.length > 0 ? {
        connect: tags.map(id => ({ id }))
      } : undefined
    }
  });
}

// Helper function to assign a category
function assignCategory(companyName, categories) {
  // Map companies to categories based on some heuristics
  const companyLower = companyName.toLowerCase();
  
  const categoryMappings = {
    // FinTech
    fintech: ['backpack', 'harper', 'kartera', 'keep', 'margin', 'maridea', 'rely', 'sundae', 'swan', 'waldo', 'juno', 'caliber'],
    // SaaS
    saas: ['aon3d', 'restream', 'soot', 'sugar', 'techmate', 'metadata', 'moku', 'launchpad', 'lunar'],
    // Retail
    retail: ['june', 'sanzo', 'super', 'swansea', 'coffee', 'food'],
    // Health
    health: ['afar', 'aura', 'gem', 'goodmylk', 'hedgehog', 'playbook', 'rpm']
  };
  
  for (const [category, keywords] of Object.entries(categoryMappings)) {
    if (keywords.some(keyword => companyLower.includes(keyword))) {
      // Map back to the proper category name from categories array
      return categories.find(c => c.toLowerCase().includes(category)) || 'SaaS';
    }
  }
  
  // Default to SaaS if no match
  return 'SaaS';
}

main()
  .catch((e) => {
    console.error('Error updating company logos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });