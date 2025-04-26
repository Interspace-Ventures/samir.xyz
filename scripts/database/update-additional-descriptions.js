/**
 * Update Additional Company Descriptions Script
 * 
 * This script updates descriptions for remaining portfolio companies
 * 
 * Run with: `node scripts/database/update-additional-descriptions.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating additional company descriptions...');
  
  const companies = [
    {
      name: 'Swansea City AFC',
      description: 'Professional football club competing in the English Football League Championship.'
    },
    {
      name: 'Techmate',
      description: 'AI-powered technical support automation platform.'
    },
    {
      name: 'The Coffee',
      description: 'Premium coffee brand focused on quality beans and innovative brewing methods.'
    },
    {
      name: 'The Food Company',
      description: 'Innovative food products and sustainable packaging solutions.'
    },
    {
      name: 'Waldo',
      description: 'Next-gen fraud and compliance monitoring tools.'
    }
  ];

  // Track results
  const updatedCompanies = [];
  const notFoundCompanies = [];

  for (const company of companies) {
    try {
      // First try exact match
      let portfolioItem = await prisma.portfolio.findFirst({
        where: {
          name: company.name
        }
      });

      // If not found, try case-insensitive match
      if (!portfolioItem) {
        portfolioItem = await prisma.portfolio.findFirst({
          where: {
            name: {
              equals: company.name,
              mode: 'insensitive'
            }
          }
        });
      }

      if (portfolioItem) {
        await prisma.portfolio.update({
          where: { id: portfolioItem.id },
          data: { description: company.description }
        });
        updatedCompanies.push(company.name);
        console.log(`✅ Updated description for "${company.name}"`);
      } else {
        notFoundCompanies.push(company.name);
        console.log(`❌ Company not found: "${company.name}"`);
      }
    } catch (error) {
      console.error(`Error updating "${company.name}":`, error);
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