/**
 * Category Seed Script
 * 
 * This script adds portfolio categories to the database.
 * 
 * Run with: `node seed-categories.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding categories...');

  // Clear existing categories
  await prisma.category.deleteMany({});

  // Create categories with order for display sorting
  await prisma.category.createMany({
    data: [
      { name: 'All', order: 0 },
      { name: 'Fintech', order: 1 },
      { name: 'Health', order: 2 },
      { name: 'Retail', order: 3 },
      { name: 'SaaS', order: 4 }
    ]
  });

  console.log('Categories seeded successfully!');

  // Display all categories
  const categories = await prisma.category.findMany({
    orderBy: { order: 'asc' }
  });
  
  console.log('Categories:');
  categories.forEach(category => {
    console.log(`- ${category.name} (order: ${category.order})`);
  });
}

main()
  .catch((e) => {
    console.error('Error seeding categories:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });