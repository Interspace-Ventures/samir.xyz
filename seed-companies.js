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
  await prisma.company.deleteMany({});

  // Create tags for company status
  const markupTag = await getOrCreateTag('Markup');
  const acquiredTag = await getOrCreateTag('Acquired');

  // Create companies grouped by category
  
  // SaaS Companies
  await createCompany({
    name: 'AON3D',
    category: 'SaaS',
    logoUrl: '/companies/aon3d.svg',
    tags: [markupTag.id],
    order: 1
  });

  await createCompany({
    name: 'Margin',
    category: 'SaaS',
    logoUrl: '/companies/margin.svg',
    order: 2
  });

  await createCompany({
    name: 'Restream',
    category: 'SaaS',
    logoUrl: '/companies/restream.svg',
    order: 3
  });

  await createCompany({
    name: 'Soot',
    category: 'SaaS',
    logoUrl: '/companies/soot.svg',
    tags: [markupTag.id],
    order: 4
  });

  await createCompany({
    name: 'Sugar',
    category: 'SaaS',
    logoUrl: '/companies/sugar.svg',
    tags: [acquiredTag.id],
    order: 5
  });

  await createCompany({
    name: 'Techmate',
    category: 'SaaS',
    logoUrl: '/companies/techmate.svg',
    order: 6
  });

  // Retail Companies
  await createCompany({
    name: 'June Shine',
    category: 'Retail',
    logoUrl: '/companies/june-shine.svg',
    tags: [markupTag.id],
    order: 7
  });

  await createCompany({
    name: 'Sanzo',
    category: 'Retail',
    logoUrl: '/companies/sanzo.svg',
    tags: [markupTag.id],
    order: 8
  });

  await createCompany({
    name: 'Super Plastic',
    category: 'Retail',
    logoUrl: '/companies/super-plastic.svg',
    order: 9
  });

  await createCompany({
    name: 'Swansea City AFC',
    category: 'Retail',
    logoUrl: '/companies/swansea-city.svg',
    order: 10
  });

  await createCompany({
    name: 'The Coffee',
    category: 'Retail',
    logoUrl: '/companies/the-coffee.svg',
    tags: [markupTag.id],
    order: 11
  });

  await createCompany({
    name: 'The Food Company',
    category: 'Retail',
    logoUrl: '/companies/the-food-company.svg',
    order: 12
  });

  // Health Companies
  await createCompany({
    name: 'Afar',
    category: 'Health',
    logoUrl: '/companies/afar.svg',
    order: 13
  });

  await createCompany({
    name: 'Aura',
    category: 'Health',
    logoUrl: '/companies/aura.svg',
    tags: [markupTag.id],
    order: 14
  });

  await createCompany({
    name: 'GEM',
    category: 'Health',
    logoUrl: '/companies/gem.svg',
    tags: [markupTag.id],
    order: 15
  });

  await createCompany({
    name: 'Goodmylk',
    category: 'Health',
    logoUrl: '/companies/goodmylk.svg',
    order: 16
  });

  await createCompany({
    name: 'H',
    category: 'Health',
    logoUrl: '/companies/h.svg',
    order: 17
  });

  await createCompany({
    name: 'Playbook',
    category: 'Health',
    logoUrl: '/companies/playbook.svg',
    order: 18
  });

  await createCompany({
    name: 'RPM',
    category: 'Health',
    logoUrl: '/companies/rpm.svg',
    tags: [acquiredTag.id],
    order: 19
  });

  // Fintech Companies
  await createCompany({
    name: 'Backpack',
    category: 'Fintech',
    logoUrl: '/companies/backpack.svg',
    order: 20
  });

  await createCompany({
    name: 'Hash',
    category: 'Fintech',
    logoUrl: '/companies/hash.svg',
    order: 21
  });

  await createCompany({
    name: 'Kartera',
    category: 'Fintech',
    logoUrl: '/companies/kartera.svg',
    order: 22
  });

  await createCompany({
    name: 'Keep',
    category: 'Fintech',
    logoUrl: '/companies/keep.svg',
    order: 23
  });

  await createCompany({
    name: 'Naridea',
    category: 'Fintech',
    logoUrl: '/companies/naridea.svg',
    tags: [markupTag.id],
    order: 24
  });

  await createCompany({
    name: 'Rely',
    category: 'Fintech',
    logoUrl: '/companies/rely.svg',
    order: 25
  });

  await createCompany({
    name: 'Sundae',
    category: 'Fintech',
    logoUrl: '/companies/sundae.svg',
    order: 26
  });

  await createCompany({
    name: 'Swan',
    category: 'Fintech',
    logoUrl: '/companies/swan.svg',
    tags: [markupTag.id],
    order: 27
  });

  await createCompany({
    name: 'Waldo',
    category: 'Fintech',
    logoUrl: '/companies/waldo.svg',
    order: 28
  });

  console.log('Companies seeded successfully!');

  // Display a count of companies by category
  const categories = await prisma.category.findMany();
  
  for (const category of categories) {
    const count = await prisma.company.count({
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
  return await prisma.company.create({
    data: {
      name,
      category,
      logoUrl,
      order,
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