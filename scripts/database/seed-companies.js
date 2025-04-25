/**
 * Company Seed Script
 * 
 * This script adds portfolio companies to the database.
 * The data is based on the portfolio screenshots provided.
 * 
 * Run with: `node seed-companies.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding portfolio companies...');

  // Clear existing data
  await prisma.portfolio.deleteMany({});

  // Create tags for company status
  const markupTag = await getOrCreateTag('Markup');
  const acquiredTag = await getOrCreateTag('Acquired');

  // Create companies grouped by category
  
  // SaaS Companies
  await createCompany({
    name: 'AON3D',
    category: 'SaaS',
    logoUrl: '/AON3D.png',
    tags: [markupTag.id],
    order: 1
  });

  await createCompany({
    name: 'Margin',
    category: 'SaaS',
    logoUrl: '/margin.png',
    order: 2
  });

  await createCompany({
    name: 'Restream',
    category: 'SaaS',
    logoUrl: '/Restream.png',
    order: 3
  });

  await createCompany({
    name: 'Soot',
    category: 'SaaS',
    logoUrl: '/Soot.png',
    tags: [markupTag.id],
    order: 4
  });

  await createCompany({
    name: 'Sugar',
    category: 'SaaS',
    logoUrl: '/Sugar.png',
    tags: [acquiredTag.id],
    order: 5
  });

  await createCompany({
    name: 'Techmate',
    category: 'SaaS',
    logoUrl: '/Techmate.png',
    order: 6
  });

  // Retail Companies
  await createCompany({
    name: 'June Shine',
    category: 'Retail',
    logoUrl: '/Juneshine.png',
    tags: [markupTag.id],
    order: 7
  });

  await createCompany({
    name: 'Sanzo',
    category: 'Retail',
    logoUrl: '/Sanzo.png',
    tags: [markupTag.id],
    order: 8
  });

  await createCompany({
    name: 'Super Plastic',
    category: 'Retail',
    logoUrl: '/Superplastic.png',
    order: 9
  });

  await createCompany({
    name: 'Swansea City AFC',
    category: 'Retail',
    logoUrl: '/Swansea City AFC.png',
    order: 10
  });

  await createCompany({
    name: 'The Coffee',
    category: 'Retail',
    logoUrl: '/The Coffee.png',
    tags: [markupTag.id],
    order: 11
  });

  await createCompany({
    name: 'The Food Company',
    category: 'Retail',
    logoUrl: '/The Food Company.png',
    order: 12
  });

  // Health Companies
  await createCompany({
    name: 'Afar',
    category: 'Health',
    logoUrl: '/Afar.png',
    order: 13
  });

  await createCompany({
    name: 'Aura',
    category: 'Health',
    logoUrl: '/Aura.png',
    tags: [markupTag.id],
    order: 14
  });

  await createCompany({
    name: 'GEM',
    category: 'Health',
    logoUrl: '/GEM.png',
    tags: [markupTag.id],
    order: 15
  });

  await createCompany({
    name: 'Goodmylk',
    category: 'Health',
    logoUrl: '/Goodmylk.png',
    order: 16
  });

  await createCompany({
    name: 'Hedgehog',
    category: 'Health',
    logoUrl: '/Hedgehog.png',
    order: 17
  });

  await createCompany({
    name: 'Playbook',
    category: 'Health',
    logoUrl: '/Playbook.png',
    order: 18
  });

  await createCompany({
    name: 'RPM',
    category: 'Health',
    logoUrl: '/RPM.png',
    tags: [acquiredTag.id],
    order: 19
  });

  // Fintech Companies
  await createCompany({
    name: 'Backpack',
    category: 'Fintech',
    logoUrl: '/Backpack.png',
    order: 20
  });

  await createCompany({
    name: 'Harper',
    category: 'Fintech',
    logoUrl: '/Harper.png',
    order: 21
  });

  await createCompany({
    name: 'Kartera',
    category: 'Fintech',
    logoUrl: '/Kartera.png',
    order: 22
  });

  await createCompany({
    name: 'Keep',
    category: 'Fintech',
    logoUrl: '/Keep.png',
    order: 23
  });

  await createCompany({
    name: 'Maridea',
    category: 'Fintech',
    logoUrl: '/Maridea.png',
    tags: [markupTag.id],
    order: 24
  });

  await createCompany({
    name: 'Rely',
    category: 'Fintech',
    logoUrl: '/Rely.png',
    order: 25
  });

  await createCompany({
    name: 'Sundae',
    category: 'Fintech',
    logoUrl: '/Sundae.png',
    order: 26
  });

  await createCompany({
    name: 'Swan',
    category: 'Fintech',
    logoUrl: '/Swan.png',
    tags: [markupTag.id],
    order: 27
  });

  await createCompany({
    name: 'Waldo',
    category: 'Fintech',
    logoUrl: '/Waldo.png',
    order: 28
  });

  console.log('Companies seeded successfully!');

  // Display a count of companies by category
  const categories = await prisma.category.findMany();
  
  for (const category of categories) {
    const count = await prisma.portfolio.count({
      where: {
        category: category.name
      }
    });
    
    console.log(`${category.name}: ${count} companies`);
  }
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
async function createCompany({ name, category, logoUrl, tags = [], order }) {
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

main()
  .catch((e) => {
    console.error('Error seeding companies:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });