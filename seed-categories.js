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
  console.log('Seeding portfolio categories...');

  // Clear existing categories
  await prisma.category.deleteMany({});

  // Create categories
  const categories = [
    { name: 'All', order: 0 },
    { name: 'Fintech', order: 1 },
    { name: 'Health', order: 2 },
    { name: 'Retail', order: 3 },
    { name: 'SaaS', order: 4 },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  console.log('Categories seeded successfully!');

  // Display all seeded categories
  const seededCategories = await prisma.category.findMany({
    orderBy: { order: 'asc' },
  });
  
  console.table(seededCategories);
}

main()
  .catch((e) => {
    console.error('Error seeding categories:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });