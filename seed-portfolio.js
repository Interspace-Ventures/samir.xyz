/**
 * Portfolio Seed Script
 * 
 * This script adds portfolio items (companies) to the database.
 * The data is based on the portfolio screenshots provided.
 * 
 * Run with: `node seed-portfolio.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding portfolio items...');

  // Clear existing data
  await prisma.portfolio.deleteMany({});

  // Create tags for portfolio status
  const markupTag = await getOrCreateTag('Markup');
  const acquiredTag = await getOrCreateTag('Acquired');

  // Create portfolio items grouped by category
  
  // SaaS Companies
  await createPortfolioItem({
    name: 'AON3D',
    category: 'SaaS',
    logoUrl: '/companies/aon3d.svg',
    tags: [markupTag.id],
    order: 1
  });

  await createPortfolioItem({
    name: 'Margin',
    category: 'SaaS',
    logoUrl: '/companies/margin.svg',
    order: 2
  });

  await createPortfolioItem({
    name: 'Restream',
    category: 'SaaS',
    logoUrl: '/companies/restream.svg',
    order: 3
  });

  await createPortfolioItem({
    name: 'Soot',
    category: 'SaaS',
    logoUrl: '/companies/soot.svg',
    tags: [markupTag.id],
    order: 4
  });

  await createPortfolioItem({
    name: 'Sugar',
    category: 'SaaS',
    logoUrl: '/companies/sugar.svg',
    tags: [acquiredTag.id],
    order: 5
  });

  await createPortfolioItem({
    name: 'Techmate',
    category: 'SaaS',
    logoUrl: '/companies/techmate.svg',
    order: 6
  });

  // Retail Companies
  await createPortfolioItem({
    name: 'June Shine',
    category: 'Retail',
    logoUrl: '/companies/june-shine.svg',
    tags: [markupTag.id],
    order: 7
  });

  await createPortfolioItem({
    name: 'Sanzo',
    category: 'Retail',
    logoUrl: '/companies/sanzo.svg',
    tags: [markupTag.id],
    order: 8
  });

  await createPortfolioItem({
    name: 'Super Plastic',
    category: 'Retail',
    logoUrl: '/companies/super-plastic.svg',
    order: 9
  });

  await createPortfolioItem({
    name: 'Swansea City AFC',
    category: 'Retail',
    logoUrl: '/companies/swansea-city.svg',
    order: 10
  });

  await createPortfolioItem({
    name: 'The Coffee',
    category: 'Retail',
    logoUrl: '/companies/the-coffee.svg',
    tags: [markupTag.id],
    order: 11
  });

  await createPortfolioItem({
    name: 'The Food Company',
    category: 'Retail',
    logoUrl: '/companies/the-food-company.svg',
    order: 12
  });

  // Health Companies
  await createPortfolioItem({
    name: 'Afar',
    category: 'Health',
    logoUrl: '/companies/afar.svg',
    order: 13
  });

  await createPortfolioItem({
    name: 'Aura',
    category: 'Health',
    logoUrl: '/companies/aura.svg',
    tags: [markupTag.id],
    order: 14
  });

  await createPortfolioItem({
    name: 'GEM',
    category: 'Health',
    logoUrl: '/companies/gem.svg',
    tags: [markupTag.id],
    order: 15
  });

  await createPortfolioItem({
    name: 'Goodmylk',
    category: 'Health',
    logoUrl: '/companies/goodmylk.svg',
    order: 16
  });

  await createPortfolioItem({
    name: 'H',
    category: 'Health',
    logoUrl: '/companies/h.svg',
    order: 17
  });

  await createPortfolioItem({
    name: 'Playbook',
    category: 'Health',
    logoUrl: '/companies/playbook.svg',
    order: 18
  });

  await createPortfolioItem({
    name: 'RPM',
    category: 'Health',
    logoUrl: '/companies/rpm.svg',
    tags: [acquiredTag.id],
    order: 19
  });

  // Fintech Companies
  await createPortfolioItem({
    name: 'Backpack',
    category: 'Fintech',
    logoUrl: '/companies/backpack.svg',
    order: 20
  });

  await createPortfolioItem({
    name: 'Hash',
    category: 'Fintech',
    logoUrl: '/companies/hash.svg',
    order: 21
  });

  await createPortfolioItem({
    name: 'Kartera',
    category: 'Fintech',
    logoUrl: '/companies/kartera.svg',
    order: 22
  });

  await createPortfolioItem({
    name: 'Keep',
    category: 'Fintech',
    logoUrl: '/companies/keep.svg',
    order: 23
  });

  await createPortfolioItem({
    name: 'Naridea',
    category: 'Fintech',
    logoUrl: '/companies/naridea.svg',
    tags: [markupTag.id],
    order: 24
  });

  await createPortfolioItem({
    name: 'Rely',
    category: 'Fintech',
    logoUrl: '/companies/rely.svg',
    order: 25
  });

  await createPortfolioItem({
    name: 'Sundae',
    category: 'Fintech',
    logoUrl: '/companies/sundae.svg',
    order: 26
  });

  await createPortfolioItem({
    name: 'Swan',
    category: 'Fintech',
    logoUrl: '/companies/swan.svg',
    tags: [markupTag.id],
    order: 27
  });

  await createPortfolioItem({
    name: 'Waldo',
    category: 'Fintech',
    logoUrl: '/companies/waldo.svg',
    order: 28
  });

  console.log('Portfolio items seeded successfully!');

  // Display a count of portfolio items by category
  const categories = await prisma.category.findMany();
  
  for (const category of categories) {
    const count = await prisma.portfolio.count({
      where: {
        category: category.name
      }
    });
    
    console.log(`${category.name}: ${count} items`);
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

// Helper function to create a portfolio item
async function createPortfolioItem({ name, category, logoUrl, tags = [], order }) {
  return await prisma.portfolio.create({
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
    console.error('Error seeding portfolio items:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });