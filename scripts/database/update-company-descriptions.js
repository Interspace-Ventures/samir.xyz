/**
 * Update Company Descriptions Script
 * 
 * This script updates descriptions for portfolio companies
 * 
 * Run with: `node scripts/database/update-company-descriptions.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating company descriptions...');

  const companyDescriptions = {
    'Afar': 'Low sugar high protein savory snack bars.',
    'AON3D': 'Industrial 3D printing solutions for high-performance thermoplastics.',
    'Aura': 'Digital mental health platform offering mindfulness meditation, life coaching, and therapy.',
    'Backpack': 'Modern 529 college savings platform making education investing accessible.',
    'GEM': 'Real food daily bites made from algae, plants, and probiotics to optimize your daily nutrition.',
    'Goodmylk': 'Plant-based dairy alternatives made from simple, wholesome ingredients.',
    'Harper': 'Digital-first insurance platform for modern businesses.',
    'Hedgehog': 'Digital health platform for personalized wellness and preventive care.',
    'Juneshine': 'Premium hard kombucha brewed with real organic ingredients and probiotics.',
    'Kartera': 'Digital asset management platform for institutional investors.',
    'Keep': 'All-in-one banking for any business.',
    'Margin': 'Increasing profitability by measuring cost & revenue of every user action.',
    'Maridea': 'Wealth management platform for high-net-worth individuals.',
    'Playbook': 'Platform enabling fitness creators to build, manage and grow their digital business.',
    'RPM': 'At-home fitness programming combining functional movement with high-intensity training.',
    'Rely': 'AI-powered transaction and transition management platform for real estate.',
    'Restream': 'Multi-platform streaming solution for content creators and businesses.',
    'Sanzo': 'Asian-inspired sparkling water made with real fruit and no added sugar.',
    'Soot': 'Visual-first filing system powered by AI.',
    'Sugar': 'Property management platform streamlining operations and resident experience.',
    'Sundae': 'Marketplace for distressed property sales connecting sellers with investors.',
    'Superplastic': 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.',
    'Swan': 'Bitcoin savings and investment platform for long-term wealth building.'
  };

  // Track successfully updated companies
  const updatedCompanies = [];
  const notFoundCompanies = [];

  // Update each company
  for (const [name, description] of Object.entries(companyDescriptions)) {
    try {
      // Find the company by name
      const company = await prisma.portfolio.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive' // Case insensitive search
          }
        }
      });

      if (company) {
        // Update the description
        await prisma.portfolio.update({
          where: { id: company.id },
          data: { description }
        });
        
        updatedCompanies.push(name);
        console.log(`✅ Updated description for "${name}"`);
      } else {
        notFoundCompanies.push(name);
        console.log(`❌ Company not found: "${name}"`);
      }
    } catch (error) {
      console.error(`Error updating "${name}":`, error);
    }
  }

  // Summary
  console.log(`\n✅ Successfully updated ${updatedCompanies.length} companies:`);
  updatedCompanies.forEach(name => console.log(`  - ${name}`));
  
  if (notFoundCompanies.length > 0) {
    console.log(`\n❌ Could not find ${notFoundCompanies.length} companies:`);
    notFoundCompanies.forEach(name => console.log(`  - ${name}`));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });