/**
 * Add Missing Companies Script
 * 
 * This script adds missing companies to the portfolio database
 * 
 * Run with: `node scripts/database/add-missing-companies.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Adding missing companies to portfolio...');
  
  const missingCompanies = [
    {
      name: 'Hedgehog',
      category: 'Health',
      description: 'Digital health platform for personalized wellness and preventive care.',
      logoUrl: 'attached_assets/Hedgehog.png'
    },
    {
      name: 'Juneshine',
      category: 'Food',
      description: 'Premium hard kombucha brewed with real organic ingredients and probiotics.',
      logoUrl: 'attached_assets/Juneshine.png'
    },
    {
      name: 'Superplastic',
      category: 'Entertainment',
      description: 'Digital-first luxury brand creating synthetic celebrities and collectible art toys.',
      logoUrl: 'attached_assets/Superplastic.png'
    }
  ];

  // Add default tags for each company
  const defaultTags = ['Startup', 'Investment'];
  
  // Track results
  const addedCompanies = [];
  const failedCompanies = [];

  for (const company of missingCompanies) {
    try {
      // Check if company already exists
      const existingCompany = await prisma.portfolio.findFirst({
        where: {
          name: {
            equals: company.name,
            mode: 'insensitive'
          }
        }
      });

      if (existingCompany) {
        console.log(`⚠️ Company "${company.name}" already exists, skipping`);
        continue;
      }

      // Create tags
      const tags = await Promise.all(
        defaultTags.map(async (tagName) => {
          const existingTag = await prisma.tag.findFirst({
            where: { name: tagName }
          });

          if (existingTag) {
            return existingTag;
          } else {
            return prisma.tag.create({
              data: { name: tagName }
            });
          }
        })
      );

      // Create company with tags
      const createdCompany = await prisma.portfolio.create({
        data: {
          name: company.name,
          category: company.category,
          description: company.description,
          logoUrl: company.logoUrl,
          tags: {
            connect: tags.map((tag) => ({ id: tag.id }))
          }
        }
      });

      addedCompanies.push(company.name);
      console.log(`✅ Added "${company.name}" to portfolio`);
    } catch (error) {
      console.error(`Error adding "${company.name}":`, error);
      failedCompanies.push(company.name);
    }
  }

  // Summary
  console.log(`\n✅ Successfully added ${addedCompanies.length} companies:`);
  addedCompanies.forEach(name => console.log(`  - ${name}`));
  
  if (failedCompanies.length > 0) {
    console.log(`\n❌ Failed to add ${failedCompanies.length} companies:`);
    failedCompanies.forEach(name => console.log(`  - ${name}`));
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