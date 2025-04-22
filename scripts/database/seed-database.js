/**
 * Database Seed Script
 * 
 * This script adds sample data to the database for development purposes.
 * It creates sample projects with tags and ventures.
 * 
 * Run with: `node seed-database.js`
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with sample data...');

  // Clear existing data
  await prisma.project.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.venture.deleteMany({});

  // Create tags
  const reactTag = await prisma.tag.create({
    data: { name: 'React' },
  });

  const nextjsTag = await prisma.tag.create({
    data: { name: 'Next.js' },
  });

  const typescriptTag = await prisma.tag.create({
    data: { name: 'TypeScript' },
  });

  const tailwindTag = await prisma.tag.create({
    data: { name: 'Tailwind CSS' },
  });

  const nodejsTag = await prisma.tag.create({
    data: { name: 'Node.js' },
  });

  // Create projects
  await prisma.project.create({
    data: {
      title: 'Personal Portfolio Website',
      description: 'A clean, minimal personal website built with Next.js and React.',
      featured: true,
      github: 'https://github.com/username/personal-portfolio',
      link: 'https://my-portfolio.dev',
      tags: {
        connect: [
          { id: reactTag.id },
          { id: nextjsTag.id },
          { id: tailwindTag.id },
          { id: typescriptTag.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'E-commerce Platform',
      description: 'A fully-featured e-commerce platform with product catalog, cart, and checkout.',
      featured: true,
      github: 'https://github.com/username/ecommerce-platform',
      link: 'https://my-shop.com',
      tags: {
        connect: [
          { id: reactTag.id },
          { id: nodejsTag.id },
          { id: typescriptTag.id },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      title: 'Real-time Dashboard',
      description: 'A real-time analytics dashboard with data visualization components.',
      featured: true,
      github: 'https://github.com/username/analytics-dashboard',
      tags: {
        connect: [
          { id: reactTag.id },
          { id: tailwindTag.id },
        ],
      },
    },
  });

  // Create ventures
  await prisma.venture.create({
    data: {
      name: 'Digital Art Studio',
      description: 'Exploring the boundaries of digital creativity with generative art and interactive installations.',
      industry: 'Art & Design',
      founded: 2022,
      featured: true,
      website: 'https://digital-art-studio.com',
    },
  });

  await prisma.venture.create({
    data: {
      name: 'Web3 Innovations',
      description: 'Researching and developing decentralized applications and blockchain solutions.',
      industry: 'Technology',
      founded: 2023,
      featured: true,
      website: 'https://web3innovations.io',
    },
  });

  await prisma.venture.create({
    data: {
      name: 'UX Research Lab',
      description: 'Conducting user experience research and creating design systems for digital products.',
      industry: 'Design',
      founded: 2024,
      featured: true,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });